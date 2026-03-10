/**
 * CUET TEST — Shared Utilities
 * localStorage helpers, formatting, PDF export hooks
 */

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const Store = {
    get(key, def = null) {
        try {
            const v = localStorage.getItem(key);
            return v ? JSON.parse(v) : def;
        } catch { return def; }
    },
    set(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch { }
    },
    remove(key) { localStorage.removeItem(key); },
    clear() { localStorage.clear(); }
};

// ─── DATE / TIME HELPERS ─────────────────────────────────────────────────────
function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

function formatDate(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTimeIN(isoStr) {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function nowISO() { return new Date().toISOString(); }

// ─── SCORING ENGINE ──────────────────────────────────────────────────────────
function calculateScore(questions, answers) {
    let correct = 0, incorrect = 0, unattempted = 0;
    questions.forEach(q => {
        const ans = answers[q.id];
        if (!ans || !ans.selectedAnswer) {
            unattempted++;
        } else if (ans.selectedAnswer === q.correctAnswer) {
            correct++;
        } else {
            incorrect++;
        }
    });
    const rawScore = correct * 5;
    const negativeMarks = incorrect * 1;
    const netScore = rawScore - negativeMarks;
    const attempted = correct + incorrect;
    return { correct, incorrect, unattempted, attempted, rawScore, negativeMarks, netScore };
}

// ─── PERCENTILE (vs all stored scores for same test) ────────────────────────
function calculatePercentile(netScore, testId) {
    const allScores = Store.get('allScores', []);
    const relevant = allScores.filter(s => s.testId === testId).map(s => s.netScore);
    if (!relevant.length) return 100;
    const below = relevant.filter(s => s < netScore).length;
    return Math.round((below / relevant.length) * 100 * 10) / 10;
}

// ─── PALETTE STATE LOGIC ─────────────────────────────────────────────────────
const PALETTE = {
    NOT_VISITED: 'not-visited',
    NOT_ANSWERED: 'not-answered',
    ANSWERED: 'answered',
    MARKED_NO_ANS: 'marked-no-ans',
    ANSWERED_MARKED: 'answered-marked',
};

function getPaletteState(status, markedForReview, selectedAnswer) {
    if (status === 'not-visited') return PALETTE.NOT_VISITED;
    if (markedForReview && selectedAnswer) return PALETTE.ANSWERED_MARKED;
    if (markedForReview && !selectedAnswer) return PALETTE.MARKED_NO_ANS;
    if (selectedAnswer) return PALETTE.ANSWERED;
    return PALETTE.NOT_ANSWERED;
}

function getPaletteColor(state) {
    switch (state) {
        case PALETTE.NOT_VISITED: return '#9E9E9E';
        case PALETTE.NOT_ANSWERED: return '#F44336';
        case PALETTE.ANSWERED: return '#4CAF50';
        case PALETTE.MARKED_NO_ANS: return '#7B1FA2';
        case PALETTE.ANSWERED_MARKED: return '#7B1FA2';
        default: return '#9E9E9E';
    }
}

// ─── DEMO USERS ──────────────────────────────────────────────────────────────
const DEMO_USERS = [
    {
        rollNumber: 'CUET2025001',
        name: 'Rahul Sharma',
        dob: '01/01/2000',
        password: 'test123',
        email: 'rahul@example.com',
        phone: '9876543210',
        photoUrl: null
    },
    {
        rollNumber: 'CUET2025002',
        name: 'Priya Singh',
        dob: '15/08/2001',
        password: 'cuet2025',
        email: 'priya@example.com',
        phone: '9123456789',
        photoUrl: null
    },
    {
        rollNumber: 'ADMIN001',
        name: 'Admin User',
        dob: '01/01/1990',
        password: 'admin@cuet',
        email: 'admin@cuet.in',
        phone: '9556436685',
        photoUrl: null,
        isAdmin: true
    }
];

function getUserByRoll(rollNumber) {
    return DEMO_USERS.find(u => u.rollNumber === rollNumber) || null;
}

// ─── SESSION HELPERS ─────────────────────────────────────────────────────────
function getCurrentUser() { return Store.get('currentUser', null); }
function setCurrentUser(user) { Store.set('currentUser', user); }
function logout() {
    Store.remove('currentUser');
    window.location.href = 'index.html';
}
function requireAuth() {
    const user = getCurrentUser();
    if (!user) { window.location.href = 'index.html'; return null; }

    // Phase 8: Check for account suspension in Firebase (Optimized for Free Tier)
    const lastCheck = sessionStorage.getItem(`suspend_check_${user.rollNumber}`);
    const now = Date.now();

    // Only check Firestore every 15 minutes to save on Reads
    if (window.firebaseDB && user.rollNumber && (!lastCheck || (now - lastCheck > 15 * 60 * 1000))) {
        window.firebaseDB.collection('users').doc(user.rollNumber).get().then(doc => {
            sessionStorage.setItem(`suspend_check_${user.rollNumber}`, now);
            if (doc.exists && doc.data().isSuspended) {
                alert('🚫 Your account has been suspended due to policy violations. Please contact support.');
                logout();
            }
        });
    }

    return user;
}

// ─── USER ACTIVITY MONITORING ────────────────────────────────────────────────
async function logUserActivity(event = 'LOGIN') {
    const user = getCurrentUser();
    if (!user) return;

    // Optimization: Don't log normal NAVIGATION events to save on Writes
    if (event === 'PAGE_VIEW' && Math.random() > 0.1) return; // Only log 10% of page views

    try {
        const lastLog = sessionStorage.getItem(`last_log_${event}`);
        const now = Date.now();
        // Don't log the same event twice in a minute
        if (lastLog && (now - lastLog < 60000)) return;

        // Fetch IP/Location info
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();

        const activity = {
            rollNumber: user.rollNumber,
            name: user.name,
            timestamp: nowISO(),
            event: event,
            ip: geoData.ip,
            city: geoData.city,
            region: geoData.region,
            country: geoData.country_name,
            device: navigator.userAgent,
            url: window.location.href
        };

        // Phase 8: Push to Firestore
        if (window.firebaseDB) {
            await window.firebaseDB.collection('logs').add(activity);
            sessionStorage.setItem(`last_log_${event}`, now);

            // Also update lastLogin in user record (only if it's a login event)
            if (event === 'LOGIN') {
                await window.firebaseDB.collection('users').doc(user.rollNumber).set({
                    name: user.name,
                    lastLogin: nowISO(),
                    lastIp: geoData.ip,
                    lastCity: geoData.city
                }, { merge: true });
            }
        }
    } catch (err) {
        console.error('❌ Failed to log user activity:', err);
    }
}

// ─── WHATSAPP LINKS ──────────────────────────────────────────────────────────
const WA_NUMBER = '919556436685';
function waLink(text) {
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
const waLinks = {
    support: () => waLink('Hi, I need help with the CUET TEST Portal'),
    forgotPassword: (roll) => waLink(`Hi, I forgot my password. My Roll Number is ${roll}`),
    unlockSingle: (testName) => waLink(`Hi, I want to unlock the single test: ${testName} @ ₹49`),
    unlockSubject: (subject) => waLink(`Hi, I want to unlock the ${subject} Subject Pack @ ₹149`),
    fullSeries: () => waLink('Hi, I want to unlock the Full Series Pass @ ₹399'),
    weeklyPass: () => waLink('Hi, I want to unlock the Weekly Pass @ ₹99/week'),
    noCode: () => waLink('I did not receive my unlock code'),
    result: () => waLink('I have a question about my mock test result'),
    expiredCode: () => waLink('My unlock code expired. Please send a new one.'),
};

// ─── UNLOCK CODE HELPERS ─────────────────────────────────────────────────────
function generateUnlockCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const part = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `CUET-${part(4)}-${part(4)}`;
}

function isValidCodeFormat(code) {
    return /^CUET-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(code.trim().toUpperCase());
}

function validateUnlockCode(code, rollNumber, testId) {
    const codes = Store.get('unlockCodes', []);
    const c = codes.find(x => x.code === code.trim().toUpperCase());
    if (!c) return { ok: false, msg: 'Invalid code format. Please check and try again.' };
    if (c.status === 'used') return { ok: false, msg: 'This code has already been used.' };
    if (new Date() > new Date(c.expiresAt)) return { ok: false, msg: 'This code has expired. Please contact us on WhatsApp for a new code.', expired: true };
    if (c.issuedTo && c.issuedTo !== rollNumber) return { ok: false, msg: 'This code was issued for a different account.' };
    if (c.testId !== testId) return { ok: false, msg: 'This code is not valid for this test.' };
    // Redeem
    c.status = 'used';
    c.redeemedAt = nowISO();
    c.redeemedBy = rollNumber;
    Store.set('unlockCodes', codes);
    // Store unlocked test for user
    const unlocked = Store.get(`unlocked_${rollNumber}`, []);
    if (!unlocked.includes(testId)) unlocked.push(testId);
    Store.set(`unlocked_${rollNumber}`, unlocked);
    return { ok: true, msg: 'Test unlocked successfully! You can now access this test.' };
}

function isTestUnlocked(rollNumber, testId) {
    const test = TEST_LIST.find(t => t.id === testId);
    if (!test) return false;
    if (test.isFree) return true;

    // Check for "Full Access" or "Subject Access" or "Single Access"
    const unlocked = Store.get(`unlocked_${rollNumber}`, []);
    if (unlocked.includes('FULL_SERIES') || unlocked.includes('WEEKLY_PASS')) return true;

    // If it's a specific test ID
    if (unlocked.includes(testId)) return true;

    // Check for Subject Pack
    if (unlocked.includes(`SUBJECT_${test.subject.toUpperCase()}`)) return true;

    return false;
}

function isPaidUser(rollNumber) {
    if (!rollNumber) return false;

    // Phase 8: In production, we'd check Firestore here
    // For now, we fallback to Store (local) + Firestore if available
    const unlocked = Store.get(`unlocked_${rollNumber}`, []);
    if (unlocked.length > 0) return true;

    return false;
}

// ─── NUMBER FORMATTING ───────────────────────────────────────────────────────
function initials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ─── AVATAR SVG (when no photo) ──────────────────────────────────────────────
function avatarSVG(name, size = 40) {
    const text = initials(name);
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="border-radius:50%;border:2px solid rgba(255,255,255,0.4)">
    <rect width="${size}" height="${size}" rx="${size / 2}" fill="#1a4ba0"/>
    <text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="white" font-family="Lato,sans-serif" font-weight="700" font-size="${size * 0.38}px">${text}</text>
  </svg>`;
}

// ─── SHOW TOAST ──────────────────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        Object.assign(container.style, {
            position: 'fixed', top: '20px', right: '20px', zIndex: '99999',
            display: 'flex', flexDirection: 'column', gap: '8px'
        });
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const colors = { info: '#1565C0', success: '#2E7D32', warning: '#E65100', error: '#C62828' };
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    Object.assign(toast.style, {
        background: '#fff',
        borderLeft: `4px solid ${colors[type] || colors.info}`,
        padding: '12px 16px',
        borderRadius: '4px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: '13px',
        fontWeight: '500',
        maxWidth: '340px',
        color: '#212121',
        animation: 'slideUp 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    });
    toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, duration);
}

const TEST_LIST = [
    { id: 'MOCK001', title: 'Mock Test 1 — General Test', subject: 'General Test', section: 'Section III', totalQuestions: 50, attemptLimit: 40, durationMinutes: 60, isFree: true, price: 0, isPublished: true },
    { id: 'MOCK002', title: 'Mock Test 2 — General Test', subject: 'General Test', section: 'Section III', totalQuestions: 50, attemptLimit: 40, durationMinutes: 60, isFree: false, price: 199, isPublished: true },
    { id: 'MOCK003', title: 'Mock Test 3 — Physics', subject: 'Physics', section: 'Section II', totalQuestions: 50, attemptLimit: 40, durationMinutes: 45, isFree: false, price: 199, isPublished: true },
    { id: 'MOCK004', title: 'Mock Test 4 — History', subject: 'History', section: 'Section II', totalQuestions: 50, attemptLimit: 40, durationMinutes: 45, isFree: false, price: 199, isPublished: true },
];

// ─── GEMINI AI INTEGRATION ──────────────────────────────────────────────────
const GEMINI_API_KEY = 'AIzaSyBQpmqC9EYgk7lMHt8wpSL8GEX6dz6syZo';

async function fetchAIAnalysis(resultData) {
    const { userName, testTitle, correct, incorrect, unattempted, netScore, questions, answers } = resultData;

    // Create a concise summary for the AI
    const topicStats = {};
    questions.forEach(q => {
        if (!topicStats[q.topic]) topicStats[q.topic] = { total: 0, correct: 0 };
        topicStats[q.topic].total++;
        if (answers[q.id]?.selectedAnswer === q.correctAnswer) topicStats[q.topic].correct++;
    });

    const prompt = `You are an elite CUET entrance exam coach. Analyze this mock test result for ${userName}:
Test: ${testTitle}
Score: ${netScore}
Correct: ${correct}, Incorrect: ${incorrect}, Skipped: ${unattempted}
Topic-wise Performance: ${JSON.stringify(topicStats)}

Provide:
1. A 2-sentence tactical summary of the attempt.
2. Three specific "Score-Booster" patterns (e.g., "Accuracy is high but speed is low in Physics").
3. A personalized 15-day roadmap (Day 1-5, Day 6-10, Day 11-15).
4. A "Predicted Rank" logic based on this score.

Format the output in clean HTML (using <div>, <strong>, and <ul> tags only). Keep it professional, motivating, and strictly exam-focused.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `API Error ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error('Empty response from AI engine');

        return text;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return `<div class="alert-banner alert-error">
            ⚠️ <b>AI Analysis Unavailable</b><br>
            ${error.message}. Please check your internet connection or try again later.
        </div>`;
    }
}
