"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidEmail(email) {
    // Implement your email validation logic here
    // Example: You can use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
exports.default = isValidEmail;
