/**
 * CUET CBT Mock Test — Firebase Configuration
 * Required for Authentication, Firestore (database), and Analytics.
 */

// Firebase SDK Configuration (Web)
// Replace these placeholders with your actual Firebase Project settings
const firebaseConfig = {
    apiKey: "AIzaSyCggDWclra9a59le1UjDQeaKTUrE-Pmzxs",
    authDomain: "cuet-test-23952.firebaseapp.com",
    projectId: "cuet-test-23952",
    storageBucket: "cuet-test-23952.firebasestorage.app",
    messagingSenderId: "81584409860",
    appId: "1:81584409860:web:4eaf0c694b4f41dcae1451",
    measurementId: "G-66CD5ZFVF8"
};

// Initialize Firebase (Only if SDK is loaded)
let db = null;
let auth = null;

if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log("🔥 Firebase initialized successfully.");
} else {
    console.warn("⚠️ Firebase SDK not loaded. Running in local-only mode.");
}

// Global Export for other scripts
window.firebaseDB = db;
window.firebaseAuth = auth;
