const apiUrl = "/api/vendor";

window.onload = function () {
    loadVendors();
};

function loadVendors() {
    fetch(apiUrl, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(r => r.json())
    .then(data => {
        let table = document.getElementById("vendorTable");
        table.innerHTML = "";

        data.forEach(v => {
            table.innerHTML += `
                <tr>
                    <td>${v.name}</td>
                    <td>${v.description ?? ''}</td>
                </tr>
            `;
        });
    });
}

function saveVendor() {
    let vendor = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(vendor)
    }).then(() => loadVendors());
}