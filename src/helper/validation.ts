function isValidEmail(email: string): boolean {
    // Implement your email validation logic here
    // Example: You can use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default isValidEmail