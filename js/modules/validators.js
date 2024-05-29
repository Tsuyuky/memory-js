// Check les champs du formulaire
function validateEmail(email) {
    // Utilisez une expression régulière pour valider l'email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    // Vérifiez si le mot de passe a au moins 6 caractères, 1 chiffre, et 1 caractère spécial
    const passwordPattern = /^(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,}$/;
    return passwordPattern.test(password);
}

function validateNom(nom) {
    // Vérifiez si le nom contient au moins 3 caractères alphabétiques
    const nomPattern = /^[A-Za-z]{3,}$/;
    return nomPattern.test(nom);
}

export { validateEmail, validatePassword, validateNom };