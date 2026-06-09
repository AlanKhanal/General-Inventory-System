const apiUrl = "/api/customer";

window.onload = function () {
    loadCustomers();
};

function loadCustomers() {
    fetch(apiUrl, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then(r => r.json())
        .then(data => {
            let table = document.getElementById("customerTable");
            table.innerHTML = "";

            data.forEach(c => {
                table.innerHTML += `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.description ?? ''}</td>
                </tr>
            `;
            });
        });
}

function saveCustomer() {
    let customer = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(customer)
    }).then(() => loadCustomers());
}