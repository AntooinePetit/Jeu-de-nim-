class JeuDeNim {
  constructor() {
    this.allumettesRestantes = 20;
    this.tourJoueur = true;
    this.estFini = false;
  }

  retirerAllumettes(number) {
    if (this.estFini === true) {
      displayButtons.classList.add("hidden");
      this.afficherBoutonReset();
      return;
    }
    if (number > 3 || number < 1) {
      display.textContent =
        "Action impossible, vous ne pouvez retirer que 1, 2 ou 3 allumettes";
      return;
    }
    if (this.allumettesRestantes - number > 0) {
      this.allumettesRestantes -= number;
      display.textContent = `${
        this.tourJoueur === true
          ? `Vous retirez ${number} allumette(s).`
          : `L'ordinateur retire ${number} allumette(s).`
      } Il reste ${this.allumettesRestantes} allumette(s)`;
      this.afficherAllumettesRestantes(number);
      return;
    }
    if (this.allumettesRestantes - number <= 0) {
      this.allumettesRestantes = 0;
      display.textContent = `Il reste 0 allumette. ${
        this.tourJoueur === true ? "Vous avez perdu." : "Vous avez gagné."
      }`;
      this.afficherAllumettesRestantes(number);
      this.estFini = true;
    }
  }

  afficherBoutonReset() {
    boutonReset.classList.remove("hidden");
  }

  afficherAllumettesRestantes(num) {
    for (
      let i = this.allumettesRestantes + num - 1;
      i > this.allumettesRestantes - 1;
      i--
    ) {
      affichageAllumettes[i].classList.add("taken");
      this.tourJoueur === true
        ? (this.tourJoueur = false)
        : (this.tourJoueur = true);
    }
  }

  reset() {
    affichageAllumettes.forEach((allumette) => {
      allumette.classList.remove("taken");
    });
    this.allumettesRestantes = 20;
    this.estFini = false;
    displayButtons.classList.remove("hidden");
    display.textContent = "";
    boutonReset.classList.add("hidden");
  }
}

const display = document.querySelector("#action-en-cours");
const displayButtons = document.querySelector("#boutons");
const affichageAllumettes = document.querySelectorAll("hr");
const partieEnCours = new JeuDeNim();

const boutonReset = document.querySelector("#bouton-reset");
boutonReset.addEventListener("click", (e) => {
  this.reset();
  boutonReset.remove(); // A changer
});

const boutons = document.querySelectorAll("button");
boutons.forEach((bouton) => {
  bouton.addEventListener("click", (e) => {
    e.preventDefault();
    partieEnCours.retirerAllumettes(parseInt(bouton.textContent));
    displayButtons.classList.toggle("hidden");
    setTimeout(() => {}, 1000);
    setTimeout(() => {
      const choixOrdinateur = Math.floor(Math.random() * 3 + 1);
      partieEnCours.retirerAllumettes(choixOrdinateur);
      if (partieEnCours.estFini === false) {
        displayButtons.classList.toggle("hidden");
      }
    }, 1000);
  });
});
