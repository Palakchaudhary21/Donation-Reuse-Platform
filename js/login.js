/*==========================
LOGIN
==========================*/

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if (!user) {

        alert("Invalid Email or Password!");
        return;

    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert("Login Successful!");

    window.location.href = "index.html";

});