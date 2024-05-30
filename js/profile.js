// Ce code sert à:
// Charger et preview une img de profil.
// Charger données profil depuis le localStorage (une fois la page chargée).
// Save données profil (image et nom d'utilisateur) dans le localStorage.
// Màj affichage profil après chaque save.

// Attend que le doc soit complètement chargé avant d'exécuter
document.addEventListener("DOMContentLoaded", function () {
  // Récupére réfs des éléments du DOM par leur ID
  const profileImageInput = document.getElementById("profile-image");
  const previewImage = document.getElementById("preview-image");
  const usernameInput = document.getElementById("username");
  const saveButton = document.getElementById("save-btn");

  // Charge données profil depuis le localStorage
  loadProfileData();

  // Ajoute un EventListener pour changement de l'img de profil
  profileImageInput.addEventListener("change", function (event) {
    // Récupére fichier choisi depuis l'ordi
    const file = event.target.files[0];
    if (file) {
      // Crée un lecteur de fichier pour lire contenu fichier
      const reader = new FileReader();
      reader.onload = function () {
        // Màj preview de l'img avec le contenu du fichier
        previewImage.src = reader.result;
      };
      // Lit fichier comme une data URL
      reader.readAsDataURL(file);
    }
  });

  // Ajoute un EventListener pour clic sur le bouton "Sauvegarder"
  saveButton.addEventListener("click", function () {
    // Save données profil dans le localStorage
    saveProfileData();
  });

  // Fonction pour charger données profil depuis le localStorage
  function loadProfileData() {
    // Récupére données profil stockées chaîne JSON et les parse en objet
    const profileData = JSON.parse(localStorage.getItem("profile")) || {};
    // Si une img est présente dans données, màj img de preview
    if (profileData.image) {
      previewImage.src = profileData.image;
    }
    // Si un nom d'utilisateur présent dans données, rempli le champ idouane
    if (profileData.username) {
      usernameInput.value = profileData.username;
    }
  }

  // Fonction pour save données profil dans le localStorage
  function saveProfileData() {
    // Crée un objt avec données actuelles du profil
    const profileData = {
      image: previewImage.src, // Source img de preview
      username: usernameInput.value, // Valeur champ du nom d'utilisateur
    };
    // Converti  l'objt en chaîne JSON et stocke dans le localStorage
    localStorage.setItem("profile", JSON.stringify(profileData));
    // Affiche alerte pour indiquer profil a été save
    alert("Sauvegarde réussie !");
  }
});
