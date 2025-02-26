export function initializeProgressBar(pp,progress,dano,progressBar) {

    //let pp = 845; // Vida máxima
    //let progress = 72; // vida atual
    let  p = Math.round((progress / pp) * 100); // Porcentagem inicial ajustada para 100%
    //console.log("sf",p,progress,pp)
    let danoso = Math.round((dano / pp) * 100);
    //console.log("sfs",danoso)
    //updateProgressBar(100);
    updateProgressBar(p,progressBar);
    

    if (p > 0) {
        const decreaseAmount = danoso; // Valor entre 10 e 30
        p = Math.max(p - decreaseAmount, 0); // Evita que fique abaixo de 0
        updateProgressBar(p); // Atualiza a barra com o novo valor
        //console.log("ssfs",p)
      }
    //let dano = pp - progress; // Calcula o dano (diminuição de valor)
    //progressText.textContent = `${p}%`; // Inicializa o texto com o valor
    
    // Função para atualizar a barra e o texto
    function updateProgressBar(p,progressBar) {
      //console.log("pppp:",progressBar);
      progressBar.style.width = `${p}%`;
      console.log("updateProgressBar:",progressBar.style.width);
      //progressText.textContent = `${p}%`;
      progressBar.style.transition = "width 1.5s ease"; // Define a animação da barra
      progressBar.style.height = `100%`;

      // Aplicando a borda metálica via JS 
      progressBar.style.border = "2px solid";
      progressBar.style.borderImage =
        "linear-gradient(to right, #b0b0b0, #f0f0f0, #b0b0b0)";
      progressBar.style.borderImageSlice = 1;
      return(progressBar.style.width = progressBar.style.width)
    }


  }
