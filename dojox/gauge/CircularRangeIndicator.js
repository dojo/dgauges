define(["dojo/_base/declare", "./ScaleIndicatorBase", "./_circularGaugeUtil", "dojo/_base/event"], function(declare, ScaleIndicatorBase, _circularGaugeUtil, eventUtil){

    /*=====
     var _Invalidating = dojox.gauge.IndicatorBase;
     =====*/

	return declare("dojox.gauge.CircularRangeIndicator", ScaleIndicatorBase, {
		start: 0,
		radius: NaN,
		startWeight: 6,
		endWeight: 6,
		fill: null,
		stroke: null,
		constructor: function(args, node){
			this.indicatorShapeFunction = null;
			this.fill = [255, 120, 0];
			this.stroke = {
				color: 'black',
				width: .2
			};
			
			this.addInvalidatingProperties(["start", "radius", "startWeight", "endWeight", "fill", "stroke"]);
		},
		
		interpolateColor: function(from, dest, n){
			var fr = (from >> 16) & 0xff;
			var fg = (from >> 8) & 0xff;
			var fb = from & 0xff;
			
			var tr = (dest >> 16) & 0xff;
			var tg = (dest >> 8) & 0xff;
			var tb = dest & 0xff;
			
			var r = ((1 - n) * fr + n * tr) & 0xff;
			var g = ((1 - n) * fg + n * tg) & 0xff;
			var b = ((1 - n) * fb + n * tb) & 0xff;
			
			return r << 16 | g << 8 | b;
		},
		
		colorsInterpolation: function(colors, ratios, len){
			var ret = [];
			var ilen = 0;
			
			for (var i = 0; i < colors.length - 1; i++) {
				ilen = (ratios[i + 1] - ratios[i]) * len;
				ilen = Math.round(ilen);
				ret = ret.concat(colorInterpolation(colors[i], colors[i + 1], ilen));
			}
			return ret;
		},
		
		alphasInterpolation: function(alphas, positions, len){
			var ret = [];
			var ilen = 0;
			for (var i = 0; i < alphas.length - 1; i++) {
				ilen = (positions[i + 1] - positions[i]) * len;
				ilen = Math.round(ilen);
				ret = ret.concat(alphaInterpolation(alphas[i], alphas[i + 1], ilen));
			}
			return ret;
		},
		
		alphaInterpolation: function(c1, c2, len){
			var step = (c2 - c1) / (len - 1);
			var ret = [];
			var j = 0;
			for (var i = 0; i < len; i++) {
				ret.push(c1 + i * step);
			}
			
			return ret;
		},
		
		colorInterpolation: function(c1, c2, len){
			var ret = [];
			for (var i = 0; i < len; i++) 
				ret.push(interpolateColor(c1, c2, i / (len - 1)));
			return ret;
		},
		
		getEntriesFor: function(entries, attr){
			var ret = [];
			var e;
			var val;
			for (var i = 0; i < entries.length; i++) {
				e = entries[i];
				if (e[attr] == null || isNaN(e[attr])) 
					val = i / (entries.length - 1);
				else 
					val = e[attr];
				ret.push(val);
			}
			return ret;
		},
		
		drawColorTrack: function(g, ox, oy, radius, orientation, startAngleRadians, endAngleRadians, sWeight, eWeight, fill, stroke, clippingAngleRadians){
		
			var angleStep = 0.05;
			var totalAngle;
			
			totalAngle = 6.28318530718 - _circularGaugeUtil.computeAngle(startAngleRadians, endAngleRadians, orientation);
			if (!isNaN(clippingAngleRadians)) {
				var deltaAngle = _circularGaugeUtil.computeAngle(startAngleRadians, clippingAngleRadians, orientation);
				eWeight *= deltaAngle / totalAngle;
				totalAngle = deltaAngle;
			}
			var iterCount = Math.max(2, Math.floor(totalAngle / angleStep));
			
			angleStep = totalAngle / iterCount;
			var innerRadius;
			var outerRadius;
			var outerStep = 0;
			var innerStep = 0;
			var px;
			var py;
			innerRadius = -sWeight;
			outerRadius = 0;
			innerStep = (sWeight - eWeight) / iterCount;
			
			var angle;
			var i;
			if (orientation == "clockwise") 
				angleStep = -angleStep;
			
			var gp = [];
			
			px = ox + Math.cos(startAngleRadians) * (radius + innerRadius);
			py = oy - Math.sin(startAngleRadians) * (radius + innerRadius);
			gp.push(px, py);
			for (i = 0; i < iterCount; i++) {
				angle = startAngleRadians + i * angleStep;
				px = ox + Math.cos(angle + angleStep) * (radius + innerRadius + i * innerStep);
				py = oy - Math.sin(angle + angleStep) * (radius + innerRadius + i * innerStep);
				gp.push(px, py);
			}
			if (isNaN(angle)) 
				angle = startAngleRadians;
			px = ox + Math.cos(angle + angleStep) * (radius + outerRadius + (iterCount - 1) * outerStep);
			py = oy - Math.sin(angle + angleStep) * (radius + outerRadius + (iterCount - 1) * outerStep);
			gp.push(px, py);
			for (i = iterCount - 1; i >= 0; i--) {
				angle = startAngleRadians + i * angleStep;
				px = ox + Math.cos(angle + angleStep) * (radius + outerRadius + i * outerStep);
				py = oy - Math.sin(angle + angleStep) * (radius + outerRadius + i * outerStep);
				gp.push(px, py);
			}
			px = ox + Math.cos(startAngleRadians) * (radius + outerRadius);
			py = oy - Math.sin(startAngleRadians) * (radius + outerRadius);
			gp.push(px, py);
			
			px = ox + Math.cos(startAngleRadians) * (radius + innerRadius);
			py = oy - Math.sin(startAngleRadians) * (radius + innerRadius);
			gp.push(px, py);
			g.createPolyline(gp).setFill(fill).setStroke(stroke);
		},
		
		refreshRendering: function(){
			this.inherited(arguments);

			var g = this._gfxGroup;
			g.clear();
			var ox = this.scale.originX;
			var oy = this.scale.originY;
			var radius = isNaN(this.radius) ? this.scale.radius  : this.radius;
			var orientation = this.scale.orientation;
			var startAngleRadians = _circularGaugeUtil.toRadians(360 - this.scale.positionForValue(this.start));
			var endAngleRadians = _circularGaugeUtil.toRadians(360 - this.scale.positionForValue(this.value));
			var sWeight = this.startWeight;
			var eWeight = this.endWeight;
			var clippingAngleRadians = NaN;
			
			this.drawColorTrack(g, ox, oy, radius, orientation, startAngleRadians, endAngleRadians, sWeight, eWeight, this.fill, this.stroke, clippingAngleRadians);
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
