/*==========================
    PROFILE
==========================*/

const currentUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


/*==========================
    LOGIN CHECK
==========================*/

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}


/*==========================
    USER INFORMATION
==========================*/

document.getElementById("profileName").textContent =
    currentUser.name;

document.getElementById("profileEmail").textContent =
    currentUser.email;


/*==========================
    GET DONATIONS
==========================*/

let donations =
    JSON.parse(localStorage.getItem("donations")) || [];


/*==========================
    GET REQUESTS
==========================*/

let allRequests =
    JSON.parse(localStorage.getItem("requests")) || [];


/*==========================
    USER REQUESTS
==========================*/

let userRequests = allRequests.filter((request) => {

    return request.email === currentUser.email;

});


/*==========================
    TOTAL DONATIONS
==========================*/

document.getElementById("totalDonations").textContent =
    donations.filter((item) => {

        return item.donor === currentUser.name;

    }).length;


/*==========================
    TOTAL REQUESTS
==========================*/

document.getElementById("totalRequests").textContent =
    userRequests.length;


/*==========================
    LOGOUT
==========================*/

document.getElementById("profileLogout")
.addEventListener("click", () => {

    localStorage.removeItem("loggedInUser");

    alert("You have been logged out.");

    window.location.href = "login.html";

});