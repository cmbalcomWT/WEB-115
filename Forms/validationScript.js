    // JavaScript code for form validation
window.addEventListener("load", e =>{
  let myForm = document.getElementById("myForm"); //form variable
  let inputField = document.getElementById("inputField"); //input field variable
  let submitButton = document.getElementsByTagName("button"); //gets the submit button

  let displayMessage  = document.createElement("div"); //holds the error/confirmation message
  myForm.appendChild(displayMessage); //appends div to form so it displays

	// Prevent form from submitting
  myForm.addEventListener("submit", e => {
    e.preventDefault();
    validateInput();
  })
  
  submitButton.addEventListener("click", validateInput);

  function validateInput() {
    //displayMessage.textContent = ""; //clears display text if it was there from invalid input //Doesn't load before alert so commented out
    // Retrieve the input field value
    let inputValue = inputField.value;

    // Regular expression pattern for alphanumeric input
    let pattern = /^[a-zA-Z0-9]+$/;

    
    // Check if the input value matches the pattern
    if(pattern.test(inputValue)){
      // Valid input: display confirmation and submit the form
      //displayMessage.textContent = "Input validated. Form submitted."; //Kept disappearing after submitting
      window.alert("Input validated. Form Submitted."); //alert used instead to display on page long enough to read
      myForm.submit();
    }
    else{
      // Invalid input: display error message
      displayMessage.textContent = "Invalid input. Please try again.";
    }
    
  }
  
})
