define(["dojo/_base/declare"], function(declare){
	return declare("dojox.gauge.TickItem", null, {
		constructor: function(scale){
			this.scale = scale;
		},
		isMinor: false
	});
});
