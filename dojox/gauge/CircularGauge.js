define(["dojo/_base/declare", "dojo/dom-geometry", "dojox/gfx", "./_GaugeBase", "./_CircularGaugeUtil"], function(declare, domGeom, gfx, _GaugeBase, _CircularGaugeUtil){

    /*=====
     var _GaugeBase = dojox.gauge._GaugeBase;
     =====*/

	return declare("dojox.gauge.CircularGauge", _GaugeBase, {
		_transformProperties: null,
		
		refreshRendering: function(){

			// Render all elements			
			for (var key in this._elementsIndex) {
				this._elementsRenderers[key] = this._elementsIndex[key].refreshRendering();
			}
			
			// Maximize the drawing area and center the gauge
			var bb = this._computeBoundingBox(this._gfxGroup);
			var naturalRatio = bb.width / bb.height;
			var widgetWidth = this._widgetBox.w;
			var widgetHeight = this._widgetBox.h;
			var widgetRatio = this._widgetBox.w / this._widgetBox.h;
			
			var xpos = 0;
			var ypos = 0;
			var h = 0;
			var w = 0;
			if (naturalRatio > widgetRatio) {
				w = widgetWidth;
				h = w / naturalRatio;
				ypos = (widgetHeight - h) / 2;
			} else {
				h = widgetHeight;
				w = h * naturalRatio;
				xpos = (widgetWidth - w) / 2;
			}
			var scaleFactor = Math.max(w / bb.width, h / bb.height);
			this._transformProperties = {scale:scaleFactor, tx:xpos, ty:ypos};
			this._gfxGroup.setTransform([gfx.matrix.scale(scaleFactor), gfx.matrix.translate(xpos / scaleFactor, ypos / scaleFactor)]);
		},
		
		_gaugeToPage: function(px, py){
			if (this._transformProperties){
				var np = domGeom.position(this.domNode, true);
				return {x: np.x + px * this._transformProperties.scale + this._transformProperties.tx, y: np.y + py * this._transformProperties.scale + this._transformProperties.ty};
			}else{
				return null;
			}
		}
	});
});
