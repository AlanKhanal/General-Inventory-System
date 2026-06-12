let groupMap = {};
let uomMap = {};

document.addEventListener("DOMContentLoaded", () => {
    loadAll();
});


// =====================
// MASTER LOADER
// =====================
async function loadAll() {
    await loadDropdownData();
    await loadProducts();
}


// =====================
// LOAD GROUP + UOM FOR LOOKUP
// =====================
async function loadDropdownData() {
    try {
        const groups = await apiRequest("/productgroup");
        const uoms = await apiRequest("/unitofmeasure");

        // ProductGroup (assumed raw array)
        groups.forEach(g => {
            groupMap[g.id] = g.name;
        });

        // UOM (wrapped response)
        uoms.data.forEach(u => {
            uomMap[u.id] = u.name;
        });

    } catch (err) {
        console.error("Dropdown load error:", err);
    }
}


// =====================
// LOAD PRODUCTS
// =====================
async function loadProducts() {
    try {
        const data = await apiRequest("/product");
        renderTable(data);

    } catch (err) {
        console.error("Product load error:", err);
    }
}


// =====================
// SAVE PRODUCT (unchanged logic)
// =====================
async function saveProduct() {

    const payload = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        productGroupId: document.getElementById("groupId").value,
        unitOfMeasureId: document.getElementById("uomId").value,
        status: document.getElementById("status").value === "true"
    };

    await apiRequest("/product", "POST", payload);

    clearForm();
    loadProducts();
}


// =====================
// TABLE RENDER (FIXED)
// =====================
function renderTable(data) {

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="6">No products found</td></tr>`;
        return;
    }

    data.forEach(p => {

        const groupName = groupMap[p.productGroupId] ?? "Unknown";
        const uomName = uomMap[p.unitOfMeasureId] ?? "Unknown";

        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.description}</td>
                <td>${groupName}</td>
                <td>${uomName}</td>
                <td>${p.status ? "Active" : "Inactive"}</td>
                <td>
                    <button onclick='editProduct(${JSON.stringify(p)})'>Edit</button>
                </td>
            </tr>
        `;
    });
}


// =====================
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("groupId").value = "";
    document.getElementById("uomId").value = "";
    document.getElementById("status").value = "true";
}