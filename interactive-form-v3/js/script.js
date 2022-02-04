// Done by: Benny Li
// Date: February 2, 2022

// When the page first loads, the first text field should have the focus state by default to prompt the user.
const username = document.getElementById("name");
username.focus();

// Initially hide the "text-field"

let otherJobRoleTextfield = document.getElementById("other-job-role")
otherJobRoleTextfield.style.display = "none";

// Make the "other" job field appear if the "other" option is selected

const jobSelect = document.getElementById("title")
jobSelect.addEventListener("change",(e)=>{
    if (e.target.value === "other"){
        otherJobRoleTextfield.style.display = "";
    } else {
        // Hide the field again if user changes their mind
        otherJobRoleTextfield.style.display = "none";
    }
})

// 5. "T-Shirt Info" section

// Disable the "Color" <select> element.
// Program the "Design" <select> element to listen for user changes. 
// When a change is detected:
// The "Color" <select> element should be enabled.
// The "Color" <select> element should display an available color.
// The "Color" dropdown menu should display only the color options
// associated with the selected design. For example:
// If the user selects "Theme - JS Puns" then the "Color" menu should 
// only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the "Color" menu should only
// display "Tomato," "Steel Blue," and "Dim Grey."

colorSelect = document.getElementById('color')
colorSelect.style.display = "none"

designSelect = document.getElementById('design')

designSelect.addEventListener("change",(e)=>{
    // Show the color drop down 
    colorSelect.style.display = '';
    const availableColor = colorSelect.children;

    if (e.target.value === "js puns"){

        // Unhide the color selection menu and pre-select a color that is available 
        colorSelect.selectedIndex = "1";

        for (let i = 0; i < availableColor.length; i++){

           
            if (availableColor[i].dataset.theme === "js puns")
            
            {
         
                availableColor[i].style.display = "";
            } 
            else {
                availableColor[i].style.display = "none";
            }
        }
    }
    
    else
    
    {
        const availableColor = colorSelect.children;
        colorSelect.selectedIndex = "4";
        for (let i = 0; i < availableColor.length; i++){

           
            if (availableColor[i].dataset.theme === "js puns")
            
            {
                availableColor[i].style.display = "none";

            } else {
                availableColor[i].style.display = "";
            }
        }
    }

})

// 6. "Register for Activities" section

//The "Total: $" element below the "Register for Activities" section should
// update to reflect the sum of the cost of the user’s selected activities.

// Program the "Register for Activities" fieldset element to listen for 
// user changes. When a change is detected:
// If an activity is checked, the total cost should increase by the value 
// in the data-cost attribute of the activity’s <input type="checkbox"> element.
// If an activity is unchecked, the total cost should decrease by that amount.
// The <p> element with the id of "activity-cost" below the activities
// section should update to reflect the chosen activities' total cost.

const activities = document.getElementById("activities");
const totalCost = document.getElementById("activities-cost");

// Set up a total cost tally
let total = 0;

activities.addEventListener("change",(e)=>{
    // Target only when checkbox is checked or unchecked
    if (e.target.tagName === "INPUT"){
        const checkbox = e.target;
        const checked = checkbox.checked;
        if (checked){
            total += parseInt(checkbox.dataset.cost)
        }
        else {
            total -= parseInt(checkbox.dataset.cost)
        }
        // Automatically disable events that have the same conflicting time
        removeConflict(e.target)
    }
    totalCost.textContent = `Total: $${total}`
})

// 7. "Payment Info" section

// The credit card payment option should be selected for the user by default. 
// So when the form first loads, "Credit Card" should be displayed in the 
// "I'm going to pay with" <select> element, and the credit card payment section 
// should be the only payment section displayed in the form’s UI. 
// And when the user selects one of the payment options from the 
// "I'm going to pay with" drop down menu, the form should update to display only
// the chosen payment method section.

// Program the "I'm going to pay with" <select> element to listen for user changes.
// When a change is detected, hide all payment sections in the form’s UI except the
// selected one.

const payment = document.getElementById('payment');
payment.selectedIndex = 1;

// Hide the other payment options in the UI initially
const creditCard = document.getElementById('credit-card')

const paypal = document.getElementById("paypal");
paypal.style.display = "none";

const bitcoin = document.getElementById("bitcoin");
bitcoin.style.display = "none"

payment.addEventListener("change",(e)=>{
    if (e.target.value === "credit-card"){
        paypal.style.display = "none";
        bitcoin.style.display = "none"
        creditCard.style.display = ""

    } else if (e.target.value === "paypal"){
        paypal.style.display = "";
        bitcoin.style.display = "none"
        creditCard.style.display = "none"

    } else {
        paypal.style.display = "none";
        bitcoin.style.display = ""
        creditCard.style.display = "none"
    }
})

// 8. Form validation
// Users shouldn’t be able to submit a form without the required information, or 
// with invalid information. To prevent that from happening, avoid using plugins, 
// libraries, snippets or the built-in HTML5 validation, and create your own custom
// form validation.

// The "Name" field cannot be blank or empty.
// The "Email Address" field must contain a validly formatted email address. 
// The email address does not need to be a real email address, just formatted like one.
// For example: dave@teamtreehouse.com. 
// A few characters for the username, followed by "@", followed by a few more characters and a ".com" for the domain name. You don’t have to account for other top-level domains, like .org, .net, etc.
// The "Register for Activities" section must have at least one activity selected.

// If and only if credit card is the selected payment method:
// The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.
// The "Zip code" field must contain a 5 digit number.
// The "CVV" field must contain a 3 digit number.


// Define variables required for the helper check functions
const form = document.querySelector("form");
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const CVVNumber = document.getElementById("cvv")

function isNameValid(name)
{
    nameCheck = /^\w+$/.test(name)
    if (nameCheck){
        username.parentElement.className = "valid";
        username.classList.remove("not-valid");
        username.parentElement.lastElementChild.style.display = "";
        return nameCheck;
    }else {
        username.parentElement.className = "not-valid"
        username.classList.remove("valid");
        username.parentElement.lastElementChild.style.display = "inherit"
        return false;
    }
}

function isEmailValid(mail){
    const checker =  /^(\w)+@(\w)+(.com)$/.test(mail);
    if (checker){
        email.parentElement.className = "valid";
        email.classList.remove("not-valid");
        email.parentElement.lastElementChild.style.display = "none";
        return checker;
    }else {
        email.parentElement.className = "not-valid"
        email.classList.remove("valid");
        email.parentElement.lastElementChild.style.display = "inherit"
        return false;
    }
}

function isRegisterValid(){

    // Ensure at least one checkbox is checked

    checkboxCounter = 0; 
    for (checkbox of checkboxes){
        if (checkbox.checked){
            checkboxCounter += 1;
        }
    }

    if (checkboxCounter !== 0){
        activities.firstElementChild.className = "valid";
        activities.firstElementChild.classList.remove("not-valid");
        activities.lastElementChild.style.display = "none";
        return true;
    }else {
        activities.firstElementChild.className = "not-valid"
        activities.firstElementChild.classList.remove("valid");
        activities.lastElementChild.style.display = "inherit"
        return false;
    }
}

// Check if credit card number is between 12-15 digits long
function isCardNumberValid(card){

    // Define the regex check criterias 
    const cardCheck = /^[0-9]{13,16}$/.test(card)

    if (cardCheck){
        cardNumber.parentElement.className = "valid"
        cardNumber.parentElement.classList.remove("not-valid")
        cardNumber.parentElement.lastElementChild.style.display = "none"
        return cardCheck;
    } else {
        cardNumber.parentElement.className = "not-valid"
        cardNumber.parentElement.classList.remove("valid")
        cardNumber.parentElement.lastElementChild.style.display = "inherit"
        cardNumber.focus()
        return false;
    }
}
function isZipValid(zip){

    // Define the regex check criterias 
    const zipCheck = /^[0-9]{5}$/.test(zip)

    if (zipCheck){
        zipCode.parentElement.className = "valid"
        zipCode.parentElement.classList.remove("not-valid")
        zipCode.parentElement.lastElementChild.style.display = "none"
        return zipCheck;
    } else {
        zipCode.parentElement.className = "not-valid"
        zipCode.parentElement.classList.remove("valid")
        zipCode.parentElement.lastElementChild.style.display = "inherit"
        zipCode.focus()
        return false;
    }
}


function isCVV_Valid(CVV){

    // Define the regex check criterias 
    const CVV_Check = /^[0-9]{3}$/.test(CVV)

    if (CVV_Check){
        CVVNumber.parentElement.className = "valid"
        CVVNumber.parentElement.classList.remove("not-valid")
        CVVNumber.parentElement.lastElementChild.style.display = "none"
        return CVV_Check;
    } else {
        CVVNumber.parentElement.className = "not-valid"
        CVVNumber.parentElement.classList.remove("valid")
        CVVNumber.parentElement.lastElementChild.style.display = "inherit"
        CVVNumber.focus()
        return false;
    }
}

// Prevent form from submitting unless all requirements are met
form.addEventListener("submit",(e)=>{

    if (isNameValid(username.value) === false){
        e.preventDefault();
        isNameValid(username.value);
        username.focus()
    }

    if (isEmailValid(email.value) === false){
        e.preventDefault()
        isEmailValid(email.value)
        email.focus()
    }

    if (isRegisterValid() === false){
        e.preventDefault()
        isRegisterValid()
        activities.focus()
    }

    if (payment.value === "credit-card"){
        if (isCardNumberValid(cardNumber.value) ===false || isZipValid(zipCode.value) === false || isCVV_Valid(CVVNumber.value) === false){
            e.preventDefault()
            isCardNumberValid(cardNumber.value)
            isZipValid(zipCode.value)
            isCVV_Valid(CVVNumber.value)
        }
    }
})

// 9. Accessibility
// Make the focus states of the activities more obvious to all users. 
// Pressing the tab key on your keyboard moves the focus state from one input to the
// next, but the focus indicators in the "Register for Activities" section aren’t very obvious.
// Program all of the activity checkbox input elements to listen for the focus and blur events.
// When the focus event is detected, add the ".focus" className to the checkbox input’s parent label element.
// When the blur event is detected, remove the .focus className from the label element that possesses it. 
// It can be helpful here to directly target the element with the className of .focus in order to remove it.

const checkboxes = document.querySelectorAll('.activities input[type="checkbox"]');
for (let i = 0; i < checkboxes.length; i++) {
	checkboxes[i].addEventListener('focus', (e) => {
		// Change the class name to "focus"
		e.target.parentElement.className = "focus";
	})

    checkboxes[i].addEventListener('blur', (e) => {
		// Change back class name from "focus" to blank
		e.target.parentElement.className = "";
	})
}


// EXTRA CREDIT SECTION

// 1. 
// Prevent users from registering for conflicting activities
// Ideally, we want to prevent users from selecting activities that occur at the same time.
// When a user selects an activity, loop over all of the activities, check if any have the same day and time 
// as the activity that was just checked/unchecked, and as long as the matching activity is not the activity that was just checked/unchecked, 
// disable/enable the conflicting activity’s checkbox input and add/remove the ‘.disabled’ className to activity’s parent label element.

/**
 * removeConflict function disables the option to select events that have conflicting times
 * to the events already selected
 * @param {checkbox} selectedEvent specifying which event is currently selected
 */

function removeConflict(selectedEvent){

    // Loop over all of the checkboxes
    for (checkbox of checkboxes){
        // Avoid looping through the same checkbox as the current selected one
        if (checkbox.name !== selectedEvent.name){
            // Compare the time and date of the checkboxes
            if (checkbox.dataset.dayAndTime === selectedEvent.dataset.dayAndTime){
                // Only disable if the box is actually checked
                if(selectedEvent.checked){
                    checkbox.disabled = true;
                    checkbox.parentElement.className = "disabled";
                } else {
                    checkbox.disabled = false;
                    checkbox.parentElement.classList.remove("disabled");
                }
            }
        }
}}

// 2. Real-time error message
// Providing form validation error indications at the moment they occur better 
// serves your user.

// Program at least one of the required fields to listen for user interaction
// like a keyup. When then user interaction occurs, run the validation check for that input. 
// If you created helper functions to validate the required form inputs and sections,
// you can call those helper functions inside of a field’s event listener.
// Detail this specific feature in your README.md file.

// Helper function to either inherit or hide the hint

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

// Closure function to help with the eventlisteners

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

// Set up Eventlisteners for all the required fields
username.addEventListener("keyup", createListener(isNameValid));
email.addEventListener("keyup", createListener(isEmailValid));
cardNumber.addEventListener("keyup", createListener(isCardNumberValid));
zipCode.addEventListener("keyup", createListener(isZipValid));
CVVNumber.addEventListener("keyup", createListener(isCVV_Valid));

// Create Separate Eventlistener for the Activities 

activities.addEventListener("click",()=>{
    isRegisterValid()
})







