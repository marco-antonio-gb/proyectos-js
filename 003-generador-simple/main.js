// Inicializar variables
let simplePasswordText = ''
const stringValues = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+}{:?><;'
const passwordLenght = 12

// Elementos del Dom
const generateButton = document.getElementById('generate-button')
const copyButton = document.getElementById('copy-button')
const passText = document.getElementById('pass-text')

// Funciones

// Funcion para copiar la contraseña al portapapeles usando la API Navigator: clipboard
function copyToClipBoard() {
	//https://www.freecodecamp.org/espanol/news/como-copiar-texto-al-clipboard-con-javascript/
	navigator.clipboard.writeText(simplePasswordText)
	alert('Contraseña copiada ' + simplePasswordText)
}
// Funcion para generar un valor entero aleatorio entre dos numeros
function getRandomValue(min, max) {
	const minCeiled = Math.ceil(min) // La funcion Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
	const maxFloored = Math.floor(max) // La funcion  Math.floor() devuelve el máximo entero menor o igual a un número.

	//La función Math.random() devuelve un número de coma flotante pseudo-aleatorio, comprendido en el rango de 0 a menor que 1 (es decir, incluido el 0 pero no el 1)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

// Funcion principal para generar la contraseña
function generatePassword() {
	const newPassword = [] // Array que contendra los caracteres de la contraseña

	// Bucle para generar los caractares de la contraseña usando la longitud requerida como  limite
	for (let index = 0; index < passwordLenght; index++) {
		// Obtenemos un numero aleatorio entre 0 y la longitud  de los caracteres validos 'stringValues'
		const rndInt = getRandomValue(0, stringValues.length)

		// Obtenemos el caracter asociado al numero aleatorio obtenido convirtiendo el string en un array usando .split('') y usando el numero aleatorio como indice.
		const passChar = stringValues.split('')[rndInt]

		// Insertamos el caracter al array de la nueva contraseña
		newPassword.push(passChar)
	}

	// Una vez obtenido todos los caracteres, convertimos el array en un string usando  .join('')

	simplePasswordText = newPassword.join('')

	// Finalmente mostramos la nueva contraseña en el HTML
	passText.innerText = simplePasswordText
}

// Agregar la funcion al evento click del boton 'Generar contraseña'
generateButton.addEventListener('click', () => {
	generatePassword()
})
// Agregar la funcion al evento click del boton 'Copiar contraseña'
copyButton.addEventListener('click', () => {
	copyToClipBoard()
})

// Agregar la funcion al evento DOMContentLoaded del documento, que ejecuta la funcion cuando el HTML está completamente cargado y el árbol DOM está construido
document.addEventListener('DOMContentLoaded', () => {
	generatePassword()
})
