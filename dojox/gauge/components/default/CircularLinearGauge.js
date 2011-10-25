define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"dojo/on", 
		"dojo/_base/Color", 
		"../GaugeUtils", 
		"../../CircularGauge", 
		"../../LinearScaler", 
		"../../CircularScale", 
		"../../CircularValueIndicator", 
		"../../TextIndicator"
	], 
	function(lang, declare, on, Color, GaugeUtils, CircularGauge, LinearScaler, CircularScale, CircularValueIndicator, TextIndicator){

	/*=====
     var CircularGauge = dojox.gauge.CircularGauge;
     =====*/
	
	return declare("dojox.gauge.components.default.CircularLinearGauge", CircularGauge, {
		_radius: 100,
		constructor: function(){
			
			// Base colors
			this.outerColor = new Color("#C9DFF2");
			this.innerColor = new Color("#FCFCFF");
			
			// Draw background
			this.addElement("background", lang.hitch(this, this.drawBackground));
			
			// Scaler			
			var scaler = new LinearScaler();
			
			// Scale
			var scale = new CircularScale();
			scale.set("scaler", scaler);
			this.addElement("scale", scale);
			
			// Value indicator
			var indicator = new CircularValueIndicator();
			scale.addIndicator("indicator", indicator);
			
			// Gauge Foreground (needle cap)
			this.addElement("foreground", lang.hitch(this, this.drawForeground));
			
			// Indicator Text
			var indicatorText = new TextIndicator();
			indicatorText.set("indicator", indicator);
			indicatorText.set("x", 100);
			indicatorText.set("y", 150);
			this.addElement("indicatorText", indicatorText);
			
			GaugeUtils.genericCircularGauge(scale, indicator, this._radius, this._radius, 0.65 * this._radius, 130, 50, null, null, "outside");
		},
		
		drawBackground: function(g){
			var r = this._radius;
			var w = 2 * r;
			var h = w;
			var entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 70), 1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createEllipse({
				cx: r,
				cy: r,
				rx: r,
				ry: r
			}).setFill(lang.mixin({
				type: "linear",
				x1: w,
				y1: 0,
				x2: 0,
				y2: h
			}, entries)).setStroke({
				color: "#A5A5A5",
				width: 0.2
			});
			
			entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 70), 1, GaugeUtils.brightness(this.outerColor, -50)]);
			g.createEllipse({
				cx: r,
				cy: r,
				rx: r * 0.99,
				ry: r * 0.99
			}).setFill(lang.mixin({
				type: "linear",
				x1: 0,
				y1: 0,
				x2: w,
				y2: h
			}, entries));
			
			entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 60), 1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createEllipse({
				cx: r,
				cy: r,
				rx: r * 0.92,
				ry: r * 0.92
			}).setFill(lang.mixin({
				type: "linear",
				x1: 0,
				y1: 0,
				x2: w,
				y2: h
			}, entries));
			
			entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 70), 1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createEllipse({
				cx: r,
				cy: r,
				rx: r * 0.9,
				ry: r * 0.9
			}).setFill(lang.mixin({
				type: "linear",
				x1: w,
				y1: 0,
				x2: 0,
				y2: h
			}, entries));
			
			entries = GaugeUtils.createGradient([0, [255, 255, 255, 220], 0.8, GaugeUtils.brightness(this.innerColor, -5), 1, GaugeUtils.brightness(this.innerColor, -30)]);
			g.createEllipse({
				cx: r,
				cy: r,
				rx: r * 0.9,
				ry: r * 0.9
			}).setFill(lang.mixin({
				type: "radial",
				cx: r,
				cy: r,
				r: r
			}, entries)).setStroke({
				color: GaugeUtils.brightness(this.innerColor, -40),
				width: 0.4
			});
			
		},
		
		drawForeground: function(g){
			var r = 0.07 * this._radius;
			var entries = GaugeUtils.createGradient([0, this.outerColor, 1, GaugeUtils.brightness(this.outerColor, -20)]);
			g.createEllipse({
				cx: this._radius,
				cy: this._radius,
				rx: r,
				ry: r
			}).setFill(lang.mixin({
				type: "radial",
				cx: 0.96 * this._radius,
				cy: 0.96 * this._radius,
				r: r
			}, entries)).setStroke({
				color: GaugeUtils.brightness(this.innerColor, -50),
				width: 0.4
			});
		}
	});
});
