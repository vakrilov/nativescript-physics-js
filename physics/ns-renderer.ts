import {Image} from "ui/image";
import {View} from "ui/core/view";
import {LayoutBase} from "ui/layouts/layout-base";
import {TextBase} from "ui/text-base";

var Physics = require('./physicsjs-full');

Physics.renderer('ns', function(parent) {
    var defaults = {
        width: 200,
        height: 200,
        fontSize: 4
    };

    var container: LayoutBase;
    var metaText: TextBase;

    return {
        init: function(options) {

            options = Physics.util.extend(defaults, options);
            
            //parent.init.call(this, options);
            parent.options = Physics.util.options(defaults);
            parent.options(options);

            container = options.container;
            metaText = options.metaText;
        },
        // extended
        createView: function(geometry, styles) {
            var img = new Image();
            if(styles && styles.image){
                img.src = styles.image;
            }
            else {
                
            }
            img.width = geometry.radius * 2;
            img.height = geometry.radius * 2;
            
            img.horizontalAlignment = "left";
            img.verticalAlignment = "top"; 

            container.addChild(img);
            return img;
        },
        drawMeta: function(meta) {
            if (metaText) {
                metaText.text = "fps: " + meta.fps.toFixed(2) + " ipf: " + meta.ipf;
            }
        },
        drawBody: function(
            body: { state: { pos: any, vel: any, angular: any }, view: View, radius: number }
        ) {
            // "t" is the "leftover" time between timesteps. You can either ignore it, 
            // or use it to interpolate the position by multiplying it by the velocity 
            // and adding it to the position. This ensures smooth motion during "bullet-time"
            var t = this._interpolateTime;
            var view = body.view;
            var x = body.state.pos.get(0) + t * body.state.vel.get(0) - body.radius;
            var y = body.state.pos.get(1) + t * body.state.vel.get(1) - body.radius;
            var angle = body.state.angular.pos + t * body.state.angular.vel;
        
        
            // render "view" at (x, y) with a rotation of "angle"...
            view.translateX = x;
            view.translateY = y;
            view.rotate = angle;
        },

    };
});
