define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"dojo/_base/connect", 
		"dojo/_base/Color", 
		"../GaugeUtils", 
		"../../RectangularGauge", 
		"../../LinearScaler", 
		"../../RectangularScale", 
		"../../RectangularValueIndicator", 
		"../../TextIndicator",
		"../DefaultPropertiesMixin"
	], 
	function(lang, declare, connect, Color, GaugeUtils, RectangularGauge, LinearScaler, RectangularScale, RectangularValueIndicator, TextIndicator, DefaultPropertiesMixin){

	/*=====
     var RectangularGauge = dojox.gauge.RectangularGauge;
     =====*/
	
	return declare("dojox.gauge.components.default.HorizontalLinearGauge", [RectangularGauge, DefaultPropertiesMixin], {
		constructor: function(args, node){
			//this.set("_orientation", "vertical");
			// Base colors
			this.outerColor = new Color("#C9DFF2");
			this.innerColor = new Color("#FCFCFF");
			
			// Draw background
			this.addElement("background", lang.hitch(this, this.drawBackground));
			
			// Scaler			
			var scaler = new LinearScaler();
			
			// Scale
			var scale = new RectangularScale();
			scale.set("scaler", scaler);
			scale.set("labelPosition", "trailing");
			scale.set("paddingTop", 15);
			scale.set("paddingRight", 23);
			
			this.addElement("scale", scale);
			
			// Value indicator
			var indicator = new RectangularValueIndicator();			
			indicator.indicatorShapeFunc = function(group){
				var indic = group.createPolyline([0, 0, 10, 0, 0, 10, -10, 0, 0, 0]).setStroke({
					color: 'blue',
					width: 0.25
				}).setFill([250, 0, 0]);
				
				return indic;
			}
			indicator.set("paddingTop", 5);
			indicator.set("interactionArea", "gauge");
			scale.addIndicator("indicator", indicator);
			
			// Indicator Text Border
			this.addElement("indicatorTextBorder", lang.hitch(this, this.drawTextBorder), "leading");
			
			// Indicator Text
			var indicatorText = new TextIndicator();
			indicatorText.set("indicator", indicator);
			indicatorText.set("x", 32.5);
			indicatorText.set("y", 30);
			this.addElement("indicatorText", indicatorText);

		},
		
		drawBackground: function(g, w, h){
			h = 49;
			var gap = 0;
			var cr = 3;
			var entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, -20), 0.1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createRect({
				x: 0,
				y: 0,
				width: w,
				height: h,
				r: cr
			}).setFill(dojo.mixin({
				type: "linear",
				x1: 0,
				y1: 0,
				x2: w,
				y2: h
			}, entries)).setStroke({
				color: "#A5A5A5",
				width: 0.2
			});
			var entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 70), 1, GaugeUtils.brightness(this.outerColor, -50)]);
			gap = 4;
			cr = 2
			g.createRect({
				x: gap,
				y: gap,
				width: w - 2 * gap,
				height: h - 2 * gap,
				r: cr
			}).setFill(dojo.mixin({
				type: "linear",
				x1: 0,
				y1: 0,
				x2: w,
				y2: h
			}, entries));
			gap = 6;
			cr = 1
			var entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 60), 1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createRect({
				x: gap,
				y: gap,
				width: w - 2 * gap,
				height: h - 2 * gap,
				r: cr
			}).setFill(dojo.mixin({
				type: "linear",
				x1: 0,
				y1: 0,
				x2: w,
				y2: h
			}, entries));
			
			gap = 7;
			cr = 0
			var entries = GaugeUtils.createGradient([0, GaugeUtils.brightness(this.outerColor, 70), 1, GaugeUtils.brightness(this.outerColor, -40)]);
			g.createRect({
				x: gap,
				y: gap,
				width: w - 2 * gap,
				height: h - 2 * gap,
				r: cr
			}).setFill(dojo.mixin({
				type: "linear",
				x1: w,
				y1: 0,
				x2: 0,
				y2: h
			}, entries));
			gap = 5;
			cr = 0
			var entries = GaugeUtils.createGradient([0, [255, 255, 255, 220], 0.8, GaugeUtils.brightness(this.innerColor, -5), 1, GaugeUtils.brightness(this.innerColor, -30)]);
			g.createRect({
				x: gap,
				y: gap,
				width: w - 2 * gap,
				height: h - 2 * gap,
				r: cr
			}).setFill(dojo.mixin({
				type: "radial",
				cx: w / 2,
				cy: 0,
				r: w
			}, entries)).setStroke({
				color: GaugeUtils.brightness(this.innerColor, -40),
				width: 0.4
			});
			
		},
		drawTextBorder: function(g){
			return g.createRect({
				x: 5,
				y: 5,
				width: 60,
				height: 40
			}).setStroke({
				color: "#CECECE",
				width: 1
			});
		}
		
	});
});
