define(["dojo/_base/declare", "dojo/_base/lang", "dojo/on"], function(declare, lang, on){
	var _GaugeUtils = declare("dojox.gauge.components.GaugeUtils", null, {});
	lang.mixin(dojox.gauge.components.GaugeUtils, {
	
		brightness: function(col, b){
			var res = lang.mixin(null, col);
			res.r = Math.max(Math.min(res.r + b, 255), 0);
			res.g = Math.max(Math.min(res.g + b, 255), 0);
			res.b = Math.max(Math.min(res.b + b, 255), 0);
			return res;
		},
		
		createGradient: function(entries){
			var res = {
				colors: []
			};
			var obj;
			for (var i = 0; i < entries.length; i++){
				if(i % 2 == 0){
					obj = {
						offset: entries[i]
					};
				} else {
					obj.color = entries[i];
					res.colors.push(obj);
				}
			}
			return res;
		},
		
		_setter: function(obj, attributes, values){
			for (var i = 0; i < attributes.length; i++){
				obj[attributes[i]] = values[i];
			}
		},
		
		genericCircularGauge: function(scale, indicator, originX, originY, radius, startAngle, endAngle, orientation, font, labelPosition, tickShapeFunc){
			var attributes = ["originX", "originY", "radius", "startAngle", "endAngle", "orientation", "font", "labelPosition", "tickShapeFunc"];
			if(!orientation){
				orientation = "clockwise";
			}
			if(!font){
				font = {
					family: "Helvetica",
					style: "normal",
					size: "10pt",
					color: "#555555"
				};
			}
			if(!labelPosition){
				labelPosition = "inside";
			}
			if(!tickShapeFunc){
				tickShapeFunc = function(scale, group, tick){
					return group.createLine({
						x1: tick.isMinor ? 2 : 0,
						y1: 0,
						x2: tick.isMinor ? 8 : 10,
						y2: 0
					}).setStroke({
						color: tick.isMinor ? "black" : "#333333",
						width: tick.isMinor ? 0.25 : 0.45
					});
				};
			}
			
			this._setter(scale, attributes, [originX, originY, radius, startAngle, endAngle, orientation, font, labelPosition, tickShapeFunc]);
			
			indicator.set("interactionArea", "gauge");
			// Needle shape
			indicator.set("indicatorShapeFunc", function(group, indicator){
				return group.createPolyline([0, -5, indicator.scale.radius - 2, 0, 0, 5, 0, -5]).setStroke({
					color: "#333333",
					width: 0.25
				}).setFill([240, 30, 40]);
			});
			
			// Map indicator value to label
			// TO BE REPLACED BY A NEW TextIndicator CLASS
			//connect.connect(indicator, "valueChanged", lang.hitch(scale, function(ev){
			//	this._gauge.getElementRenderer("valueLabel").setShape({
			//		text: ev.target.value.toFixed(0)
			//	});
			//}));
			
		}
	});
	return _GaugeUtils;
});
