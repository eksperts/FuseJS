import FileSystem from "FuseJS/FileSystem";
import Results from "Modules/Results";

export default class ExercisePage {

	constructor(length) {

		this.results = new Results();

		this.length = length;
		this.equation = null;
		this.answers = [];
		this.result = new Result();
		this.showResult = false;
		this.canAnswer = true;
		this.start();
		setTimeout(() => { this.stop(); }, length * 1000);
	}

	start() {
		this.next();
	}

	next() {
		this.equation = new Equation();
		this.answers = getAnswersExcluding(this.equation.result);
		this.result.incEquations();
		this.canAnswer = true;
	}

	stop() {
		this.showResult = true;
		this.results.store(this.result, this.length);
	}

	selectAnswer(args) {
		if (this.canAnswer) {
			this.markAsAnswered(args.data.label);
			if (args.data.correct) {
				this.canAnswer = false;
				this.result.incCorrect();
				setTimeout(this.next, 1000);
			} else {
				this.result.incIncorrect();
			}
		}
	}

	markAsAnswered(label) {
		this.answers.forEach((a) => {
			if (a.label == label) a.markAsAnswered();
		});
	}

}

class Answer {
	constructor(label, isCorrect) {
		this.label = label;
		this.answered = false;
		this.correct = isCorrect;
	}

	markAsAnswered() {
		this.answered = true;
	}
}

class Equation {
	constructor() {
		this.first = getRandomIntInclusive(1, 10);
		this.second = getRandomIntInclusive(1, 10);
		this.label = this.first + " x " + this.second;
		this.result = this.first * this.second;
	}
}

class Result {
	constructor() {
		this.equations = 0;
		this.correct = 0;
		this.incorrect = 0;
	}

	incEquations() {
		this.equations++;
	}

	incCorrect() {
		this.correct++;
	}

	incIncorrect() {
		this.incorrect++;
	}
}

var getRandomIntInclusive = (min, max) => { return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); }

var getAnswersExcluding = (avoid) => {
	var tmp = [];
	tmp.push(new Answer(avoid, true));
	while (tmp.length < 4) {
		var rand = getRandomIntInclusive(1,100);
		var contains = false;
		tmp.forEach((v) => {
			if (v.label == rand) contains = true;
		});
		if (!contains) tmp.push(new Answer(rand, false));
	}
	shuffle(tmp);
	return tmp;
}

var shuffle = (a) => {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}
