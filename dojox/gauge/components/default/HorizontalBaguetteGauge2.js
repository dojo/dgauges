define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"dojo/_base/connect", 
		"dojo/_base/Color", 
		"../GaugeUtils", 
		"../../RectangularGauge", 
		"../../LinearScaler", 
		"../../RectangularScale", 
		"../../RectangularSegmentedRangeIndicator",
		"../../RectangularValueIndicator"		
	], 
	function(lang, declare, connect, Color, GaugeUtils, RectangularGauge, LinearScaler, RectangularScale, RectangularSegmentedRangeIndicator,RectangularValueIndicator){

	/*=====
     var _RectangularGauge = dojox.gauge.RectangularGauge;
     =====*/
	
	return declare("dojox.gauge.components.default.HorizontalBaguetteGauge2", RectangularGauge, {
		
		padding1: 10,
		colorRange1: new Color([123,98,149]),
		colorRange2: new Color([224,137,0]),
		colorRange3: new Color([135,170,230]),
		colorRange4: new Color([73,202,49]),				
		
		constructor: function(args, node){
			// Draw background
			this.addElement("background", lang.hitch(this, this.drawBackground));
			
			// Scaler			
			var scaler = new LinearScaler();
			
			// Scale
			var scale = new RectangularScale();
			scale.set("scaler", scaler);
			scale.set("labelPosition", "trailing");
			scale.set("paddingTop", this.padding1);
			scale.set("paddingRight", this.padding1+2);
			scale.set("paddingLeft", this.padding1+4);		
			//set an empty label function to draw nothing
			scale.tickLabelFunc = function(t){return null;};	
			//set an empty shape function to draw nothing
			scale.tickShapeFunc =  function(scale, group, tickItem){return null;};
			this.addElement("scale", scale);
			
			
			// Value indicator 1
			var indicator = new RectangularValueIndicator();			
			indicator.indicatorShapeFunc = function(indicator, group, scale){
				var indic = group.createPolyline([0, 0, 10, 0, 0, 10, -10, 0, 0, 0]).setStroke({
					color: scale._gauge.colorRange1,
					width: 0.25
				}).setFill(scale._gauge.colorRange1);
				
				return indic;
			}
			indicator.set("paddingTop", 0);
			indicator.set("interactionArea", "indicator");
			indicator.set("value",22);
			scale.addIndicator("indicator", indicator);			
			// Map indicator value to range value
			connect.connect(indicator, "valueChanged", lang.hitch(this, function(ev){
				var r = scale.getIndicator("segindicator").get("ranges");
				var delta = ev.value - r[0].size;
				r[0].size += delta;
				r[1].size -= delta;
				scale.getIndicator("segindicator").set("ranges",r);
			}));
			
			// Value indicator 2
			indicator = new RectangularValueIndicator();			
			indicator.indicatorShapeFunc = function(indicator, group, scale){
				var indic = group.createPolyline([0, 0, 10, 0, 0, 10, -10, 0, 0, 0]).setStroke({
					color: scale._gauge.colorRange2,
					width: 0.25
				}).setFill(scale._gauge.colorRange2);
				
				return indic;
			}
			indicator.set("paddingTop", 0);
			indicator.set("interactionArea", "indicator");
			indicator.set("value",40);
			scale.addIndicator("indicator2", indicator);
			// Map indicator value to range value
			connect.connect(indicator, "valueChanged", lang.hitch(this, function(ev){
				var r = scale.getIndicator("segindicator").get("ranges");
				var delta = ev.value - r[0].size - r[1].size;
				r[1].size += delta;
				r[2].size -= delta;
				scale.getIndicator("segindicator").set("ranges",r);
			}));
			
						
			// Value indicator 3
			indicator = new RectangularValueIndicator();			
			indicator.indicatorShapeFunc = function(indicator, group, scale){
				var indic = group.createPolyline([0, 0, 10, 0, 0, 10, -10, 0, 0, 0]).setStroke({
					color: scale._gauge.colorRange3,
					width: 0.25
				}).setFill(scale._gauge.colorRange3);
				
				return indic;
			}
			indicator.set("paddingTop", 0);
			indicator.set("interactionArea", "indicator");
			indicator.set("value",60);
			scale.addIndicator("indicator3", indicator);
			// Map indicator value to range value
			connect.connect(indicator, "valueChanged", lang.hitch(this, function(ev){
				var r = scale.getIndicator("segindicator").get("ranges");
				var delta = ev.value - r[0].size - r[1].size - r[2].size;
				r[2].size += delta;
				r[3].size -= delta;
				scale.getIndicator("segindicator").set("ranges",r);
			}));
						
			
			// Segmented Range Indicator example			
			var ri = new RectangularSegmentedRangeIndicator();
			ri.set("interactionArea", "none");
			ri.set("start", 0);
			ri.set("value", 100);
			ri.set("segments",20);
			ri.set("paddingTop", this.padding1+2);
			ri.set("startWeight", 20);
			ri.set("endWeight", 20);
			ri.set("ranges" , [
				{color:this.colorRange1, size:22},
				{color:this.colorRange2, size:18},
				{color:this.colorRange3, size:20},
				{color:this.colorRange4, size:40}
			]);			
			scale.addIndicator("segindicator", ri, true);

			
			// Gauge Foreground 
			this.addElement("foreground", lang.hitch(this, this.drawForeground));
		},
		
		
		drawBackground: function(g, w, h){
			var x = 0;
			var y = 0;
			h = 49;
			var gap = 0;
			var cr = 3;
			g.createRect({
				x: x,
				y: y,
				width: w,
				height: h,
				r: cr
			}).setFill("#EAEAEA").setStroke({
				color: "#A5A5A5",
				width: 0.2
			});
			
			
			var gradient = {
				type:"linear", 
				x1: x + this.padding1,
				y1: y + this.padding1,
				x2: x + this.padding1,
				y2: y + this.padding1 +20,
				colors:[
					{
						color: "#989898",
						offset: 0
					},
					{
						color: "#E0E0E0",
						offset: 1
					}
				]
				};

			g.createRect({
				x: x + this.padding1,
				y: y + this.padding1,
				width: w - (2*+ this.padding1),
				height: 24,
				r: 12
			}).setFill(gradient).setStroke({
				color: "#A5A5A5",
				width: 0.2
			});			
		},
		


		drawForeground: function(g, w, h){
			var x = 0;
			var y = 0;
			
			var gradient = {
				type:"linear", 
				x1: x + this.padding1,
				y1: y + this.padding1,
				x2: x + this.padding1,
				y2: y + this.padding1 +20,
				colors:[
					{
						color: "rgba(255, 255, 255, 0.6)",
						offset: 0
					},
					{
						color: "rgba(255, 255, 255, 0.1)",
						offset: 0.4
					},					{
						color: "rgba(0, 0, 0, 0.3)",
						offset: 0.4
					},
					{
						color: "rgba(64, 64, 64, 0.2)",
						offset: 1
					}
				]
				};

			g.createRect({
				x: x + this.padding1+4,
				y: y + this.padding1,
				width: w - (2*+ this.padding1) -7,
				height: 24,
				r: 12
			}).setFill(gradient);			
		}

		
	});
});
