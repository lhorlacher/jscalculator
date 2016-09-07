//Calculator Code
var calcButtons = document.getElementsByClassName('calc_button');

var num1 = '';
var operator = null;
var num2 = '';
var result = null;
var memory = null;

// Add Click Event Listeners to Each Button
for(var i = 0; i < calcButtons.length; i++) {
	var button = calcButtons[i];
	button.addEventListener('click', function(event) {
		setOps(event.target.innerText)
		output.innerText = checkVarStatus()
	});
}

var clearButton = document.getElementById('clear_button');
console.log(clearButton)
clearButton.addEventListener('click', function() {
	num1 = '';
	operator = null;
	num2 = '';
	result = null;
	output.innerText = checkVarStatus()
});

var memorizeButton = document.getElementById('memorize_button');
memorizeButton.addEventListener('click', function() {
	memory = result
	console.log(memory)
})

var recallButton = document.getElementById('recall_button');
recallButton.addEventListener('click', function() {
	if(operator == null) {
		num1 = memory.toString()
		output.innerText = checkVarStatus()
	} else if(result == null) {
		num2 = memory.toString()
		output.innerText = checkVarStatus()
	}
});

function checkVarStatus() {
	if(num1 === '') {
		return ''
	} else if(operator == null) {
		return num1
	} else if(num2 === '') {
		return num1 + ' ' + operator
	} else if(result == null) {
		return num1 + ' ' + operator + ' ' + num2
	} else if(result !== null) {
		return num1 + ' ' + operator + ' ' + num2 + " = " + result
	}
}

function setOps(value) {
	if(operator == null && (acceptNumber(value) || acceptPeriod(value, num1))) {
		num1 = num1.toString() + value.toString()
	} else if(num1 !== '' && num2 === '' && /\+|\-|\*|\//.test(value)) {
		operator = value;
	} else if(operator !== null && result === null && (acceptNumber(value) || acceptPeriod(value, num2))) {
		num2 = num2.toString() + value.toString();
	} else if(value === '=' && num2 !== '') {
		result = calculation[operator](Number(num1), Number(num2)).toString()
	} else if(/\+|\-|\*|\//.test(value)) {
		num1 = calculation[operator](Number(num1), Number(num2)).toString()
		operator = null
		num2 = ''
		result = null
		setOps(value)
	} else if(result !== null && (acceptNumber(value) || value === '.')) {
		num1 = ''
		operator = null
		num2 = ''
		result = null
		setOps(value)
	} else if(result !== null) {
		num1 = result.toString()
		operator = null
		num2 = ''
		result = null
		setOps(value)
	} else {
		null
	}
}

function acceptPeriod(value, number) {
	if(number.indexOf('.') === -1 && value === '.') {
		return true;
	} else {
		return false;
	}
}

function acceptNumber(value) {
	if(/^\d+$/.test(value)) {
		return true
	} else {
		return false
	}
}

var calculation = {
	'+': function(num1, num2) {return num1 + num2},
	'-': function(num1, num2) {return num1 - num2},
	'*': function(num1, num2) {return num1 * num2}, 
	'/': function(num1, num2) {return num1 / num2}
}