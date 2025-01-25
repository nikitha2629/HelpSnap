// script.js

// Pages
const loginPage = document.getElementById('login-page');
const signupPage = document.getElementById('signup-page');
const dashboardPage = document.getElementById('dashboard-page');

// Forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Navigation Links
const goToSignup = document.getElementById('go-to-signup');
const goToLogin = document.getElementById('go-to-login');

// Buttons
const sosButton = document.getElementById('sos-button');
const logoutButton = document.getElementById('logout-button');
const addContactButton = document.getElementById('add-contact-button');
const startVoiceButton = document.getElementById('start-voice');

// Inputs
const contactNameInput = document.getElementById('contact-name');
const contactNumberInput = document.getElementById('contact-number');

// Contacts List
const contactsList = document.getElementById('contacts-list');

// User Data (Simulating backend storage)
const users = [];
let currentUser = null;
const contacts = [];

// Navigation
goToSignup.addEventListener('click', () => {
  loginPage.classList.remove('active');
  signupPage.classList.add('active');
});

goToLogin.addEventListener('click', () => {
  signupPage.classList.remove('active');
  loginPage.classList.add('active');
});

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    loginPage.classList.remove('active');
    dashboardPage.classList.add('active');
  } else {
    alert('Invalid username or password!');
  }
});

// Signup
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  users.push({ username, password });
  alert('Sign up successful! Please log in.');
  signupPage.classList.remove('active');
  loginPage.classList.add('active');
});

// Add Contact
addContactButton.addEventListener('click', () => {
  const name = contactNameInput.value.trim();
  const number = contactNumberInput.value.trim();

  if (name && number) {
    contacts.push({ name, number });
    renderContacts();
    contactNameInput.value = '';
    contactNumberInput.value = '';
  } else {
    alert('Please fill out both fields.');
  }
});

// Render Contacts
function renderContacts() {
  contactsList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${contact.name} - ${contact.number}
      <button onclick="deleteContact(${index})">Delete</button>
    `;
    contactsList.appendChild(li);
  });
}

// Delete Contact
function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

// SOS Alert
sosButton.addEventListener('click', () => {
  alert('SOS Alert Sent to Emergency Contacts!');
  console.log('Contacts:', contacts);
});

// Logout
logoutButton.addEventListener('click', () => {
  currentUser = null;
  dashboardPage.classList.remove('active');
  loginPage.classList.add('active');
});

// Voice Assistant
startVoiceButton.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    if (transcript === 'secure') {
      alert('SOS Alert Sent via Voice Command!');
    } else {
      alert(`Command "${transcript}" not recognized. Please say "secure".`);
    }
  };
  recognition.start();
});
