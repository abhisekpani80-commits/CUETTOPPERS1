/**
 * CUET CBT Mock Test — Exam Engine
 * Handles: timer, question navigation, palette state machine,
 *          auto-save, session persistence, submit logic
 */

// ─── STATE ───────────────────────────────────────────────────────────────────
let state = {
    user: null,
    testId: null,
    test: null,
    questions: [],
    currentIndex: 0,
    answers: {},          // { questionId: { selectedAnswer, status, markedForReview, timeSpent, savedAt } }
    timeRemaining: 0,     // seconds
    sessionId: null,
    attemptNumber: 1,
    startedAt: null,
    submitted: false,
    qTimerSeconds: 0,     // per-question timer
};

let timerInterval = null;
let qTimerInterval = null;
let autoSaveInterval = null;

// ─── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', init);

async function init() {
    // Auth check
    state.user = requireAuth();
    if (!state.user) return;

    // Get test ID
    state.testId = Store.get('activeTestId', 'MOCK001');
    state.test = TEST_LIST.find(t => t.id === state.testId);
    if (!state.test) { window.location.href = 'dashboard.html'; return; }

    // Access check
    if (!isTestUnlocked(state.user.rollNumber, state.testId)) {
        alert('You do not have access to this test. Please unlock it first.');
        window.location.href = 'dashboard.html';
        return;
    }

    // Load or create session
    const fresh = Store.get('examStartFresh', false);
    const savedSession = Store.get(`session_${state.user.rollNumber}_${state.testId}`);

    if (!fresh && savedSession && savedSession.submitted === false) {
        // Resume session
        Object.assign(state, savedSession);
        Store.remove('examStartFresh');
    } else {
        // New session
        Store.remove('examStartFresh');

        // Phase 8: Fetch from Cloud first, fallback to Local
        state.questions = await fetchLiveQuestions(state.testId);
        if (!state.questions || state.questions.length === 0) {
            state.questions = getQuestionsForTest(state.testId);
        }

        state.currentIndex = 0;
        state.timeRemaining = state.test.durationMinutes * 60;
        state.sessionId = 'SES_' + Date.now();
        state.attemptNumber = getNextAttemptNumber();
        state.startedAt = nowISO();
        state.submitted = false;
        state.answers = {};
        state.beepPlayed10 = false;
        // Initialize all questions as not-visited
        state.questions.forEach(q => {
            state.answers[q.id] = {
                selectedAnswer: null,
                status: 'not-visited',
                markedForReview: false,
                timeSpent: 0,
                savedAt: null
            };
        });
    }

    // Render UI
    renderHeader();
    renderSectionTabs();
    renderPalette();
    goToQuestion(state.currentIndex);

    // Start timers
    startGlobalTimer();
    startQTimer();

    // Auto-save every 30s
    autoSaveInterval = setInterval(saveSession, 30000);

    // Browser back-button warning
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', function () {
        window.history.pushState(null, '', window.location.href);
        showToast('⚠️ Browser back button is disabled during the exam.', 'warning');
    });

    // Prevent page unload without warning
    window.addEventListener('beforeunload', function (e) {
        if (!state.submitted) {
            saveSession();
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

// ─── GET NEXT ATTEMPT NUMBER ─────────────────────────────────────────────────
function getNextAttemptNumber() {
    const all = Store.get('allScores', []);
    const prev = all.filter(s => s.testId === state.testId && s.userId === state.user.rollNumber);
    return prev.length + 1;
}

// ─── RENDER HEADER ───────────────────────────────────────────────────────────
function renderHeader() {
    document.getElementById('candName').textContent = state.user.name;
    document.getElementById('candRoll').textContent = 'Roll: ' + state.user.rollNumber;
    document.getElementById('candPhoto').textContent =
        state.user.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ─── SECTION TABS ─────────────────────────────────────────────────────────────
function renderSectionTabs() {
    const tabs = document.getElementById('sectionTabs');
    // For this demo, single section
    tabs.innerHTML = `<button class="section-tab active" aria-current="true">${state.test.section}</button>
  <button class="section-tab" onclick="showToast('Additional sections available in full version','info')">Section IA — Languages</button>`;
}

// ─── RENDER PALETTE ───────────────────────────────────────────────────────────
function renderPalette() {
    const grid = document.getElementById('paletteGrid');
    grid.innerHTML = state.questions.map((q, i) => {
        const ans = state.answers[q.id] || {};
        const palState = getPaletteClass(ans.status, ans.markedForReview, ans.selectedAnswer);
        const isCurrent = i === state.currentIndex;
        return `<button
      class="palette-btn ${palState}${isCurrent ? ' current' : ''}"
      onclick="jumpToQuestion(${i})"
      title="Q${q.questionNumber}: ${ans.status.replace(/-/g, ' ')}"
      aria-label="Question ${q.questionNumber}"
      aria-pressed="${isCurrent}">${q.questionNumber}</button>`;
    }).join('');

    updateSummary();
}

function getPaletteClass(status, markedForReview, selectedAnswer) {
    if (status === 'not-visited') return 'p-not-visited';
    if (markedForReview && selectedAnswer) return 'p-answered-marked';
    if (markedForReview) return 'p-marked-no-ans';
    if (selectedAnswer) return 'p-answered';
    return 'p-not-answered';
}

function updateSummary() {
    let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    Object.values(state.answers).forEach(a => {
        const cls = getPaletteClass(a.status, a.markedForReview, a.selectedAnswer);
        if (cls === 'p-answered' || cls === 'p-answered-marked') answered++;
        else if (cls === 'p-not-answered') notAnswered++;
        else if (cls === 'p-marked-no-ans') marked++;
        else notVisited++;
    });
    document.getElementById('sumAnswered').textContent = answered;
    document.getElementById('sumNotAnswered').textContent = notAnswered;
    document.getElementById('sumMarked').textContent = marked;
    document.getElementById('sumNotVisited').textContent = notVisited;
}

// ─── NAVIGATE QUESTIONS ───────────────────────────────────────────────────────
function goToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;

    // Save current question's per-Q time
    if (qTimerInterval) {
        clearInterval(qTimerInterval);
        qTimerInterval = null;
        const currQ = state.questions[state.currentIndex];
        if (currQ && state.answers[currQ.id]) {
            state.answers[currQ.id].timeSpent += state.qTimerSeconds;
        }
    }

    state.currentIndex = index;
    const q = state.questions[index];
    const ans = state.answers[q.id] || {};

    // Mark as visited (not-answered) if first time
    if (ans.status === 'not-visited') {
        state.answers[q.id].status = 'not-answered';
    }

    // Reset per-question timer
    state.qTimerSeconds = 0;
    startQTimer();

    // Render question
    document.getElementById('questionBadge').textContent = `Question ${q.questionNumber} of ${state.questions.length}`;
    document.getElementById('questionText').textContent = q.questionText;
    document.getElementById('topicBadge').textContent = q.topic;

    const diffEl = document.getElementById('diffBadge');
    diffEl.textContent = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
    diffEl.className = `diff-badge diff-${q.difficulty}`;

    renderOptions(q, state.answers[q.id]);
    renderPalette();
    checkAttemptLimit();

    // Scroll to top
    document.getElementById('questionContent').scrollTop = 0;
}

function renderOptions(q, ans) {
    const selected = ans?.selectedAnswer;
    const list = document.getElementById('optionsList');
    list.innerHTML = Object.entries(q.options).map(([key, text]) => `
    <div class="option-item${selected === key ? ' selected' : ''}"
      onclick="selectOption('${q.id}', '${key}')"
      tabindex="0"
      role="radio"
      aria-checked="${selected === key}"
      aria-label="Option ${key}: ${text}"
      onkeydown="if(event.key==='Enter'||event.key===' '){selectOption('${q.id}','${key}')}">
      <div class="option-radio"></div>
      <span class="option-label">${key}</span>
      <span class="option-text">${text}</span>
    </div>`).join('');
}

// ─── SELECT OPTION ─────────────────────────────────────────────────────────────
function selectOption(qId, optionKey) {
    const ans = state.answers[qId];
    if (!ans) return;

    // Check attempt limit
    const attemptLimit = state.test.attemptLimit;
    const answeredCount = Object.values(state.answers).filter(a => a.selectedAnswer).length;
    if (!ans.selectedAnswer && answeredCount >= attemptLimit) {
        showToast(`⚠️ Attempt limit reached! You can attempt only ${attemptLimit} questions. Deselect one first.`, 'warning', 4000);
        return;
    }

    // Toggle deselect
    if (ans.selectedAnswer === optionKey) {
        ans.selectedAnswer = null;
    } else {
        ans.selectedAnswer = optionKey;
    }

    // Re-render options
    renderOptions(state.questions[state.currentIndex], ans);
    checkAttemptLimit();
}

// ─── CHECK ATTEMPT LIMIT ──────────────────────────────────────────────────────
function checkAttemptLimit() {
    const answeredCount = Object.values(state.answers).filter(a => a.selectedAnswer).length;
    const limitReached = answeredCount >= state.test.attemptLimit;
    const currentHasAnswer = !!state.answers[state.questions[state.currentIndex].id]?.selectedAnswer;
    const warning = document.getElementById('attemptWarning');
    if (limitReached && !currentHasAnswer) {
        warning.classList.add('show');
    } else {
        warning.classList.remove('show');
    }
}

// ─── ACTION BUTTONS ───────────────────────────────────────────────────────────
function saveAndNext() {
    const q = state.questions[state.currentIndex];
    const ans = state.answers[q.id];

    if (ans.selectedAnswer) {
        ans.status = 'saved';
        ans.savedAt = nowISO();
    } else {
        ans.status = 'not-answered';
    }
    // Clear marked flag when saving directly
    // (only markForReview sets markedForReview)
    saveSession();
    navigateQuestion(1);
}

function markForReview() {
    const q = state.questions[state.currentIndex];
    const ans = state.answers[q.id];
    ans.markedForReview = true;
    if (ans.selectedAnswer) {
        ans.status = 'saved';
    } else {
        ans.status = 'not-answered';
    }
    saveSession();
    navigateQuestion(1);
}

function clearResponse() {
    const q = state.questions[state.currentIndex];
    const ans = state.answers[q.id];
    ans.selectedAnswer = null;
    ans.markedForReview = false;
    if (ans.status !== 'not-visited') ans.status = 'not-answered';
    renderOptions(q, ans);
    renderPalette();
    checkAttemptLimit();
}

function navigateQuestion(delta) {
    const next = state.currentIndex + delta;
    if (next >= 0 && next < state.questions.length) {
        goToQuestion(next);
    } else if (next >= state.questions.length) {
        showToast('You are on the last question.', 'info');
    } else {
        showToast('You are on the first question.', 'info');
    }
}

function jumpToQuestion(index) {
    // Jump does NOT save current answer
    goToQuestion(index);
}

// ─── FONT SIZE ────────────────────────────────────────────────────────────────
function setFontSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
    Store.set('fontSize', size);
}

// ─── GLOBAL TIMER ─────────────────────────────────────────────────────────────
function startGlobalTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();

        // 10-minute warning
        if (state.timeRemaining === 600 && !state.beepPlayed10) {
            state.beepPlayed10 = true;
            playBeep(440, 0.3);
            showToast('⏱ 10 minutes remaining!', 'warning');
        }
        // 5-minute warning
        if (state.timeRemaining === 300) {
            document.getElementById('timerBox').classList.add('warning');
            showToast('🚨 Only 5 minutes left! Speed up!', 'error');
            playBeep(880, 0.5);
        }
        // 1-minute warning
        if (state.timeRemaining === 60) {
            showToast('⚠️ 1 minute remaining! Auto-submit soon.', 'error');
            playBeep(1100, 0.7);
        }
        // Auto-submit
        if (state.timeRemaining <= 0) {
            clearInterval(timerInterval);
            showToast('⏰ Time is up! Submitting your exam...', 'error', 3000);
            setTimeout(finalSubmit, 1500);
        }

        // Save every 30s (also handled by autoSaveInterval, but sync timer)
        if (state.timeRemaining % 30 === 0) saveSession();
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById('timerValue').textContent = formatTime(state.timeRemaining);
}

function playBeep(freq, volume) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        gain.gain.value = volume;
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    } catch { }
}

// ─── PER-QUESTION TIMER ───────────────────────────────────────────────────────
function startQTimer() {
    state.qTimerSeconds = 0;
    if (qTimerInterval) clearInterval(qTimerInterval);
    qTimerInterval = setInterval(() => {
        state.qTimerSeconds++;
        const el = document.getElementById('qTimer');
        if (el) el.textContent = '⏱ ' + formatTime(state.qTimerSeconds).slice(3); // MM:SS
    }, 1000);
}

// ─── SUBMIT ───────────────────────────────────────────────────────────────────
function confirmSubmit() {
    // Calculate current summary
    let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
    Object.values(state.answers).forEach(a => {
        const cls = getPaletteClass(a.status, a.markedForReview, a.selectedAnswer);
        if (cls === 'p-answered' || cls === 'p-answered-marked') answered++;
        else if (cls === 'p-not-answered') notAnswered++;
        else if (cls === 'p-marked-no-ans') marked++;
        else notVisited++;
    });
    document.getElementById('modalAnswered').textContent = answered;
    document.getElementById('modalNotAnswered').textContent = notAnswered;
    document.getElementById('modalMarked').textContent = marked;
    document.getElementById('modalNotVisited').textContent = notVisited;
    document.getElementById('submitModal').classList.add('active');
}

function closeSubmitModal() {
    document.getElementById('submitModal').classList.remove('active');
}

function finalSubmit() {
    if (state.submitted) return;
    state.submitted = true;
    closeSubmitModal();

    // Stop timers
    clearInterval(timerInterval);
    clearInterval(qTimerInterval);
    clearInterval(autoSaveInterval);

    // Save final Q time
    const currentQ = state.questions[state.currentIndex];
    if (currentQ) {
        state.answers[currentQ.id].timeSpent += state.qTimerSeconds;
    }

    // Calculate score
    const scoreData = calculateScore(state.questions, state.answers);
    const percentile = calculatePercentile(scoreData.netScore, state.testId);

    // Store result
    const result = {
        sessionId: state.sessionId,
        testId: state.testId,
        userId: state.user.rollNumber,
        userName: state.user.name,
        testTitle: state.test.title,
        attemptNumber: state.attemptNumber,
        startedAt: state.startedAt,
        calculatedAt: nowISO(),
        ...scoreData,
        percentile,
        timeRemaining: state.timeRemaining,
        answers: state.answers,
        questions: state.questions,
    };

    // Save to allScores
    const allScores = Store.get('allScores', []);
    allScores.push(result);
    Store.set('allScores', allScores);

    // Save result for result page
    Store.set('lastResult', result);

    // Clear active session
    Store.remove(`session_${state.user.rollNumber}_${state.testId}`);

    // Redirect
    window.location.href = 'result.html';
}

// ─── SESSION PERSISTENCE ─────────────────────────────────────────────────────
function saveSession() {
    if (state.submitted) return;
    Store.set(`session_${state.user.rollNumber}_${state.testId}`, {
        ...state,
        // Don't serialize heavy data redundantly
        qTimerSeconds: state.qTimerSeconds,
    });
}

// ─── FONT SIZE RESTORE ────────────────────────────────────────────────────────
const savedFontSize = Store.get('fontSize', 'medium');
document.body.classList.add(`font-${savedFontSize}`);
async function fetchLiveQuestions(testId) {
    if (!window.firebaseDB) return null;
    console.log(`☁️ Fetching live questions for ${testId}...`);
    try {
        const snap = await window.firebaseDB.collection('test_content')
            .where('testId', '==', testId)
            .get();
        if (snap.empty) return null;

        return snap.docs.map(doc => doc.data()).sort((a, b) => a.questionNumber - b.questionNumber);
    } catch (err) {
        console.error('❌ Cloud fetch failed:', err);
        return null;
    }
}
