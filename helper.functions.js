/**
 * here are a few helper functions used by several scripts defined
 *
 * Ideas: Moveto(creep), garbage,
 */

class Helper {

    /**
     * delete dead creeps
     * TODO: do not delete spawing creeps
     */
    garbageCollection() {
        for (let creep in Memory.creeps) {
            if (!Game.creeps.creep) {
                delete Memory.creeps.creep;
            }
        }
    }

    /**
     * shorthand to loop through rooms
     * @param Rooms {object} the rooms object containing all information about the rooms
     * @param func {function} the function to be applied to each room
     */
    loopThroughRooms(Rooms, func) {
        for (let name in Rooms) {
            func(Room[name]);
        }
    }

    loopThroughCreeps(Creeps, func) {
        for (let creep in Creeps) {
            func(creep);
        }
    }
}

module.exports = Helper;