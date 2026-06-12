document.addEventListener("DOMContentLoaded", () => {
    loadCustomers();
});


// =====================
// LOAD ALL
// =====================
async function loadCustomers() {

    try {
        const data = await apiRequest("/customer");
        renderTable(data);

    } catch (err) {
        console.error("GET customer error:", err);
    }
}


// =====================
// SAVE (CREATE + UPDATE)
// =====================
async function saveCustomer() {

    const id = document.getElementById("customerId").value;

    const payload = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        mobileNo: document.getElementById("mobile").value
    };

    try {

        if (id) {
            await apiRequest(`/customer/${id}`, "PUT", payload);
            showMsg("Updated successfully");
        } else {
            await apiRequest("/customer", "POST", payload);
            showMsg("Created successfully");
        }

        clearForm();
        loadCustomers();

    } catch (err) {
        console.error("SAVE error:", err);
        showMsg("Operation failed");
    }
}


// =====================
// EDIT
// =====================
function editCustomer(c) {

    document.getElementById("customerId").value = c.id;
    document.getElementById("name").value = c.name;
    document.getElementById("description").value = c.description;
    document.getElementById("mobile").value = c.mobileNo;
}


// =====================
// TABLE
// =====================
function renderTable(data) {

    const table = document.getElementById("customerTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No customers found</td></tr>`;
        return;
    }

    data.forEach(c => {

        table.innerHTML += `
            <tr>
                <td>${c.name ?? "-"}</td>
                <td>${c.description ?? "-"}</td>
                <td>${c.mobileNo ?? "-"}</td>
                <td>
                    <button onclick='editCustomer(${JSON.stringify(c)})'>Edit</button>
                </td>
            </tr>
        `;
    });
}


// =====================
function clearForm() {
    document.getElementById("customerId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("mobile").value = "";
}

function showMsg(msg) {
    document.getElementById("msg").innerText = msg;
}