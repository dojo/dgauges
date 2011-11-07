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
		"../../CircularRangeIndicator",
		"../DefaultPropertiesMixin"
	], 
	function(lang, declare, on, Color, GaugeUtils, CircularGauge, LinearScaler, CircularScale, CircularValueIndicator, CircularRangeIndicator, DefaultPropertiesMixin){

	/*=====
     var CircularGauge = dojox.gauge.CircularGauge;
     =====*/
     
		return declare("dojox.gauge.components.green.CircularLinearGauge", [CircularGauge, DefaultPropertiesMixin], {

			constructor: function(args, node){
				var scaler = new LinearScaler();
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 135);
				scale.set("originY", 133.51876);
				scale.set("radius", 100);
				scale.set("labelPosition", "outside");
				scale.set("startAngle", 120);
				scale.set("endAngle", 60);
				scale.set("orientation", "clockwise");
				this.addElement("scale", scale);
				var indicator = new CircularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("indicatorShapeFunc", function(group){
			
					var g1 = group.createGroup().setTransform({
						xx: 0,
						xy: -0.71507,
						yx: 0.71507,
						yy: 0,
						dx: 72.83034,
						dy: 277.40354
					});
					g1.createPath({
						path: "M-396.8819 108.376 C-396.8819 108.376 -396.8819 146.4387 -396.8819 146.4387 C-396.8819 146.4387 -378.8819 146.4387 -378.8819 146.4387 L-378.8819 108.376 L-387.7366 -48 L-396.8819 108.376 L-396.8819 108.376"
					}).setFill([0,0,0,1]);
					g1.createPath({
						path: "M-398 121.5498 C-391.2927 125.4647 -384.5854 124.8984 -377.8781 121.5498 L-377.8781 148 L-398 148 L-398 121.5498 Z"
					}).setFill([0,0,0,0.17255]);
					return group;
					
				});
				scale.addIndicator("indicator", indicator);
				this.addElement("foreground", lang.hitch(this, this.drawForeground));
			},

			drawBackground: function(g){
				g.setTransform({
					dx: -19.00001,
					dy: -14.64046
				});
				g.createPath({
					path: "M-173.0061 124.4931 C-173.0061 201.013 -232.7403 263.0446 -306.4261 263.0446 C-380.1119 263.0446 -439.8461 201.013 -439.8461 124.4931 C-439.8461 47.9732 -380.1119 -14.0584 -306.4261 -14.0584 C-232.7403 -14.0584 -173.0061 47.9732 -173.0061 124.4931 Z"
				}).setTransform({
					xx: 1.01934,
					xy: 0,
					yx: 0,
					yy: 0.97465,
					dx: 467.35144,
					dy: 29.38342
				}).setFill({
					type: "linear",
					x1: -173.0061,
					y1: 263.04459,
					x2: -439.8461,
					y2: -14.0584,
					colors: [
						{offset: 0, color: [255,255,255,1]},
						{offset: 1, color: [255,255,255,0]}
					]
				});
				g.createPath({
					path: "M-205.5619 101.3509 C-205.5431 166.5002 -240.2889 226.7086 -296.7067 259.2886 C-353.1244 291.8687 -422.6394 291.8687 -479.0571 259.2886 C-535.4749 226.7086 -570.2208 166.5002 -570.2019 101.3509 C-570.2208 36.2017 -535.4749 -24.0067 -479.0571 -56.5868 C-422.6394 -89.1668 -353.1244 -89.1668 -296.7067 -56.5868 C-240.2889 -24.0067 -205.5431 36.2017 -205.5619 101.3509 Z"
				}).setTransform({
					xx: 0.71507,
					xy: 0,
					yx: 0,
					yy: 0.71507,
					dx: 430.448,
					dy: 75.32888
				}).setFill({
					type: "linear",
					x1: -570.20191,
					y1: -81.0218,
					x2: -314.9539,
					y2: 283.72369,
					colors: [
						{offset: 0, color: [226,226,221,1]},
						{offset: 0.5, color: [239,239,236,1]},
						{offset: 1, color: [255,255,255,1]}
					]
				}).setStroke({
					color: [50,50,50,1],
					width: 7.7,
					style: "Solid",
					cap: "butt",
					join: 4.0
				});
				g.createPath({
					path: "M153.4913 19.8239 C82.6972 19.8239 25.2556 77.1279 25.2556 147.7285 C25.2556 218.3291 82.6972 275.6331 153.4913 275.6331 C224.2853 275.6331 281.7612 218.3291 281.7612 147.7285 C281.7612 77.1279 224.2853 19.8239 153.4913 19.8239 ZM153.4913 43.6926 C210.4205 43.6926 256.6418 90.3015 256.6418 147.7285 C256.6418 205.1556 210.4205 251.7645 153.4913 251.7645 C96.562 251.7645 50.375 205.1556 50.375 147.7285 C50.375 90.3015 96.562 43.6926 153.4913 43.6926 Z"
				}).setFill({
					type: "linear",
					x1: 25.2556,
					y1: 19.8239,
					x2: 25.2556,
					y2: 275.63309,
					colors: [
						{offset: 0, color: [229,231,236,1]},
						{offset: 0.25, color: [109,183,19,1]},
						{offset: 0.5, color: [109,183,19,1]},
						{offset: 0.75, color: [109,183,19,1]},
						{offset: 1, color: [229,231,236,1]}
					]
				});
				g.createPath({
					path: "M152.3307 58.049 C133.0812 58.4087 113.7945 64.9977 97.737 78.1115 C66.5728 103.5625 57.1373 145.7786 71.7995 181.1427 C57.6682 145.8503 67.176 103.9678 97.987 78.6427 C135.9081 47.4734 191.8301 53.1329 222.7994 91.299 C242.6392 115.7491 247.4339 147.6288 238.362 175.5802 C247.8192 147.5173 243.1198 115.3504 223.0182 90.7365 C205.0474 68.7317 178.7096 57.556 152.3307 58.049 Z"
				}).setTransform({
					xx: 1.01,
					xy: 0,
					yx: 0,
					yy: 1.01,
					dx: -1.54048,
					dy: -0.69588
				}).setFill({
					type: "linear",
					x1: 65.04036,
					y1: 58.03337,
					x2: 65.04036,
					y2: 181.1427,
					colors: [
						{offset: 0, color: [55,98,6,1]},
						{offset: 1, color: [55,98,6,0]}
					]
				});
				g.createPath({
					path: "M-389.2685 91.1524 C-389.2685 194.5704 -473.1053 278.4072 -576.5233 278.4072 C-679.9412 278.4072 -763.778 194.5704 -763.778 91.1524 C-763.778 -12.2655 -679.9412 -96.1024 -576.5233 -96.1024 C-473.1053 -96.1024 -389.2685 -12.2655 -389.2685 91.1524 Z"
				}).setTransform({
					xx: 0.1,
					xy: 0.46404,
					yx: -0.46637,
					yy: 0.1005,
					dx: 169.42878,
					dy: -129.38324
				}).setStroke({
					color: [255,255,255,1],
					width: 3.04506,
					style: "Solid",
					cap: "butt",
					join: 4.0
				});
			},


			drawForeground: function(g){
				g.setTransform({
					dx: -19.00001,
					dy: -14.64046
				});
				var g1 = g.createGroup().setTransform({
					xx: 0.71507,
					xy: 0,
					yx: 0,
					yy: 0.71507,
					dx: 430.448,
					dy: 75.32888
				});
				g1.createPath({
					path: "M-4.7084 99.7372 C-4.708 100.4807 -5.0836 101.1679 -5.6936 101.5398 C-6.3035 101.9116 -7.0551 101.9116 -7.6651 101.5398 C-8.275 101.1679 -8.6506 100.4807 -8.6503 99.7372 C-8.6506 98.9937 -8.275 98.3065 -7.6651 97.9346 C-7.0551 97.5628 -6.3035 97.5628 -5.6936 97.9346 C-5.0836 98.3065 -4.708 98.9937 -4.7084 99.7372 Z"
				}).setTransform({
					xx: 12.68481,
					xy: 0,
					yx: 0,
					yy: 11.40371,
					dx: -303.27289,
					dy: -1034.099
				}).setFill([0,0,0,0.17255]);
				g1.createPath({
					path: "M-4.7084 99.7372 C-4.708 100.4807 -5.0836 101.1679 -5.6936 101.5398 C-6.3035 101.9116 -7.0551 101.9116 -7.6651 101.5398 C-8.275 101.1679 -8.6506 100.4807 -8.6503 99.7372 C-8.6506 98.9937 -8.275 98.3065 -7.6651 97.9346 C-7.0551 97.5628 -6.3035 97.5628 -5.6936 97.9346 C-5.0836 98.3065 -4.708 98.9937 -4.7084 99.7372 Z"
				}).setTransform({
					xx: 11.66952,
					xy: 0,
					yx: 0,
					yy: 10.95128,
					dx: -310.05551,
					dy: -990.78137
				}).setFill({
					type: "radial",
					cx: -7.66483,
					cy: 99.7372,
					r: 2.0262,
					colors: [
						{offset: 0, color: [58,215,58,1]},
						{offset: 1, color: [33,161,33,1]}
					]
				});
				g1.createPath({
					path: "M-4.7084 99.7372 C-4.708 100.4807 -5.0836 101.1679 -5.6936 101.5398 C-6.3035 101.9116 -7.0551 101.9116 -7.6651 101.5398 C-8.275 101.1679 -8.6506 100.4807 -8.6503 99.7372 C-8.6506 98.9937 -8.275 98.3065 -7.6651 97.9346 C-7.0551 97.5628 -6.3035 97.5628 -5.6936 97.9346 C-5.0836 98.3065 -4.708 98.9937 -4.7084 99.7372 Z"
				}).setTransform({
					xx: 11.1657,
					xy: 0,
					yx: 0,
					yy: 10.47848,
					dx: -313.30249,
					dy: -943.7442
				}).setFill({
					type: "linear",
					x1: -8.6503,
					y1: 97.65575,
					x2: -8.6503,
					y2: 101.81865,
					colors: [
						{offset: 0, color: [255,255,246,1]},
						{offset: 0.17857, color: [252,251,236,1]},
						{offset: 0.25755, color: [250,247,230,1]},
						{offset: 0.77747, color: [246,243,224,1]},
						{offset: 1, color: [227,209,184,1]}
					]
				});
				g.createPath({
					path: "M256.7496 77.8699 C256.7496 101.5357 210.5274 65.772 153.5749 65.772 C96.6225 65.772 50.4002 101.5357 50.4002 77.8699 C50.4002 54.2042 96.6225 16.6425 153.5749 16.6425 C210.5274 16.6425 256.7496 54.2042 256.7496 77.8699 Z"
				}).setFill({
					type: "linear",
					x1: 50.4002,
					y1: 16.6425,
					x2: 50.4002,
					y2: 85.96382,
					colors: [
						{offset: 0, color: [255,255,255,0.79216]},
						{offset: 1, color: [255,255,255,0]}
					]
				});
				g.createPath({
					path: "M-857.7244 123.4918 C-857.7244 179.5434 -903.1633 224.9823 -959.2148 224.9823 C-1015.2665 224.9823 -1060.7053 179.5434 -1060.7053 123.4918 C-1060.7053 67.4402 -1015.2665 22.0014 -959.2148 22.0014 C-903.1633 22.0014 -857.7244 67.4402 -857.7244 123.4918 Z"
				}).setTransform({
					xx: 0.04025,
					xy: 0,
					yx: 0,
					yy: 0.04025,
					dx: 151.24274,
					dy: 214.22984
				}).setFill([0,0,0,1]);
			}

		});
	}
);

