
function DocumentLayer(type, title) {
	var self = this;
	self.type = type;
	self.title = title;
	self.active =  ko.observable(false);
}

function DocumentPage(title) {
	var self = this;
	self.title = title;
	self.active = ko.observable(false);
	self.items = ko.observableArray([
		// Initialize with some dummy test data
		new DocumentLayer("text", "Document Header"),
		new DocumentLayer("artboard", "Artboard Desktop"),
		new DocumentLayer("group", "Header Group")
	]);
}

function Selection() {
	var self = this;
	self.items = ko.observableArray();
	self.isEmpty = ko.computed(function() {
		return self.items().length < 1;
	}, this);
	self.isMultiple = ko.computed(function() {
		return self.items().length > 1;
	}, this);
	self.selectNone = function() {
		self.items().forEach(function(layer) {
			layer.active(false);
		})
		console.log("Select None");
		self.items([]);
	}
	self.selectLayer = function(layer) {
		console.log(layer);
		self.items.push(layer);
		layer.active(true);
	}
}


function AppModel() {
	var self = this;
	self.document = ko.observableArray();
	self.currentPage = ko.observable();
	self.selection = new Selection();

	//	Page Operations

	self.activatePage = function(page) {
		console.log("Set active page")
		if (self.currentPage()) {
			// remove active mark from previous page
			self.currentPage().active(false);
		}
		self.currentPage(page);
		page.active(true);
	}

	this.createNewPage = function() {
		console.log("Create new page");
		var page = new DocumentPage("Page " + (this.document().length+1) )
		this.document.push(page);
		this.activatePage(page);
	}

	// Document Operations

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

	// Layer Operations

	this.activateLayer = function(layer) {
		console.log("Activate layer:");
		// console.log(layer);
		if (!(event.shiftKey || event.ctrlKey))
			self.selection.selectNone();
		self.selection.selectLayer(layer);
	}

	this.createLayer = function(content) {
		this.selection.selectNone();
		this.currentPage().items.push(content);
		this.activateLayer(content);
	}

	this.createArtboard = function() {
		console.log("Create new Artboard");
		this.createLayer(new DocumentLayer("artboard", "New Artboard"));
	}

	this.createRectangle = function() {
		console.log("Create new Rectangle");
		this.createLayer(new DocumentLayer("rect", "New Rectangle"));
	}

	self.deleteSelected = function() {
		console.log("Delete Selected: NOT IMPLEMENTED!");
	}

	//	Helper Functions

	// Return 'active' if passed item object has .active property set to True
	self.activeClass = function(item) {
		return item.active() ? 'active' : '';
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