var Physics = require("nativescript-physics-js");

let offloadFibonacci = true;

let ballsAdditions = 6;
let fibonacciStart = 35;
let fibonacciCount = 10;

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
    let gravity = Physics.behavior('constant-acceleration');
    world.add([
        Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, 300, 300) }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('sweep-prune'),
        gravity
    ]);

    // Start ticking...
    world.on('step', function () { world.render() });
    setInterval(function () { world.step(Date.now()); }, 20);

    addNativeScriptBalls(world, gravity);
    // Add balls on every 7 seconds
    setInterval(function () { addNativeScriptBalls(world, gravity); }, 7000);

    if (offloadFibonacci) {
        // Setup fibonacci worker
        var worker = new Worker('./worker');
        worker.onmessage = (msg) => {
            console.log(`The ${msg.data.n}-th fibonacci number is ${msg.data.result}`);
        };
        
        for (let i = 0; i < fibonacciCount; i++) {
            worker.postMessage({ n: fibonacciStart + i });
        }
    }
}

let addNativeScriptBallsCounter = 0;

function addNativeScriptBalls(world, gravity) {
    if (!offloadFibonacci && addNativeScriptBallsCounter < fibonacciCount) {
        let n = fibonacciStart + addNativeScriptBallsCounter;
        console.log(`The ${n}-th fibonacci number is ${fib(n)}`);
    }

    if (addNativeScriptBallsCounter < ballsAdditions) {
        world.add(Physics.body('circle', {
            x: 80,
            y: 50,
            vx: 0.2,
            vy: 0.01,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 120,
            y: 80,
            vx: -0.2,
            vy: 0.3,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 150,
            y: 50,
            vx: 0.2,
            vy: 0.4,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 180,
            y: 50,
            vx: 0.7,
            vy: 0.2,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 210,
            y: 50,
            vx: -0.5,
            vy: 0.1,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 240,
            y: 50,
            vx: 0.9,
            vy: -0.2,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));

        world.add(Physics.body('circle', {
            x: 270,
            y: 50,
            vx: 0.6,
            vy: 0.4,
            radius: 10,
            styles: { image: "~/images/ns-logo.png" }
        }));
    }
    else {
        if (addNativeScriptBallsCounter % 2 == 0) {
            gravity.setAcceleration({ x: 0, y: -0.0104 });
        }
        else {
            gravity.setAcceleration({ x: 0, y: 0.0104 });
        }
    }

    addNativeScriptBallsCounter++;
}

function fib(n) {
  if (n < 2) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

exports.pageLoaded = pageLoaded;
