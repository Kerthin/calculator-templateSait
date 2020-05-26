var result = document.querySelector("input.inputWrap__result");
document.querySelectorAll("._number").forEach(function (elem) {
    var n = elem.innerText;
    elem.onclick = function (event) { return result.value = result.value + n; };
});
