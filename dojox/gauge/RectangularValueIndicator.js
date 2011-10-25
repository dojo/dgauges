define(["dojo/_base/declare", "./ScaleIndicatorBase", "dojox/gfx", "dojo/_base/event", "dojo/dom-geometry"], function(declare, ScaleIndicatorBase, gfx, eventUtil, domGeom){

	/*=====
     var IndicatorBase = dojox.gauge.IndicatorBase;
     =====*/
	
	return declare("dojox.gauge.RectangularValueIndicator", ScaleIndicatorBase, {
		paddingLeft: 0,
		paddingTop: 0,
		paddingRight: 0,
		paddingBottom: 0,
		
		constructor: function(){
			this.inherited(arguments);
			this.addInvalidatingProperties(["paddingTop", "paddingLeft", "paddingRight", "paddingBottom"]);
		},
		
		refreshRendering: function(){
			this.inherited(arguments);

			// get position corresponding to the value
			var pos = this.scale.positionForValue(this.value);
			
			// computes offsets to move the indicator
			var dx = 0, dy = 0;
			var angle = 0;
			if(this.scale._gauge.orientation == "horizontal"){
				dx = pos;
				dy = this.paddingTop;
			} else {
				dx = this.paddingLeft;
				dy = pos;
				angle = 90;
			}
			
			
			// translate the indicator
			
			this._gfxGroup.setTransform([{
				dx: dx,
				dy: dy
			}, gfx.matrix.rotateg(angle)]);
		},
		
		_mouseDownHandler: function(event){
			this.inherited(arguments);
			var np = domGeom.position(this.scale._gauge.domNode, true);
			this.set("value", this.scale.valueForPosition({x: event.pageX - np.x, y: event.pageY - np.y}));

			// prevent the browser from selecting text
			eventUtil.stop(event);
		},
		
		_mouseMoveHandler: function(event){
			this.inherited(arguments);
			
			var np = domGeom.position(this.scale._gauge.domNode, true);
			this.set("value", this.scale.valueForPosition({x: event.pageX - np.x, y: event.pageY - np.y}));
		}		
	})
});
