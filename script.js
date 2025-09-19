// Import Firebase modules with detailed logging
console.log('📦 [IMPORT] Starting Firebase modules import...');

function clearAllCookies() {
    console.log('🗑️ [COOKIES] Clearing all cookies...');
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
    console.log('✅ [COOKIES] All cookies cleared.');
}

// Clear cookies before anything else runs
// clearAllCookies(); // This will be called later

try {
    // const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js');
    // const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');
    // const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js');

    console.log('✅ [IMPORT] Firebase modules import moved to initializeFirebase');
    // window.FirebaseModules = { initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAnalytics }; // No longer needed globally

} catch (error) {
    console.error('❌ [IMPORT] Failed to import Firebase modules (initial check):', error);
    console.error('❌ [IMPORT] Check your internet connection and Firebase SDK URLs, or if running in an environment that supports top-level await');
}

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_4_E_6NKQX5TWLBp4mOa0eLhh3wXd8lo",
    authDomain: "login-24770.firebaseapp.com",
    projectId: "login-24770",
    storageBucket: "login-24770.firebasestorage.app",
    messagingSenderId: "156557947835",
    appId: "1:156557947835:web:130e19e8d9ba6b23454a9e"
};

// Initialize Firebase with detailed logging
console.log('🔥 [INIT] Initializing Firebase...');

// Wait for modules to be imported
async function initializeFirebase() { // Make it async
    if (typeof window.FirebaseModules === 'undefined') { // Check if modules are loaded
        console.log('⏳ [INIT] Importing Firebase modules...');
        try {
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js');
            const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js');
            const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js');

            window.FirebaseModules = { initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAnalytics };
            console.log('✅ [INIT] Firebase modules imported successfully within initializeFirebase');
        } catch (error) {
            console.error('❌ [INIT] Failed to import Firebase modules during initialization:', error);
            showStatus('Ошибка: не удалось загрузить Firebase модули. Проверьте подключение к интернету.', 'error');
            return;
        }
    }

    const { initializeApp, getAuth, getAnalytics } = window.FirebaseModules;

    try {
        const app = initializeApp(firebaseConfig);
        console.log('✅ [INIT] Firebase app initialized successfully');

        const auth = getAuth(app);
        console.log('✅ [INIT] Firebase Auth initialized');

        const analytics = getAnalytics(app);
        console.log('✅ [INIT] Firebase Analytics initialized');

        // Export for global access if needed
        window.firebaseAuth = auth;
        window.firebaseApp = app;

        console.log('🎉 [INIT] Firebase initialization complete!');

        // Start the application
        startApplication(auth, window.FirebaseModules); // Pass auth and modules to startApplication
        clearAllCookies(); // Clear cookies after application starts

    } catch (error) {
        console.error('❌ [INIT] Firebase initialization failed:', error);
        console.error('❌ [INIT] Error details:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
    }
}

// Start the application after Firebase is ready
function startApplication(auth, FirebaseModules) { // Accept auth and FirebaseModules as arguments
    console.log('🚀 [APP] Starting application...');

    // Check if we have auth initialized
    if (typeof auth === 'undefined') {
        console.error('❌ [APP] Firebase Auth not initialized! Check Firebase configuration.');
        // Use global showStatus since we don't have access to local statusDiv here
        showStatus('Ошибка: Firebase Auth не инициализирован', 'error');
        return;
    }

    // const auth = window.firebaseAuth; // Now passed as argument
    const { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } = FirebaseModules; // Get from argument

    console.log('✅ [APP] Using Firebase Auth instance');

    // Google Auth Provider with detailed logging
    console.log('🔧 [PROVIDER] Setting up Google Auth Provider...');
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    console.log('✅ [PROVIDER] Google Auth Provider configured with scopes: email, profile');

    // ... rest of the application code will be here
    setupApplication(auth, provider, { signInWithPopup, signOut, onAuthStateChanged });
}

initializeFirebase();

// Clear cache if needed
if (typeof window !== 'undefined') {
    if ('caches' in window) {
        caches.keys().then(function(names) {
            console.log('🗑️ [CACHE] Clearing caches:', names);
            for (let name of names) caches.delete(name);
        }).catch(err => console.error('❌ [CACHE] Error clearing cache:', err));
    }
}

// Show status messages (defined globally first)
function showStatus(message, type = 'info') {
    console.log(`📢 [STATUS] ${type.toUpperCase()}: ${message}`);
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;

        // Clear status after 5 seconds
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
            console.log('🧹 [STATUS] Status message cleared');
        }, 5000);
    } else {
        console.error('❌ [STATUS] Status div not found!');
    }
}

// Setup application with all authentication logic
function setupApplication(auth, provider, firebaseFunctions) {
    const { signInWithPopup, signOut, onAuthStateChanged } = firebaseFunctions;

    // DOM elements with validation
    console.log('🔍 [DOM] Looking for DOM elements...');
    const googleSignInBtn = document.getElementById('google-sign-in');
    const signOutBtn = document.getElementById('sign-out');
    const loginSection = document.getElementById('login-section');
    const userSection = document.getElementById('user-section');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userPhoto = document.getElementById('user-photo');
    const statusDiv = document.getElementById('status');

    console.log('📋 [DOM] Elements found:', {
        googleSignInBtn: !!googleSignInBtn,
        signOutBtn: !!signOutBtn,
        loginSection: !!loginSection,
        userSection: !!userSection,
        userName: !!userName,
        userEmail: !!userEmail,
        userPhoto: !!userPhoto,
        statusDiv: !!statusDiv
    });

    // Local showStatus function for this application instance
    function showStatusLocal(message, type = 'info', targetDiv) {
        console.log(`📢 [STATUS] ${type.toUpperCase()}: ${message}`);
        if (targetDiv) {
            targetDiv.textContent = message;
            targetDiv.className = `status ${type}`;

            // Clear status after 5 seconds
            setTimeout(() => {
                targetDiv.textContent = '';
                targetDiv.className = 'status';
                console.log('🧹 [STATUS] Status message cleared');
            }, 5000);
        } else {
            console.error('❌ [STATUS] Status div not found!');
        }
    }

    // Sign in with Google with detailed error handling
    async function signInWithGoogle() {
        console.log('🚀 [SIGNIN] Starting Google sign-in process...');

        try {
            showStatusLocal('Выполняется вход...', 'loading', statusDiv);
            console.log('📤 [SIGNIN] Opening Google popup...');

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log('✅ [SIGNIN] Sign-in successful!', {
                userId: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                photoURL: user.photoURL,
                providerId: user.providerId
            });

            showStatusLocal('Вход выполнен успешно!', 'success', statusDiv);

        } catch (error) {
            console.error('❌ [SIGNIN] Sign-in failed:', {
                code: error.code,
                message: error.message,
                customData: error.customData,
                stack: error.stack
            });

            // Handle specific error codes
            let userMessage = 'Неизвестная ошибка входа';
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    userMessage = 'Вход отменен пользователем';
                    console.log('ℹ️ [SIGNIN] User closed popup');
                    break;
                case 'auth/popup-blocked':
                    userMessage = 'Всплывающее окно заблокировано браузером';
                    console.log('ℹ️ [SIGNIN] Popup blocked by browser');
                    break;
                case 'auth/configuration-not-found':
                    userMessage = 'Ошибка конфигурации Firebase';
                    console.log('❌ [SIGNIN] Firebase configuration error');
                    break;
                case 'auth/invalid-api-key':
                    userMessage = 'Неверный API ключ';
                    console.log('❌ [SIGNIN] Invalid API key');
                    break;
                case 'auth/app-deleted':
                    userMessage = 'Приложение Firebase удалено';
                    console.log('❌ [SIGNIN] Firebase app deleted');
                    break;
                case 'auth/operation-not-allowed':
                    userMessage = 'Google вход не разрешен';
                    console.log('❌ [SIGNIN] Google sign-in not enabled');
                    break;
                default:
                    userMessage = error.message;
            }

            showStatusLocal(`Ошибка входа: ${userMessage}`, 'error', statusDiv);
        }
    }

    // Sign out with detailed error handling
    async function signOutUser() {
        console.log('🚪 [SIGNOUT] Starting sign-out process...');

        try {
            await signOut(auth);
            console.log('✅ [SIGNOUT] Sign-out successful');
            showStatusLocal('Выход выполнен успешно!', 'success', statusDiv);

        } catch (error) {
            console.error('❌ [SIGNOUT] Sign-out failed:', {
                code: error.code,
                message: error.message,
                stack: error.stack
            });

            showStatusLocal(`Ошибка выхода: ${error.message}`, 'error', statusDiv);
        }
    }

    // Update UI based on auth state with logging
    function updateUI(user) {
        console.log('🔄 [UI] Updating UI for user state:', user ? 'signed-in' : 'signed-out');

        if (user) {
            console.log('👤 [UI] User signed in:', {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                providerData: user.providerData
            });

            loginSection.style.display = 'none';
            userSection.style.display = 'block';

            userName.textContent = user.displayName || 'Пользователь';
            userEmail.textContent = user.email;
            userPhoto.src = user.photoURL || 'https://via.placeholder.com/50?text=U';
            userPhoto.alt = user.displayName || 'Фото пользователя';

        } else {
            console.log('🚪 [UI] User signed out');
            loginSection.style.display = 'block';
            userSection.style.display = 'none';
        }
    }

    // Auth state observer with detailed logging
    console.log('👂 [OBSERVER] Setting up auth state observer...');
    onAuthStateChanged(auth, (user) => {
        console.log('🔥 [OBSERVER] Auth state changed:', user ? 'user-present' : 'user-absent');
        updateUI(user);
    });

    // Event listeners with logging
    if (googleSignInBtn) {
        googleSignInBtn.addEventListener('click', () => {
            console.log('🎯 [EVENT] Google sign-in button clicked');
            signInWithGoogle();
        });
        console.log('✅ [EVENT] Google sign-in button listener attached');
    } else {
        console.error('❌ [EVENT] Google sign-in button not found!');
    }

    if (signOutBtn) {
        signOutBtn.addEventListener('click', () => {
            console.log('🎯 [EVENT] Sign-out button clicked');
            signOutUser();
        });
        console.log('✅ [EVENT] Sign-out button listener attached');
    } else {
        console.error('❌ [EVENT] Sign-out button not found!');
    }

    // Initialize UI with logging
    console.log('🎨 [INIT] Initializing UI...');
    updateUI(auth.currentUser);

    console.log('🎉 [READY] Firebase Google Auth is ready!');
}

// Network and resource monitoring
console.log('🌐 [NETWORK] Monitoring network requests...');

// Monitor Firebase SDK loading
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('📡 [NETWORK] Fetch request:', args[0]);
    return originalFetch.apply(this, args)
        .then(response => {
            console.log('✅ [NETWORK] Fetch response:', {
                url: args[0],
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });
            return response;
        })
        .catch(error => {
            console.error('❌ [NETWORK] Fetch failed:', {
                url: args[0],
                error: error.message
            });
            throw error;
        });
};

// Monitor XMLHttpRequest
const originalXMLHttpRequest = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
    const xhr = new originalXMLHttpRequest();
    const originalOpen = xhr.open;
    const originalSend = xhr.send;

    xhr.open = function(method, url, ...args) {
        console.log('📡 [XHR] XMLHttpRequest opened:', { method, url });
        this._url = url;
        return originalOpen.apply(this, [method, url, ...args]);
    };

    xhr.send = function(body) {
        console.log('📤 [XHR] XMLHttpRequest sent:', {
            url: this._url,
            body: body ? (typeof body === 'string' ? body.substring(0, 100) + '...' : '[Object]') : null
        });

        this.addEventListener('load', () => {
            console.log('✅ [XHR] XMLHttpRequest loaded:', {
                url: this._url,
                status: this.status,
                statusText: this.statusText,
                responseType: this.responseType
            });
        });

        this.addEventListener('error', () => {
            console.error('❌ [XHR] XMLHttpRequest error:', {
                url: this._url,
                status: this.status,
                statusText: this.statusText
            });
        });

        return originalSend.apply(this, [body]);
    };

    return xhr;
};

// Monitor script loading
const originalCreateElement = document.createElement;
document.createElement = function(tagName) {
    const element = originalCreateElement.call(this, tagName);

    if (tagName.toLowerCase() === 'script') {
        const originalSetAttribute = element.setAttribute;
        element.setAttribute = function(name, value) {
            if (name === 'src') {
                console.log('📜 [SCRIPT] Loading script:', value);
                element.addEventListener('load', () => {
                    console.log('✅ [SCRIPT] Script loaded successfully:', value);
                });
                element.addEventListener('error', () => {
                    console.error('❌ [SCRIPT] Script loading failed:', value);
                });
            }
            return originalSetAttribute.call(this, name, value);
        };
    }

    return element;
};

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
    console.error('❌ [GLOBAL] Uncaught error:', {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error.stack
    });
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ [GLOBAL] Unhandled promise rejection:', {
        reason: event.reason,
        promise: event.promise
    });
});

// CORS and security monitoring
console.log('🔒 [SECURITY] Security context:', {
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    isSecureContext: window.isSecureContext,
    crossOriginIsolated: window.crossOriginIsolated
});

// Check for common issues
function checkCommonIssues() {
    console.log('🔍 [DIAGNOSTICS] Running diagnostics...');

    // Check if running on file:// protocol
    if (window.location.protocol === 'file:') {
        console.warn('⚠️ [DIAGNOSTICS] Running on file:// protocol - CORS and Firebase may not work!');
        console.warn('💡 [DIAGNOSTICS] Use a local web server instead (python -m http.server, etc.)');
    }

    // Check if HTTPS is required
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
        console.warn('⚠️ [DIAGNOSTICS] HTTP protocol may cause issues with Firebase Auth');
        console.warn('💡 [DIAGNOSTICS] Consider using HTTPS for production');
    }

    // Check Firebase configuration
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key') {
        console.error('❌ [DIAGNOSTICS] Firebase API key is not configured!');
    }

    if (!firebaseConfig.authDomain || firebaseConfig.authDomain === 'your-project.firebaseapp.com') {
        console.error('❌ [DIAGNOSTICS] Firebase Auth Domain is not configured!');
    }

    console.log('✅ [DIAGNOSTICS] Diagnostics complete');
}

// Run diagnostics
checkCommonIssues();

// Performance monitoring
console.log('⚡ [PERFORMANCE] Starting performance monitoring...');
window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('📊 [PERFORMANCE] Page load metrics:', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        totalTime: perfData.loadEventEnd - perfData.fetchStart
    });
});

// Console helper functions
window.debugFirebase = {
    getAuthState: () => {
        if (window.firebaseAuth) {
            console.log('🔍 [DEBUG] Current auth state:', window.firebaseAuth.currentUser);
        } else {
            console.error('❌ [DEBUG] Firebase Auth not initialized');
        }
    },

    testConnectivity: async () => {
        try {
            console.log('🌐 [DEBUG] Testing Firebase connectivity...');
            const response = await fetch('https://firebase.google.com/');
            console.log('✅ [DEBUG] Firebase connectivity OK:', response.status);
        } catch (error) {
            console.error('❌ [DEBUG] Firebase connectivity failed:', error.message);
        }
    },

    clearLogs: () => {
        console.clear();
        console.log('🧹 [DEBUG] Console cleared');
    }
};

console.log('🛠️ [DEBUG] Debug functions available:');
console.log('  - debugFirebase.getAuthState() - Check current auth state');
console.log('  - debugFirebase.testConnectivity() - Test Firebase connectivity');
console.log('  - debugFirebase.clearLogs() - Clear console');

// Final ready message
console.log('🎯 [SYSTEM] Firebase Google Auth debug system ready!');
console.log('📋 [SYSTEM] Check console for detailed logs and error messages');
