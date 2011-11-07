define([
		"dojo/_base/lang", 
		"dojo/_base/declare",
		"../../RectangularGauge", 
		"../../LinearScaler", 
		"../../RectangularScale", 
		"../../RectangularValueIndicator",
		"../DefaultPropertiesMixin"
	], 
	function(lang, declare, RectangularGauge, LinearScaler, RectangularScale, RectangularValueIndicator, DefaultPropertiesMixin){

	/*=====
     var RectangularGauge = dojox.gauge.RectangularGauge;
     =====*/
     
		return declare("dojox.gauge.components.black.HorizontalLinearGauge", [RectangularGauge, DefaultPropertiesMixin], {

			constructor: function(args, node){
				this.addElement("background", lang.hitch(this, this.drawBackground));

				// Scaler			
				var scaler = new LinearScaler();
				
				// Scale
				var scale = new RectangularScale();
				scale.set("scaler", scaler);
				scale.set("labelPosition", "leading");
				scale.set("paddingLeft", 30);
				scale.set("paddingRight", 30);
				scale.set("paddingTop", 34);
				scale.set("labelGap", 8);
				scale.set("font", {
					family: "Helvetica",
					weight: 'bold',
					size: "7pt",
					color: "#CECECE"
				});
				scale.set("tickShapeFunc", function(group, scale, tick){
					return group.createCircle({
						r: tick.isMinor ? 0.5 : 3
					}).setFill("#CECECE");
				});
				this.addElement("scale", scale);
				
				var indicator = new RectangularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("paddingTop", 30);
				indicator.set("indicatorShapeFunc", function(group, indicator){
					return group.createPolyline([0, 0, -10, -20, 10, -20, 0, 0]).setFill([164,164,164]).setStroke({
						color: [69,69,69],
						width: 1,
						style: "Solid",
						cap: "butt",
						join: 20.0
					});

				});
				scale.addIndicator("indicator", indicator);
			},

			drawBackground: function(g, w, h){
				g.createRect({
					x: 0,
					y: 0,
					width: w,
					height: 50,
					r: 15
				}).setFill("black");
				g.createRect({
					x: 4,
					y: 4,
					width: w - 8,
					height: 42,
					r: 12
				}).setFill({
					type: "linear",
					x1: 0,
					y1: 50,
					x2: 0,
					y2: 30,
					colors: [
						{offset: 0, color: [100,100,100]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath().moveTo(4, 25).vLineTo(14).smoothCurveTo(4, 4, 18, 4).hLineTo(w - 16).smoothCurveTo(w - 4, 4, w - 4, 16).closePath().setFill({
					type: "linear",
					x1: 0,
					y1: 0,
					x2: 0,
					y2: 20,
					colors: [
						{offset: 0, color: [150,150,150]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath().moveTo(4, 25).vLineTo(14).smoothCurveTo(4, 4, 18, 4).hLineTo(w - 16).smoothCurveTo(w - 4, 4, w - 4, 16).closePath().setFill([255,255,255,0.05]);
			}

		});
	}
);

