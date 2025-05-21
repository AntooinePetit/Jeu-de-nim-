class JeuDeNim {
  constructor() {
    this.allumettesRestantes = 20;
    this.tourJoueur = true
  }

  retirerAllumettes(number){
    if(number > 3 || number < 1){
      display.textContent = 'Action impossible, vous ne pouvez retirer que 1, 2 ou 3 allumettes'
      return
    }
    if(this.allumettesRestantes - number > 0) {
      this.allumettesRestantes -= number
      display.textContent = `${this.tourJoueur === true ? `Vous retirez ${number} allumette(s).` : `L'ordinateur retire ${number} allumette(s).`} Il reste ${this.allumettesRestantes} allumette(s)`
      this.afficherAllumettesRestantes(number)
      return
    }
    if(this.allumettesRestantes - number <= 0) {
      this.allumettesRestantes = 0
      display.textContent = `Il reste 0 allumette. ${this.tourJoueur === true ? "Vous avez perdu." : "Vous avez gagné."}`
      this.afficherAllumettesRestantes(number)
    }
  }

  afficherAllumettesRestantes(num) {
    const affichageAllumettes = document.querySelectorAll('hr')
    for (let i = this.allumettesRestantes + num -1 ; i > this.allumettesRestantes - 1 ; i--) {
      affichageAllumettes[i].classList.add('taken')
    }
  }
}


const display = document.querySelector('#action-en-cours')
const partieEnCours = new JeuDeNim()