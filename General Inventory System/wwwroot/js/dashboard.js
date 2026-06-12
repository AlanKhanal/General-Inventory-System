// ================================
// DASHBOARD CONTROLLER
// ================================

document.addEventListener("DOMContentLoaded", () => {
    initializeDashboard();
});

// INIT
async function initializeDashboard() {
    try {
        await loadSummaryCounts();
        await loadStockOverview();
        setUserInfo();
    } catch (error) {
        console.error("Dashboard initialization failed:", error);
    }
}

// ================================
// LOAD SUMMARY CARDS
// ================================
async function loadSummaryCounts() {
    try {
        const [products, vendors, customers] = await Promise.all([
            apiRequest("/product"),
            apiRequest("/vendor"),
            apiRequest("/customer")
        ]);

        setText("productCount", products);
        setText("vendorCount", vendors);
        setText("customerCount", customers);

    } catch (error) {
        console.error("Summary load failed:", error);
    }
}

// ================================
// STOCK OVERVIEW
// ================================
async function loadStockOverview() {
    try {
        const stock = await apiRequest("/stock");

        setText("stockCount", stock);

        renderStockTable(stock);

    } catch (error) {
        console.error("Stock load failed:", error);
    }
}

// ================================
// RENDER STOCK TABLE
// ================================
function renderStockTable(stockList) {

    const table = document.getElementById("stockTable");
    table.innerHTML = "";

    if (!stockList || stockList.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4">No stock data available</td>
            </tr>
        `;
        return;
    }

    stockList.forEach(item => {

        const row = `
            <tr>
                <td>${item.productName ?? "-"}</td>
                <td>${item.quantity ?? 0}</td>
                <td>${item.averageRate ?? 0}</td>
                <td>${item.totalValue ?? 0}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

// ================================
// USER INFO (OPTIONAL)
// ================================
function setUserInfo() {
    const token = localStorage.getItem("token");

    if (!token) return;

    const userInfo = document.getElementById("userInfo");
    if (userInfo) {
        userInfo.innerText = "Logged In";
    }
}

// ================================
// UTILITY: SET TEXT SAFE
// ================================
function setText(elementId, data) {
    const el = document.getElementById(elementId);

    if (!el) return;

    if (Array.isArray(data)) {
        el.innerText = data.length;
    } else if (typeof data === "number") {
        el.innerText = data;
    } else {
        el.innerText = 0;
    }
}