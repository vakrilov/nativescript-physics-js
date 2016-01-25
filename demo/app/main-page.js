var Physics = require("nativescript-physics-js");

var init = false;
function pageLoaded(args) {
    if (init) {
        return;
    }
    
    // Get references to container and meta-info views
    var page = args.object;
    var container = page.getViewById("container");
    var metaText = page.getViewById("meta");
    
    // Create physics world and configure NS renderer
    var world = Physics();
    world.add(Physics.renderer('ns', {
        container: container,
        metaText: metaText,
        meta: true
    }));
    
    // Add bodies
    // world.add(Physics.body('circle', {
    //     x: 80,
    //     y: 50,
    //     vx: 0.2,
    //     vy: 0.01,
    //     radius: 15,
    //     styles: { image: "~/images/ns-logo.png" }
    // }));

    world.add(Physics.body('circle', {
        x: 120,
        y: 80,
        vx: -0.2, // velocity in x-direction
        vy: 0.3, // velocity in y-direction
        radius: 30,
        styles: { image: "~/images/ns-logo.png" }
    }));
    
    world.add(Physics.body('rectangle', {
        x: 80,
        y: 220,
        angle: -Math.PI / 4,
        width: 40,
        height: 120,
        treatment: 'static',
        styles: { color: "orange" }
    }));
    

    // Add behaviors
    world.add([
        Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, 300, 300) }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('sweep-prune')
        , Physics.behavior('constant-acceleration') // Gravity
    ]);

    // Start ticking...
    world.on('step', function () { world.render() });
    setInterval(function () { world.step(Date.now()); }, 20);
}
exports.pageLoaded = pageLoaded;
