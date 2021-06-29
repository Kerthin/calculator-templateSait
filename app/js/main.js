// Dark Theme
var container = document.querySelector('.container');
var themeButton = document.querySelector('.darkButton');

themeButton.addEventListener(
	"click",
	function (i) {
		this.classList.toggle("darkButton_dark");
		container.classList.toggle("container_dark");
	}
);

// Calculator
var result = document.querySelector("input.inputWrap__result");

document.querySelectorAll("._number").forEach(function (elem) {
		var n = elem.innerText;
		elem.onclick = function (event) { return result.value = result.value + n; };
});

var buffer = [];

var evaluate = function (buffer) {
		var secondArgument = buffer.pop().value;
		var operator = buffer.pop().value;
		var firstArgument = buffer.pop().value;
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
};

var opCallback = function (actionName) {
	return function (event) {
		if (buffer && buffer.length) {
			buffer.push({ type: "value", value: parseFloat(result_1.value, 10) });
			var result_1 = evaluate(buffer);
			buffer.push({ type: "value", value: result_1 });
			buffer.push({ type: "action", value: actionName });
			result_1.value = "";
		}
		else {
			buffer.push({ type: "value", value: parseFloat(result.value, 10) });
			buffer.push({ type: "action", value: actionName });
			result.value = "";
		}
	};
};

for (var _i = 0, _a = ["plus", "minus", "multiplication", "divide", "percent"]; _i < _a.length; _i++) {
	var actionName = _a[_i];
	document.querySelector("._action[action=" + actionName + "]").onclick = opCallback(actionName);
}

document.querySelector("._action[action=equality]").onclick = function (event) {
	buffer.push({ type: "value", value: parseFloat(result.value, 10) });
	result.value = evaluate(buffer).toString();
};

document.querySelector("._action[action=clear]").onclick = function (event) {
	result.value = "";
	while (buffer.length)
		buffer.pop();
};

document.querySelector("._action[action=negate]").onclick = function (event) { return result.value = -parseFloat(result.value, 10); };
document.querySelector("._action[action=point]").onclick = function (event) { return result.value = parseFloat(result.value) + '.'; };
