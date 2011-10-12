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
     
		return declare("dojox.gauge.components.black.SemiCircularLinearGauge", CircularGauge, {

			constructor: function(args, node){
				var scaler = new LinearScaler();
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 186.46999);
				scale.set("originY", 184.71315);
				scale.set("radius", 149.82183);
				scale.set("startAngle", -180);
				scale.set("endAngle", 0);
				scale.set("orientation", "clockwise");
				scale.set("labelGap", 8);
				scale.set("font", {
					family: "Helvetica",
					weight: 'bold',
					size: "14pt",
					color: "#CECECE"
				});
				scale.set("tickShapeFunction", function(scale, group, tick){
					return group.createCircle({
						r: tick.isMinor ? 2 : 4
					}).setFill("#CECECE");
				});
				this.addElement("scale", scale);
				var indicator = new CircularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("indicatorShapeFunction", function(indicator, group, scale) {
			
					return group.createPolyline([0, -12, scale.radius - 2, 0, 0, 12, 0, -12]).setStroke({
						color: [69,69,69],
						width: 1
					}).setFill([164,164,164]);
					
				});
				scale.addIndicator("indicator", indicator);
				this.addElement("foreground", lang.hitch(this, this.drawForeground));
			},

			drawBackground: function(g){
				g.createPath({
					path: "M372.8838 205.5338 C372.9125 204.4188 372.93 194.1 372.94 185.5712 C372.4475 82.9713 289.1138 -0.035 186.4063 0 C83.7 0.0363 0.4225 83.0975 0 185.6975 C0.01 194.1825 0.0275 204.4288 0.0563 205.5413 C0.235 212.3138 5.7763 217.7112 12.5525 217.7112 L360.3888 217.7112 C367.1663 217.7112 372.71 212.3088 372.8838 205.5338"
				}).setFill("black");
				g.createPath({
					path: "M358.6738 203.9615 C358.7188 202.3277 358.7463 188.189 358.745 186.544 L358.745 186.4277 C358.7138 91.2815 281.5575 14.1777 186.4113 14.209 C91.2675 14.2427 14.1625 91.3977 14.1938 186.544 C14.1938 186.5827 14.2213 202.3665 14.2663 203.9615 L358.6738 203.9615 Z"
				}).setFill({
					type: "linear",
					x1: 14.19376,
					y1: 260.88725,
					x2: 14.19376,
					y2: 156.52337,
					colors: [
						{offset: 0, color: [100,100,100]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath({
					path: "M358.7038 182.8677 C356.775 89.3677 280.3713 14.1777 186.4163 14.209 C92.5013 14.2415 16.1713 89.4177 14.2438 182.8652 C66.8388 197.029 127.36 168.779 188.7525 168.779 C250.1638 168.779 306.2575 197.0353 358.7038 182.8677"
				}).setFill({
					type: "linear",
					x1: 14.24378,
					y1: 186.84286,
					x2: 14.24378,
					y2: 14.20898,
					colors: [
						{offset: 0, color: "black"},
						{offset: 1, color: [200,200,200]}
					]
				});
				g.createPath({
					path: "M358.953 183.1203 C357.0243 89.6203 280.6205 14.4303 186.6655 14.4616 C92.7505 14.4941 16.4205 89.6703 14.493 183.1178 C67.088 197.2816 127.6093 169.0316 189.0018 169.0316 C250.413 169.0316 306.5068 197.2878 358.953 183.1203"
				}).setFill([255,255,255,0.12157]);
			},


			drawForeground: function(g){
				g.createPath({
					path: "M214.9406 185.2945 C214.9456 201.0183 202.2044 213.7683 186.4806 213.7745 C170.7544 213.7795 158.0044 201.037 157.9994 185.3145 L157.9994 185.2945 C157.9931 169.5707 170.7369 156.8207 186.4619 156.8145 C202.1844 156.8095 214.9356 169.552 214.9406 185.2758 L214.9406 185.2945 Z"
				}).setFill("black");
				g.createPath({
					path: "M211.3563 185.294 C211.36 199.039 200.2238 210.1827 186.4787 210.1878 C172.735 210.1927 161.59 199.0552 161.585 185.3115 L161.585 185.294 C161.58 171.5502 172.7175 160.4052 186.4613 160.4002 C200.2063 160.3953 211.3513 171.534 211.3563 185.2778 L211.3563 185.294 Z"
				}).setFill({
					type: "linear",
					x1: 161.58503,
					y1: 210.18773,
					x2: 161.58503,
					y2: 185.29399,
					colors: [
						{offset: 0, color: [100,100,100]},
						{offset: 1, color: "black"}
					]
				});
				g.createPath({
					path: "M211.35 184.764 C211.0713 171.2578 200.035 160.3953 186.4625 160.4002 C172.8963 160.4052 161.87 171.264 161.5925 184.764 C169.1888 186.809 177.93 182.729 186.8013 182.729 C195.6712 182.729 203.7738 186.8102 211.35 184.764"
				}).setFill({
					type: "linear",
					x1: 161.59251,
					y1: 185.33811,
					x2: 161.59251,
					y2: 160.40024,
					colors: [
						{offset: 0, color: "black"},
						{offset: 1, color: [150,150,150]}
					]
				});
				g.createPath({
					path: "M211.3494 184.7635 C211.0706 171.2573 200.0344 160.396 186.4632 160.401 C172.8956 160.406 161.8707 171.2647 161.5919 184.7635 C169.1881 186.8085 177.9306 182.7285 186.8006 182.7285 C195.6706 182.7285 203.7731 186.811 211.3494 184.7635"
				}).setFill([255,255,255,0.12157]);
			}

		});
	}
);

