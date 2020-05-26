const result = document.querySelector("input.inputWrap__result");

document.querySelectorAll("._number").forEach(
  elem => {
    const n = elem.innerText;
    elem.onclick = event => result.value = result.value + n;
  }
)

const buffer = []

const evaluate = buffer => {
  const secondArgument = buffer.pop().value;
  const operator = buffer.pop().value;
  const firstArgument = buffer.pop().value;
  
  if (operator === "plus") {
    return firstArgument + secondArgument;
  }
  else if (operator === "minus") {
    return firstArgument - secondArgument;
  }
  else if (operator === "multiplication") {
    return firstArgument * secondArgument;
  }
  else if (operator === "divide") {
    return firstArgument / secondArgument;
  }
  else if (operator === "percent") {
    return firstArgument % secondArgument;
  }
}

const opCallback = actionName =>
  event => {
    if (buffer && buffer.length) {
      buffer.push({ type: "value", value: parseFloat(result.value, 10) });
      
      const result = evaluate(buffer);
      
      buffer.push({ type: "value", value: result });
      buffer.push({ type: "action", value: actionName });
      
      result.value = "";
    }
    else {
      buffer.push({ type: "value", value: parseFloat(result.value, 10) });
      buffer.push({ type: "action", value: actionName });
      result.value = "";
    }
  }

for (const actionName of [ "plus", "minus", "multiplication", "divide", "percent" ]) {
  document.querySelector(`._action[action=${actionName}]`).onclick = opCallback(actionName);
}

document.querySelector("._action[action=equality]").onclick = event => {
  buffer.push({ type: "value", value: parseFloat(result.value, 10) });
  result.value = evaluate(buffer).toString();
}

document.querySelector("._action[action=clear]").onclick = event => {
  result.value = "";
  while (buffer.length) buffer.pop();
}

document.querySelector("._action[action=negate]").onclick = event => result.value = -parseFloat(result.value, 10);
document.querySelector("._action[action=point]").onclick = event => result.value = parseFloat(result.value) + '.';