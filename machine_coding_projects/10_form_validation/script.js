const form = document.getElementById('master-form');
const emailField = document.getElementById('email');
const passField = document.getElementById('pass');

const setError = (field, errorNode, isShowing) => {
    if (isShowing) {
        field.classList.add('invalid');
        errorNode.style.display = 'block';
    } else {
        field.classList.remove('invalid');
        errorNode.style.display = 'none';
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Standard barrier preventing native reload
    
    let isPassValid = true;
    let isEmailValid = true;

    // 1. Email Regex Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value.trim())) {
        isEmailValid = false;
        setError(emailField, document.getElementById('error-email'), true);
    } else {
        setError(emailField, document.getElementById('error-email'), false);
    }

    // 2. Password length condition
    if (passField.value.length < 6) {
        isPassValid = false;
        setError(passField, document.getElementById('error-pass'), true);
    } else {
        setError(passField, document.getElementById('error-pass'), false);
    }

    // If combined states are valid, grant access
    if (isEmailValid && isPassValid) {
        alert("✅ Validation Success! Submitting form data...");
    }
});
