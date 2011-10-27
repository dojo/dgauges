define(["dojo/_base/lang", "dojo/_base/declare", "dojo/on", "dojo/_base/connect", "dojox/gfx", "./_circularGaugeUtil", "../widget/_Invalidating", "./IndicatorBase"], function(lang, declare, on, connect, gfx, _circularGaugeUtil, _Invalidating, IndicatorBase){

	/*=====
	 var _Invalidating = dojox.widget._Invalidating;
	 =====*/
	return declare("dojox.gauge.ScaleIndicatorBase", IndicatorBase, {
		//	summary:
		//		The base class for indicators that rely on a scale for their rendering.
		//		Typically, value indicators and range indicators are subclasses of ScaleIndicatorBase.

		scale: null,
		value: 0,
		
		//	interactionArea: String
		//		How to interact with the indicator using mouse or touch interactions.
		//		Can be "indicator", "gauge" or "none". The default value is "gauge".
		//		If set to "indicator", the indicator shape reacts to mouse and touch events.
		//		If set to "gauge", the whole gauge reacts to mouse and touch events.
		//		If "none", interactions are disabled.
		interactionArea: "gauge",

		//	interactionMode: String
		//		Can be "mouse" or "touch".
		interactionMode: "mouse",
				
		_indicatorShapeFuncFlag: true,
		
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
			
			this.watch("indicatorShapeFunc", lang.hitch(this, function(){
				this._indicatorShapeFuncFlag = true;
			}));
			
			this.addInvalidatingProperties(["scale", "value", "indicatorShapeFunc", "interactionArea", "interactionMode"]);
			
			this._downListeners = [];
			this._moveAndUpListeners = [];
		},
		
		refreshRendering: function(){
			if(this._gfxGroup == null || this.scale == null){
				return;
			} else {
				if(this._indicatorShapeFuncFlag && lang.isFunction(this.indicatorShapeFunc)){
					this._gfxGroup.clear();
					this.indicatorShapeFunc(this._gfxGroup, this);
					this._indicatorShapeFuncFlag = false;
				}
				
				if(this._interactionAreaFlag){
					this._interactionAreaFlag = this._connectDownListeners();
				}
			}
		},
		
		valueChanged: function(indicator){
			//	summary:
			//		Invoked when the value of the indicator changes.
			//		User can connect an listener on this function: 
			//				dojo.connect(theIndicator, "valueChanged", dojo.hitch(this, function(){
			//					//do something
			//				}));
			on.emit(this, "valueChanged", {
				target: this,
				bubbles: true,
				cancelable: true
			});
		},
		
		_disconnectDownListeners: function(){
			for (var i = 0; i < this._downListeners.length; i++){
				connect.disconnect(this._downListeners[i]);
			}
			this._downListeners = [];
		},
		
		_disconnectMoveAndUpListeners: function(){
			for (var i = 0; i < this._moveAndUpListeners.length; i++){
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
			
			if(this.interactionMode == "mouse" || this.interactionMode == "touch"){
				if(this.interactionArea == "indicator"){
					listener = this._gfxGroup.connect(downEventName, this, this._mouseDownHandler);
					this._downListeners.push(listener);
					
				} else if(this.interactionArea == "gauge"){
					if(!this.scale || !this.scale._gauge || !this.scale._gauge._gfxGroup){
						return true;
					}
					listener = this.scale._gauge.surface.connect(downEventName, this, this._mouseDownHandler);
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
			listener = this.scale._gauge.surface.connect(moveEventName, this, this._mouseMoveHandler);
			this._moveAndUpListeners.push(listener);
			listener = this._gfxGroup.connect(moveEventName, this, this._mouseMoveHandler);
			this._moveAndUpListeners.push(listener);
			
			listener = this.scale._gauge.surface.connect(upEventName, this, this._mouseUpHandler);
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
			if(!this.scale || !this.scale._gauge){
				return;
			} else {
				this.scale._gauge.onStartEditing({
					eventSource: eventSource,
					indicator: this
				});
			}
		},
		
		_endEditing: function(eventSource){
			if(!this.scale || !this.scale._gauge){
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
