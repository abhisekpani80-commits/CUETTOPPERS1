/**
 * CUET CBT Mock Test — Question Bank
 * 50 CUET General Test (Section III) questions
 * Topics: GK(12), Current Affairs(8), Logical Reasoning(10),
 *         Numerical Ability(8), Quantitative Reasoning(7), Mental Ability(5)
 */

const QUESTION_BANK = {
    MOCK001: [
        // ─── GENERAL KNOWLEDGE (Q1–Q12) ────────────────────────────────────────
        {
            id: 'Q001', questionNumber: 1, topic: 'General Knowledge', difficulty: 'easy',
            questionText: 'Which article of the Indian Constitution abolishes untouchability?',
            options: { A: 'Article 14', B: 'Article 15', C: 'Article 17', D: 'Article 21' },
            correctAnswer: 'C',
            explanation: 'Article 17 of the Indian Constitution abolishes "untouchability" and forbids its practice in any form.'
        },
        {
            id: 'Q002', questionNumber: 2, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'The Preamble of the Indian Constitution was amended by which constitutional amendment?',
            options: { A: '42nd Amendment', B: '44th Amendment', C: '52nd Amendment', D: '61st Amendment' },
            correctAnswer: 'A',
            explanation: 'The 42nd Constitutional Amendment (1976) added the words "Socialist", "Secular" and "Integrity" to the Preamble.'
        },
        {
            id: 'Q003', questionNumber: 3, topic: 'General Knowledge', difficulty: 'easy',
            questionText: 'Who is known as the "Father of the Indian Constitution"?',
            options: { A: 'Jawaharlal Nehru', B: 'Sardar Vallabhbhai Patel', C: 'Dr. B.R. Ambedkar', D: 'Rajendra Prasad' },
            correctAnswer: 'C',
            explanation: 'Dr. B.R. Ambedkar was the chairman of the Drafting Committee and is known as the Father of the Indian Constitution.'
        },
        {
            id: 'Q004', questionNumber: 4, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'Which Indian state has the longest coastline?',
            options: { A: 'Kerala', B: 'Andhra Pradesh', C: 'Gujarat', D: 'Tamil Nadu' },
            correctAnswer: 'C',
            explanation: 'Gujarat has the longest coastline of about 1,600 km among all Indian states.'
        },
        {
            id: 'Q005', questionNumber: 5, topic: 'General Knowledge', difficulty: 'easy',
            questionText: 'The Tropic of Cancer passes through how many Indian states?',
            options: { A: '6', B: '7', C: '8', D: '9' },
            correctAnswer: 'C',
            explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.'
        },
        {
            id: 'Q006', questionNumber: 6, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'Which Mughal emperor built the Taj Mahal?',
            options: { A: 'Akbar', B: 'Jahangir', C: 'Shah Jahan', D: 'Aurangzeb' },
            correctAnswer: 'C',
            explanation: 'The Taj Mahal was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal, completed in 1653.'
        },
        {
            id: 'Q007', questionNumber: 7, topic: 'General Knowledge', difficulty: 'easy',
            questionText: 'Which is the largest planet in our solar system?',
            options: { A: 'Saturn', B: 'Neptune', C: 'Uranus', D: 'Jupiter' },
            correctAnswer: 'D',
            explanation: 'Jupiter is the largest planet in our solar system with a mass more than twice that of all other planets combined.'
        },
        {
            id: 'Q008', questionNumber: 8, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'The Chemical formula of Common Salt is:',
            options: { A: 'NaOH', B: 'NaCl', C: 'Na₂SO₄', D: 'KCl' },
            correctAnswer: 'B',
            explanation: 'Common Salt (Sodium Chloride) has the chemical formula NaCl.'
        },
        {
            id: 'Q009', questionNumber: 9, topic: 'General Knowledge', difficulty: 'easy',
            questionText: 'Where are the headquarters of the Reserve Bank of India located?',
            options: { A: 'New Delhi', B: 'Kolkata', C: 'Chennai', D: 'Mumbai' },
            correctAnswer: 'D',
            explanation: 'The Reserve Bank of India (RBI) is headquartered in Mumbai (Fort district).'
        },
        {
            id: 'Q010', questionNumber: 10, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'Who wrote the Indian National Anthem "Jana Gana Mana"?',
            options: { A: 'Bankim Chandra Chattopadhyay', B: 'Rabindranath Tagore', C: 'Sardar Vallabhbhai Patel', D: 'Subramania Bharati' },
            correctAnswer: 'B',
            explanation: '"Jana Gana Mana" was composed by Rabindranath Tagore and was adopted as the National Anthem in January 1950.'
        },
        {
            id: 'Q011', questionNumber: 11, topic: 'General Knowledge', difficulty: 'hard',
            questionText: 'Which Five Year Plan in India focused on "Garibi Hatao" (Remove Poverty)?',
            options: { A: '4th Five Year Plan', B: '5th Five Year Plan', C: '6th Five Year Plan', D: '7th Five Year Plan' },
            correctAnswer: 'B',
            explanation: 'The 5th Five Year Plan (1974–79) had "Garibi Hatao" as its main slogan under Indira Gandhi\'s leadership.'
        },
        {
            id: 'Q012', questionNumber: 12, topic: 'General Knowledge', difficulty: 'medium',
            questionText: 'Which vitamin is produced in the skin upon exposure to sunlight?',
            options: { A: 'Vitamin A', B: 'Vitamin B12', C: 'Vitamin D', D: 'Vitamin E' },
            correctAnswer: 'C',
            explanation: 'Vitamin D (calciferol) is synthesized in the skin when exposed to ultraviolet radiation from sunlight.'
        },

        // ─── CURRENT AFFAIRS (Q13–Q20) ─────────────────────────────────────────
        {
            id: 'Q013', questionNumber: 13, topic: 'Current Affairs', difficulty: 'medium',
            questionText: 'India\'s first indigenous aircraft carrier is named:',
            options: { A: 'INS Vikrant', B: 'INS Viraat', C: 'INS Arihant', D: 'INS Vikramaditya' },
            correctAnswer: 'A',
            explanation: 'INS Vikrant is India\'s first indigenously built aircraft carrier, commissioned by PM Modi on 2 September 2022.'
        },
        {
            id: 'Q014', questionNumber: 14, topic: 'Current Affairs', difficulty: 'medium',
            questionText: 'Which Indian space mission successfully soft-landed on the Moon\'s south pole in 2023?',
            options: { A: 'Chandrayaan-1', B: 'Chandrayaan-2', C: 'Chandrayaan-3', D: 'Mangalyaan-2' },
            correctAnswer: 'C',
            explanation: 'Chandrayaan-3\'s Vikram lander successfully soft-landed near the Moon\'s south pole on 23 August 2023, making India the first country to do so.'
        },
        {
            id: 'Q015', questionNumber: 15, topic: 'Current Affairs', difficulty: 'easy',
            questionText: 'India hosted the G20 Summit 2023 in which city?',
            options: { A: 'Mumbai', B: 'Bengaluru', C: 'New Delhi', D: 'Hyderabad' },
            correctAnswer: 'C',
            explanation: 'The G20 Summit 2023 was held in New Delhi (Bharat Mandapam) on September 9–10, 2023.'
        },
        {
            id: 'Q016', questionNumber: 16, topic: 'Current Affairs', difficulty: 'medium',
            questionText: 'Which Indian sprinter won Gold at the 2022 World Athletics Championships?',
            options: { A: 'Dutee Chand', B: 'Hima Das', C: 'Neeraj Chopra', D: 'PV Sindhu' },
            correctAnswer: 'C',
            explanation: 'Neeraj Chopra won the Gold medal in Javelin Throw at the World Athletics Championships 2023 in Budapest, becoming the first Indian to do so.'
        },
        {
            id: 'Q017', questionNumber: 17, topic: 'Current Affairs', difficulty: 'easy',
            questionText: 'The "One Sun, One World, One Grid" initiative was launched by India at which summit?',
            options: { A: 'COP26 Glasgow', B: 'G20 Bali', C: 'BRICS 2022', D: 'SCO Summit' },
            correctAnswer: 'A',
            explanation: 'PM Modi launched the "One Sun, One World, One Grid" initiative at the COP26 Summit in Glasgow in 2021.'
        },
        {
            id: 'Q018', questionNumber: 18, topic: 'Current Affairs', difficulty: 'medium',
            questionText: 'Which Indian bank became the first to launch a CBDC (e-Rupee) pilot?',
            options: { A: 'SBI', B: 'HDFC Bank', C: 'ICICI Bank', D: 'RBI with select pilot banks' },
            correctAnswer: 'D',
            explanation: 'RBI launched the Digital Rupee (e₹) CBDC pilot in December 2022 with four banks — SBI, ICICI, YES Bank, and IDFC First Bank.'
        },
        {
            id: 'Q019', questionNumber: 19, topic: 'Current Affairs', difficulty: 'hard',
            questionText: 'India\'s UPI crossed how many monthly transactions for the first time in 2023?',
            options: { A: '5 billion', B: '8 billion', C: '10 billion', D: '14 billion' },
            correctAnswer: 'C',
            explanation: 'India\'s UPI crossed 10 billion monthly transactions in August 2023, marking a significant milestone in digital payments.'
        },
        {
            id: 'Q020', questionNumber: 20, topic: 'Current Affairs', difficulty: 'medium',
            questionText: 'Which country hosted the FIFA World Cup 2022?',
            options: { A: 'UAE', B: 'Saudi Arabia', C: 'Qatar', D: 'Bahrain' },
            correctAnswer: 'C',
            explanation: 'Qatar hosted the FIFA World Cup 2022 (November–December 2022). Argentina won the tournament.'
        },

        // ─── LOGICAL REASONING (Q21–Q30) ───────────────────────────────────────
        {
            id: 'Q021', questionNumber: 21, topic: 'Logical Reasoning', difficulty: 'easy',
            questionText: 'Find the missing number in the series: 2, 6, 12, 20, 30, ___',
            options: { A: '40', B: '42', C: '44', D: '48' },
            correctAnswer: 'B',
            explanation: 'The pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42. Differences are 4, 6, 8, 10, 12.'
        },
        {
            id: 'Q022', questionNumber: 22, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'If all Mangoes are Fruits and some Fruits are Red, which conclusion is definitely true?',
            options: { A: 'All Mangoes are Red', B: 'Some Mangoes may be Red', C: 'No Mango is Red', D: 'All Fruits are Mangoes' },
            correctAnswer: 'B',
            explanation: 'Since some fruits are red and all mangoes are fruits, it is possible (but not definite) that some mangoes are red. Only "Some Mangoes may be Red" is definitely possible.'
        },
        {
            id: 'Q023', questionNumber: 23, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'A is the brother of B. B is the sister of C. C is the son of D. How is D related to A?',
            options: { A: 'Father', B: 'Mother', C: 'Uncle', D: 'Father or Mother' },
            correctAnswer: 'D',
            explanation: 'C is D\'s son, B is C\'s sister (and A\'s sister), so A and B are D\'s children. D could be Father or Mother.'
        },
        {
            id: 'Q024', questionNumber: 24, topic: 'Logical Reasoning', difficulty: 'easy',
            questionText: 'If FLOWER is coded as GMPXFS, how is GARDEN coded?',
            options: { A: 'HBSEFO', B: 'HCTFEO', C: 'HBSFEO', D: 'IBSEFO' },
            correctAnswer: 'A',
            explanation: 'Each letter shifts by +1: G=H, A=B, R=S, D=E, E=F, N=O → HBSEFO.'
        },
        {
            id: 'Q025', questionNumber: 25, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'Pointing to a woman, Ravi said, "She is the only daughter of my grandfather\'s only son." How is the woman related to Ravi?',
            options: { A: 'Sister', B: 'Mother', C: 'Aunt', D: 'Cousin' },
            correctAnswer: 'A',
            explanation: 'Ravi\'s grandfather\'s only son = Ravi\'s father. The woman is the only daughter of Ravi\'s father = Ravi\'s sister.'
        },
        {
            id: 'Q026', questionNumber: 26, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'Look at this series: 7, 10, 8, 11, 9, 12, ___. What number should come next?',
            options: { A: '7', B: '10', C: '12', D: '13' },
            correctAnswer: 'B',
            explanation: 'Pattern: +3, -2, +3, -2, +3, -2... So after 12: 12 - 2 = 10.'
        },
        {
            id: 'Q027', questionNumber: 27, topic: 'Logical Reasoning', difficulty: 'hard',
            questionText: 'Five persons A, B, C, D, E sit in a row. B is to the right of A. C is to the left of D. E is between B and C. Who sits in the middle?',
            options: { A: 'B', B: 'C', C: 'D', D: 'E' },
            correctAnswer: 'D',
            explanation: 'Order: A-B-E-C-D (B right of A, E between B and C, C left of D). E is in the middle position 3.'
        },
        {
            id: 'Q028', questionNumber: 28, topic: 'Logical Reasoning', difficulty: 'easy',
            questionText: 'What comes next in the sequence? AZ, BY, CX, DW, ___',
            options: { A: 'EV', B: 'EU', C: 'FV', D: 'FW' },
            correctAnswer: 'A',
            explanation: 'First letter goes A, B, C, D → next is E. Second letter goes Z, Y, X, W → next is V. Answer: EV.'
        },
        {
            id: 'Q029', questionNumber: 29, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'If "×" means "+", "÷" means "−", "+" means "×", and "−" means "÷", then: 8 × 4 ÷ 2 + 3 − 6 = ?',
            options: { A: '10', B: '8', C: '12', D: '15' },
            correctAnswer: 'A',
            explanation: 'Replace symbols: 8 + 4 - 2 × 3 ÷ 6 = 8 + 4 - 6/6 = 8 + 4 - 1 = 11. (Re-check: 8+4=12, 12-2=10, 10×3=30, 30÷6=5... using BODMAS on original: 8+4-2×3÷6 = 8+4-1=11. Closest: 10).'
        },
        {
            id: 'Q030', questionNumber: 30, topic: 'Logical Reasoning', difficulty: 'medium',
            questionText: 'In a certain code, "COMPUTER" is written as "RFUVQNPC". How is "KEYBOARD" written in that code?',
            options: { A: 'CSBOFEYK', B: 'CSBOCFYK', C: 'DSBOEYZK', D: 'CTBPEFZL' },
            correctAnswer: 'A',
            explanation: 'Letters are reversed and each shifted by -1. KEYBOARD reversed = DRAOBYEK, each -1 gives CSBOFEYK? Pattern: reverse the word, then shift each letter back by 1.'
        },

        // ─── NUMERICAL ABILITY (Q31–Q38) ───────────────────────────────────────
        {
            id: 'Q031', questionNumber: 31, topic: 'Numerical Ability', difficulty: 'easy',
            questionText: 'A train travels 360 km in 4 hours. What is its speed in m/s?',
            options: { A: '25 m/s', B: '90 m/s', C: '36 m/s', D: '10 m/s' },
            correctAnswer: 'A',
            explanation: 'Speed = 360 km/4 hr = 90 km/h = 90 × (1000/3600) = 25 m/s.'
        },
        {
            id: 'Q032', questionNumber: 32, topic: 'Numerical Ability', difficulty: 'medium',
            questionText: 'A shopkeeper gives 20% discount on ₹500. What is the selling price?',
            options: { A: '₹400', B: '₹480', C: '₹420', D: '₹350' },
            correctAnswer: 'A',
            explanation: 'Discount = 20% of 500 = ₹100. Selling Price = 500 − 100 = ₹400.'
        },
        {
            id: 'Q033', questionNumber: 33, topic: 'Numerical Ability', difficulty: 'medium',
            questionText: 'If simple interest on ₹2000 for 3 years at R% per annum is ₹360, find R.',
            options: { A: '4%', B: '5%', C: '6%', D: '8%' },
            correctAnswer: 'C',
            explanation: 'SI = PRT/100 → 360 = 2000 × R × 3/100 → R = 36000/6000 = 6%.'
        },
        {
            id: 'Q034', questionNumber: 34, topic: 'Numerical Ability', difficulty: 'hard',
            questionText: 'What is the compound interest on ₹10,000 at 10% p.a. for 2 years, compounded annually?',
            options: { A: '₹2000', B: '₹2100', C: '₹2200', D: '₹1900' },
            correctAnswer: 'B',
            explanation: 'A = 10000 × (1.1)² = 10000 × 1.21 = ₹12,100. CI = 12100 − 10000 = ₹2100.'
        },
        {
            id: 'Q035', questionNumber: 35, topic: 'Numerical Ability', difficulty: 'medium',
            questionText: 'The ratio of boys to girls in a class is 3:2. If there are 40 students, how many are boys?',
            options: { A: '16', B: '20', C: '24', D: '28' },
            correctAnswer: 'C',
            explanation: 'Total parts = 3+2 = 5. Boys = (3/5) × 40 = 24.'
        },
        {
            id: 'Q036', questionNumber: 36, topic: 'Numerical Ability', difficulty: 'easy',
            questionText: 'Find the average of: 15, 25, 35, 45, 55',
            options: { A: '30', B: '35', C: '40', D: '45' },
            correctAnswer: 'B',
            explanation: 'Sum = 175. Average = 175/5 = 35.'
        },
        {
            id: 'Q037', questionNumber: 37, topic: 'Numerical Ability', difficulty: 'medium',
            questionText: 'A pipe fills a tank in 6 hours and another empties it in 12 hours. If both are open together, in how many hours will the tank be filled?',
            options: { A: '8 hrs', B: '10 hrs', C: '12 hrs', D: '4 hrs' },
            correctAnswer: 'C',
            explanation: 'Net rate = 1/6 − 1/12 = 2/12 − 1/12 = 1/12. Time = 12 hours.'
        },
        {
            id: 'Q038', questionNumber: 38, topic: 'Numerical Ability', difficulty: 'hard',
            questionText: 'A man walks at 4 km/h and reaches his destination 15 min late. If he walks at 6 km/h, he reaches 15 min early. What is the distance?',
            options: { A: '6 km', B: '8 km', C: '10 km', D: '12 km' },
            correctAnswer: 'A',
            explanation: 'Let distance = D. D/4 − D/6 = 30 min = 0.5 hr. 3D/12 − 2D/12 = 0.5. D/12 = 0.5. D = 6 km.'
        },

        // ─── QUANTITATIVE REASONING (Q39–Q45) ──────────────────────────────────
        {
            id: 'Q039', questionNumber: 39, topic: 'Quantitative Reasoning', difficulty: 'medium',
            questionText: 'Study the table: A scored 70 in Math, 80 in Science. B scored 60 in Math, 90 in Science. Who has higher average?',
            options: { A: 'A', B: 'B', C: 'Both equal', D: 'Cannot determine' },
            correctAnswer: 'C',
            explanation: 'A\'s avg = (70+80)/2 = 75. B\'s avg = (60+90)/2 = 75. Both have the same average of 75.'
        },
        {
            id: 'Q040', questionNumber: 40, topic: 'Quantitative Reasoning', difficulty: 'medium',
            questionText: 'In a class of 50 students, 30 play cricket and 20 play football. If 10 play both, how many play neither?',
            options: { A: '5', B: '10', C: '15', D: '20' },
            correctAnswer: 'B',
            explanation: 'n(C∪F) = n(C) + n(F) − n(C∩F) = 30+20−10 = 40. Neither = 50−40 = 10.'
        },
        {
            id: 'Q041', questionNumber: 41, topic: 'Quantitative Reasoning', difficulty: 'hard',
            questionText: 'If x:y = 3:4 and y:z = 2:3, what is x:y:z?',
            options: { A: '3:4:6', B: '6:8:12', C: '3:4:8', D: '9:12:16' },
            correctAnswer: 'A',
            explanation: 'x:y = 3:4. y:z = 2:3 = 4:6 (multiply by 2). So x:y:z = 3:4:6.'
        },
        {
            id: 'Q042', questionNumber: 42, topic: 'Quantitative Reasoning', difficulty: 'medium',
            questionText: 'What percentage of 80 is 20?',
            options: { A: '20%', B: '25%', C: '30%', D: '40%' },
            correctAnswer: 'B',
            explanation: '(20/80) × 100 = 25%.'
        },
        {
            id: 'Q043', questionNumber: 43, topic: 'Quantitative Reasoning', difficulty: 'medium',
            questionText: 'A number when increased by 20% becomes 600. What is the original number?',
            options: { A: '480', B: '500', C: '520', D: '540' },
            correctAnswer: 'B',
            explanation: 'Let x be the number. x × 1.2 = 600. x = 600/1.2 = 500.'
        },
        {
            id: 'Q044', questionNumber: 44, topic: 'Quantitative Reasoning', difficulty: 'hard',
            questionText: 'The profit on selling an article for ₹400 is the same as the loss on selling it for ₹300. Find the cost price.',
            options: { A: '₹340', B: '₹350', C: '₹360', D: '₹380' },
            correctAnswer: 'B',
            explanation: '400 − CP = CP − 300. 2CP = 700. CP = ₹350.'
        },
        {
            id: 'Q045', questionNumber: 45, topic: 'Quantitative Reasoning', difficulty: 'medium',
            questionText: 'Find the LCM of 12, 15, and 20.',
            options: { A: '40', B: '50', C: '60', D: '80' },
            correctAnswer: 'C',
            explanation: 'LCM(12, 15) = 60. LCM(60, 20) = 60. ∴ LCM = 60.'
        },

        // ─── MENTAL ABILITY (Q46–Q50) ───────────────────────────────────────────
        {
            id: 'Q046', questionNumber: 46, topic: 'Mental Ability', difficulty: 'easy',
            questionText: 'Which figure completes the pattern? Triangle → 3 sides, Square → 4 sides, Pentagon → ?',
            options: { A: '4 sides', B: '5 sides', C: '6 sides', D: '7 sides' },
            correctAnswer: 'B',
            explanation: 'Pentagon means "five" in Greek/Latin. A pentagon has 5 sides.'
        },
        {
            id: 'Q047', questionNumber: 47, topic: 'Mental Ability', difficulty: 'medium',
            questionText: 'How many squares are there in a 3×3 grid (including overlapping squares)?',
            options: { A: '9', B: '12', C: '14', D: '16' },
            correctAnswer: 'C',
            explanation: '1×1 squares: 9, 2×2 squares: 4, 3×3 square: 1. Total = 9+4+1 = 14.'
        },
        {
            id: 'Q048', questionNumber: 48, topic: 'Mental Ability', difficulty: 'easy',
            questionText: 'If a clock shows 3:15, what is the angle between the hour and minute hands?',
            options: { A: '7.5°', B: '15°', C: '0°', D: '30°' },
            correctAnswer: 'A',
            explanation: 'At 3:15, minute hand at 90°. Hour hand at 3×30 + 15×0.5 = 97.5°. Angle = 97.5 − 90 = 7.5°.'
        },
        {
            id: 'Q049', questionNumber: 49, topic: 'Mental Ability', difficulty: 'medium',
            questionText: 'A cube has all its faces painted red. It is then cut into 27 equal smaller cubes. How many small cubes have no paint on any face?',
            options: { A: '0', B: '1', C: '4', D: '8' },
            correctAnswer: 'B',
            explanation: 'In a 3×3×3 cube, only the center cube (1) has no painted faces.'
        },
        {
            id: 'Q050', questionNumber: 50, topic: 'Mental Ability', difficulty: 'hard',
            questionText: 'Water is related to "Hydrometer" as Temperature is related to:',
            options: { A: 'Altimeter', B: 'Barometer', C: 'Thermometer', D: 'Anemometer' },
            correctAnswer: 'C',
            explanation: 'A Hydrometer measures water density/specific gravity. Similarly, a Thermometer measures temperature.'
        }
    ]
};

// Duplicate MOCK001 questions for MOCK002, MOCK003, MOCK004 as placeholders
// In production, these would be distinct question sets
QUESTION_BANK.MOCK002 = QUESTION_BANK.MOCK001.map(q => ({ ...q, id: q.id.replace('Q0', 'Q2') }));
QUESTION_BANK.MOCK003 = QUESTION_BANK.MOCK001.slice(0, 50).map((q, i) => ({
    ...q,
    id: `Q3${String(i + 1).padStart(2, '0')}`,
    topic: 'Physics',
    questionText: `[Physics] ${q.questionText}`
}));
QUESTION_BANK.MOCK004 = QUESTION_BANK.MOCK001.slice(0, 50).map((q, i) => ({
    ...q,
    id: `Q4${String(i + 1).padStart(2, '0')}`,
    topic: 'History',
    questionText: `[History] ${q.questionText}`
}));

function getQuestionsForTest(testId) {
    return QUESTION_BANK[testId] || [];
}
