define(["dojo/_base/declare", "dojox/gfx", "./ScaleIndicatorBase", "./_circularGaugeUtil", "dojo/_base/event"], function(declare, gfx, ScaleIndicatorBase, _circularGaugeUtil, eventUtil){

    /*=====
     var IndicatorBase = dojox.gauge.IndicatorBase;
     =====*/	

	return declare("dojox.gauge.CircularValueIndicator", ScaleIndicatorBase, {
		indicatorShapeFunction: function(indicator, group, scale){
			return group.createLine({
				x1: 0,
				y1: 0,
				x2: 40,
				y2: 0
			}).setStroke({
				color: 'black',
				width: 1
			});
		},
		
		refreshRendering: function(){
			this.inherited(arguments);
			
			var angle = this.scale.positionForValue(this.value);
			
			this._gfxGroup.setTransform([{
				dx: this.scale.originX,
				dy: this.scale.originY
			}, gfx.matrix.rotateg(angle)]);
		},
		
		_mouseDownHandler: function(event){
			this.inherited(arguments);
			var origin = this.scale._gauge._gaugeToPage(this.scale.originX, this.scale.originY);
			var angle = ((Math.atan2(event.pageY - origin.y, event.pageX - origin.x)) * 180) / (Math.PI);
			this.set("value", this.scale.valueForPosition(angle));

			// prevent the browser from selecting text
			eventUtil.stop(event);
		},
		
		_mouseMoveHandler: function(event){
			this.inherited(arguments);
			
			var origin = this.scale._gauge._gaugeToPage(this.scale.originX, this.scale.originY);
			var angle = ((Math.atan2(event.pageY - origin.y, event.pageX - origin.x)) * 180) / (Math.PI);
			this.set("value", this.scale.valueForPosition(angle));			
		}
	});
});
