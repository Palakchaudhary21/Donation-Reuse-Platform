/*==========================
    MY DONATIONS
==========================*/

const donationContainer = document.getElementById("donationContainer");

const emptyMessage = document.getElementById("emptyMessage");

let donations = JSON.parse(localStorage.getItem("donations")) || [];
let currentEditIndex = null;

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");

function showDonations(){

    donationContainer.innerHTML = "";

    if(donations.length===0){

        emptyMessage.style.display="block";

        return;

    }

    emptyMessage.style.display="none";

    donations.forEach((item,index)=>{

        donationContainer.innerHTML+=`

        <div class="donation-card">

            <div class="item-image">

                <img src="${item.image}" alt="${item.name}">

            </div>

            <div class="item-content">

                <h3>${item.name}</h3>

                <p><strong>Category :</strong> ${item.category}</p>

                <p><strong>Location :</strong> ${item.location}</p>

                <p><strong>Condition :</strong> ${item.condition}</p>

                <button class="edit-btn" onclick="editDonation(${index})">

                <i class="fa-solid fa-pen"></i>

                    Edit

                </button>

                <button class="delete-btn" onclick="deleteDonation(${index})">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

showDonations();

function editDonation(index){

    currentEditIndex = index;

    document.getElementById("editName").value =
    donations[index].name;

    document.getElementById("editCategory").value =
    donations[index].category;

    document.getElementById("editLocation").value =
    donations[index].location;

    document.getElementById("editCondition").value =
    donations[index].condition;

    document.getElementById("editDescription").value =
    donations[index].description || "";

    editModal.classList.add("active");

}

document.querySelector(".close-edit").addEventListener("click",()=>{

    editModal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

    if(e.target===editModal){

        editModal.classList.remove("active");

    }

});
/*==========================
    SAVE EDITED DONATION
==========================*/

editForm.addEventListener("submit", function(e){

    e.preventDefault();

    if(currentEditIndex === null){
        return;
    }

    // Update donation data
    donations[currentEditIndex].name =
        document.getElementById("editName").value;

    donations[currentEditIndex].category =
        document.getElementById("editCategory").value;

    donations[currentEditIndex].location =
        document.getElementById("editLocation").value;

    donations[currentEditIndex].condition =
        document.getElementById("editCondition").value;

    donations[currentEditIndex].description =
        document.getElementById("editDescription").value;


    // Save updated data in LocalStorage
    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );


    // Close modal
    editModal.classList.remove("active");


    // Reset edit index
    currentEditIndex = null;


    // Show updated donations immediately
    showDonations();


    alert("✅ Donation Updated Successfully!");

});

/*==========================
    DELETE DONATION
==========================*/

const deleteModal = document.getElementById("deleteModal");

const cancelDelete = document.getElementById("cancelDelete");

const confirmDelete = document.getElementById("confirmDelete");

let currentDeleteIndex = null;


/* OPEN DELETE MODAL */

function deleteDonation(index){

    currentDeleteIndex = index;

    deleteModal.classList.add("active");

}


/* CANCEL DELETE */

cancelDelete.addEventListener("click",()=>{

    deleteModal.classList.remove("active");

    currentDeleteIndex = null;

});


/* CONFIRM DELETE */

confirmDelete.addEventListener("click",()=>{

    if(currentDeleteIndex === null){

        return;

    }

    donations.splice(currentDeleteIndex,1);

    localStorage.setItem(
        "donations",
        JSON.stringify(donations)
    );

    deleteModal.classList.remove("active");

    currentDeleteIndex = null;

    showDonations();

    alert("✅ Donation Deleted Successfully!");

});


/* CLICK OUTSIDE MODAL */

window.addEventListener("click",(e)=>{

    if(e.target === deleteModal){

        deleteModal.classList.remove("active");

        currentDeleteIndex = null;

    }

});