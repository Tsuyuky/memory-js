// Gérer le stockage dans le Localstorage
const KEY_USER = 'users'

function saveUser(user) {
    const existingUsers = getUsers(); // Récupérez les utilisateurs existants
    const isDuplicateEmail = existingUsers.some(existingUser => existingUser.mail === user.mail); // Vérifiez si l'e-mail est déjà utilisé

    if (isDuplicateEmail) {
        throw new Error("Cette adresse e-mail est déjà utilisée.");
    } else {
        // Ajoutez le nouvel utilisateur uniquement s'il n'existe pas déjà
        existingUsers.push(user);
        localStorage.setItem(KEY_USER, JSON.stringify(existingUsers)); // Enregistrez les utilisateurs mis à jour
    }
}

function getUsers() {
    // Get users or array if empty
    const datasFromLocalstorage = localStorage.getItem(KEY_USER)
    const convertUsers = JSON.parse(datasFromLocalstorage) || []

    return convertUsers

    // return JSON.parse(localStorage.getItem(KEY_USER)) || []
}

export { saveUser, getUsers }