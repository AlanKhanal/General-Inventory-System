window.onload = function () {
    loadPurchases();
};

// =====================
// LOAD PURCHASES
// =====================
function loadPurchases() {

    fetch("/api/purchase", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {
            renderTable(data);
        })
        .catch(err => console.error("Error:", err));
}


// =====================
// RENDER TABLE
// =====================
function renderTable(data) {

    const table = document.getElementById("purchaseTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="5">No purchases found</td></tr>`;
        return;
    }

    data.forEach(p => {

        const vendor = p.vendorName || p.vendor?.name || p.vendorId;
        const date = p.date || p.createdAt || "-";
        const total = p.totalAmount || "-";

        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${vendor}</td>
                <td>${date}</td>
                <td>${total}</td>
                <td>
                    <button onclick="viewPurchase(${p.id})">View</button>
                </td>
            </tr>
        `;
    });
}


// =====================
// VIEW DETAILS
// =====================
function viewPurchase(id) {

    fetch(`/api/purchase/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {

            let html = `
            <p><b>Purchase ID:</b> ${data.id}</p>
            <p><b>Vendor:</b> ${data.vendorName || data.vendor?.name || data.vendorId}</p>
            <hr>
            <h4>Items</h4>
        `;

            if (data.items && data.items.length > 0) {

                data.items.forEach(i => {
                    html += `
                    <p>
                        Product: ${i.productName || i.product?.name || i.productId} <br>
                        Qty: ${i.quantity} <br>
                        Rate: ${i.purchasePrice}
                    </p>
                    <hr>
                `;
                });

            } else {
                html += `<p>No items found</p>`;
            }

            document.getElementById("detailBox").innerHTML = html;
            document.getElementById("modal").classList.remove("hidden");
        });
}


// =====================
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}