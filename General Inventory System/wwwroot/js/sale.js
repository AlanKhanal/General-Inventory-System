let products = [];

window.onload = function () {
    loadCustomers();
    loadProducts();
    addItemRow();
};


// =====================
// LOAD CUSTOMERS
// =====================
function loadCustomers() {

    fetch("/api/customer", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {

            const select = document.getElementById("customerId");
            data.forEach(c => {
                select.innerHTML += `<option value="${c.id}">${c.name}</option>`;
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
// ADD ITEM ROW
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
            <td><input type="number" value="1"></td>
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
// SUBMIT SALE
// =====================
function submitSale() {

    const customerId = document.getElementById("customerId").value || null;

    const rows = document.querySelectorAll("#itemTable tr");

    let items = [];

    rows.forEach(r => {

        const select = r.querySelector("select");
        const inputs = r.querySelectorAll("input");

        items.push({
            productId: parseInt(select.value),
            quantity: parseFloat(inputs[0].value),
            salesPrice: parseFloat(inputs[1].value)
        });
    });

    const payload = {
        customerId: customerId ? parseInt(customerId) : null,
        items: items
    };

    fetch("/api/sale", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(payload)
    })
        .then(r => r.json())
        .then(res => {
            alert("Sale created successfully!");
            console.log(res);
        })
        .catch(err => {
            console.error(err);
            alert("Error creating sale");
        });
}