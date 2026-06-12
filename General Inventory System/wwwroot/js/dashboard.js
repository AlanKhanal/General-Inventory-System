// ================================
// DASHBOARD CONTROLLER
// ================================

document.addEventListener("DOMContentLoaded", () => {
    initializeDashboard();
});

// ================================
// INIT
// ================================
async function initializeDashboard() {
    try {
        showLoadingState();

        await Promise.all([
            loadSummaryCounts(),
            loadStockOverview()
        ]);

        setUserInfo();

    } catch (error) {
        console.error("Dashboard initialization failed:", error);
        showErrorState();
    }
}

// ================================
// LOADING STATE (NO FAKE DATA)
// ================================
function showLoadingState() {
    setText("productCount", "...");
    setText("vendorCount", "...");
    setText("customerCount", "...");
    setText("stockCount", "...");

    const table = document.getElementById("stockTable");
    if (table) {
        table.innerHTML = `
            <tr>
                <td colspan="4">Loading data...</td>
            </tr>
        `;
    }
}

// ================================
// SUMMARY CARDS
// ================================
async function loadSummaryCounts() {
    try {
        const [products, vendors, customers] = await Promise.all([
            apiRequest("/product"),
            apiRequest("/vendor"),
            apiRequest("/customer")
        ]);

        setText("productCount", products?.length ?? 0);
        setText("vendorCount", vendors?.length ?? 0);
        setText("customerCount", customers?.length ?? 0);

    } catch (error) {
        console.error("Summary load failed:", error);

        // no fake data → just show 0
        setText("productCount", 0);
        setText("vendorCount", 0);
        setText("customerCount", 0);
    }
}

// ================================
// STOCK OVERVIEW
// ================================
async function loadStockOverview() {
    try {
        const stock = await apiRequest("/product/stock");

        if (!Array.isArray(stock)) throw new Error("Invalid stock response");

        setText("stockCount", stock.length);
        renderStock(stock);

    } catch (error) {
        console.error("Stock load failed:", error);

        setText("stockCount", 0);

        const table = document.getElementById("stockTable");
        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="4">Failed to load stock data</td>
                </tr>
            `;
        }
    }
}

// ================================
// RENDER STOCK TABLE
// ================================
function renderStock(data) {

    const table = document.getElementById("stockTable");
    if (!table) return;

    table.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="4">No stock available</td>
            </tr>
        `;
        return;
    }

    data.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.productName ?? p.name ?? "-"}</td>
                <td>${p.quantity ?? 0}</td>
                <td>${p.averageRate ?? 0}</td>
                <td>${p.totalValue ?? 0}</td>
            </tr>
        `;
    });
}

// ================================
// USER INFO
// ================================
function setUserInfo() {
    const userInfo = document.getElementById("userInfo");
    if (!userInfo) return;

    const token = localStorage.getItem("token");
    userInfo.innerText = token ? "Logged In" : "Guest";
}

// ================================
// SAFE TEXT SETTER
// ================================
function setText(elementId, data) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (typeof data === "number") el.innerText = data;
    else if (typeof data === "string") el.innerText = data;
    else if (Array.isArray(data)) el.innerText = data.length;
    else el.innerText = 0;
}

// ================================
// ERROR STATE (NO FAKE DATA)
// ================================
function showErrorState() {
    setText("productCount", 0);
    setText("vendorCount", 0);
    setText("customerCount", 0);
    setText("stockCount", 0);

    const table = document.getElementById("stockTable");
    if (table) {
        table.innerHTML = `
            <tr>
                <td colspan="4">Unable to load dashboard data</td>
            </tr>
        `;
    }
}