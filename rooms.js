/**
 * class to check rooms for status and save information in memory
 * Ideas: check for hostiles, check for visibility, check for flags
 */

class Rooms {

    /**
     * shorthand to the Game.rooms object
     */
    visible;

    /**
     * rooms which are or were visible to me
     */
    rooms = [];

    /**
     * shorthand to Memory.Rooms
     */
    memory;

    constructor() {
        this.visible = Game.rooms;
        this.memory = Memory.rooms;
        this.rooms = this.memory;
    }

    /**
     * scan for changes in rooms and save them in memory
     */
    scan() {
        this.rooms = this.memory;

        for (let name in this.rooms) {
            var visibleRoom = this.visible[name];

            this.memory.name.name = name;
            this.memory.name.mine = (visibleRoom.find(FIND_MY_STRUCTURES)) ? true : false;
            this.memory.name.visible = (visibleRoom) ? true : false;
            this.memory.name.save = (visibleRoom.find(FIND_HOSTILE_CREEPS) != "");
            this.memory.name.pop = _.sum(Game.creeps, c => c.room.name === name);
            this.memory.name.ctrl = (visibleRoom.controller) ? visibleRoom.controller.level : 0;
        }
    }

    /**
     * return the memory location for the rooms
     * @return {Array}
     */
    getFromMem() {
        return this.rooms;
    }

}
