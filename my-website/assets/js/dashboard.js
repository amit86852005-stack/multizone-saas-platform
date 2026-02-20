// Function: Navigate to a zone section
function goToSection(zone) {
    // Check which zone user clicked
    
    // If student zone
    if (zone === "student") {
        window.location.href = "../sections/student-zone/student-home.html";
    }
    
    // If hospital zone
    if (zone === "hospital") {
        window.location.href = "../sections/hospital-zone/hospital-home.html";
    }
    
    // If career zone
    if (zone === "career") {
        window.location.href = "../sections/career-zone/career-home.html";
    }
    
    // If women zone
    if (zone === "women") {
        window.location.href = "../sections/women-zone/women-home.html";
    }
}

// Function: Logout user
function logout() {
    // Clear all saved data from browser
    localStorage.clear();
    // Take user back to login page
    window.location.href = "../auth/login.html";
}
