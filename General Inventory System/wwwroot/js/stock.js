window.onload = function () {
    loadStock();
};


// =====================
// LOAD STOCK
// =====================
function loadStock() {

    fetch("/api/product/stock", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {
            renderStock(data);
        })
        .catch(err => console.error(err));
}


// =====================
// RENDER STOCK TABLE
// =====================
function renderStock(data) {

    const table = document.getElementById("stockTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No stock available</td></tr>`;
        return;
    }

    data.forEach(p => {

        table.innerHTML += `
            <tr>
                <td>${p.productName ?? p.name}</td>
                <td>${p.quantity}</td>
                <td>${p.averageRate}</td>
                <td>${p.totalValue}</td>
            </tr>
        `;
    });
}