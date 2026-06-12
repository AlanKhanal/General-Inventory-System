document.addEventListener("DOMContentLoaded", () => {
    loadGroups();
});

// =======================
// LOAD DATA
// =======================
async function loadGroups() {
    try {
        const data = await apiRequest("/productgroup");

        console.log("GET /productgroup response:", data);

        renderTable(data);

    } catch (err) {
        console.error("GET error:", err);
        showMsg("Failed to load data");
    }
}

// =======================
// CREATE ONLY (NO UPDATE YET)
// =======================
async function saveGroup() {

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;

    const payload = { name, description };

    try {
        const result = await apiRequest("/productgroup", "POST", payload);

        console.log("POST response:", result);

        showMsg("Saved successfully");
        clearForm();
        loadGroups();

    } catch (err) {
        console.error("POST error:", err);
        showMsg("Save failed");
    }
}

// =======================
// DELETE (NOT SUPPORTED YET)
// =======================
function deleteGroup() {
    alert("DELETE not available in backend yet ❌");
}

// =======================
// EDIT (NOT SUPPORTED YET)
// =======================
function editGroup() {
    alert("EDIT not available in backend yet ❌");
}

// =======================
// RENDER TABLE
// =======================
function renderTable(data) {

    const table = document.getElementById("groupTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `
            <tr><td colspan="3">No data found</td></tr>
        `;
        return;
    }

    data.forEach(g => {

        table.innerHTML += `
            <tr>
                <td>${g.name ?? "-"}</td>
                <td>${g.description ?? "-"}</td>
                <td>
                    <button onclick="editGroup()">Edit</button>
                    <button onclick="deleteGroup()">Delete</button>
                </td>
            </tr>
        `;
    });
}

// =======================
// UTIL
// =======================
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
}

function showMsg(msg) {
    document.getElementById("msg").innerText = msg;
}