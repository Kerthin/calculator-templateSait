const result = document.querySelector("input.inputWrap__result")

document.querySelectorAll("._number").forEach(
  elem => {
    const n = elem.innerText
    elem.onclick = event => result.value = result.value + n
  }
)