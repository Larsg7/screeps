/**
* this module defines all the logic for an upgrader
*/
var roleUpgrader = {
    run: function (creep) {

        if (creep.memory.working == false) {
            //creep.say('harvesting');
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            if (creep.carry.energy == creep.carryCapacity || !source) {
                creep.memory.working = true;
            }
        }
        else {
            var controller = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTROLLER
            });

            if (controller) {
                //creep.say('depositing');
                if (creep.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
            else {
                //creep.say('no targets to deposit');
            }

            if (creep.carry.energy == 0) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleUpgrader;