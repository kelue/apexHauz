const validator = require('validator')

module.exports.signup = (email, password, phone, first_name, last_name, address) => {
    const errors = {};
    if (phone === '') {
        errors["phone"] = "Phone is Required"
    }
    if (first_name === '') {
        errors["first_name"] = "First Name is required"
    }
    if (last_name === '') {
        errors["last_name"] = "Last Name is Required"
    }
    if (address === '') {
        errors["address"] = "Address is Required"
    }
    if (email === '') {
        errors["email"] = "Email cannot be blank"
    }
    if (!validator.isEmail(email)) {
        errors["email"] = "Not a valid email address";
    }
    if (password === '') {
        errors["password"] = "Password cannot be blank";
    }
    if (!validator.isAscii(password)) {
        errors["password"] = "Not a valid password";
    }
    if (!validator.isLength(password, { min: 4, max: 12 })) {
        errors["password"] = "Ensure that your password has a minimum of 4 characters and maximum of 12 characters";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}