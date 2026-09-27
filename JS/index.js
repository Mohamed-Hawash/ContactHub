var uploadImgInput = document.getElementById("uploadImg");
var userNameInput = document.getElementById("userName");
var userNumberInput = document.getElementById("userNumber");
var userEmailInput = document.getElementById("userEmail");
var userAddressInput = document.getElementById("userAddress");
var groupInput = document.getElementById("Group");
var favCheckbox = document.getElementById("fav");
var emergencyCheckbox = document.getElementById("emergency");
let contactNameError = document.getElementById("contactNameError");
var contactSearchInput = document.getElementById("contactSearch");
var contactList = [];
var currentSearch = "";
var updatedIdx = null;


// close modal function
function closeModal() {
  var modalEl = document.getElementById("exampleModalToggle");
  var modalInstance = bootstrap.Modal.getInstance(modalEl);
  modalInstance.hide();
}


// open modal function
function openModal() {
  var modalEl = document.getElementById("exampleModalToggle");
  var modalInstance = new bootstrap.Modal(modalEl);
  modalInstance.show();
}

// cancel btn
cancelBtn.addEventListener("click", function () {
  closeModal();
  clearForm();
});

function resetFormButtons() {
  addbtn.classList.remove("d-none");
  addbtn.classList.add("d-flex");
  updatebtn.classList.add("d-none");
}


///local storage
if (JSON.parse(localStorage.getItem("allContacts"))) {
  contactList = JSON.parse(localStorage.getItem("allContacts"));
  displayContact(contactList);
}

//group colorsssssss
function getGroupColor(group) {
  colors = {
    family: { bg: "#cfe8ff", text: "#1e40af", border: "#93c5fd" },
    friends: { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
    work: { bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
    school: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    other: { bg: "#f3f4f6", text: "#374151", border: "#d1d5db" },
  };

  return colors[group] || colors.other;
}



// add function
function addContact() {

    if (!validateContactInputs()) {
    return; 
  }
 
  var contact = {
    image: "images/logo-img.jpg",
    name: userNameInput.value,
    number: userNumberInput.value,
    email: userEmailInput.value,
    address: userAddressInput.value,
    group: groupInput.value,
    favourite: favCheckbox.checked,
    emergency: emergencyCheckbox.checked,
  };

  contactList.push(contact);
  localStorage.setItem("allContacts", JSON.stringify(contactList));

  closeModal();
  Swal.fire({
    icon: "success",
    title: "<h1>Added !</h1>",
    html: `<p class="fs-small"> contact has been added successfully</p>`,
    showConfirmButton: false,
    timer: 1500,
  });
  displayContact(contactList);
  clearForm();

}

// clear function
function clearForm() {
  userNameInput.value = "";
  userNumberInput.value = "";
  userEmailInput.value = "";
  userAddressInput.value = "";
  groupInput.value = "";
  favCheckbox.checked = false;
  emergencyCheckbox.checked = false;
  userNameInput.classList.remove("is-valid","is-invalid");
  userNumberInput.classList.remove("is-valid","is-invalid");
  userEmailInput.classList.remove("is-valid","is-invalid");
}

//display function
function displayContact(list) {
  var blackBox = ``;

  if (list.length <= 0) {
    blackBox = `
        <div class="col-12 text-center py-5">
                            <div class="d-flex align-items-center justify-content-center mx-auto mb-4 bg-secondary-subtle
                                     rounded-4" style="width: 80px; height: 80px;">
                                <i class="fas fa-address-book text-secondary fs-4"></i>
                            </div>
                            <p class="text-muted fw-semibold mb-1">No contacts found</p>
                            <p class="text-secondary small">
                                Click <strong>"Add Contact"</strong> to get started
                            </p>
                        </div>
        `;
  } else {
    for (var i = 0; i < list.length; i++) {
      var colors = getGroupColor(list[i].group);
      blackBox += `

        <div class="col-lg-6 p-3">

              <!-- carddddddddd -->
              <div class="card shadow contact-card p-3 h-100">
                  <div class="d-flex gap-3 h-75">
                  <div class="position-relative lClass ">
                   <div class="imgCard w-100 ">   
                    <img src="images/logo-img.jpg" alt="" class="contact-card-avatar rounded-circle w-100  object-fit-cover"> 
                  </div>

                  ${
                    list[i].emergency
                      ? ` <div class="badge-icon badge-heart d-flex justify-content-center align-items-center rounded-circle position-absolute text-white bg-danger border-1 border-white p-1">
                          <i class="fas fa-heart-pulse"></i>
                      </div> `
                      : ""
                  }

                
                  ${
                    list[i].favourite
                      ? ` <div class="badge-icon badge-star d-flex justify-content-center align-items-center rounded-circle position-absolute text-white bg-warning  border-1 border-white p-1 top-0">
                          <i class="fas fa-star"></i>
                      </div> `
                      : ""
                  }

                    
                  </div>
                  <div class="small">
                    ${list[i].name ? `<h6 class="fw-bold mb-1">${list[i].name}</h6>` : ""}
                    ${list[i].number ? `<a href="tel:${list[i].number}" class="text-secondary text-decoration-none mb-1"><i class="fa fa-phone me-2"></i>${list[i].number}</a>` : ""} <br>
                    ${list[i].email ? `<a href="mailto:${list[i].email}" class="text-secondary text-decoration-none mb-1"><i class="fa fa-envelope me-2"></i>${list[i].email}</a>` : ""}
                  ${list[i].address ? `<div class="text-secondary mb-2"><i class="fa fa-location-dot me-2"></i>${list[i].address}</div> ` : ""} 
                   ${
                     list[i].group
                       ? ` <span class="badge small rounded-pill" style="background-color: ${colors.bg}; color: ${colors.text}; 
                                        border-color: ${colors.border};" >${list[i].group}</span> `
                       : ""
                   }                    
                  
                  </div>
                </div>

                <hr>

                <div class="d-flex justify-content-between align-items-center h-25">
                  <div class="d-flex gap-3 ">
                    <div class="icon-box bg-success-subtle text-success"><i class="fa fa-phone"></i></div>
                    <div class="icon-box bg-primary-subtle text-primary"><i class="fa fa-envelope"></i></div>
                  </div>
                   <div class="action-buttons-right w-50 d-flex justify-content-around">
                    <button onclick="toggleFav(${i})" class="action-button favorite border-0 bg-transparent text-secondary " style="cursor: pointer;" id="favBtn" title="Favorite">
                        <i class="${
                            list[i].favourite
                            ? "fas text-warning fa-star" : "far fa-star"
                        }"></i>
                    </button>
                    <button onclick="toggleEmr(${i})" class="action-button emergency border-0 bg-transparent text-secondary " style="cursor: pointer;"  id="emergncyBtn" title="Emergency">
                        <i class="${
                            list[i].emergency
                            ? "fas fa-heart-pulse text-danger" : "far fa-heart"
                        }"></i>
                    </button>
                    <button onclick="editContact(${i})" class="action-button edit border-0 bg-transparent text-secondary " style="cursor: pointer;"  id="editBtn" title="Edit">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button onclick="deleteContact(${i})" class="action-button delete border-0 bg-transparent text-secondary " style="cursor: pointer;"  id="deleteBtn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                </div>
              </div>
            </div>
        `;
    }
  }

  document.getElementById("cardContainer").innerHTML = blackBox;
  updateTotalContacts();
  updateFavoriteSidebar();
  updateEmergencySidebar();
}



// delete function
function deleteContact(deletedIdx) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactList[deletedIdx].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // delete contact
      console.log("deleted");
      contactList.splice(deletedIdx, 1);
      localStorage.setItem("allContacts", JSON.stringify(contactList));
      displayContact(contactList);
      
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        timer: 1500,
      });
    }
  });
}



// edit function
function editContact(editedIdx) {
  console.log("edited");
  console.log("editedidx =  ", editedIdx);
  openModal();

  updatedIdx = editedIdx;
  var contacts = contactList[editedIdx];

  userNameInput.value = contacts.name;
  userNumberInput.value = contacts.number;
  userEmailInput.value = contacts.email;
  userAddressInput.value = contacts.address;
  groupInput.value = contacts.group;
  favCheckbox.checked = contacts.favourite;
  emergencyCheckbox.checked = contacts.emergency;

  updatebtn.classList.remove("d-none");
  updatebtn.classList.add("d-flex");
  addbtn.classList.add("d-none");
}

// update function
function updateContact() {
  console.log("updated", updatedIdx);
  contactList[updatedIdx].name = userNameInput.value;
  contactList[updatedIdx].number = userNumberInput.value;
  contactList[updatedIdx].email = userEmailInput.value;
  contactList[updatedIdx].address = userAddressInput.value;
  contactList[updatedIdx].group = groupInput.value;
  contactList[updatedIdx].favourite = favCheckbox.checked;
  contactList[updatedIdx].emergency = emergencyCheckbox.checked;

  localStorage.setItem("allContacts", JSON.stringify(contactList));
  displayContact(contactList);
  clearForm();
  closeModal();
  
  updatedIdx = null;
  resetFormButtons();
  Swal.fire({
    title: "Updated!",
    text: "Contact has been updated successfully ",
    icon: "success",
    timer: 1500,
    draggable: true,
  });

}





addbtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!validateContactInputs()) {
    return; 
  }

  if (updatedIdx === null) {
    console.log("valid → adding");
    addContact();
  } else {
    updateContact(contactList);
  }
});



// search function

// element da variable ana msmyah 3ady bn3wad beh mkan el (this)
// keyword da variable ana msmyah 3ady
function searchBycontactName(element) {
  console.log(element, element.value);
  var matchesResults = [];

  for (var i = 0; i < contactList.length; i++) {
    if (
      contactList[i].name.toLowerCase().includes(element.value.toLowerCase())
    ) {
      console.log("matched", contactList[i].name);
      matchesResults.push(contactList[i]);

      contactList[i].hightedName = contactList[i].name
        .toLowerCase()
        .replaceAll(
          element.value,
          `<span class="text-danger">${element.value}</span>`,
        );

      console.log(matchesResults);

      displayContact(matchesResults);
    } else {
      console.log("not matched", contactList[i].name);
    }
  }
}



// total contacts function
function updateTotalContacts() {
  totalContacts.innerHTML = contactList.length;
  totalContactsParag.innerHTML = `Manage and organize your ${contactList.length} contacts`;
}



// total fav content function
function updateFavoriteSidebar() {
  favSideBar.innerHTML = "";
  var hasFavorite = false;
  var favCount = 0;
  var favBox;
  for (var i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    if (contact.favourite) {
      hasFavorite = true;
      favCount++;
      favBox = `
          <div class="col-12">
            <div id="smallFavItem"
                class="contact-item d-flex justify-content-between align-items-center gap-3 p-2 rounded-3 mb-3">
                
                <div class="parent w-25 ">
                  <img class="w-100 rounded-4" src="${contact.image}" alt="">
                  </div>
                
                <div class="flex-grow-1 text-truncate">
                    <h4 class="mb-0 fw-medium text-dark small text-truncate">${
                      contact.name
                    }</h4>
                    <p class="mb-0 text-muted small text-truncate">${
                      contact.number
                    }</p>
                </div>
                <a href="tel:${contact.number}"
                    class="call-btn d-flex align-items-center justify-content-center flex-shrink-0">
                    <i class="fas fa-phone"></i>
                </a>
            </div>
        </div>
        
        `;
      favSideBar.innerHTML += favBox;
    }
  }

  totalFavContacts.innerHTML = favCount;
  if (!hasFavorite) {
    favSideBar.innerHTML = `
        <div class="col-12">
                <p class="text-center text-secondary mt-4">No favorites yet</p>
              </div>
        
        `;
  }
}

function toggleFav(index) {
  contactList[index].favourite = !contactList[index].favourite;
  localStorage.setItem("allContacts", JSON.stringify(contactList));
  displayContact(contactList);
  updateFavoriteSidebar();

}



//total emergency contects function
function updateEmergencySidebar() {
  emergencySideBar.innerHTML = "";
  var hasEmergency = false;
  var EmergencyCount = 0;
  var Emergencybox;
  for (var i = 0; i < contactList.length; i++) {
    var contact = contactList[i];
    if (contact.emergency) {
      hasEmergency = true;
      EmergencyCount++;
      Emergencybox = `
       <div class="col-12">
                                    <div id="smallEmergncyItem"
                                        class="contact-item-emergency  d-flex align-items-center gap-3 p-2 rounded-3">
                                        <div class="parent w-25 ">
                                            <img class="w-100 rounded-4" src="${contact.image}" alt="">
                                        </div>
                                            
                                        <div class="flex-grow-1 text-truncate">
                                            <h4 class="mb-0 fw-medium text-dark small text-truncate">${
                                              contact.name
                                            }</h4>
                                            <p class="mb-0 text-muted small text-truncate">${
                                              contact.number
                                            }</p>
                                        </div>
                                        <a href="tel:${contact.number}"
                                            class="call-btn-emergency call-btn-rose d-flex align-items-center justify-content-center flex-shrink-0">
                                            <i class="fas fa-phone"></i>
                                        </a>
                                    </div>
                                </div>
        
        `;
      emergencySideBar.innerHTML += Emergencybox;
    }
  }
  totalEmergencyContacts.innerHTML = EmergencyCount;
  if (!hasEmergency) {
    emergencySideBar.innerHTML = `
   
             <div class="col-12">
                <p class="text-center text-secondary mt-4">No Emergency yet</p>
              </div>
            
        
        `;
  }
}

function toggleEmr(index) {
  contactList[index].emergency = !contactList[index].emergency;
  localStorage.setItem("allContacts", JSON.stringify(contactList));
  displayContact(contactList);
  updateEmergencySidebar();
}



// validation

var validateRules = {
  name: {
    regex: /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/,
    errorId: "contactNameError",
    message: "Name should contain only letters (2–50 characters)",
  },
  number: {
    regex: /^(01|(\+20|0020|20)1)[0125][0-9]{8}$/,
    errorId: "contactPhoneError",
    message: "Please enter a valid Egyptian phone number",
  },
  email: {
    regex: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
    errorId: "contactEmailError",
    message: "Please enter a valid email address",
    optional: true,
  },
};



// 2 function valid / invalid
function showValid(input, errorId) {
  var error = document.getElementById(errorId);
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  error.classList.add("d-none");
}
function showInvalid(input, errorId) {
  var error = document.getElementById(errorId);
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  error.classList.remove("d-none");
}

function validateField(input, rule) {
  var value = input.value.trim();
  var errorEl = document.getElementById(rule.errorId);


  if (!value && rule.optional) {
    input.classList.remove("is-valid", "is-invalid");
    errorEl.classList.add("d-none");
    return true;
  }

  if (!value && !rule.optional) {
    showInvalid(input, rule.errorId);
    return false;
  }

  if (!rule.regex.test(value)) {
    showInvalid(input, rule.errorId);
    return false;
  }

  showValid(input, rule.errorId);
  return true;
}

userNameInput.addEventListener("input", function () {
  validateField(userNameInput, validateRules.name);
});

userNumberInput.addEventListener("input", function () {
  validateField(userNumberInput, validateRules.number);
});

userEmailInput.addEventListener("input", function () {
  validateField(userEmailInput, validateRules.email);
});


function validateContactInputs() {
  const isNameValid = validateField(userNameInput, validateRules.name);
  const isNumberValid = validateField(userNumberInput, validateRules.number);
  const isEmailValid = validateField(userEmailInput, validateRules.email);

  if (!isNameValid) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: validateRules.name.message,
    });
    userNameInput.focus();
    return false;
  }

  if (!isNumberValid) {
    Swal.fire({
      icon: "error",
      title: "Invalid Number",
      text: validateRules.number.message,
    });
    userNumberInput.focus();
    return false;
  }

  if (!isEmailValid) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: validateRules.email.message,
    });
    userEmailInput.focus();
    return false;
  }

/////////////////////////////// Check duplicate number
  if (isnumberDuplicate(userNumberInput.value, updatedIdx)) {
    showInvalid(userNumberInput, "contactPhoneError");
    Swal.fire({
      icon: "error",
      title: "Duplicate number",
      text: "This number number already exists",
      customClass: { container: "swal-container" },
    });
    userNumberInput.focus();
    return false;
  }
  console.log("ALL VALID ✅");


  return true;
}


function normalizeEgyptiannumber(number) {
  number = number.replace(/\D/g, "");

  if (number.startsWith("20")) {
    number = "0" + number.slice(2);
  }

  if (number.startsWith("0020")) {
    number = "0" + number.slice(4);
  }

  return number; 
}

function isnumberDuplicate(number, ignoreIndex) {
  const normalizedInput = normalizeEgyptiannumber(number);

  for (var i = 0; i < contactList.length; i++) {
    if (i === ignoreIndex) continue;

    const normalizedStored = normalizeEgyptiannumber(contactList[i].number);

    if (normalizedStored === normalizedInput) {
      return true;
    }
  }
  return false;
}
