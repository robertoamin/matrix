const grabar = document.getElementById("grabar");
const notas = document.getElementById("notas");

let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";

  recognition.onresult = function (event) {
    const result = event.results.item(0).item(0).transcript;

    const notaDiv = document.createElement("div");
    notaDiv.textContent = result;
    notas.appendChild(notaDiv); // Agregamos el div al div de notas en el HTML
  };
} else {
  console.log("El reconocimiento de voz no es compatible con este navegador.");
}

grabar.addEventListener("click", function () {
  recognition.start();
});
