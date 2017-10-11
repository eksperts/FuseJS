import Results from "Modules/Results";

export default class ResultsPage {
	constructor() {
		this.results = new Results();
		this.data = [];
		this.refresh();
	}

	clear() {
		this.results.clear();
		this.refresh();
	}

	refresh() {
		this.data = this.results.read().reverse()
	}
}