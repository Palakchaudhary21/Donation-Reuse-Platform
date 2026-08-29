/*==========================
    MY REQUESTS
==========================*/

const requestContainer =
    document.getElementById("requestContainer");

const emptyRequests =
    document.getElementById("emptyRequests");


    /*==========================
    LOGIN CHECK
==========================*/

const currentUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}


/*==========================
    GET REQUESTS
==========================*/

let allRequests =
    JSON.parse(localStorage.getItem("requests")) || [];

let requests = allRequests.filter((request) => {

    return request.email === currentUser.email;

});

/*==========================
    SHOW REQUESTS
==========================*/

function showRequests() {

    requestContainer.innerHTML = "";

    if (requests.length === 0) {

        emptyRequests.style.display = "block";

        return;

    }

    emptyRequests.style.display = "none";


    requests.forEach((request) => {

        requestContainer.innerHTML += `

        <div class="request-card">

            <h3>

                <i class="fa-solid fa-box"></i>

                ${request.item}

            </h3>

            <p>

                <strong>Name:</strong>

                ${request.name}

            </p>

            <p>

                <strong>Email:</strong>

                ${request.email}

            </p>

            <p>

                <strong>Phone:</strong>

                ${request.phone}

            </p>

            <p>

                <strong>Message:</strong>

                ${request.message}

            </p>

            <p>

                <strong>Status:</strong>

                <span class="status ${request.status?.toLowerCase() || "pending"}">

                    ${request.status || "Pending"}

                </span>

            </p>

            <p>

                <strong>Requested:</strong>

                ${request.date || "Recently"}

            </p>

        </div>

        `;

    });

}


/*==========================
    INITIAL LOAD
==========================*/

showRequests();