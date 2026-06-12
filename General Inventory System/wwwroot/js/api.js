const BASE_URL = "https://localhost:7293/api";

// GET TOKEN
function getToken() {
    return localStorage.getItem("token");
}

// GENERIC API CALL WRAPPER
async function apiRequest(endpoint, method = "GET", data = null) {

    const token = getToken();

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    // attach JWT token if exists
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    // attach body if needed
    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        // handle unauthorized globally
        if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "login.html";
            return;
        }

        // try parse JSON safely
        const result = await response.json().catch(() => null);

        if (!response.ok) {
            throw result || "Request failed";
        }

        return result;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}