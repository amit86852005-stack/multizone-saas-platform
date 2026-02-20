// Import Firebase libraries from the web
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase setup (these are the credentials for our app)
var firebaseConfig = {
    apiKey: "AIzaSyCkuYIwCIyIaV96-XzWli6js6ef3VO04R0",
    authDomain: "multizone-893ed.firebaseapp.com",
    projectId: "multizone-893ed",
    storageBucket: "multizone-893ed.firebasestorage.app",
    messagingSenderId: "919907268865",
    appId: "1:919907268865:web:6f620b330d43afa8134300"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
// Get authentication object
var auth = getAuth(app);
// Set up Google as login provider
var provider = new GoogleAuthProvider();

// Function: Login with Google
window.googleLogin = function () {
    // Try to login with Google
    signInWithPopup(auth, provider)
        .then(function (result) {
            // Success! Get the user info
            var user = result.user;

            // Save login info to browser storage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isPremium", "false");
            localStorage.setItem("user", JSON.stringify({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            // Take user to onboarding page
            window.location.href = "onboarding.html";
        })
        .catch(function (error) {
            // If error, show message
            console.log("Error during login:", error);
            alert("Login failed. Please try again.");
        });
};

// Function: Set up recaptcha (to prevent bots sending OTP)
window.setupRecaptcha = function () {
    // Only create recaptcha once
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal'
        });
    }
};

// Function: Send OTP to phone number
window.sendOTP = function () {
    // Get phone number from input field
    var phoneNumber = document.getElementById("phone").value;

    // Check if phone number is empty
    if (!phoneNumber) {
        alert("Please enter a phone number!");
        return false;
    }

    // Try to send OTP
    window.setupRecaptcha();
    var appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            // Save confirmation result for later
            window.confirmationResult = confirmationResult;
            alert("OTP sent to " + phoneNumber);

            // Hide phone section and show OTP section
            var phoneSection = document.getElementById("phoneSection");
            var otpSection = document.getElementById("otpSection");

            if (phoneSection) {
                phoneSection.style.display = "none";
            }
            if (otpSection) {
                otpSection.style.display = "block";
            }
            return true;
        })
        .catch(function (error) {
            // If error, show message
            console.log("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
            return false;
        });
};

// Function: Verify OTP code
window.verifyOTP = function () {
    // Get OTP code from input
    var code = document.getElementById("otp").value;

    // Check if we have confirmation result
    if (!window.confirmationResult) {
        alert("Please request an OTP first!");
        return;
    }

    // Try to verify OTP
    window.confirmationResult.confirm(code)
        .then(function (result) {
            // Success! Get user info
            var user = result.user;

            // Save login info to browser storage
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isPremium", "false");
            localStorage.setItem("user", JSON.stringify({
                name: "Member",
                phone: user.phoneNumber
            }));

            // Take user to onboarding page
            window.location.href = "onboarding.html";
        })
        .catch(function (error) {
            // If wrong OTP
            alert("Invalid or expired OTP. Please try again.");
        });
};
// Function: Guest Login
window.guestLogin = function () {
    // Set guest session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isPremium", "false");
    localStorage.setItem("isGuest", "true"); // Flag for guest access
    localStorage.setItem("user", JSON.stringify({
        name: "Guest Explorer",
        type: "guest",
        city: "Unknown"
    }));

    // Alert user about limitations
    alert("You are entering as a Guest. Some features like saving progress or posting may be limited.");

    // Redirect to onboarding (or dashboard if you prefer to skip setup)
    window.location.href = "onboarding.html";
};
