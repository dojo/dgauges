define(["dojo/_base/declare", "dojox/gfx", "./ScaleIndicatorBase", "dojo/_base/event", "dojo/dom-geometry"], function(declare, gfx, ScaleIndicatorBase, eventUtil, domGeom){
	/*=====
     var ScaleIndicatorBase = dojox.gauge.ScaleIndicatorBase;
     =====*/
	return declare("dojox.gauge.RectangularRangeIndicator", ScaleIndicatorBase, {
		//	summary:
		//		A RectangularRangeIndicator is used to represent a range of values on a scale.
		//		Use the addIndicator method of RectangularScale to use it.

		start: 0,
		startWeight: 10,
		endWeight: 10,
		fill: null,
		stroke: null,
		paddingLeft: 10,
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		constructor: function(){
			this.fill = [255, 120, 0];
			this.stroke = {
				color: 'black',
				width: .2
			};
			
			this.addInvalidatingProperties(["start", "startWeight", "endWeight", "fill", "stroke"]);
		},

		_defaultHorizontalShapeFunc: function(indicator, group, scale, startX, startY, endPosition, startWeight, endWeight, fill, stroke){
			var gp = [startX, startY, endPosition, startY, endPosition, startY + endWeight, startX, startY + startWeight, startX, startY]
			if(fill && fill.colors){
				// Configure gradient
				fill.x1 = startX;
				fill.y1 = startY;
				fill.x2 = endPosition;
				fill.y2 = startY;
			}
			return group.createPolyline(gp).setFill(fill).setStroke(stroke);
		},

		_defaultVerticalShapeFunc: function(indicator, group, scale, startX, startY, endPosition, startWeight, endWeight, fill, stroke){
			var gp = [startX, startY, startX, endPosition, startX + endWeight, endPosition, startX, startY + startWeight, startX, startY]
			if(fill && fill.colors){
				// Configure gradient
				fill.x1 = startX;
				fill.y1 = startY;
				fill.x2 = startX;
				fill.y2 = endPosition;
			}
			return group.createPolyline(gp).setFill(fill).setStroke(stroke);
		},
				
		_shapeFunc: function(indicator, group, scale, startX, startY, endPosition, startWeight, endWeight, fill, stroke){
			if(this.scale._gauge.orientation == "horizontal"){
				this._defaultHorizontalShapeFunc(indicator, group, scale, startX, startY, endPosition, startWeight, endWeight, fill, stroke);
			}else{
				this._defaultVerticalShapeFunc(indicator, group, scale, startX, startY, endPosition, startWeight, endWeight, fill, stroke);
			}
		},
		
		refreshRendering: function(){
			this.inherited(arguments);
			
			if(this._gfxGroup == null || this.scale == null){
				return;
			}
			// gets position corresponding to the values
			var spos = this.scale.positionForValue(this.start);
			var pos = this.scale.positionForValue(this.value);
			this._gfxGroup.clear();
			
			var startX;
			var startY;
			var endPosition;
			if(this.scale._gauge.orientation == "horizontal"){
				startX = spos;
				startY = this.paddingTop;
				endPosition = pos;
			} else {
				startX = this.paddingLeft;
				startY = spos;
				endPosition = pos;			
			}
			this._shapeFunc(this, this._gfxGroup, this.scale, startX, startY, endPosition, this.startWeight, this.endWeight, this.fill, this.stroke);
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
