import FileSystem from "FuseJS/FileSystem";

export default class Results {
	constructor() {
		this.path = FileSystem.dataDirectory + "/results.json";
		this.setupStorage();
	}

	setupStorage() {
		if (!FileSystem.existsSync(this.path)) {
			FileSystem.writeTextToFileSync(this.path, "[]");
		}
	}

	store(data, length) {
		var dateString = getDateString();
		var tmp = this.read();
		tmp.push(new ResultSet(dateString, length, data.equations, data.correct, data.incorrect));
		FileSystem.writeTextToFileSync(this.path, JSON.stringify(tmp));
	}

	clear() {
		FileSystem.writeTextToFileSync(this.path, "[]");
	}

	read() {
		console.log("reading results");
		var stored = FileSystem.readTextFromFileSync(this.path);
		return JSON.parse(stored);
	}

}

var getDateString = () => {
	var d = new Date();
	var day = d.getDate();
	if (day < 10) day = "0" + day;
	var month = d.getMonth() + 1;
	if (month < 10) month = "0" + month;
	var year = d.getFullYear();
	var hours = d.getHours();
	if (hours < 10) hours = "0" + hours;
	var minutes = d.getMinutes();
	if (minutes < 10) minutes = "0" + minutes;
	return day + "." + month + "." + year + " " + hours + ":" + minutes;
}

class ResultSet {
	constructor(date, time, total, correct, incorrect) {
		this.date = date;
		this.time = time;
		this.total = total;
		this.correct = correct;
		this.incorrect = incorrect;
	}
}
