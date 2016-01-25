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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnMtcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJucy1yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQkFBb0IsVUFBVSxDQUFDLENBQUE7QUFJL0Isc0JBQW9CLE9BQU8sQ0FBQyxDQUFBO0FBRTVCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBRTFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVMsTUFBTTtJQUNsQyxJQUFJLFFBQVEsR0FBRztRQUNYLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLEdBQUc7UUFDWCxRQUFRLEVBQUUsQ0FBQztLQUNkLENBQUM7SUFFRixJQUFJLFNBQXFCLENBQUM7SUFDMUIsSUFBSSxRQUFrQixDQUFDO0lBRXZCLE1BQU0sQ0FBQztRQUNILElBQUksRUFBRSxVQUFTLE9BQU87WUFFbEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUVqRCxrQ0FBa0M7WUFDbEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXhCLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQzlCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxXQUFXO1FBQ1gsVUFBVSxFQUFFLFVBQVMsUUFBUSxFQUFFLE1BQU07WUFDakMsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFD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