define(["dojo/_base/lang", "dojo/_base/declare", "dojox/gfx", "../widget/_Invalidating"], function(lang, declare, gfx, _Invalidating){
    
	/*=====
     var _Invalidating = dojox.widget._Invalidating;
     =====*/
	
	return declare("dojox.gauge.ScaleBase", _Invalidating, {
		scaler: null,
		_gauge: null,
		_gfxGroup: null,
		_bgGroup: null,
		_fgGroup: null,
		_indicators: null,
		_indicatorsIndex: null,
		_indicatorsRenderers: null,
		//	font: Object
		//		The font used for the ticks labels.
		//		This is null by default which means this scale use the font defined 
		//		on the gauge.
		font: null,
		//	labelPosition: String
		//		See CircularScale and RectangularScale for valid values.
		labelPosition: null,
		//	labelGap: Number
		//		The label gap between the ticks and their labels. Default value is 1.
		labelGap: 1,
		
		constructor: function(args, node){
			this._indicators = [];
			this._indicatorsIndex = {};
			this._indicatorsRenderers = {};
			this._gauge = null;
			this._gfxGroup = null;
			this.addInvalidatingProperties(["scaler", "font", "labelGap", "labelPosition", "tickShapeFunc", "tickLabelFunc"]);
			
			var watchedObjects = ["scaler"];
			
			for (var i = 0; i < watchedObjects.length; i++){
				this.watch(watchedObjects[i], lang.hitch(this, this._watchObject));
			}
		},
		
		
		_watchObject: function(name, oldValue, newValue){
			// TODO: unwatch oldValue properties
			
			// Get the properties declared by the watched object
			var props = newValue.watchedProperties;
			if(props){
				for (var i = 0; i < props.length; i++){
					newValue.watch(props[i], lang.hitch(this, this.invalidateRendering));
				}
			}
		},
		
		_getFont: function(){
			var font = this.font;
			if(!font){
				font = this._gauge.font;
			}
			if(!font){
				font = gfx.defaultFont;
			}
			return font;
		},
		
		positionForValue: function(value){
			//	summary:
			//		See CircularScale and Rectangular for more informations.
			//		value: Number
			//			The value to convert.
			//		returns: Number
			//			The position corresponding to the value.
			return 0;
		},
		
		valueForPosition: function(position){
			//	summary:
			//		See CircularScale and Rectangular for more informations.
			//		position: Number
			//			The position to convert.
			//		returns: Number
			//			The value corresponding to the position.
		},
		
		positionInRange: function(position){
			//	summary:
			//		See CircularScale and Rectangular for more informations.
			//		position: Number
			//			The position to test.
			//		returns: Number
			//			true if position is a valid position according to the scale specifications.
			return false;
		},
		
		tickLabelFunc: function(tickItem){
			//	summary:
			//		Customize the text of ticks labels.
			//		tickItem: TickItem
			//			The tick item to process.
			//		returns: String
			//			The text to be aligned with the tick. If null, the tick has no label.
			if(tickItem.isMinor){
				return null;
			} else {
				return String(tickItem.value);
			}
		},
		
		tickShapeFunc: function(scale, group, tickItem){
			//	summary:
			//		Customize the shape of ticks.
			//		scale: ScaleBase
			//			The scale being processed.
			//		group: dojox.gfx.Group
			//			The GFX group used for drawing the tick.
			//		tickItem: TickItem
			//			The tick item being processed.
			return group.createLine({
				x1: 0,
				y1: 0,
				x2: tickItem.isMinor ? 6 : 10,
				y2: 0
			}).setStroke({
				color: 'black',
				width: 0.5
			});
		},
		
		
		getNextValidValue: function(value){
			return null;
		},
		
		getPreviousValidValue: function(value){
			return null;
		},
		
		getFirstValidValue: function(){
			return null;
		},
		
		getLastValidValue: function(){
			return null;
		},
		
		getIndicatorRenderer: function(name){
			//	summary:
			//		Get the GFX shape an indicator.
			//	name: String
			//		The name of the indicator as defined using addIndicator.
			//	returns: GFX shape
			//		The GFX shape of the indicator.
			return this._indicatorsRenderers[name];
		},
		
		removeIndicator: function(name){
			//	summary:
			//		Remove an indicator.
			//	name: String
			//		The name of the indicator as defined using addIndicator.
			//	returns: IndicatorBase
			//		The removed indicator.
			var indicator = this._indicatorsIndex[name];
			if(indicator){
				indicator._gfxGroup.removeShape();
				var idx = this._indicators.indexOf(indicator);
				this._indicators.splice(idx, 1);
				
				indicator._disconnectListeners();
				
				delete this._indicatorsIndex[name];
				delete this._indicatorsRenderers[name];
			}
			this.invalidateRendering();
			return indicator;
		},
		
		getIndicator: function(name){
			//	summary:
			//		Get an indicator instance.
			//	name: String
			//		The name of the indicator as defined using addIndicator.
			//	returns: IndicatorBase
			//		The indicator associated with the name parameter.
			return this._indicatorsIndex[name];
		},
		
		addIndicator: function(name, indicator, behindScale){
			//	summary:
			//		Add an indicator to the scale. Before calling this function, ensure 
			//		this scale has already been added to a gauge using the addElement method
			//		of the gauge.
			//	name: String:
			//		The name of the indicator to be added.
			if(this._indicatorsIndex[name] && this._indicatorsIndex[name] != indicator){
				this.removeIndicator(name);
			}
			
			this._indicators.push(indicator);
			this._indicatorsIndex[name] = indicator;
			
			if(!this._ticksGroup){
				this._createSubGroups();
			}
			
			var group = behindScale ? this._bgGroup : this._fgGroup;
			indicator._gfxGroup = group.createGroup();
			
			indicator.scale = this;
			
			return this.invalidateRendering();
		},
		
		_createSubGroups: function(){
			if(!this._gfxGroup || this._ticksGroup){
				return;
			}
			this._bgGroup = this._gfxGroup.createGroup();
			this._ticksGroup = this._gfxGroup.createGroup();
			this._fgGroup = this._gfxGroup.createGroup();
		},
		
		refreshRendering: function(){
			if(!this._ticksGroup){
				this._createSubGroups();
			}
		}
		
		
	});
});
