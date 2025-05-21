class JeuDeNim {
  // Constructeur de la classe
  constructor(
    display,
    displayButtons,
    boutonReset,
    affichageAllumettes,
    counter
  ) {
    // Compteur d'allumettes
    this.allumettesRestantes = 20;
    // Définit si c'est le tour du joueur
    this.tourJoueur = true;
    // Définit si la partie est encore en cours
    this.estFini = false;
    // Permet de modifier l'affichage de la suite d'action
    this.display = display;
    // Permet de gérer l'affichage des boutons
    this.displayButtons = displayButtons;
    // Permet d'afficher le bouton de reset
    this.boutonReset = boutonReset;
    // Permet de gérer l'affichage visuel du nombre d'allumettes
    this.affichageAllumettes = affichageAllumettes;
    this.counter = counter;
  }

  // Fonction pour gérer l'élimination des allumettes au fur et à mesure de la partie
  retirerAllumettes(number) {
    // Si la partie est déjà fini, le tour n'est pas joué et on affiche le bouton de reset tout en cachant les boutons permettant de jouer
    if (this.estFini === true) {
      this.displayButtons.classList.add("hidden");
      this.afficherBoutonReset();
      return;
    }
    // S'assure que le joueur ne retire pas moins de 1 ou plus de 3 allumettes (en modifiant le HTML par exemple)
    if (number > 3 || number < 1) {
      this.display.textContent =
        "Action impossible, vous ne pouvez retirer que 1, 2 ou 3 allumettes";
      return;
    }
    // Compte le nombre d'allumettes restantes si il y en reste plus de 0 à la fin du coup
    if (this.allumettesRestantes - number > 0) {
      // Compteur d'allumettes
      this.allumettesRestantes -= number;
      // Affichage de l'information de qui a joué et combien d'allumettes il a retiré
      this.display.textContent = `${
        this.tourJoueur === true
          ? `Vous retirez ${number} allumette(s).`
          : `L'ordinateur retire ${number} allumette(s).`
      } Il reste ${this.allumettesRestantes} allumette(s)`;
      // Lance la fonction d'affichage des allumettes
      this.afficherAllumettesRestantes(number);
      return;
    }
    // Si le coup amène à 0 allumette, affiche le vainqueur et lance l'affichage du bouton reset
    if (this.allumettesRestantes - number <= 0) {
      // Fixe le nombre d'allumette restant à 0 pour ne pas tomber en négatif
      this.allumettesRestantes = 0;
      // Affiche le résultat
      this.display.textContent = `Il reste 0 allumette. ${
        this.tourJoueur === true ? "Vous avez perdu." : "Vous avez gagné."
      }`;
      // Lance l'affichage des allumettes
      this.afficherAllumettesRestantes(number);
      // Définit que la partie est terminée
      this.estFini = true;
      // Lance la fonction d'affichage du bouton de reset
      this.afficherBoutonReset();
    }
  }

  // Fonction pour l'apparition et l'écouteur d'évènement du bouton reset
  afficherBoutonReset() {
    // Affiche le bouton reset après 2 secondes (pour laisser le temps à l'affichage des allumettes se terminer correctement)
    setTimeout(() => {
      this.boutonReset.classList.remove("hidden");
    }, 2000);
    // Ecouteur d'évènement du bouton reset
    this.boutonReset.addEventListener("click", (e) => {
      // Lance la fonction de reset
      this.reset();
    });
  }

  // Fonction pour gérer l'affichage visuel des allumettes
  afficherAllumettesRestantes(num) {
    // Boucle pour sélectionner les bonnes allumettes et modifier leur affichage
    for (
      let i = this.allumettesRestantes + num - 1;
      i > this.allumettesRestantes - 1;
      i--
    ) {
      // Condition pour prendre uniquement des allumettes encore présente (pour les coups finaux) et les faire disparaitre vers le bas si c'est un coup du joueur, et vers le haut si c'est un coup de l'ordinateur
      if (
        this.tourJoueur === true &&
        !this.affichageAllumettes[i].classList.contains("taken-computer")
      ) {
        this.affichageAllumettes[i].classList.add("taken-player");
      } else if (
        this.tourJoueur === false &&
        !this.affichageAllumettes[i].classList.contains("taken-player")
      ) {
        this.affichageAllumettes[i].classList.add("taken-computer");
      }
    }
    this.counter.textContent = this.allumettesRestantes;
    // Définit si le prochain tour est celui du joueur ou celui de l'ordinateur
    this.tourJoueur === true
      ? (this.tourJoueur = false)
      : (this.tourJoueur = true);
  }

  // Fonction de reset de la partie
  reset() {
    // Retire toutes les classes des allumettes pour les réafficher
    this.affichageAllumettes.forEach((allumette) => {
      allumette.classList.remove("taken-player");
      allumette.classList.remove("taken-computer");
    });
    // Remet à zéro toutes les données et tout l'affichage des boutons
    this.allumettesRestantes = 20;
    this.counter.textContent = this.allumettesRestantes;
    this.tourJoueur = true;
    this.estFini = false;
    this.displayButtons.classList.remove("hidden");
    this.display.textContent = "";
    this.boutonReset.classList.add("hidden");
  }
}

// Sélectionne l'élément d'affichage d'informations
const display = document.querySelector("#action-en-cours");
// Sélectionne la div dans laquelle sont présents les boutons
const displayButtons = document.querySelector("#boutons");
// Sélectionne toutes les allumettes et les mets dans une liste Node d'élément
const affichageAllumettes = document.querySelectorAll("hr");
// Sélectionne un affichage numérique du nombre restant d'allumettes
const counter = document.querySelector("#counter");
// Sélectionne le bouton prévu pour reset
const boutonReset = document.querySelector("#bouton-reset");
// Construction du nouvel élément partieEnCours avec les éléments au dessus en paramètres
const partieEnCours = new JeuDeNim(
  display,
  displayButtons,
  boutonReset,
  affichageAllumettes,
  counter
);

// Sélection des boutons uniquement présents dans la div des boutons joueur pour ne pas sélectionner accidentellement le bouton de reset au passage
const boutons = document.querySelectorAll("#boutons > button");
// Pour chaque bouton on définit l'écouteur d'évènement
boutons.forEach((bouton) => {
  bouton.addEventListener("click", (e) => {
    e.preventDefault();
    // On récupère le chiffre inscrit dans dans le bouton et on le transforme en entier, puis en utilise la fonction pour retirer le nombre d'allumettes sélectionné
    partieEnCours.retirerAllumettes(parseInt(bouton.textContent));
    // On cache les boutons pour pas que le joueur puisse jouer 2 coups de suite
    displayButtons.classList.add("hidden");
    // On laisse une seconde
    setTimeout(() => {}, 1000);
    // Si c'est le tour de l'ordinateur et que la partie n'est pas fini, on fait jouer l'ordinateur
    if (partieEnCours.tourJoueur === false && partieEnCours.estFini === false) {
      // On définit un deuxième temps mort d'une seconde
      setTimeout(() => {
        // On prend un nombre aléatoire entre 1 et 3 qu'on définit comme étant le choix de l'ordinateur
        const choixOrdinateur = Math.floor(Math.random() * 3 + 1);
        // On joue le coup de l'ordinateur
        partieEnCours.retirerAllumettes(choixOrdinateur);
        // Si la partie est finie, on laisse les boutons invisibles
        if (partieEnCours.estFini === false) {
          displayButtons.classList.remove("hidden");
        }
      }, 1000);
    }
  });
});
