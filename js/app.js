function AppModel() {
	this.version = 0.2;
	this.pageTitle = "Dynamic Page #1";

	this.headerTop = ko.observable(10);
	this.headerLeft = ko.observable(20);
	this.headerText = ko.observable("Dynamic Header Example");
	this.headerStyle = ko.computed(function(){
		return {
			top: this.headerTop()+'px',
			left: this.headerLeft()+'px'
		}
	}, this);
}

// Activates knockout.js
ko.applyBindings(new AppModel());