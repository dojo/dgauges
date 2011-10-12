define(["dojo/_base/lang", "dojo/_base/declare", "./TickItem", "dojo/Stateful"], function(lang, declare, TickItem, Stateful){

    /*=====
     var Stateful = dojo.Stateful;
     =====*/

	return declare("dojox.gauge.LinearScaler", Stateful, {
		minimum: 0,
		maximum: 100,
		snapInterval: 1,
		majorTickInterval: NaN,
		minorTickInterval: NaN,
		_computedMajorTickInterval: NaN,
		_computedMinorTickInterval: NaN,
		majorTicks: null,
		minorTicks: null,
		
		constructor: function(){
			this.inherited(arguments);
			this.watchedProperties = ["minimum", "maximum", "majorTickInterval", "minorTickInterval", "snapInterval"];
		},
		
		getNextValidValue: function(value){
			var v = Number(value);
			var nv;
			if (isNaN(this.snapInterval)) 
				nv = v + (this.maximum - this.minimum) / 10;
			else 
				nv = v + this.snapInterval;
			return Math.max(nv, this.minimum);
		},
		
		getPreviousValidValue: function(value){
			var v = Number(value);
			var nv;
			if (isNaN(this.snapInterval)) 
				nv = v - (this.maximum - this.minimum) / 10;
			else 
				nv = v - this.snapInterval;
			return Math.max(nv, this.minimum);
		},
		
		getFirstValidValue: function(){
			return this.minimum;
		},
		
		getLastValidValue: function(){
			return this.maximum;
		},
		
		buildMinorTickItems: function(){
			var mt = this.majorTicks;
			var minorTickCache = [];
			if (this.maximum > this.minimum) {
				var majorTickCount = Math.floor((this.maximum - this.minimum) / this.getComputedMajorTickInterval()) + 1;
				var minorTickCount = Math.floor(this.getComputedMajorTickInterval() / this.getComputedMinorTickInterval());
				var data;
				for (var i = 0; i < majorTickCount - 1; i++) {
					for (var j = 1; j < minorTickCount; j++) {
						data = new TickItem(this);
						data.isMinor = true;
						data.value = mt[i].value + j * this.getComputedMinorTickInterval();
						data.position = (Number(data.value) - this.minimum) / (this.maximum - this.minimum);
						minorTickCache.push(data);
					}
				}
			}
			return minorTickCache;
		},
		
		buildMajorTickItems: function(){
			var majorTickCache = [];
			if (this.maximum > this.minimum) {
				var majorTickCount = Math.floor((this.maximum - this.minimum) / this.getComputedMajorTickInterval()) + 1;
				var data;
				for (var i = 0; i < majorTickCount; i++) {
					data = new TickItem(this);
					data.isMinor = false;
					data.value = this.minimum + i * this.getComputedMajorTickInterval();
					data.position = (Number(data.value) - this.minimum) / (this.maximum - this.minimum);
					majorTickCache.push(data);
				}
			}
			return majorTickCache;
		},
		
		getComputedMajorTickInterval: function(){
			if (!isNaN(this.majorTickInterval)) 
				return this.majorTickInterval;
			if (isNaN(this._computedMajorTickInterval)) 
				this._computedMajorTickInterval = (this.maximum - this.minimum) / 10;
			return this._computedMajorTickInterval;
		},
		
		getComputedMinorTickInterval: function(){
			if (!isNaN(this.minorTickInterval)) 
				return this.minorTickInterval;
			if (isNaN(this._computedMinorTickInterval)) 
				this._computedMinorTickInterval = this.getComputedMajorTickInterval() / 5;
			return this._computedMinorTickInterval;
		},
		
		computeTicks: function(){
			this.majorTicks = this.buildMajorTickItems();
			this.minorTicks = this.buildMinorTickItems();
			return this.majorTicks.concat(this.minorTicks);
		},
		positionForValue: function(value){
			var position;
			if (value == null || isNaN(value) || value <= this.minimum) 
				position = 0;
			if (value >= this.maximum) 
				position = 1;
			if (isNaN(position)) {
				position = (value - this.minimum) / (this.maximum - this.minimum);
			}
			return position;
		},
		valueForPosition: function(position){
			var range = Math.abs(this.minimum - this.maximum);
			var value = this.minimum + range * position;
			if (!isNaN(this.snapInterval) && this.snapInterval > 0) {
				value = Math.round((value - this.minimum) / this.snapInterval) * this.snapInterval + this.minimum;
			}
			return value;
		}
	});
});
