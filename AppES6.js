import SelectLengthPage from "Pages/SelectLengthPage";
import ExercisePage from "Pages/ExercisePage";
import ResultsPage from "Pages/ResultsPage";

export default class AppES6 {
	constructor() {
		this.pages = [ new SelectLengthPage() ];
		this.showResultsButton = true;
		this.viewingResults = false;
	}

	selectLength(args) {
		this.pages = [new ExercisePage(args.data.length) ];
		this.showResultsButton = false;
	}

	restart() {
		this.pages = [ new SelectLengthPage() ];
		this.showResultsButton = true;
		this.viewingResults = false;
	}

	openResults() {
		if (this.viewingResults) {
			this.restart();
		} else {
			this.pages = [ new ResultsPage() ];
			this.viewingResults = true;
		}
	}

	goBack() {
		if (this.pages.length > 1) {
			this.pages.pop();
			this.viewingResults = false;
		} else {
			// if on Android, exit app
		}
	}
}
