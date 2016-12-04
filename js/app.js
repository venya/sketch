
function DocumentLayer(type, title) {
	var self = this;
	self.type = type;
	self.title = title;
}

function DocumentPage(title) {
	var self = this;
	self.title = title;
	self.active =  false;
	self.items = ko.observableArray([
		// Initialize with some dummy test data
		new DocumentLayer("text", "Document Header"),
		new DocumentLayer("artboard", "Artboard Desktop"),
		new DocumentLayer("group", "Header Group")
	]);
}



function AppModel() {

	this.document = ko.observableArray();
	this.currentPage = ko.observable();

	// Document Operations

	this.activatePage = function(index) {
		console.log("Set active page: "+index);
		if (this.currentPage) {
			// remove active mark from previous page
			// this.currentPage.active = false;
		}
		this.currentPage(this.document()[index]);
		var p = this.currentPage();
		p.active = true;
		console.log(p);
	}

	this.clearDocument = function() {
		console.log("Clear Document!");
		this.document([]);
	}

	this.loadDocument = function() {
		console.log("Load Dummy Document...");
		this.document([
			new DocumentPage("Page 1"),
			new DocumentPage("Empty Page 2"),
			new DocumentPage("Symbols")
		]);
		this.activatePage(0);
	}

	this.saveDocument = function() {
		console.log("Save Document: NOT IMPLEMENTED!");
	}

	this.dumpDocument = function() {
		console.log(this.document());
	}

	this.createNewPage = function() {
		console.log("Create new page");
		this.document.push(new DocumentPage("Page " + (this.document().length+1) ));
		this.activatePage(this.document().length-1);
	}



	this.headerTop = ko.observable(10);
	this.headerLeft = ko.observable(20);
	this.headerText = ko.observable("Dynamic Header Example");
	this.headerStyle = ko.computed(function(){
		return {
			top: this.headerTop()+'px',
			left: this.headerLeft()+'px'
		}
	}, this);


	// Initialize!

	this.loadDocument();

}

// Activates knockout.js
ko.applyBindings(new AppModel());