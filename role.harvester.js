/**
 * this module defines all the logic for a harvester
 */
var roleBuilder = require('role.builder');

var roleHarvester = {
    run: function (creep) {

        if (creep.memory.working == false) {
            //creep.say('harvesting');
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = true;
            }
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (
                           s.structureType == STRUCTURE_SPAWN
                        || s.structureType == STRUCTURE_EXTENSION
                        || s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
            });

            if (structure) {
                //creep.say('depositing');
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                //creep.say('no targets to deposit');
                roleBuilder.run(creep);
            }

            if (creep.carry.energy == 0) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleHarvester;