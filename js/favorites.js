/*==========================
    MY FAVORITES
==========================*/

const favoritesContainer =
    document.getElementById("favoritesContainer");

const emptyFavorites =
    document.getElementById("emptyFavorites");


let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];


/*==========================
    SHOW FAVORITES
==========================*/

function showFavorites(){

    favoritesContainer.innerHTML = "";


    if(favorites.length === 0){

        emptyFavorites.style.display = "block";

        return;

    }


    emptyFavorites.style.display = "none";


    favorites.forEach((item, index) => {

        favoritesContainer.innerHTML += `

        <div class="donation-card">

            <div class="item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}">

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


                <a
                    href="item-details.html"
                    class="view-btn"
                    onclick="viewFavorite(${index})">

                    View Details

                </a>


                <button
                    class="favorite-btn active"
                    onclick="removeFavorite(${index})">

                    <i class="fa-solid fa-heart"></i>

                    Remove Favorite

                </button>

            </div>

        </div>

        `;

    });

}


/*==========================
    VIEW FAVORITE
==========================*/

function viewFavorite(index){

    localStorage.setItem(
        "selectedItem",
        JSON.stringify(favorites[index])
    );

}


/*==========================
    REMOVE FAVORITE
==========================*/

function removeFavorite(index){

    favorites.splice(index, 1);


    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );


    showFavorites();

}


showFavorites();