/*==========================
    REQUEST HISTORY
==========================*/

const requestList = document.getElementById("requestList");
const emptyRequests = document.getElementById("emptyRequests");
const clearBtn = document.getElementById("clearRequests");

let requests = JSON.parse(localStorage.getItem("requests")) || [];

function showRequests() {

    requestList.innerHTML = "";

    document.getElementById("requestCount").textContent = requests.length;


    if (requests.length === 0) {

        emptyRequests.style.display = "block";
        return;

    }

    emptyRequests.style.display = "none";

    requests.forEach((request, index) => {

        requestList.innerHTML += `

        <div class="request-card">

            <h3>📦 ${request.item}</h3>

            <p><strong>👤 Name:</strong> ${request.name}</p>

            <p><strong>📧 Email:</strong> ${request.email}</p>

            <p><strong>📱 Phone:</strong> ${request.phone}</p>

            <p><strong>📝 Message:</strong> ${request.message}</p>

            <p>
                <strong>📌 Status:</strong>
                <span class="status pending">Pending</span>
            </p>


            <button class="delete-btn" onclick="deleteRequest(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

function deleteRequest(index) {

    requests.splice(index, 1);

    localStorage.setItem("requests", JSON.stringify(requests));

    showRequests();

}

clearBtn.addEventListener("click", () => {

    if (confirm("Delete all requests?")) {

        localStorage.removeItem("requests");

        requests = [];

        showRequests();

    }

});

showRequests();