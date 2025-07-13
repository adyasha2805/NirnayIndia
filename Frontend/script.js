let API_URL = 'http://localhost:5000/api';
// Registration Form Handler
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('email', document.getElementById('email').value);
  formData.append('password', document.getElementById('password').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('dob', document.getElementById('dob').value);
  formData.append('state', document.getElementById('state').value);
  formData.append('idProof', document.getElementById('idProof').files[0]);
  formData.append('role', 'user');

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
    if (response.ok) {
      // Store user data in localStorage for verification
      localStorage.setItem('registeredUser', JSON.stringify({
        email: document.getElementById('email').value,
        role: 'user'
      }));
      alert('✅ Registration successful! Please login.');
      e.target.reset();
    } else {
      alert('❌ ' + (data.message || 'Registration failed. Please try again.'));
    }
  } catch (error) {
    alert('❌ Server connection error. Please check if the server is running.');
    console.error('Registration error:', error);
  }
});

// Login Form Handler
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const loginData = {
    email: document.getElementById('loginEmail').value,
    password: document.getElementById('loginPassword').value,
    role: document.getElementById('loginRole').value
  };

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store auth data
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('userEmail', loginData.email);
    localStorage.setItem('userRole', loginData.role);
    
    alert('✅ Login successful!');
    
    // Redirect based on role
    if (loginData.role === 'admin') {
      window.location.href = './admin.html';
    } else {
      window.location.href = './vote.html';
    }
  } catch (error) {
    alert('❌ ' + (error.message || 'Login failed. Please check your credentials.'));
    console.error('Login error:', error);
  }
});