// =========================
// Registration Form Handler
// =========================
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const phone = document.getElementById('phone');
  const dob = document.getElementById('dob');
  const state = document.getElementById('state');
  const idProof = document.getElementById('idProof');

  // Basic field validation
  if (!email.value || !password.value || !phone.value || !dob.value || !state.value || !idProof.files.length) {
    alert('Please fill in all the fields and upload ID proof.');
    return;
  }

  // Validate phone number format
  if (!/^\+91\d{10}$/.test(phone.value)) {
    alert('Phone number must be in +91XXXXXXXXXX format.');
    return;
  }

  // Validate age (must be 18 or above)
  const birthDate = new Date(dob.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const isOldEnough = monthDiff > 0 || (monthDiff === 0 && today.getDate() >= birthDate.getDate());

  if (age < 18 || (age === 18 && !isOldEnough)) {
    alert('You must be at least 18 years old to register.');
    return;
  }

  // Identity proof uploaded
  const proofFile = idProof.files[0];
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(proofFile.type)) {
    alert('Please upload a valid identity proof (PDF or image).');
    return;
  }

  alert('✅ Registration successful!\nYou can now login.');
  e.target.reset();
});

// ======================
// Login Form Handler
// ======================
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Basic check (You can add user data check with localStorage if needed)
  if (email && password) {
    alert('✅ Login successful! Redirecting to vote page...');
    
    // Save login state
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to vote page
    window.location.href = 'vote.html';
  } else {
    alert('❌ Please enter both email and password.');
  }
});





