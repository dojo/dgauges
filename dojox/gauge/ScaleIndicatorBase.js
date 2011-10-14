define(["dojo/_base/lang", "dojo/_base/declare", "dojo/on", "dojo/_base/connect", "dojox/gfx", "./_CircularGaugeUtil", "./_Invalidating", "./IndicatorBase"], function(lang, declare, on, connect, gfx, _CircularGaugeUtil, _Invalidating, IndicatorBase){

	/*=====
	 var _Invalidating = dojox.widget._Invalidating;
	 =====*/
	return declare("dojox.gauge.ScaleIndicatorBase", IndicatorBase, {
		scale: null,
		value: 0,
		
		//	interactionArea: String
		//		How to interact with the indicator using mouse or touch interactions.
		//		Can be "indicator" or "gauge". The default value is "gauge".
		//		When the value is "indicator", the indicator shape reacts to mouse and touch events.
		//		When the value is "gauge", the whole gauge reacts to mouse and touch events.
		interactionArea: "gauge",
		
		interactionMode: "mouse",
				
		_indicatorShapeFunctionFlag: true,
		
		_interactionAreaFlag: true,
		
		_downListeners: null,
		
		_moveAndUpListeners: null,
		
		constructor: function(){
		
			// watches changed happening on the "value" property to call this.valueChanged() function which
			// can be listen by user with dojo.connect
			this.watch("value", lang.hitch(this, function(){
				this.valueChanged(this);
			}));
			
			this.watch("interactionArea", lang.hitch(this, function(){
				this._interactionAreaFlag = true;
			}));
			this.watch("interactionMode", lang.hitch(this, function(){
				this._interactionAreaFlag = true;
			}));
			
			this.watch("indicatorShapeFunction", lang.hitch(this, function(){
				this._indicatorShapeFunctionFlag = true;
			}));
			
			this.addInvalidatingProperties(["scale", "value", "indicatorShapeFunction", "interactionArea", "interactionMode"]);
			
			this._downListeners = [];
			this._moveAndUpListeners = [];
		},
		
		refreshRendering: function(){
			if (this._gfxGroup == null || this.scale == null) {
				return;
			} else {
				if (this._indicatorShapeFunctionFlag && lang.isFunction(this.indicatorShapeFunction)) {
					this._gfxGroup.clear();
					this.indicatorShapeFunction(this, this._gfxGroup, this.scale);
					this._indicatorShapeFunctionFlag = false;
				}
				
				if (this._interactionAreaFlag) {
					this._interactionAreaFlag = this._connectDownListeners();
				}
			}
		},
		
		valueChanged: function(indicator){
			//	summary:
			//		Invoked when the value of the indicator changes.
			//		User can connect an listener on this function: 
			//				dojo.connect(theIndincator, "valueChanged", dojo.hitch(this, function(){
			//					//do something
			//				}));
			on.emit(this, "valueChanged", {
				target: this,
				bubbles: true,
				cancelable: true
			});
		},
		
		_disconnectDownListeners: function(){
			for (var i = 0; i < this._downListeners.length; i++) {
				connect.disconnect(this._downListeners[i]);
			}
			this._downListeners = [];
		},
		
		_disconnectMoveAndUpListeners: function(){
			for (var i = 0; i < this._moveAndUpListeners.length; i++) {
				connect.disconnect(this._moveAndUpListeners[i]);
			}
			this._moveAndUpListeners = [];
		},
		
		_disconnectListeners: function(){
			this._disconnectDownListeners();
			this._disconnectMoveAndUpListeners();
		},
		
		_connectDownListeners: function(){
			this._disconnectDownListeners();
			var listener = null;
			var downEventName;
			if(this.interactionMode == "mouse"){
				downEventName = "onmousedown";
			}else if(this.interactionMode == "touch"){
				downEventName = "ontouchstart";
			}
			
			if (this.interactionMode == "mouse" || this.interactionMode == "touch") {
				if (this.interactionArea == "indicator") {
					listener = this._gfxGroup.connect(downEventName, this, this._mouseDownHandler);
					this._downListeners.push(listener);
					
				} else if (this.interactionArea == "gauge") {
					if (!this.scale || !this.scale._gauge || !this.scale._gauge._gfxGroup) {
						return true;
					}
					listener = this.scale._gauge._gfxGroup.connect(downEventName, this, this._mouseDownHandler);
					this._downListeners.push(listener);
					listener = this._gfxGroup.connect(downEventName, this, this._mouseDownHandler);
					this._downListeners.push(listener);
				}
			}
			return false;
		},
		
		_connectMoveAndUpListeners: function(){
			var listener = null;
			var moveEventName;
			var upEventName;
			if(this.interactionMode == "mouse"){
				moveEventName = "onmousemove";
				upEventName = "onmouseup";
			}else if(this.interactionMode == "touch"){
				moveEventName = "ontouchmove";
				upEventName = "ontouchend";
			}
			listener = this.scale._gauge._gfxGroup.connect(moveEventName, this, this._mouseMoveHandler);
			this._moveAndUpListeners.push(listener);
			listener = this._gfxGroup.connect(moveEventName, this, this._mouseMoveHandler);
			this._moveAndUpListeners.push(listener);
			
			listener = this.scale._gauge._gfxGroup.connect(upEventName, this, this._mouseUpHandler);
			this._moveAndUpListeners.push(listener);
			listener = this._gfxGroup.connect(upEventName, this, this._mouseUpHandler);
			this._moveAndUpListeners.push(listener);
		},
		
		_mouseDownHandler: function(event){
			this._connectMoveAndUpListeners();
			this._startEditing("mouse");
		},
		
		_mouseMoveHandler: function(event){
		
		},
		
		_mouseUpHandler: function(event){
			this._disconnectMoveAndUpListeners();
			this._endEditing("mouse");
		},
		
		_startEditing: function(eventSource){
			if (!this.scale || !this.scale._gauge) {
				return;
			} else {
				this.scale._gauge.onStartEditing({
					eventSource: eventSource,
					indicator: this
				});
			}
		},
		
		_endEditing: function(eventSource){
			if (!this.scale || !this.scale._gauge) {
				return;
			} else {
				this.scale._gauge.onEndEditing({
					eventSource: eventSource,
					indicator: this
				});
			}
		}
		
	});
});
