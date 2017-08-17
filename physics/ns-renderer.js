"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_1 = require("ui/image");
var color_1 = require("color");
var Physics = require('./physicsjs-full');
var toDeg = 180 / Math.PI;
Physics.renderer('ns', function (parent) {
    var defaults = {
        width: 200,
        height: 200,
        fontSize: 4
    };
    var container;
    var metaText;
    return {
        init: function (options) {
            options = Physics.util.extend(defaults, options);
            //parent.init.call(this, options);
            parent.options = Physics.util.options(defaults);
            parent.options(options);
            container = options.container;
            metaText = options.metaText;
        },
        // extended
        createView: function (geometry, styles) {
            var img = new image_1.Image();
            if (styles && styles.image) {
                img.src = styles.image;
            }
            if (styles && styles.color) {
                img.backgroundColor = new color_1.Color(styles.color);
            }
            var name = geometry.name;
            if (name === 'circle') {
                img.width = geometry.radius * 2;
                img.height = geometry.radius * 2;
                geometry._renderOffsetX = -geometry.radius;
                geometry._renderOffsetY = -geometry.radius;
            }
            else if (name === 'rectangle') {
                img.width = geometry.width;
                img.height = geometry.height;
                geometry._renderOffsetX = -geometry.width / 2;
                geometry._renderOffsetY = -geometry.height / 2;
            }
            img.horizontalAlignment = "left";
            img.verticalAlignment = "top";
            container.addChild(img);
            return img;
        },
        drawMeta: function (meta) {
            if (metaText) {
                metaText.text = "fps: " + meta.fps.toFixed(2) + " ipf: " + meta.ipf;
            }
        },
        drawBody: function (body) {
            // "t" is the "leftover" time between timesteps. You can either ignore it, 
            // or use it to interpolate the position by multiplying it by the velocity 
            // and adding it to the position. This ensures smooth motion during "bullet-time"
            var t = this._interpolateTime;
            var view = body.view;
            var x = body.state.pos.get(0) + t * body.state.vel.get(0) + body.geometry._renderOffsetX;
            var y = body.state.pos.get(1) + t * body.state.vel.get(1) + body.geometry._renderOffsetY;
            var angle = (body.state.angular.pos + t * body.state.angular.vel) * toDeg;
            // render "view" at (x, y) with a rotation of "angle"...
            view.translateX = x;
            view.translateY = y;
            view.rotate = angle;
        },
    };
});
