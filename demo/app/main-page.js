var Physics = require("nativescript-physics-js");

var init = false;
function pageLoaded(args) {
    if(!init){
        var page = args.object;
        
        var container = page.getViewById("container");
        var metaText = page.getViewById("meta");
     
        var world = Physics();
        var renderer = Physics.renderer('ns', {
            container: container,
            metaText: metaText,
            meta: true
        });
        
        world.add(Physics.body('circle', {
            x: 80,
            y: 50,
            vx: 0.2,
            vy: 0.01,
            radius: 15,
            styles: { image: "~/images/ns-logo.png"}
        }));

        world.add(Physics.body('circle', {
            x: 120,
            y: 80,
            vx: -0.2, // velocity in x-direction
            vy: -0.01, // velocity in y-direction
            radius: 30,
            styles: { image: "~/images/ns-logo.png"}
        }));

        world.add([
            Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, 300, 300) }),
            Physics.behavior('body-collision-detection'),
            Physics.behavior('body-impulse-response'),
            Physics.behavior('sweep-prune'),
            Physics.behavior('constant-acceleration'),
            renderer
        ]);

        world.on('step', function() {
            world.render();
        });

        Physics.util.ticker.on(function(t) {
            world.step(t);
        }).start();

        setInterval(() => {
            world.step(Date.now());
        }, 20);
        
    }
}
exports.pageLoaded = pageLoaded;
