document.addEventListener("DOMContentLoaded", () => {
    loadUom();
});


// =====================
// GET ALL (ONLY DATA)
// =====================
async function loadUom() {
    try {
        const response = await apiRequest("/unitofmeasure");

        // IMPORTANT: backend returns { data, userId }
        const data = response.data;

        renderTable(data);

    } catch (err) {
        console.error("GET UOM error:", err);
        showMsg("Failed to load UOM");
    }
}


// =====================
// CREATE ONLY (POST SUPPORTED)
// =====================
function saveUOM() {

    const name = document.getElementById("name").value.trim();
    const code = document.getElementById("code").value.trim();
    const description = document.getElementById("description").value.trim();

    const msg = document.getElementById("msg");

    if (!name || !code || !description) {
        msg.innerText = "All fields are required";
        return;
    }

    const uom = {
        name,
        code,
        description
    };

    fetch("/unitofmeasure", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(uom)
    })
        .then(r => {
            if (!r.ok) {
                throw new Error("Validation failed");
            }

            return r.json();
        })
        .then(() => {
            msg.innerText = "Saved successfully";
        })
        .catch(() => {
            msg.innerText = "Error saving UOM";
        });
}

// =====================
// NOT SUPPORTED FEATURES
// =====================
function editUom() {
    alert("Edit not available (PUT endpoint missing in backend)");
}

function deleteUom() {
    alert("Delete not available (DELETE endpoint missing in backend)");
}


// =====================
// TABLE RENDER
// =====================
function renderTable(data) {

    const table = document.getElementById("uomTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No data found</td></tr>`;
        return;
    }

    data.forEach(u => {

        table.innerHTML += `
            <tr>
                <td>${u.name ?? "-"}</td>
                <td>${u.code ?? "-"}</td>
                <td>${u.description ?? "-"}</td>
                <td>
                    <button onclick="editUom()">Edit</button>
                    <button onclick="deleteUom()">Delete</button>
                </td>
            </tr>
        `;
    });
}


// =====================
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
    document.getElementById("description").value = "";
}

function showMsg(msg) {
    document.getElementById("msg").innerText = msg;
}