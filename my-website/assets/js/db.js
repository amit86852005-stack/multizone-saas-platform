// Import Firebase database libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase setup (app credentials)
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
// Get database connection
var db = getFirestore(app);

// ============ NOTES FUNCTIONS ============

// Function: Add a new note to database
export async function addNote(note) {
  try {
    // Add note to "notes" collection
    await addDoc(collection(db, "notes"), note);
    return true;
  } catch (e) {
    // If error, log it
    console.error("Error adding note", e);
    throw e;
  }
}

// Function: Get all notes from database
export async function getNotes() {
  try {
    // Get all notes from "notes" collection
    var snapshot = await getDocs(collection(db, "notes"));
    var data = [];
    // Go through each note and add to array
    snapshot.forEach(function(doc) {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    // If error, log it and return empty array
    console.error("Error getting notes", e);
    return [];
  }
}

// ============ HOSPITALS FUNCTIONS ============

// Function: Add a new hospital to database
export async function addHospital(hospital) {
  try {
    // Add hospital to "hospitals" collection
    await addDoc(collection(db, "hospitals"), hospital);
    return true;
  } catch (e) {
    // If error, log it
    console.error("Error adding hospital", e);
    throw e;
  }
}

// Function: Get all hospitals from database
export async function getHospitals() {
  try {
    // Get all hospitals from "hospitals" collection
    var snapshot = await getDocs(collection(db, "hospitals"));
    var data = [];
    // Go through each hospital and add to array
    snapshot.forEach(function(doc) {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    // If error, log it and return empty array
    console.error("Error getting hospitals", e);
    return [];
  }
}

// ============ DELETE FUNCTION ============

// Function: Delete an item from database
export async function deleteItem(col, id) {
  try {
    // Delete document with this ID from collection
    await deleteDoc(doc(db, col, id));
    return true;
  } catch (e) {
    // If error, log it
    console.error("Error deleting item", e);
    throw e;
  }
}

// ============ WOMEN SCHEMES FUNCTIONS ============

// Function: Add a women scheme to database
export async function addWomenScheme(scheme) {
  try {
    // Add scheme to "women_schemes" collection
    await addDoc(collection(db, "women_schemes"), scheme);
    return true;
  } catch (e) {
    // If error, log it
    console.error("Error adding scheme", e);
    throw e;
  }
}

// Function: Get all women schemes from database
export async function getWomenSchemes() {
  try {
    // Get all schemes from "women_schemes" collection
    var snapshot = await getDocs(collection(db, "women_schemes"));
    var data = [];
    // Go through each scheme and add to array
    snapshot.forEach(function(doc) {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    // If error, log it and return empty array
    console.error("Error getting schemes", e);
    return [];
  }
}

// ============ HELPLINES FUNCTIONS ============

// Function: Add a helpline to database
export async function addHelpline(helpline) {
  try {
    // Add helpline to "helplines" collection
    await addDoc(collection(db, "helplines"), helpline);
    return true;
  } catch (e) {
    // If error, log it
    console.error("Error adding helpline", e);
    throw e;
  }
}

// Function: Get all helplines from database
export async function getHelplines() {
  try {
    // Get all helplines from "helplines" collection
    var snapshot = await getDocs(collection(db, "helplines"));
    var data = [];
    // Go through each helpline and add to array
    snapshot.forEach(function(doc) {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    // If error, log it and return empty array
    console.error("Error getting helplines", e);
    return [];
  }
}

// ============ USERS FUNCTIONS ============

// Function: Get all users from database
export async function getUsers() {
  try {
    // Get all users from "users" collection
    var snapshot = await getDocs(collection(db, "users"));
    var data = [];
    // Go through each user and add to array
    snapshot.forEach(function(doc) {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    // If error, log it and return empty array
    console.error("Error getting users", e);
    return [];
  }
}

// Make functions available globally (for non-module scripts)
window.addNote = addNote;
window.getNotes = getNotes;
window.addHospital = addHospital;
window.getHospitals = getHospitals;
window.getUsers = getUsers;
window.deleteItem = deleteItem;
window.addWomenScheme = addWomenScheme;
window.getWomenSchemes = getWomenSchemes;
window.addHelpline = addHelpline;
window.getHelplines = getHelplines;
