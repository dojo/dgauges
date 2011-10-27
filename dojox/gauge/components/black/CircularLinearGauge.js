define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"../../CircularGauge", 
		"../../LinearScaler", 
		"../../CircularScale", 
		"../../CircularValueIndicator", 
		"../../CircularRangeIndicator"
	], 
	function(lang, declare, CircularGauge, LinearScaler, CircularScale, CircularValueIndicator, CircularRangeIndicator){

	/*=====
     var _CircularGauge = dojox.gauge.CircularGauge;
     =====*/
     
		return declare("dojox.gauge.components.black.CircularLinearGauge", CircularGauge, {

			constructor: function(args, node){
				var scaler = new LinearScaler();
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 186.90962);
				scale.set("originY", 184.71219);
				scale.set("radius", 149.82183);
				scale.set("startAngle", 130.16044);
				scale.set("endAngle", 50.25444);
				scale.set("orientation", "clockwise");
				scale.set("labelGap", 8);
				scale.set("font", {
					family: "Helvetica",
					weight: 'bold',
					size: "14pt",
					color: "#CECECE"
				});
				scale.set("tickShapeFunc", function(group, scale, tick){
					return group.createCircle({
						r: tick.isMinor ? 2 : 4
					}).setFill("#CECECE");
				});
				this.addElement("scale", scale);
				var indicator = new CircularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("indicatorShapeFunc", function(group, indicator){
					return group.createPolyline([0, -12, indicator.scale.radius - 2, 0, 0, 12, 0, -12]).setStroke({
						color: [70,70,70],
						width: 1
					}).setFill([164,164,164]);
					
				});
				scale.addIndicator("indicator", indicator);
				this.addElement("foreground", lang.hitch(this, this.drawForeground));
			},

			drawBackground: function(g){
				g.setTransform({
					dx: -162.13369,
					dy: -265.99059
				});
				g.createPath({
					path: "M535.0949 452.5344 C535.1299 555.5256 451.6687 639.0432 348.6774 639.0781 C245.6874 639.1144 162.1687 555.6519 162.1337 452.6606 L162.1337 452.5344 C162.0987 349.5432 245.5612 266.0256 348.5511 265.9906 C451.5412 265.9544 535.0599 349.4169 535.0949 452.4069 L535.0949 452.5344 Z"
				}).setFill("black");
				g.createPath({
					path: "M520.8889 452.5339 C520.9239 547.6802 443.8189 624.8352 348.6727 624.8689 C253.5264 624.9014 176.3702 547.7964 176.3377 452.6501 L176.3377 452.5339 C176.3064 357.3876 253.4114 280.2326 348.5552 280.1989 C443.7014 280.1676 520.8577 357.2714 520.8889 452.4177 L520.8889 452.5339 Z"
				}).setFill({
					type: "linear",
					x1: 176.33766,
					y1: 624.86891,
					x2: 176.33766,
					y2: 487.00091,
					colors: [
						{offset: 0, color: [100,100,100]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath({
					path: "M520.8477 448.8577 C518.9189 355.3577 442.5152 280.1676 348.5602 280.1989 C254.6452 280.2314 178.3152 355.4077 176.3877 448.8552 C228.9827 463.0189 289.5039 434.7689 350.8964 434.7689 C412.3077 434.7689 468.4014 463.0252 520.8477 448.8577"
				}).setFill({
					type: "linear",
					x1: 176.38768,
					y1: 452.83278,
					x2: 176.38768,
					y2: 280.1989,
					colors: [
						{offset: 0, color: "black"},
						{offset: 1, color: [200,200,200]}
					]
				});
				g.createPath({
					path: "M520.8444 448.8577 C518.9156 355.3577 442.5119 280.1677 348.5569 280.1989 C254.6419 280.2314 178.3119 355.4077 176.3844 448.8552 C228.9794 463.0189 289.5007 434.7689 350.8932 434.7689 C412.3044 434.7689 468.3982 463.0252 520.8444 448.8577"
				}).setFill([255,255,255,0.12157]);
			},


			drawForeground: function(g){
				g.setTransform({
					dx: -162.13369,
					dy: -265.99059
				});
				g.createPath({
					path: "M377.0846 451.2844 C377.0896 467.0081 364.3483 479.7581 348.6246 479.7644 C332.8983 479.7694 320.1483 467.0269 320.1433 451.3044 L320.1433 451.2844 C320.1371 435.5606 332.8808 422.8106 348.6058 422.8044 C364.3283 422.7994 377.0796 435.5419 377.0846 451.2657 L377.0846 451.2844 Z"
				}).setFill("black");
				g.createPath({
					path: "M373.5002 451.2839 C373.5039 465.0289 362.3676 476.1727 348.6227 476.1776 C334.8789 476.1826 323.7339 465.0452 323.7289 451.3014 L323.7289 451.2839 C323.7239 437.5402 334.8615 426.3952 348.6052 426.3902 C362.3502 426.3852 373.4952 437.5239 373.5002 451.2677 L373.5002 451.2839 Z"
				}).setFill({
					type: "linear",
					x1: 323.72893,
					y1: 476.17765,
					x2: 323.72893,
					y2: 451.28391,
					colors: [
						{offset: 0, color: [100,100,100]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath({
					path: "M373.4939 450.7539 C373.2152 437.2477 362.1789 426.3852 348.6064 426.3902 C335.0402 426.3952 324.0139 437.2539 323.7364 450.7539 C331.3327 452.799 340.0739 448.7189 348.9452 448.7189 C357.8152 448.7189 365.9177 452.8002 373.4939 450.7539"
				}).setFill({
					type: "linear",
					x1: 323.73641,
					y1: 451.32803,
					x2: 323.73641,
					y2: 426.39017,
					colors: [
						{offset: 0, color: "black"},
						{offset: 1, color: [150,150,150]}
					]
				});
				g.createPath({
					path: "M373.4933 450.7534 C373.2145 437.2472 362.1783 426.3859 348.6071 426.3909 C335.0396 426.3959 324.0146 437.2547 323.7358 450.7534 C331.3321 452.7984 340.0746 448.7184 348.9445 448.7184 C357.8145 448.7184 365.9171 452.8009 373.4933 450.7534"
				}).setFill([255,255,255,0.12157]);
			}

		});
	}
);

