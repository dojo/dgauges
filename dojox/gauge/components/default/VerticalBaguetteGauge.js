define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"dojo/_base/connect", 
		"dojo/_base/Color", 
		"../GaugeUtils", 
		"../../RectangularGauge", 
		"../../LinearScaler", 
		"../../RectangularScale", 
		"../../RectangularSegmentedRangeIndicator"
	], 
	function(lang, declare, connect, Color, GaugeUtils, RectangularGauge, LinearScaler, RectangularScale,  RectangularSegmentedRangeIndicator){

	/*=====
     var RectangularGauge = dojox.gauge.RectangularGauge;
     =====*/
	
	return declare("dojox.gauge.components.default.VerticalBaguetteGauge", RectangularGauge, {
		
		padding1: 10,
		
		constructor: function(){
		
			this.orientation = "vertical";
			
			// Does not work using 'set'...
			//this.set("orientation", "vertical");
						
			// Draw background
			this.addElement("background", lang.hitch(this, this.drawBackground));
			
			
			// Scaler			
			var scaler = new LinearScaler();
			
			// Scale
			var scale = new RectangularScale();
			scale.set("scaler", scaler);
			scale.set("labelPosition", "leading");
			scale.set("paddingTop", this.padding1+4);
			scale.set("paddingBottom", this.padding1+2);
			scale.set("paddingLeft", this.padding1);		
			//set an empty label function to draw nothing
			scale.tickLabelFunc = function(t){return null;};				
			//set an empty shape function to draw nothing
			scale.tickShapeFunc =  function(scale, group, tickItem){return null;};						
			this.addElement("scale", scale);
			
			// Segmented Range Indicator example
            var ri = new RectangularSegmentedRangeIndicator();
            ri.set("interactionArea", "gauge");
            ri.set("start", 0);
            ri.set("value", 100);
            ri.set("paddingLeft", this.padding1+2);
            ri.set("startThickness", 20);
			ri.set("endThickness", 20);
			ri.set("ranges" , [
				{color:'rgb(123,98,149)', size:22},
				{color:'rgb(224,137,0)', size:18},
				{color:'rgb(135,170,230)', size:20},
				{color:'rgb(73,202,49)', size:40}
			]);					
            scale.addIndicator("indicator", ri, true);
			 
			
			// Gauge Foreground (needle cap)
			this.addElement("foreground", lang.hitch(this, this.drawForeground));
			
		},
		
		drawBackground: function(g, w, h){
			var x = 0;
			var y = 0;
			w = 49;
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
				x2: x + this.padding1+20,
				y2: y + this.padding1,
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
				width: 24,
				height: h - (2*+ this.padding1),
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
				x2: x + this.padding1+20,
				y2: y + this.padding1 ,
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
				x: x + this.padding1,
				y: y + this.padding1+4,
				width: 24,
				height: h - (2*+ this.padding1) -7,
				r: 12
			}).setFill(gradient);			
		}
		
	});
});
