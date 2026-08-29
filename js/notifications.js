/*==========================
        NOTIFICATIONS
==========================*/

const notificationsContainer =
    document.getElementById("notificationsContainer");

const emptyNotifications =
    document.getElementById("emptyNotifications");


let allNotifications =
    JSON.parse(localStorage.getItem("notifications")) || [];



const notificationUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


let notifications = [];


/*==========================
   FILTER CURRENT USER
==========================*/

if (notificationUser) {

    notifications = allNotifications.filter(notification => {

        return notification.donor === notificationUser.name ||
               notification.user === notificationUser.name;

    });

}


/*==========================
   SHOW NOTIFICATIONS
==========================*/

function showNotifications() {

    if (!notificationsContainer) {
        return;
    }


    notificationsContainer.innerHTML = "";


    if (notifications.length === 0) {

        if (emptyNotifications) {
            emptyNotifications.style.display = "block";
        }

        return;
    }


    if (emptyNotifications) {
        emptyNotifications.style.display = "none";
    }


    notifications.forEach(notification => {

        notificationsContainer.innerHTML += `

            <div class="notification-card">

                <div class="notification-icon-box">

                    <i class="fa-solid fa-bell"></i>

                </div>


                <div class="notification-content">

                    <h3>
                        ${notification.title}
                    </h3>

                    <p>
                        ${notification.message}
                    </p>

                    <small>
                        ${notification.date}
                    </small>

                </div>

            </div>

        `;

    });

}


showNotifications();


/*==========================
   MARK NOTIFICATIONS READ
==========================*/

function markNotificationsAsRead() {

    let savedNotifications =
        JSON.parse(localStorage.getItem("notifications")) || [];


    const loggedInNotificationUser =
        JSON.parse(localStorage.getItem("loggedInUser"));


    if (!loggedInNotificationUser) {
        return;
    }


    savedNotifications.forEach(notification => {

        if (
            notification.donor === loggedInNotificationUser.name ||
            notification.user === loggedInNotificationUser.name
        ) {

            notification.read = true;

        }

    });


    localStorage.setItem(
        "notifications",
        JSON.stringify(savedNotifications)
    );

}


markNotificationsAsRead();


/*==========================
   RESET DESKTOP COUNT
==========================*/

const notificationCount =
    document.getElementById("notificationCount");


if (notificationCount) {

    notificationCount.textContent = "0";

}


/*==========================
   RESET MOBILE COUNT
==========================*/

const mobileNotificationCount =
    document.getElementById("mobileNotificationCount");


if (mobileNotificationCount) {

    mobileNotificationCount.textContent = "0";

}