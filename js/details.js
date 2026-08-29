/* ==========================
   ITEM DETAILS PAGE
========================== */

const item = JSON.parse(localStorage.getItem("selectedItem"));

if (item) {

    document.getElementById("detailImage").src = item.image;
    document.getElementById("detailName").textContent = item.name;
    document.getElementById("detailCategory").textContent = item.category;
    document.getElementById("detailLocation").textContent = item.location;
    document.getElementById("detailCondition").textContent = item.condition;
    document.getElementById("detailDescription").textContent = item.description;
    document.getElementById("detailDonor").textContent =
        item.donor || "ReWear Community";
    document.getElementById("detailPosted").textContent =
        item.posted || "Recently";

} else {

    // Agar direct item-details.html open kiya ho
    window.location.href = "index.html";
}


/* ==========================
   REQUEST MODAL
========================== */

const openBtn = document.getElementById("openRequest");
const modal = document.getElementById("requestModal");
const closeBtn = document.querySelector(".close-modal");
const requestForm = document.getElementById("requestForm");


if (openBtn && modal) {

    /* ==========================
       OPEN MODAL
    ========================== */

    openBtn.addEventListener("click", () => {

        const currentUser =
            JSON.parse(localStorage.getItem("loggedInUser"));

        // Login required
        if (!currentUser) {

            alert("Please login first!");

            window.location.href = "login.html";

            return;
        }

        // Open request form
        modal.classList.add("active");

    });


    /* ==========================
       CLOSE MODAL
    ========================== */

    if (closeBtn) {

        closeBtn.addEventListener("click", () => {

            modal.classList.remove("active");

        });

    }


    /* ==========================
       CLICK OUTSIDE MODAL
    ========================== */

    window.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.classList.remove("active");

        }

    });


    /* ==========================
       ESC KEY
    ========================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            modal.classList.remove("active");

        }

    });


    /* ==========================
       SUBMIT REQUEST
    ========================== */

    if (requestForm) {

        requestForm.addEventListener("submit", (e) => {

            e.preventDefault();


            /* ==========================
               CREATE REQUEST OBJECT
            ========================== */

           const request = {
    item: document.getElementById("detailName").textContent,
    donationId: item.id,
    donor: item.donor || "ReWear Community",

    name: document.getElementById("userName").value,
    email: document.getElementById("userEmail").value,
    phone: document.getElementById("userPhone").value,

    message: document.getElementById("userMessage").value,

    date: new Date().toLocaleString(),
    status: "Pending"
};

            /* ==========================
               SAVE REQUEST
            ========================== */

            let requests =
                JSON.parse(localStorage.getItem("requests")) || [];

            requests.push(request);

            localStorage.setItem(
                "requests",
                JSON.stringify(requests)
            );


            /* ==========================
               NOTIFICATIONS
            ========================== */

            let notifications =
                JSON.parse(localStorage.getItem("notifications")) || [];


            /* ==========================
               DONOR NOTIFICATION
            ========================== */

            notifications.unshift({

                id: Date.now(),

                title: "New Request 📩",

                message:
                    `Someone has requested your ${request.item}.`,

                date: new Date().toLocaleString(),

                read: false,

                donor: request.donor,

                donationId: request.donationId

            });


            /* ==========================
               REQUESTER NOTIFICATION
            ========================== */

            notifications.unshift({

                id: Date.now() + 1,

                title: "Request Sent 📩",

                message:
                    `You requested ${request.item}.`,

                date: new Date().toLocaleString(),

                read: false

            });


            /* ==========================
               SAVE NOTIFICATIONS
            ========================== */

            localStorage.setItem(
                "notifications",
                JSON.stringify(notifications)
            );


            /* ==========================
               SUCCESS
            ========================== */

            alert("✅ Request Submitted Successfully!");


            requestForm.reset();

            modal.classList.remove("active");

        });

    }

}