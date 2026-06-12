// CHECK IF USER IS LOGGED IN
function isLoggedIn() {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }

    // optional: basic structure check
    return token.split(".").length === 3;
}

// PROTECT PAGE
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    }
}

// LOGOUT FUNCTION (GLOBAL)
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}