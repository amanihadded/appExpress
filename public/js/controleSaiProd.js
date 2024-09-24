function validateForm() {
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.text-danger').forEach((el) => el.textContent = '');

    // Name validation
    const name = document.getElementById('inputName4').value.trim();
    if (!name) {
      document.getElementById('nameError').textContent = 'Name is required!';
      valid = false;
    }

    // Description validation
    const description = document.getElementById('inputdescription4').value.trim();
    if (!description) {
      document.getElementById('descriptionError').textContent = 'Description is required!';
      valid = false;
    }

    // Price validation
    const price = document.getElementById('inputprice4').value.trim();
    if (!price) {
      document.getElementById('priceError').textContent = 'Price is required!';
      valid = false;
    }

    // Image validation (already required by the form element, but you can add custom logic if needed)
    const image = document.getElementById('inputimage').files.length;
    if (!image) {
      document.getElementById('imageError').textContent = 'Image is required!';
      valid = false;
    }

    return valid;
  }