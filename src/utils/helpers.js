const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateJWTToken = (payload, secretKey, expiresIn) => {
    const token = jwt.sign(payload, secretKey, {
        expiresIn
    });

    return token;
};

const generateRandomString = (length = 32) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return Buffer.from(result).toString("base64");
};

const generateRandomKey = (size = 32) => {
    return crypto.randomBytes(size).toString('base64');
}

// console.log(generateRandomKey());
// console.log(generateRandomString());

/** 
 * 
 * @author Ahmad Busari
 * @param {String} name The string to be capitalized
 * @returns {String} formatted string
 * @description A function that formats a string as title, i.e. Capitalize each word in the string
 * @copyright MIT
 * 
 */
const capitalize = (name) => {
    const newName = name.toLowerCase().split(" ");
    let finalName = "";

    newName.forEach((name) => {
        finalName += " " + name[0].toUpperCase() + name.slice(1);
    });

    return finalName.trim();
};

module.exports = {
    capitalize,
    generateRandomString,
    generateRandomKey,
    generateJWTToken,
};