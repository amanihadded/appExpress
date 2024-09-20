function validateForm() {
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.text-danger').forEach((el) => el.textContent = '');

    // First Name validation
    const firstName = document.getElementById('inputfirstName4').value.trim();
    if (!firstName) {
      document.getElementById('firstNameError').textContent = 'First name is required!';
      valid = false;
    }

    // Last Name validation
    const lastName = document.getElementById('inputlastName4').value.trim();
    if (!lastName) {
      document.getElementById('lastNameError').textContent = 'Last name is required!';
      valid = false;
    }

    // Email validation
    const email = document.getElementById('inputemail4').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      document.getElementById('emailError').textContent = 'Email is required!';
      valid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Invalid email format!';
      valid = false;
    }

    // Phone number validation
    const phone = document.getElementById('inputtele4').value.trim();
    const phonePattern = /^[0-9]{8}$/;
    if (!phone) {
      document.getElementById('phoneError').textContent = 'Phone number is required!';
      valid = false;
    } 

    // Age validation
    const age = document.getElementById('inputage4').value.trim();
    if (!age) {
      document.getElementById('ageError').textContent = 'Age is required!';
      valid = false;
    } else if (isNaN(age) || age < 10 || age > 99) {
      document.getElementById('ageError').textContent = 'Age must be a number between 10 and 99!';
      valid = false;
    }

    // Gender validation
    const gender = document.getElementById('inputGender').value;
    if (gender === "Choose here ..." || !gender) {
      document.getElementById('genderError').textContent = 'Gender selection is required!';
      valid = false;
    }

    // Country validation
    const country = document.getElementById('inputCountry').value;
    if (country === "Choose here ..." || !country) {
      document.getElementById('countryError').textContent = 'Country selection is required!';
      valid = false;
    }
    return valid;
  }