document.getElementById("addCandidateForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const party = document.getElementById("party").value;
  const state = document.getElementById("state").value;
  const logo = document.getElementById("logo").value;

  const response = await fetch("/api/admin/candidates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, party, state, logo })
  });

  const result = await response.json();
  alert(result.message);
});

document.getElementById("deleteCandidateForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("delName").value;
  const state = document.getElementById("delState").value;

  const response = await fetch(`/api/admin/candidates`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, state })
  });

  const result = await response.json();
  alert(result.message);
});


document.getElementById("loadResults").addEventListener("click", async function () {
  const res = await fetch("/api/admin/results");
  const data = await res.json();

  const resultDiv = document.getElementById("resultsTable");
  resultDiv.innerHTML = "<h3>Vote Count by Candidate</h3>";

  if (data.length === 0) {
    resultDiv.innerHTML += "<p>No votes yet.</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th>Candidate</th>
      <th>Party</th>
      <th>State</th>
      <th>Votes</th>
    </tr>
  `;

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.party}</td>
      <td>${item.state}</td>
      <td>${item.votes}</td>
    `;
    table.appendChild(row);
  });

  resultDiv.appendChild(table);
});
