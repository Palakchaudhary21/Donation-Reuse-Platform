/* ==========================
   MOBILE MENU
========================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", function () {

        mobileMenu.classList.toggle("active");

    });


    /* Close menu after clicking navigation links */

    const mobileNavLinks = mobileMenu.querySelectorAll("a");

    mobileNavLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

        });

    });

}

/*==========================
BACK TO TOP
==========================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        backToTop.style.display="block";

    }

    else{

        backToTop.style.display="none";

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

    /*==========================
         NAVBAR SCROLL EFFECT
    ==========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/*==========================
ANIMATED COUNTER
==========================*/

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 150;

        const updateCounter = () => {

            if(count < target){

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            }

            else{

                counter.innerText = target + "+";

            }

        };

        updateCounter();

    });

};

const statsSection = document.querySelector(".stats");

let started = false;

window.addEventListener("scroll",()=>{

    if(!started && window.scrollY > statsSection.offsetTop-500){

        startCounter();

        started = true;

    }

});

/*==========================
HERO PARALLAX
==========================*/

const hero = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");

const shape1 = document.querySelector(".shape1");
const shape2 = document.querySelector(".shape2");
const shape3 = document.querySelector(".shape3");

hero.addEventListener("mousemove", (e)=>{

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    heroImage.style.transform =
    `translate(${x*20}px, ${y*20}px)`;

    shape1.style.transform =
    `translate(${x*-35}px, ${y*-35}px)`;

    shape2.style.transform =
    `translate(${x*30}px, ${y*30}px)`;

    shape3.style.transform =
    `translate(${x*-20}px, ${y*20}px)`;

});

hero.addEventListener("mouseleave", ()=>{

    heroImage.style.transform="translate(0,0)";

    shape1.style.transform="translate(0,0)";

    shape2.style.transform="translate(0,0)";

    shape3.style.transform="translate(0,0)";

});


/*==========================
    SEARCH + CATEGORY + LOCATION FILTER
==========================*/

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".filter-btn");
const locationFilter = document.getElementById("locationFilter");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";
let selectedLocation = "all";

function filterCards() {
    const cards = document.querySelectorAll(".donation-card");

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

    let visible = 0;

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        const location = card.dataset.location.toLowerCase();

        const matchSearch =
            keyword === "" ||
            name.includes(keyword) ||
            category.includes(keyword) ||
            location.includes(keyword);

        const matchCategory =
            selectedCategory === "all" ||
            category === selectedCategory.toLowerCase();

        const matchLocation =
            selectedLocation === "all" ||
            location === selectedLocation.toLowerCase();

        if (matchSearch && matchCategory && matchLocation) {

            card.classList.remove("hide-card");
            visible++;

        } else {

            card.classList.add("hide-card");

        }

    });

    if (noResults) {

        noResults.style.display = visible ? "none" : "block";

    }

}

/* Search */

if(searchInput){

    searchInput.addEventListener("input", filterCards);

}

/* Category */

categoryButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        categoryButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        selectedCategory = button.dataset.filter;

        filterCards();

    });

});

/* Location */

if(locationFilter){

    locationFilter.addEventListener("change",()=>{

        selectedLocation = locationFilter.value;

        filterCards();

    });

}

filterCards();

    
/*==========================
    VIEW DETAILS
==========================*/

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const card = this.closest(".donation-card");

        const item = {

            name: card.dataset.name,
            category: card.dataset.category,
            location: card.dataset.location,
            description: card.dataset.description,
            condition: card.dataset.condition,
            image: card.querySelector("img").src

        };

        localStorage.setItem("selectedItem", JSON.stringify(item));

        window.location.href = "item-details.html";

    });

});

/*==========================
USER SESSION
==========================*/

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeUser = document.getElementById("welcomeUser");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if(currentUser){

    // Create initials (Palak Chaudhary → PC)
const initials = currentUser.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

function updateWelcomeUser() {

    if (window.innerWidth <= 768) {

        welcomeUser.textContent = `Hello, ${currentUser.name}`;

    } else {

        welcomeUser.textContent = `Hello, ${initials}`;

    }

}

updateWelcomeUser();
window.addEventListener("resize", updateWelcomeUser);

    loginBtn.style.display = "none";

    logoutBtn.style.display = "inline-block";

}

logoutBtn.addEventListener("click",()=>{

    localStorage.removeItem("loggedInUser");

    location.reload();

});

/*==========================
DYNAMIC DONATIONS
==========================*/

const featuredGrid = document.querySelector(".featured-grid");

const donations = JSON.parse(localStorage.getItem("donations")) || [];

donations.forEach(item => {

    featuredGrid.innerHTML += `

    <div class="donation-card"
    data-id="${item.id}"
    data-name="${item.name}"
    data-category="${item.category}"
    data-location="${item.location}"
    data-description="${item.description}"
    data-condition="${item.condition}"
    data-donor="${item.donor || 'ReWear Community'}"
    data-posted="${item.posted || 'Recently'}">

        <div class="item-image">

            <img src="${item.image}" alt="${item.name}">

            <span class="badge">

                ${item.category}

            </span>

        </div>

        <div class="item-content">

            <h3>${item.name}</h3>

            <p class="location">

                <i class="fa-solid fa-location-dot"></i>

                ${item.location}

            </p>

            <p class="condition">

                ${item.condition}

            </p>

           <a href="item-details.html" class="view-btn">
                View Details
           </a>

           <button class="favorite-btn" onclick="toggleFavorite(this)">

                <i class="fa-regular fa-heart"></i>

           </button>

        </div>

    </div>

    `;

});

document.querySelectorAll(".view-btn").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".donation-card");

        const item = {

            image: card.querySelector("img").src,

            name: card.dataset.name,

            category: card.dataset.category,

            location: card.dataset.location,

            condition: card.dataset.condition,

            description: card.dataset.description,

            donor: card.dataset.donor,

            posted: card.dataset.posted

        };

        localStorage.setItem(
            "selectedItem",
            JSON.stringify(item)
        );

    });

});
/*==========================
    FAVORITES / WISHLIST
==========================*/

function toggleFavorite(button) {

    const card = button.closest(".donation-card");

    const donation = donations.find(
    d => d.name === card.dataset.name
);

const item = {

    id: donation ? donation.id : null,

    image: card.querySelector("img").src,

    name: card.dataset.name,

    category: card.dataset.category,

    location: card.dataset.location,

    condition: card.dataset.condition,

    description: card.dataset.description,
    donor: donation ? donation.donor : "",
    posted: donation ? donation.posted : ""

};

    /*==========================
        FAVORITES
    ==========================*/

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];


    const existingIndex =
        favorites.findIndex(fav => fav.id === item.id);


    /*==========================
        NOTIFICATIONS
    ==========================*/

    let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];


    /*==========================
        ADD FAVORITE
    ==========================*/

    if(existingIndex === -1) {

        favorites.push(item);

        button.classList.add("active");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i>';


        /* Notification */

        notifications.unshift({

    id: Date.now(),

    title: "Added to Favorites ❤️",

    message:
        `${item.name} has been added to your favorites.`,

    date: new Date().toLocaleString(),

    read: false,

    user:
        JSON.parse(localStorage.getItem("loggedInUser"))?.name || ""

});

        alert("❤️ Added to Favorites!");

    }


    /*==========================
        REMOVE FAVORITE
    ==========================*/

    else {

        favorites.splice(existingIndex, 1);

        button.classList.remove("active");

        button.innerHTML =
            '<i class="fa-regular fa-heart"></i>';


        /* Notification */

        notifications.unshift({

    id: Date.now(),

    title: "Removed from Favorites 💔",

    message:
        `${item.name} has been removed from your favorites.`,

    date: new Date().toLocaleString(),

    read: false,

    user:
        JSON.parse(localStorage.getItem("loggedInUser"))?.name || ""

});
        alert("💔 Removed from Favorites!");

    }


    /*==========================
        SAVE DATA
    ==========================*/

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );

}

/*==========================
  NOTIFICATION COUNT
==========================*/

function updateNotificationCount() {

    const notificationCount =
        document.getElementById("notificationCount");

    const mobileNotificationCount =
        document.getElementById("mobileNotificationCount");


    const allNotifications =
        JSON.parse(
            localStorage.getItem("notifications")
        ) || [];


    const currentUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (!currentUser) {

        if (notificationCount) {
            notificationCount.textContent = "0";
        }

        if (mobileNotificationCount) {
            mobileNotificationCount.textContent = "0";
        }

        return;
    }


    const userNotifications =
        allNotifications.filter(notification => {

            return notification.donor === currentUser.name ||
                   notification.user === currentUser.name;

        });


    const unreadCount =
        userNotifications.filter(notification => {

            return notification.read !== true;

        }).length;


    /* Desktop */

    if (notificationCount) {

        notificationCount.textContent =
            unreadCount;

    }


    /* Mobile */

    if (mobileNotificationCount) {

        mobileNotificationCount.textContent =
            unreadCount;

    }

}


/* Run when page loads */

updateNotificationCount();

/*==========================
        NEWSLETTER
==========================*/

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const subscribeMessage =
    document.getElementById("subscribeMessage");


if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(e) {

        e.preventDefault();


        const email =
            newsletterEmail.value.trim();


        /* EMAIL CHECK */

        if (email === "") {

            alert("⚠️ Please enter your email!");

            return;

        }


        if (!newsletterEmail.checkValidity()) {

            alert("⚠️ Please enter a valid email address!");

            return;

        }


        /* GET SUBSCRIBERS */

        let subscribers =
            JSON.parse(
                localStorage.getItem(
                    "newsletterSubscribers"
                )
            ) || [];


        /* DUPLICATE CHECK */

        if (subscribers.includes(email)) {

            alert(
                "ℹ️ This email is already subscribed!"
            );

            return;

        }


        /* SAVE EMAIL */

        subscribers.push(email);


        localStorage.setItem(
            "newsletterSubscribers",
            JSON.stringify(subscribers)
        );


        /* SUCCESS */

        newsletterEmail.value = "";


        if (subscribeMessage) {

            subscribeMessage.textContent =
                "🎉 Successfully subscribed to ReWear!";

        }

    });

}