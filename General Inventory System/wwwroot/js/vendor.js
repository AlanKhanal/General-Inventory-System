const apiUrl = "/api/vendor";

window.onload = function () {
    loadVendors();
};


// =====================
// GET ALL
// =====================
function loadVendors() {

    fetch(apiUrl, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {
            renderTable(data);
        })
        .catch(err => {
            console.error("GET vendor error:", err);
        });
}


// =====================
// SAVE (CREATE + UPDATE)
// =====================
function saveVendor() {

    const id = document.getElementById("vendorId").value;

    const vendor = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(vendor)
    })
        .then(res => {
            if (!res.ok) throw new Error("Save failed");
            return res.text();
        })
        .then(() => {
            clearForm();
            loadVendors();
            showMsg(id ? "Updated successfully" : "Created successfully");
        })
        .catch(err => {
            console.error("SAVE error:", err);
            showMsg("Operation failed");
        });
}


// =====================
// EDIT (LOAD SINGLE)
// =====================
function editVendor(v) {

    document.getElementById("vendorId").value = v.id;
    document.getElementById("name").value = v.name;
    document.getElementById("description").value = v.description;
}


// =====================
// TABLE RENDER
// =====================
function renderTable(data) {

    const table = document.getElementById("vendorTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="3">No vendors found</td></tr>`;
        return;
    }

    data.forEach(v => {

        table.innerHTML += `
            <tr>
                <td>${v.name}</td>
                <td>${v.description ?? "-"}</td>
                <td>
                    <button onclick='editVendor(${JSON.stringify(v)})'>Edit</button>
                </td>
            </tr>
        `;
    });
}


// =====================
function clearForm() {
    document.getElementById("vendorId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
}

function showMsg(msg) {
    document.getElementById("msg").innerText = msg;
}