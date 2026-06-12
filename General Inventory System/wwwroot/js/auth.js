const API = "https://localhost:7293/api/auth";
/*const API = "https://inventorysystem.somee.com/api/auth";*/
// LOGIN
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    try {
        const response = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            msg.innerText = "Invalid login";
            return;
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);

        window.location.href = "dashboard.html";

    } catch (error) {
        msg.innerText = "Server error";
    }
}


// REGISTER
async function register() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobileNo = document.getElementById("mobileNo").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    try {
        const response = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                mobileNo,
                password
            })
        });

        if (!response.ok) {
            const err = await response.text();
            msg.innerText = err;
            return;
        }

        msg.innerText = "Registered successfully! Redirecting...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);

    } catch (error) {
        msg.innerText = "Server error";
    }
}