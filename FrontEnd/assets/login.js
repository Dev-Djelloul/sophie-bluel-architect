const urlLogin = 'http://localhost:5678/api/users/login';

function handleLogin(email, password) {
    const loginData = {
        email: email,
        password: password
    };

    fetch(urlLogin, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.token) {
            sessionStorage.setItem('token', data.token);
            window.location.href = "../index.html"; // Redirect to index.html on successful login

        } else {
            displayErrorMessage('Identifiants invalides. Veuillez réessayer');
        }
    })
}

function displayErrorMessage(message) {

    document.getElementById('email').style.borderColor = 'red'; // Set border color of input fields to red
    document.getElementById('password').style.borderColor = 'red';

    const errorMessageElement = document.querySelector('.error-message'); // Display error message
    errorMessageElement.innerText = message;
    errorMessageElement.style.color = 'red';
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    handleLogin(email, password);
});
