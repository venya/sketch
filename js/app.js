
function DocumentLayer(type, title) {
	var self = this;
	self.type = type;
	self.title = title;
}

function DocumentPage(title) {
	var self = this;
	self.title = title;
	self.active =  ko.observable(false);
	self.items = ko.observableArray([
		// Initialize with some dummy test data
		new DocumentLayer("text", "Document Header"),
		new DocumentLayer("artboard", "Artboard Desktop"),
		new DocumentLayer("group", "Header Group")
	]);
}



function AppModel() {
	var self = this;
	this.document = ko.observableArray();
	this.currentPage = ko.observable();

	// Document Operations

	this.activatePage = function(page) {
		console.log("Set active page")
		console.log(page);
		if (self.currentPage()) {
			// remove active mark from previous page
			self.currentPage().active(false);
		}
		self.currentPage(page);
		page.active(true);
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
		this.activatePage(this.document()[0]);
	}

	this.saveDocument = function() {
		console.log("Save Document: NOT IMPLEMENTED!");
	}

	this.dumpDocument = function() {
		console.log(this.document());
	}

	this.createNewPage = function() {
		console.log("Create new page");
		var page = new DocumentPage("Page " + (this.document().length+1) )
		this.document.push(page);
		this.activatePage(page);
	}

	// Layer Operations

	this.activateLayer = function(index) {
		console.log("Activate layer: " + index + " (NOT IMPLEMENTED!)");
	}

	this.createLayer = function(content) {
		this.currentPage().items.push(content);
		this.activateLayer();
	}

	this.createArtboard = function() {
		console.log("Create new Artboard");
		this.createLayer(new DocumentLayer("artboard", "New Artboard"));
	}

	this.createRectangle = function() {
		console.log("Create new Rectangle");
		this.createLayer(new DocumentLayer("rect", "New Rectangle"));
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