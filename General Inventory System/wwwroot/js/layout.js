async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    const response = await fetch("../pages/navbar.html");

    const html = await response.text();

    navbar.innerHTML = html;
}


// ======================
// LOGOUT
// ======================
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}


window.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
});