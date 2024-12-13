      const progressBar = document.getElementById("progressBar");


      let pap = 845; // Porcentagem máxima
      let progressa = 845; // Porcentagem inicial da barra
      let pa = Math.round((progressa / pap) * 100); // Porcentagem inicial ajustada para 100%

      updateProgressBar(100); // Inicializa a barra
      updateProgressBar(pa); // Inicializa a porcentagem da barra

      let dano = pp - progress; // Calcula o dano (diminuição de valor)
      console.log(pa);
      
      // Função para atualizar a barra e o texto
      function updateProgressBar(p2) {
        progressBar.style.width = `${p2}%`; // Atualiza a largura da barra dinamicamente

        // Define a animação da barra
        progressBar.style.transition = "width 1.5s ease"; 

        // Aplicando a borda metálica via JS
        progressBar.style.border = "2px solid";
        progressBar.style.borderImage =
          "linear-gradient(to right, #b0b0b0, #f0f0f0, #b0b0b0)";
        progressBar.style.borderImageSlice = 1;
      }
