let products = [];

window.onload = function () {
    loadVendors();
    loadProducts();
};


// =====================
// LOAD VENDORS
// =====================
function loadVendors() {

    fetch("/api/vendor", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {

            const select = document.getElementById("vendorId");
            select.innerHTML = "<option value=''>Select Vendor</option>";

            data.forEach(v => {
                select.innerHTML += `<option value="${v.id}">${v.name}</option>`;
            });
        });
}


// =====================
// LOAD PRODUCTS
// =====================
function loadProducts() {

    fetch("/api/product", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {
            products = data;
        });
}


// =====================
// ADD ITEM ROW (IMPROVED)
// =====================
function addItemRow() {

    const table = document.getElementById("itemTable");

    const rowId = Date.now();

    let productOptions = "<option value=''>Select Product</option>";

    products.forEach(p => {
        productOptions += `<option value="${p.id}">${p.name}</option>`;
    });

    table.innerHTML += `
        <tr id="row-${rowId}">
            <td>
                <select>
                    ${productOptions}
                </select>
            </td>
            <td><input type="number" min="1" value="1"></td>
            <td><input type="number"></td>
            <td><input type="number"></td>
            <td><button onclick="removeRow(${rowId})">X</button></td>
        </tr>
    `;
}


// =====================
// REMOVE ROW
// =====================
function removeRow(id) {
    document.getElementById("row-" + id).remove();
}


// =====================
// SUBMIT PURCHASE
// =====================
function submitPurchase() {

    const vendorId = document.getElementById("vendorId").value;

    const rows = document.querySelectorAll("#itemTable tr");

    let items = [];

    rows.forEach(r => {

        const select = r.querySelector("select");
        const inputs = r.querySelectorAll("input");

        items.push({
            productId: parseInt(select.value),
            quantity: parseFloat(inputs[0].value),
            purchasePrice: parseFloat(inputs[1].value),
            salesPrice: parseFloat(inputs[2].value)
        });
    });

    const payload = {
        vendorId: parseInt(vendorId),
        items: items
    };

    fetch("/api/purchase", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(payload)
    })
        .then(r => r.json())
        .then(res => {
            alert("Purchase created successfully!");
            console.log(res);
        })
        .catch(err => {
            console.error(err);
            alert("Error creating purchase");
        });
}