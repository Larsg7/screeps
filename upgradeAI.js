/**
 * logic for the upgrade AI
 * Basic tasks: divide creeps into one team per room with a ctrl
 *              let creeps harvest and send them to the ctrl to upgrade it
 *              can receive multiple creeps from other AIs -> needs to give them back
 */

require('basicAI');

class upgradeAI extends AI {

    ctrls;

    constructor(AIs, Rooms) {
        this.Helper = new HelperClass;
        this.AIMemory = Memory.upgradeAI;
        this.AIs = AIs;
        this.energyLimit = this.AIMemory.energyLimit;
        this.tasks = this.AIMemory.tasks;

        /**
         * Array of Memory containing the names of rooms as objects
         * @type {Array<object>}
         */
        this.Rooms = Rooms;

        this.addCreepsToOwn();
        this.ctrls = this.AIMemory.ctrl;
    }

    /**
     * scan function that saves new controllers to memory
     */
    scan() {
        this.Helper.loopThroughRooms(this.Rooms, function (room) {
            if (room.ctrl != 0 && this.AIMemory.ctrl.indexOf(room.name) != -1)
                this.AIMemory.ctrl.push(Game.rooms[room.name].controller.id);
        });
    }

    run() {

        this.Helper.loopThroughCreeps(this.ownCreeps, )

    }
}
