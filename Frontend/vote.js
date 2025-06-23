const stateSelect = document.getElementById("state");
const candidateList = document.getElementById("candidateList");
const submitBtn = document.getElementById("submitVote"); // move here ✅

const defaultPartyLogo = "images/default-logo.png";

const candidatesByState = {
  // your full candidate list stays here
  "Andhra Pradesh": [
    { name: "Satyanarayana Pithani", party: "TDP",  logo: "Logos/tdp.jpg" },
    { name: "Dr. Partha Sarathi Valmiki", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "	Konathala Ramakrishna", party: "Janasena Party",  logo: "Logos/jp.webp" }
  ],
   "Arunachal Pradesh": [
    { name: "	Kento Jini", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "	Kumar Waii", party: "INC", logo: "Logos/inc1.jpeg" },
    { name: "	Nikh Kamin", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Assam": [
    { name: "Pradip Sarkar", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Rupsing Teron", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Phanidhar Talukdar", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Bihar": [
    { name: "Krishan Kumar Mantoo", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Abidur Rahman", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Ajay Yadav", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Chhattisgarh": [
    { name: "Indra Kumar Sahu", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Raghavendra Kumar Singh", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Tuleshwar Hira Singh Markam", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Delhi": [
    { name: "Raj Kumar Bhatia", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Gopal Rai", party: "AAP",  logo: "Logos/aap.jpg" },
    { name: "Kailash Gahlot", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Goa": [
    { name: "Alemao Yuri", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Ramesh Tawadkar", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Vijai Sardesai", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Gujarat": [
    { name: "Dr. Hasmukh Patel", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Amit Chavda", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Kaushik Kantibhai Vekariya", party: "BJP", logo: "Logos/bjp.webp" }
  ],
   "Haryana": [
    { name: "Anil Vij", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Nirmal Singh Mohra", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Kuldeep Vats", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Himachal Pradesh": [
    { name: "Lokender Kumar", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Kishori Lal", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Surender Shourie", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Jharkhand": [
    { name: "Shatrughan Mahto", party: "BJP", logo: "Logos/bjp.webp" },
    { name: "Samir Kumar Mohanty", party: "JMM",  logo: "Logos/jmm.jpg" },
    { name: "Manoj Kumar Yadav", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Karnataka": [
    { name: "M.Y.Patil", party: "INC", logo: "Logos/inc1.jpeg" },
    { name: "Prabhu Chavan", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Ramalinga Reddy", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Kerala": [
    { name: "Adv. Job Maichil", party: "Kerala Congress (M)",  logo: "Logos/kc.png" },
    { name: "G.S. Jayalal", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Dr.Sujith Vijayanpillai", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Madhya Pradesh": [
    { name: "Madhav Singh", party: "BJP", logo: "Logos/bjp.webp" },
    { name: "Dr. Rajendra Kumar Singh", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Jitendra Uday Singh Pandya", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Maharashtra": [
    { name: "Ganesh Ramchandra Naik", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Amshya Fulji Padvi", party: "Shiv Sena",  logo: "Logos/ss.png" },
    { name: "Sanjay Puram", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Manipur": [
    { name: "Thounaojam Shyamkumar", party: "BJP", logo: "Logos/bjp.webp" },
    { name: "Nongthombam Biren Singh", party: "	BJP",  logo: "Logos/bjp.webp" },
    { name: "J Kumo Sha", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Meghalaya": [
    { name: "Kartush R. Marak", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Saleng A. Sangma", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Charles Marngar", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Mizoram": [
    { name: "C. Ngunlianchunga", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "K. Hrahmo", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Lalthansanga", party: "Zoram People Movement",  logo: "Logos/zpm.avif" }
  ],
   "Nagaland": [
    { name: "C. Manpon Konyak", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Kazheto", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "H. Tovihoto Ayemi", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Odisha": [
    { name: "Naveen Pattnaik", party: "Biju Janata Dal",  logo: "Logos/Bl.gif" },
    { name: "Sitansu Sekhar Mohapatra", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Mohan Charan Majhi", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
   "Punjab": [
    { name: "Sandeep Jakhar", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Jeevan Jyot Kaur", party: "AAP",  logo: "Logos/aap.jpg" },
    { name: "Harjot Singh Bains", party: "AAP",  logo: "Logos/aap.jpg" }
  ],
   "Rajasthan": [
    { name: "Chhagan Singh Rajpurohit", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Tikaram Jully", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Prashant Sharma", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Sikkim": [
    { name: "Arun Kumar Upreti", party: "Sikkim Krantikari Morcha",  logo: "Logos/skm.jpg" },
    { name: "Rikshal Dorjee Bhutia", party: "Sikkim Krantikari Morcha",  logo: "Logos/skm.jpg" },
    { name: "Puran Kr. Gurung", party: "Sikkim Krantikari Morcha",  logo: "Logos/skm.jpg" }
  ],
   "Tamil Nadu": [
    { name: "Ramachandran T", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Vanathi Srinivasan", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Prince J G", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Telangana": [
    { name: "Chikkudu Vamshi Krishna", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Payal Shanker", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Ilaiah Beerla", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "Tripura": [
    { name: "Sudip Roy Barman", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Ranjit Das", party: "BJP",  logo: "bjp.webp" },
    { name: "Mina Rani Sarkar", party: "BJP",  logo: "bjp.webp" }
  ],
   "Uttarakhand": [
    { name: "Manoj Tewari", party: "INC",  logo: "Logos/inc1.jpeg" },
    { name: "Adesh Chauhan", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Rajendra Singh Bhandari", party: "INC",  logo: "Logos/inc1.jpeg" }
  ],
   "West Bengal": [
    { name: "Mamata Banerjee", party: "Trinamool Congress",  logo: "Logos/TC1.svg" },
    { name: "Suman Kanjilal", party: "BJP",  logo: "Logos/bjp.webp" },
    { name: "Madhusudan Bag", party: "BJP",  logo: "Logos/bjp.webp" }
  ],
};

// ✅ Load candidates when state changes
stateSelect.addEventListener("change", () => {
  const selectedState = stateSelect.value;
  candidateList.innerHTML = "";

  if (candidatesByState[selectedState]) {
    candidatesByState[selectedState].forEach((candidate, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "candidate-card";

      const info = document.createElement("div");
      info.className = "candidate-info";
      info.innerHTML = `<strong>${candidate.name}</strong><br><em>${candidate.party}</em>`;

      const logo = document.createElement("img");
      logo.src = candidate.logo || defaultPartyLogo;
      logo.alt = candidate.party;
      logo.className = "party-logo";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "candidate";
      radio.id = `cand-${index}`;
      radio.value = candidate.name;

      wrapper.appendChild(info);
      wrapper.appendChild(logo);
      wrapper.appendChild(radio);
      candidateList.appendChild(wrapper);
    });
  } else {
    candidateList.innerHTML = "<p>No candidates available for this state.</p>";
  }
});

// ✅ Submit vote logic — OUTSIDE the state change block
submitBtn.addEventListener("click", () => {
  const selectedCandidate = document.querySelector('input[name="candidate"]:checked');

  if (!selectedCandidate) {
    alert("❗ Please select a candidate before submitting your vote.");
    return;
  }

  const selectedName = selectedCandidate.value;
  alert(`✅ You have successfully voted for: ${selectedName}`);

  // Optionally reset form after voting
  candidateList.innerHTML = "";
  stateSelect.value = "";
});






