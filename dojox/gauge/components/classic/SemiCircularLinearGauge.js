define([
		"dojo/_base/lang", 
		"dojo/_base/declare", 
		"../../CircularGauge", 
		"../../LinearScaler", 
		"../../CircularScale", 
		"../../CircularValueIndicator", 
		"../../CircularRangeIndicator",
		"../DefaultPropertiesMixin"
	], 
	function(lang, declare, CircularGauge, LinearScaler, CircularScale, CircularValueIndicator, CircularRangeIndicator, DefaultPropertiesMixin){

	/*=====
	 var _CircularGauge = ibm_ilog.gauge.CircularGauge;
	=====*/

		return declare("dojox.gauge.components.classic.SemiCircularLinearGauge", [CircularGauge, DefaultPropertiesMixin], {

			constructor: function(args, node){
				var scaler = new LinearScaler();
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 82.0782);
				scale.set("originY", 88.26275);
				scale.set("radius", 68.2182);
				scale.set("startAngle", -179.9);
				scale.set("endAngle", -0.1);
				scale.set("orientation", "clockwise");
				scale.set("labelGap", 2);
				scale.set("font", {
					family: "Helvetica",
					weight: 'bold',
					size: "6pt"
				});
				this.addElement("scale", scale);
				var indicator = new CircularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("indicatorShapeFunc", function(group, indicator){

					var l = indicator.scale.radius - 2;
					return group.createPath().moveTo(0, 0).smoothCurveTo(l / 2, -10, l, 0).lineTo(l, 0).smoothCurveTo(l / 2, 10, 0, 0).closePath().setStroke({
						color: [208, 208, 208],
						width: 1
					}).setFill({
						type: "radial",
						cx: 0,
						cy: 0,
						r: 55,
						colors: [
							{offset: 0, color: [208,208,208]},
							{offset: 1, color: "white"}
						]
					});

				});
				scale.addIndicator("indicator", indicator);
				this.addElement("foreground", lang.hitch(this, this.drawForeground));
			},

			drawBackground: function(g){
				g.createPath({
					path: "M81.7782 14.1216 C40.6566 14.1216 7.2782 47.4468 7.2782 88.5279 C7.2782 92.1204 7.5445 95.6646 8.0377 99.1216 L155.5186 99.1216 C156.0119 95.6646 156.2782 92.1204 156.2782 88.5279 C156.2782 47.4468 122.8998 14.1216 81.7782 14.1216 Z"
				}).setFill({
					type: "radial",
					cx: 81.77822,
					cy: 116.12156,
					r: 81.9,
					colors: [
						{offset: 0, color: "white"},
						{offset: 1, color: [148,152,161]}
					]
				});
				g.createPath({
					path: "M81.9375 6.3929 C36.762 6.3929 0 43.1548 0 88.3304 C0 93.9091 0.587 99.3452 1.6563 104.6116 C1.8119 105.2383 2.3793 105.8616 3.0078 105.8616 L160.9063 105.8616 C161.5442 105.8616 162.0632 105.2382 162.2188 104.6116 C163.2841 99.3452 163.8438 93.9091 163.8438 88.3304 C163.8438 43.1548 127.1131 6.3929 81.9375 6.3929 ZM81.9375 14.6741 C122.6358 14.6741 155.5938 47.6321 155.5938 88.3304 C155.5938 91.9339 155.3192 95.4626 154.8125 98.9241 L9.0625 98.9241 C8.5559 95.4631 8.2813 91.935 8.2813 88.3304 C8.2813 47.6321 41.2393 14.6741 81.9375 14.6741 Z"
				}).setFill([121,126,134]);
				g.createPath({
					path: "M81.7783 14.1216 C40.6546 14.1216 7.2782 47.4604 7.2782 88.5389 C7.2782 92.1311 7.5305 95.6649 8.0238 99.1216 L155.5326 99.1216 C156.026 95.6649 156.2782 92.1311 156.2782 88.5389 C156.2782 47.4604 122.9018 14.1216 81.7783 14.1216 ZM81.7783 14.9215 C122.1453 14.9215 154.9112 47.6315 154.9112 87.9543 C154.9112 91.4806 154.6499 94.9593 154.1656 98.3525 L9.3909 98.3525 C8.9066 94.9593 8.6452 91.4806 8.6452 87.9543 C8.6452 47.6315 41.4112 14.9215 81.7783 14.9215 Z"
				}).setFill({
					type: "linear",
					x1: 7.2782,
					y1: 14.1216,
					x2: 7.2782,
					y2: 99.1216,
					colors: [
						{offset: 0, color: "white"},
						{offset: 1, color: [148,152,161]}
					]
				});
				g.createPath({
					path: "M131.7123 23.859 C123.1725 16.836 112.7785 11.9131 100.5595 9.0902 C61.213 0 20.5911 20.6702 9.8638 55.1976 C9.3708 56.9339 12.7617 58.0358 13.7073 55.5238 C24.639 24.4073 64.588 6.1932 100.6432 14.523 C118.2691 18.5951 131.8022 27.3347 141.23 40.7415 C143.0191 43.6629 146.945 42.1265 145.2608 39.0652 C141.4269 33.222 136.9222 28.1434 131.7123 23.859 Z"
				}).setFill({
					type: "linear",
					x1: 9.81511,
					y1: 6.94738,
					x2: 9.81511,
					y2: 31.97231,
					colors: [
						{offset: 0, color: [235,235,235]},
						{offset: 1, color: [121,126,134]}
					]
				});
			},


			drawForeground: function(g){
				var g1 = g.createGroup();
				g1.createPath({
					path: "M91.4279 88.1528 C91.4279 93.3069 87.2496 97.4852 82.0955 97.4852 C76.9413 97.4852 72.7631 93.3069 72.7631 88.1528 C72.7631 82.9986 76.9413 78.8203 82.0955 78.8203 C87.2496 78.8203 91.4279 82.9986 91.4279 88.1528 Z"
				}).setFill({
					type: "radial",
					cx: 82.09552,
					cy: 84.41979,
					r: 18.66485,
					colors: [
						{offset: 0, color: [149,149,149]},
						{offset: 0.5, color: "black"},
						{offset: 1, color: "black"}
					]
				});
				g1.createPath({
					path: "M89.0432 88.1528 C89.0432 92.0526 85.9326 95.2141 82.0954 95.2141 C78.2582 95.2141 75.1476 92.0526 75.1476 88.1528 C75.1476 84.2528 78.2582 81.0913 82.0954 81.0913 C85.9326 81.0913 89.0432 84.2528 89.0432 88.1528 Z"
				}).setFill([105,105,105,0.27451]);
				g1.createPath({
					path: "M88.589 88.1528 C88.589 91.6136 85.6817 94.4193 82.0955 94.4193 C78.5091 94.4193 75.6019 91.6136 75.6019 88.1528 C75.6019 84.6919 78.5091 81.8862 82.0955 81.8862 C85.6817 81.8862 88.589 84.6919 88.589 88.1528 Z"
				}).setFill([105,105,105,0.1451]);
			}

		});
	}
);

