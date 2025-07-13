document.addEventListener('DOMContentLoaded', function() {
  const userEmail = localStorage.getItem('userEmail');
  const userToken = localStorage.getItem('userToken');
  
  if (!userToken) {
    alert('Please login first!');
    window.location.href = 'index.html';
    return;
  }

  if (localStorage.getItem(`voted_${userEmail}`)) {
    alert('You have already cast your vote!');
    window.location.href = 'index.html';
    return;
  }
});

const stateSelect = document.getElementById("state");
const candidateList = document.getElementById("candidateList");
const submitBtn = document.getElementById("submitVote");
const defaultPartyLogo = "images/default-logo.png";

// Load candidates from database when state changes
// Update the API URL to match the endpoint
stateSelect.addEventListener("change", async () => {
  const selectedState = stateSelect.value;
  candidateList.innerHTML = "";

  try {
    const response = await fetch(`http://localhost:5000/api/admin/candidates/${selectedState}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch candidates');
    }

    const candidates = await response.json();

    if (candidates && candidates.length > 0) {
      candidates.forEach((candidate, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "candidate-card";

        const info = document.createElement("div");
        info.className = "candidate-info";
        info.innerHTML = `<strong>${candidate.name}</strong><br><em>${candidate.party}</em>`;

        const logo = document.createElement("img");
        logo.src = candidate.logo || 'images/default-logo.png';
        logo.alt = candidate.party;
        logo.className = "party-logo";
        logo.onerror = () => logo.src = 'images/default-logo.png';

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "candidate";
        radio.id = `cand-${index}`;
        radio.value = candidate.name;
        radio.setAttribute('data-party', candidate.party);

        wrapper.appendChild(info);
        wrapper.appendChild(logo);
        wrapper.appendChild(radio);
        candidateList.appendChild(wrapper);
      });
    } else {
      candidateList.innerHTML = "<p>No candidates available for this state.</p>";
    }
  } catch (error) {
    console.error('Error:', error);
    candidateList.innerHTML = "<p>Error loading candidates. Please try again.</p>";
  }
});

// Submit vote logic
submitBtn.addEventListener("click", async () => {
  const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
  const selectedState = stateSelect.value;

  if (!selectedCandidate || !selectedState) {
    alert("❗ Please select both a state and a candidate before submitting your vote.");
    return;
  }

  const token = localStorage.getItem("userToken");
  const userEmail = localStorage.getItem("userEmail");

  if (!token || !userEmail) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/vote/cast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        candidateName: selectedCandidate.value,
        party: selectedCandidate.getAttribute('data-party'),
        state: selectedState,
        voterEmail: userEmail
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem(`voted_${userEmail}`, 'true');
      alert("✅ Vote cast successfully!");
      window.location.href = "index.html";
    } else {
      throw new Error(data.message || "Failed to cast vote");
    }
  } catch (error) {
    console.error("Error casting vote:", error);
    alert("❌ " + (error.message || "Error casting vote. Please try again."));
  }
});