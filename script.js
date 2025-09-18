// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIsK2c0t1Zb8x8PDRMX-PBhv46YSHEENg",
    authDomain: "lvlmine.firebaseapp.com",
    projectId: "lvlmine",
    storageBucket: "lvlmine.firebasestorage.app",
    messagingSenderId: "969227085374",
    appId: "1:969227085374:web:37376894d896df4124536f",
    measurementId: "G-KP94J0DSX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// DOM elements
const googleSignInBtn = document.getElementById('google-sign-in');
const signOutBtn = document.getElementById('sign-out');
const loginSection = document.getElementById('login-section');
const userSection = document.getElementById('user-section');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhoto = document.getElementById('user-photo');
const statusDiv = document.getElementById('status');

// Google Auth Provider
const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile');

// Sign in with Google
async function signInWithGoogle() {
    try {
        showStatus('Выполняется вход...', 'loading');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        showStatus('Вход выполнен успешно!', 'success');
        console.log('User signed in:', user);
    } catch (error) {
        console.error('Error during sign in:', error);
        showStatus(`Ошибка входа: ${error.message}`, 'error');
    }
}

// Sign out
async function signOutUser() {
    try {
        await signOut(auth);
        showStatus('Выход выполнен успешно!', 'success');
    } catch (error) {
        console.error('Error during sign out:', error);
        showStatus(`Ошибка выхода: ${error.message}`, 'error');
    }
}

// Update UI based on auth state
function updateUI(user) {
    if (user) {
        // User is signed in
        loginSection.style.display = 'none';
        userSection.style.display = 'block';

        userName.textContent = user.displayName || 'Пользователь';
        userEmail.textContent = user.email;
        userPhoto.src = user.photoURL || 'https://via.placeholder.com/50?text=U';
        userPhoto.alt = user.displayName || 'Фото пользователя';

        console.log('User is signed in:', user);
    } else {
        // User is signed out
        loginSection.style.display = 'block';
        userSection.style.display = 'none';
        console.log('User is signed out');
    }
}

// Show status messages
function showStatus(message, type = 'info') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;

    // Clear status after 5 seconds
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
    }, 5000);
}

// Auth state observer
onAuthStateChanged(auth, (user) => {
    updateUI(user);
});

// Event listeners
googleSignInBtn.addEventListener('click', signInWithGoogle);
signOutBtn.addEventListener('click', signOutUser);

// Initialize UI
updateUI(auth.currentUser);
