/*
 * main.js
 * Small student project script - simple and a bit informal.
 * This file handles small UI tweaks (nav scroll, reveal animations).
 * It's intentionally simple for learning purposes.
 */

// Wait for page to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation bar from the HTML
    var nav = document.querySelector('nav');

    // When user scrolls down, add a class to nav to change its style
    window.addEventListener('scroll', function() {
        // Check if user has scrolled down 50 pixels
        if (window.scrollY > 50) {
            // Add scrolled class to nav
            nav.classList.add('scrolled');
        } else {
            // Remove scrolled class from nav
            nav.classList.remove('scrolled');
        }
    });

    // Fade in animation when elements become visible
    // This is called "Intersection Observer"
    var observerOptions = {
        threshold: 0.1  // When 10% of element is visible
    };

    // Create observer
    var observer = new IntersectionObserver(function(entries) {
        // Check each element
        entries.forEach(function(entry) {
            // If element is visible on screen
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate-fade-in');
                // Stop watching this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Watch all elements with 'reveal' class
    var revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(function(element) {
        observer.observe(element);
    });
});


// ====================================
// PREMIUM SYSTEM - HELPER FUNCTIONS
// ====================================

// Check if user has premium access
// Check if user is premium (very simple, localStorage-based)
function isUserPremium() {
    // Get isPremium value from browser storage
    var premiumStatus = localStorage.getItem("isPremium");
    // Return true if value is "true", false otherwise
    return premiumStatus === "true";
}

// Check if user is premium, if not redirect them to upgrade page
function requirePremium(redirectPath) {
    // Set default path if not provided
    if (redirectPath === undefined) {
        redirectPath = "../payments/upgrade.html";
    }
    
    // Check if user is premium
    if (!isUserPremium()) {
        // Show message to user
        alert("Upgrade to Premium to access this feature!");
        // Take them to upgrade page
        window.location.href = redirectPath;
        return false;
    }
    return true;
}

// Check if user can use AI (free users get 3 tries)
function canUseAI() {
    // If premium, allow unlimited AI
    if (isUserPremium()) {
        return true;
    }

    // Get how many times free user has used AI
    var count = parseInt(localStorage.getItem("aiCount") || "0");

    // Check if they have reached the limit of 3
    if (count >= 3) {
        // Show warning
        alert("Free AI limit reached! Upgrade to Premium to use more");
        // Take them to upgrade page
        window.location.href = "../../payments/upgrade.html";
        return false;
    }

    // Add 1 to their count
    localStorage.setItem("aiCount", count + 1);
    return true;
}

// Lock a feature for free users (show lock icon)
function lockFeature(elementId) {
    // Get element with this ID
    var element = document.getElementById(elementId);
    
    // If element doesn't exist, stop
    if (!element) {
        return;
    }

    // If user is not premium
    if (!isUserPremium()) {
        // Add class to show it's locked
        element.classList.add("locked-feature");

        // Create lock overlay
        var overlay = document.createElement("div");
        overlay.className = "lock-overlay";
        
        // Add lock message and button
        overlay.innerHTML = `
            <span>🔒 Premium Feature</span>
            <button onclick="window.location.href='../../payments/upgrade.html'">
                Upgrade Now
            </button>
        `;
        
        // Add overlay to element
        element.appendChild(overlay);
    }
}
