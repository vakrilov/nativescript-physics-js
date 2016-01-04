var image_1 = require("ui/image");
var Physics = require('./physicsjs-full');
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
            else {
            }
            img.width = geometry.radius * 2;
            img.height = geometry.radius * 2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnMtcmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJucy1yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxzQkFBb0IsVUFBVSxDQUFDLENBQUE7QUFLL0IsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBUyxNQUFNO0lBQ2xDLElBQUksUUFBUSxHQUFHO1FBQ1gsS0FBSyxFQUFFLEdBQUc7UUFDVixNQUFNLEVBQUUsR0FBRztRQUNYLFFBQVEsRUFBRSxDQUFDO0tBQ2QsQ0FBQztJQUVGLElBQUksU0FBcUIsQ0FBQztJQUMxQixJQUFJLFFBQWtCLENBQUM7SUFFdkIsTUFBTSxDQUFDO1FBQ0gsSUFBSSxFQUFFLFVBQVMsT0FBTztZQUVsQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWpELGtDQUFrQztZQUNsQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFeEIsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDOUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDaEMsQ0FBQztRQUNELFdBQVc7UUFDWCxVQUFVLEVBQUUsVUFBUyxRQUFRLEVBQUUsTUFBTTtZQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1lBQ3RCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDdkIsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQzNCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztZQUVOLENBQUM7WUFDRCxHQUFHLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFakMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztZQUNqQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBRTlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRCxRQUFRLEVBQUUsVUFBUyxJQUFJO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDeEUsQ0FBQztRQUNMLENBQUM7UUFDRCxRQUFRLEVBQUUsVUFDTixJQUFpRjtZQUVqRiwyRUFBMkU7WUFDM0UsMkVBQTJFO1lBQzNFLGlGQUFpRjtZQUNqRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFHaEUsd0RBQXdEO1lBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7S0FFSixDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==