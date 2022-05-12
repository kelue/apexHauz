/* Importing the validator module. */
const validator = require('validator')

/* Exporting the signup function. */
module.exports.signup = (email, password, phone, first_name, last_name, address) => {
    /* Creating an empty object. */
    const errors = {};
    /* Checking if the phone number is empty and if it is, it will return an error message. */
    if (phone === '') {
        errors["first_name"] = "Phone is Required"
    }
    /* Checking if the phone number is valid. */
    if (!validator.isMobilePhone(phone, 'en-NG')) {
        errors["phone"] = "Phone is not valid"
    }
    /* Checking if the first name is empty and if it is, it will return an error message. */
    if (first_name === '') {
        errors["first_name"] = "First Name is required"
    }
    /* Checking if the last name is empty and if it is, it will return an error message. */
    if (last_name === '') {
        errors["last_name"] = "Last Name is Required"
    }
    /* Checking if the address is empty and if it is, it will return an error message. */
    if (address === '') {
        errors["address"] = "Address is Required"
    }
    /* Checking if the email is empty and if it is, it will return an error message. */
    if (email === '') {
        errors["email"] = "Email cannot be blank"
    }
    /* Checking if the email is valid. */
    if (!validator.isEmail(email)) {
        errors["email"] = "Not a valid email address";
    }
    /* Checking if the password is empty and if it is, it will return an error message. */
    if (password === '') {
        errors["password"] = "Password cannot be blank";
    }
    /* Checking if the password is valid. */
    if (!validator.isAscii(password)) {
        errors["password"] = "Not a valid password";
    }
    /* Checking if the password is valid. */
    if (!validator.isLength(password, { min: 4, max: 12 })) {
        errors["password"] = "Ensure that your password has a minimum of 4 characters and maximum of 12 characters";
    }
    /* Returning an object with two keys, errors and valid. The errors key is an object that contains
    all the errors that were found in the validation process. The valid key is a boolean that is
    true if there are no errors and false if there are errors. */
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}