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
		"../../RectangularRangeIndicator",
		"../../TextIndicator"
	], 
	function(lang, declare, connect, Color, GaugeUtils, RectangularGauge, LinearScaler, RectangularScale, RectangularValueIndicator, RectangularRangeIndicator, TextIndicator){

	/*=====
     var RectangularGauge = dojox.gauge.RectangularGauge;
     =====*/
	
	return declare("dojox.gauge.components.default.VerticalLinearGauge", RectangularGauge, {
		constructor: function(){
		
			this.orientation = "vertical";
			
			// Does not work using 'set'...
			//this.set("orientation", "vertical");
			
			
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
			scale.set("labelPosition", "leading");
			scale.set("paddingBottom", 20);
			scale.set("paddingLeft", 25);
			
			this.addElement("scale", scale);
			
			// Value indicator
			indicator = new RectangularValueIndicator();
			
			indicator.indicatorShapeFunction = function(indicator, group, scale){
				var indic = group.createPolyline([0, 0, 10, 0, 0, 10, -10, 0, 0, 0]).setStroke({
					color: 'blue',
					width: 0.25
				}).setFill([250, 0, 0]);
				
				return indic;
			}
			indicator.set("paddingLeft", 45);
			indicator.set("interactionArea", "gauge");
			scale.addIndicator("indicator", indicator);
			
			// Range  Indicator example
            /*
			var ri = new RectangularRangeIndicator();
            ri.set("interactionArea", "gauge");
            ri.set("start", 0);
            ri.set("value", 100);
            ri.set("fill", {
                type: "linear",
                colors: [{
                    offset: 0,
                    color: "green"
                }, {
                    offset: 1,
                    color: "red"
                }]
            });
            ri.set("paddingTop", 15);
            ri.set("startWeight", 0);
			ri.set("endWeight", 20);
            scale.addIndicator("ri", ri, true);
			*/
			
			// Gauge Foreground (needle cap)
			//this.addElement("foreground", lang.hitch(this, this.drawForeground));
			
			// Indicator Text Border
			this.addElement("indicatorTextBorder", lang.hitch(this, this.drawTextBorder), "leading");
			
			// Indicator Text
			var indicatorText = new TextIndicator();
			indicatorText.set("indicator", indicator);
			indicatorText.set("x", 22.5);
			indicatorText.set("y", 30);
			this.addElement("indicatorText", indicatorText);
			
		},
		
		drawBackground: function(g, w, h){
			w = 49;
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
				cx: 0,
				cy: h / 2,
				r: h
			}, entries)).setStroke({
				color: GaugeUtils.brightness(this.innerColor, -40),
				width: 0.4
			});
			
		},
		drawTextBorder: function(g){
			return g.createRect({
				x: 5,
				y: 5,
				width: 40,
				height: 40
			}).setStroke({
				color: "#CECECE",
				width: 1
			});
		}
		
	});
});
