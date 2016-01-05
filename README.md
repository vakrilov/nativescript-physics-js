# PhysicsJS for NativeScript
This is a NativeScript renderer of the [PhysicsJS](http://wellcaffeinated.net/PhysicsJS) library.


## Installation
```
tns plugin add nativescript-physics-js
```

## Usage
In the XML markup (`main-page.xml`):
```
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded">
    <!-- Definte the container for the phisics scene -->
    <GridLayout id="container" width="300" height="300" backgroundColor="lightgreen">
    
        <!-- Label for meta info is note requiered -->
        <Label id="meta"/>
    </GridLayout>
</Page>
```

In JavaScript (`main-page.js`): 
```
var Physics = require("nativescript-physics-js");

var init = false;
function pageLoaded(args) {
    // Prevent double initialization
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
    world.add(Physics.body('circle', {
        x: 80,
        y: 50,
        radius: 15,
        styles: { image: "~/images/ns-logo.png" }
    }));

    // Add behaviors
    world.add([
        Physics.behavior('edge-collision-detection', { aabb: Physics.aabb(0, 0, 300, 300) }),
        Physics.behavior('body-collision-detection'),
        Physics.behavior('body-impulse-response'),
        Physics.behavior('sweep-prune'),
        Physics.behavior('constant-acceleration') // Gravity
    ]);

    // Start ticking...
    world.on('step', function () { world.render() });
    setInterval(function () { world.step(Date.now()); }, 20);
}
exports.pageLoaded = pageLoaded;
```

## Examples
Code of the demo [here](https://github.com/vakrilov/nativescript-physics-js/tree/master/demo).

More demos on the [PhysicsJS site](http://wellcaffeinated.net/PhysicsJS/examples/).