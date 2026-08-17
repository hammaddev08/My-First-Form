const API_BASE = 'http://localhost:5000/api/auth';

const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const registerSection = document.getElementById('register-form');
const loginSection = document.getElementById('login-form');
const authSection = document.getElementById('auth-section');
const dashboard = document.getElementById('dashboard');
const pageTitle = document.getElementById('page-title');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout');

function showMessage(type, text) {
  const existing = document.querySelector('.error, .success');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = type;
  msg.textContent = text;

  if (authSection && !authSection.classList.contains('hidden')) {
    authSection.insertBefore(msg, authSection.firstChild);
  } else if (dashboard && !dashboard.classList.contains('hidden')) {
    dashboard.insertBefore(msg, dashboard.firstChild);
  }

  setTimeout(() => msg.remove(), 4000);
}

function showRegister() {
  registerSection.classList.remove('hidden');
  loginSection.classList.add('hidden');
  pageTitle.textContent = 'Welcome';
}

function showLogin() {
  registerSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  pageTitle.textContent = 'Welcome';
}

function showDashboard(user) {
  authSection.classList.add('hidden');
  dashboard.classList.remove('hidden');
  pageTitle.textContent = 'Dashboard';
  userName.textContent = user.username;
  userEmail.textContent = user.email;
}

function showAuth() {
  dashboard.classList.add('hidden');
  authSection.classList.remove('hidden');
  pageTitle.textContent = 'Welcome';
}

document.getElementById('show-login').addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});

document.getElementById('show-register').addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      showMessage('error', data.message || 'Registration failed');
      return;
    }

    showMessage('success', 'Registration successful! Please login.');
    registerForm.reset();
    showLogin();
  } catch (err) {
    showMessage('error', 'Server error. Please try again later.');
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      showMessage('error', data.message || 'Login failed');
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.data));
    showDashboard(data.data);
    loginForm.reset();
  } catch (err) {
    showMessage('error', 'Server error. Please try again later.');
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  showAuth();
});

(function checkSession() {
  const saved = localStorage.getItem('user');
  if (saved) {
    try {
      const user = JSON.parse(saved);
      showDashboard(user);
    } catch {
      localStorage.removeItem('user');
      showAuth();
    }
  }
})();
