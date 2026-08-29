/*==========================
LOGIN CHECK
==========================*/

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!currentUser) {

    alert("Please login first!");

    window.location.href = "login.html";

}

/*==========================
DONATE ITEM
==========================*/

const donateForm = document.getElementById("donateForm");

donateForm.addEventListener("submit", function(e){

    e.preventDefault();

    const newItem = {

    id: Date.now(),

    name: document.getElementById("itemName").value,

    image: document.getElementById("imageUrl").value,

    category: document.getElementById("category").value,

    location: document.getElementById("location").value,

    condition: document.getElementById("condition").value,

    description: document.getElementById("description").value,

    donor: currentUser.name,

    posted: "Just Now"

};
    let donations = JSON.parse(localStorage.getItem("donations")) || [];

    donations.push(newItem);

    localStorage.setItem("donations", JSON.stringify(donations));

    alert("🎉 Item Donated Successfully!");
    console.log("Saved Donations:", donations);

    donateForm.reset();

    window.location.href = "index.html";

});