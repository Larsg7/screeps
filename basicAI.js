/**
 * IDEA: communicate with mainAI, ownCreeps
 */

var HelperClass = require('helper.functions');

class AI {
    /**
     * this AIs own creeps
     * @type {Array<Game.creeps>}
     */
    ownCreeps = [];

    /**
     * energyLimit for this AI TODO
     * @type {number}
     */
    energyLimit;

    /**
     * a shorthand to this AIs memory
     * @type {Memory}
     */
    AIMemory;

    /**
     * object that contains all other AIs
     * @type {object}
     */
    AIs = {};

    /**
     * object holding all future tasks for creeps to do TODO
     * @type {object}
     */
    tasks = {};

    /**
     * object holding the information about the Rooms
     * @type {object}
     */
    Rooms;

    /**
     * shorthand to the HelperClass
     * @type {object}
     */
    Helper;

    /**
     * add creep to AIs memory, this creep will be now under this AIs control
     * @param newCreep {Game.creeps} the creep to be added
     */
    addCreep(newCreep) {
        this.AIMemory.creeps.push(newCreep.id);
    };

    /**
     * remove a creep from this AIs memory to free it for a new task or because it died
     * @param oldCreep {Game.creeps} the creep to be removed
     * @return removed {bool} boolean if creep was found
     */
    rmCreep(oldCreep) {
        var removed = false;
        for (let i = 0; i < this.AIMemory.creeps.length; i++) {
            if (oldCreep.id == this.AIMemory.creeps[i]) {
                this.AIMemory.creeps.splice(i, 1);
                removed = true;
            }
        }
        return removed;
    };

    get getCreepNumber() {
        return this.ownCreeps.length;
    }

    set setEnergyLimit(limit) {
        this.energyLimit = limit;
    }

    addCreepsToOwn() {
        for (let name in this.AIMemory.creeps) {
            this.ownCreeps.push(Game.getObjectById(this.AIMemory.creeps[name]));
        }
    }

    /**
     * send creep to the harvest AI to harvest (or collect) energy
     * @param creep {Game.creeps} the creep that needs energy
     * @param priority {number} shows how important the task is TODO
     */
    harvest(creep, priority) {
        if (!this.AIs.harvestAI) {
            throw "The AIs-object is not initialised correctly!"
        }
        this.AIs.harvestAI.letCreepHarvest(creep, priority);
    }

    /**
     * a moveTo function that lets a creep move to a location
     * @param creep {Game.creeps}
     * @param location {Game.pos}
     */
    moveTo(creep, location) {
        this.Helper.moveTo(creep, location);
    }

}

module.exports = AI;

