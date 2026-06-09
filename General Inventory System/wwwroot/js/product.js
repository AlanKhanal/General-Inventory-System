const apiUrl = "/api/product";

window.onload = function () {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login.html";
        return;
    }

    loadProducts();
};

function authHeader() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    };
}
function loadProducts() {
    fetch(apiUrl, {
        headers: authHeader()
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch products");
            return res.json();
        })
        .then(data => {
            let table = document.getElementById("productTable");
            table.innerHTML = "";

            data.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.description ?? ''}</td>
                        <td>
                            <button onclick="editProduct(${p.id})">Edit</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.log("Load error:", err));
}
function saveProduct() {
    let id = document.getElementById("productId").value;

    let product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        productGroupId: parseInt(document.getElementById("groupId").value),
        unitOfMeasureId: parseInt(document.getElementById("uomId").value)
    };

    let url = id ? `${apiUrl}/${id}` : apiUrl;
    let method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: authHeader(),
        body: JSON.stringify(product)
    })
        .then(res => {
            if (!res.ok) throw new Error("Save failed");
            return res.text();
        })
        .then(() => {
            loadProducts();
            clearForm();
        })
        .catch(err => console.log("Save error:", err));
}
function editProduct(id) {
    fetch(`${apiUrl}/${id}`, {
        headers: authHeader()
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch product");
            return res.json();
        })
        .then(p => {
            document.getElementById("productId").value = p.id;
            document.getElementById("name").value = p.name;
            document.getElementById("description").value = p.description;
            document.getElementById("groupId").value = p.productGroupId;
            document.getElementById("uomId").value = p.unitOfMeasureId;
        })
        .catch(err => console.log("Edit error:", err));
}
function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("groupId").value = "";
    document.getElementById("uomId").value = "";
}