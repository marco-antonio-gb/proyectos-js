console.log('Hello from Main.js')
const counterValue = document.getElementById('counter-value')
const counterButtonAdd = document.getElementById('counterButtonAdd')
const counterButtonMinus = document.getElementById('counterButtonMinus')
const counterButtonReset = document.getElementById('counterButtonReset')

let currentValue = 0
changeStatusButton(true)
updateCounter(currentValue)

function changeStatusButton(status) {
  counterButtonMinus.disabled = status
  counterButtonReset.disabled = status
}
function updateCounter(value) {
  counterValue.innerText = value
  if (value > 0) {
    changeStatusButton(false)
  }
  if (value === 0) {
    changeStatusButton(true)
  }
}
function increment() {
  if (currentValue >= 0) {
    currentValue += 1
    updateCounter(currentValue)
  }
}
function decrement() {
  if (currentValue > 0) {
    currentValue -= 1
    updateCounter(currentValue)
  }
}

counterButtonAdd.addEventListener('click', () => increment())
counterButtonMinus.addEventListener('click', () => decrement())
counterButtonReset.addEventListener('click', () => {
  updateCounter(0)
  changeStatusButton(true)
})
