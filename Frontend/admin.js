document.addEventListener('DOMContentLoaded', function() {
  const userRole = localStorage.getItem('userRole');
  const userToken = localStorage.getItem('userToken');
  
  if (userRole !== 'admin' || !userToken) {
    alert('Unauthorized access! Redirecting to login page.');
    window.location.href = 'index.html';
    return;
  }

  loadCandidates();
});

// Add candidate form handler
document.getElementById('addCandidateForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const candidateData = {
    name: document.getElementById('name').value,
    party: document.getElementById('party').value,
    state: document.getElementById('state').value,
    logo: document.getElementById('logo').value
  };

  try {
    const response = await fetch('http://localhost:5000/api/admin/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(candidateData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Candidate added successfully!');
      this.reset();
      loadCandidates(); // Refresh the candidates list
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert('❌ ' + error.message);
  }
});

// Delete candidate form handler
document.getElementById('deleteCandidateForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const candidateName = document.getElementById('delName').value;
  const state = document.getElementById('delState').value;

  try {
    const response = await fetch('http://localhost:5000/api/admin/candidates', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify({ name: candidateName, state: state })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Candidate deleted successfully!');
      this.reset();
      loadCandidates(); // Refresh the candidates list
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert('❌ ' + error.message);
  }
});

// Load and display voting results
async function loadResults() {
  try {
    const response = await fetch('http://localhost:5000/api/admin/results', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    const data = await response.json();
    const resultsTable = document.getElementById('resultsTable');

    if (response.ok) {
      let html = `
        <table>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Party</th>
              <th>State</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
      `;

      data.forEach(result => {
        html += `
          <tr>
            <td>${result.candidateName}</td>
            <td>${result.party}</td>
            <td>${result.state}</td>
            <td>${result.votes}</td>
          </tr>
        `;
      });

      html += '</tbody></table>';
      resultsTable.innerHTML = html;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error loading results:', error);
    document.getElementById('resultsTable').innerHTML = 
      '<p class="error">Error loading results. Please try again.</p>';
  }
}

// Load results button handler
document.getElementById('loadResults').addEventListener('click', loadResults);

// Function to load and display all candidates
async function loadCandidates() {
  try {
    const response = await fetch('http://localhost:5000/api/admin/candidates', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    const candidates = await response.json();
    const candidatesList = document.getElementById('candidatesList');

    if (response.ok) {
      let html = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Party</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
      `;

      candidates.forEach(candidate => {
        html += `
          <tr>
            <td>${candidate.name}</td>
            <td>${candidate.party}</td>
            <td>${candidate.state}</td>
          </tr>
        `;
      });

      html += '</tbody></table>';
      candidatesList.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading candidates:', error);
  }
}