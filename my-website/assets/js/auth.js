/* auth.js
 * Tiny auth helpers for the student demo.
 * Form submissions are mocked and just redirect to demo pages.
 */

// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    // Get the OTP form element
    var otpForm = document.getElementById("otpForm");

    // If OTP form exists on this page
    if (otpForm) {
        // When user submits the form
        otpForm.addEventListener("submit", function(e) {
            // Stop default form submission
            e.preventDefault();
            // Go to next page (onboarding)
            window.location.href = "onboarding.html";
        });
    }
});

// Onboarding form handling
document.addEventListener("DOMContentLoaded", function() {
    // Get the onboarding form element
    var onboardingForm = document.getElementById("onboardingForm");

    // If onboarding form exists on this page
    if (onboardingForm) {
        // When user submits the form
        onboardingForm.addEventListener("submit", function(e) {
            // Stop default form submission
            e.preventDefault();
            // Go to dashboard page
            window.location.href = "../dashboard/dashboard.html";
        });
    }
});
