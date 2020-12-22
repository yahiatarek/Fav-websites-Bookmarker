let webSiteName = document.getElementById("siteName");
let webSiteUrl = document.getElementById("siteUrl");
//if there is no key with the name mySites in storage then open an empty array and insert it to the storage otherwise if there is an array get it and display it using the display() function=====================
if (localStorage.getItem("mySites") == null) {
  let sites = [];
  localStorage.setItem("mySites", JSON.stringify(sites));
} else {
  sites = JSON.parse(localStorage.getItem("mySites"));
  display();
}
//on clicking the submit button display an alert if the inputs are left blank otherwise insert the data in an object, check if it is previously added (checkIfValid()) and if not insert it into the array and add it to the local storage.Clear the inputs through the clearInputs function =====================================================================
document.getElementById("Submit").onclick = function submitFunction() {
  let site = {
    name: webSiteName.value,
    siteUrl: webSiteUrl.value,
  };
  if (webSiteName.value != "" && webSiteUrl.value != "") {
    checkIfValid();
    if (checkIfValid() == false) {
      document.getElementById("messageInvalidURL").innerHTML = ` <input
        type="text"
        value="this website  already exists"
        class="text-center font-weight-bold alert alert-danger form-control"
        disabled
      />`;
      document.getElementById("messageInvalidName").innerHTML = ` <input
      type="text"
      value="this website already exists"
      class="text-center font-weight-bold alert alert-danger form-control"
      disabled
    />`;
    } else {
      sites.push(site);
      localStorage.setItem("mySites", JSON.stringify(sites));
      display();
      clearInputs();
      document.getElementById("messageInvalidName").innerHTML = ``;
      document.getElementById("messageInvalidURL").innerHTML = ``;
    }
  } else {
    if (webSiteName.value == "") {
      document.getElementById("messageInvalidName").innerHTML = ` <input
      type="text"
      value="Please enter your website name"
      class="text-center font-weight-bold alert alert-danger form-control"
      disabled
    />`;
    }
    if (webSiteUrl.value == "") {
      document.getElementById("messageInvalidURL").innerHTML = ` <input
           type="text"
           value="Please enter your website URL"
           class="text-center font-weight-bold alert alert-danger form-control"
           disabled
         />`;
    }
  }
};
function clearInputs() {
  webSiteName.value = "";
  webSiteUrl.value = "";
}
function display() {
  let container = "";
  for (let i = 0; i < sites.length; i++) {
    container += ` <div class="row ourData my-3 p-4">
        <div class="col-md-3 d-flex justify-content-around ">
          <h4 class="mx-2">${sites[i].name}</h4></div>
          <div class="col-md-3 d-flex ">
          <a href="${sites[i].siteUrl}" target="_blank" class="mx-2 btn btn-info">Visit</a>
          <button onclick="deleteFunction(${i})" class="mx-2 btn btn-danger">Delete</button>
        </div>
      </div>`;
  }
  document.getElementById("myStoredDivs").innerHTML = container;
}
//the delete button are used to splice the array and remove the website's index chosen=========================================
function deleteFunction(deleteIndex) {
  sites.splice(deleteIndex, 1);
  localStorage.setItem("mySites", JSON.stringify(sites));
  display();
}
function checkIfValid() {
  let myStorage = JSON.parse(localStorage.getItem("mySites"));
  for (let i = 0; i < myStorage.length; i++) {
    if (
      myStorage[i].name == webSiteName.value ||
      myStorage[i].siteUrl == webSiteUrl.value
    ) {
      return false;
    }
  }
}
