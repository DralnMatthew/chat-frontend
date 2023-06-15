const GAME_OBJECTS = []

export class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() { // executes at first frame

    }

    update() { // executes every frame except first frame

    }

    on_destroy() {

    }

    destroy() {
        this.on_destroy();

        for (let i in GAME_OBJECTS) {
            const obj = GAME_OBJECTS[i];
            if (obj === this) {
                GAME_OBJECTS.splice(i); // delete ist element in an array
                break;
            }
        }
    }
}

let last_timestamp;

const step = (timestamp) => {
    for (let obj of GAME_OBJECTS) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step); // execute step at next frame.