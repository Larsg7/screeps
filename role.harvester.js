/**
 * this module defines all the logic for a harvester
 */
var roleBuilder = require('role.builder');

var roleHarvester = {
    run(creep) {
        
        //creep.moveTo(creep.pos.findClosestByPath(creep.room.findExitTo('E51N43')));

        if (creep.memory.working == false) {
            //creep.say('harvesting');
            var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: s => s.energy > 0
            });
            
            
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
            
            if (creep.carry.energy == creep.carryCapacity || !source) {
                creep.memory.working = true;
            }
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
            });

            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_SPAWN)
                                && s.energy < s.energyCapacity
                })
            }
            
            if (!structure) {
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                            && s.energy < s.energyCapacity
                });
            }

            if (!structure) {
                //creep.say('depositing');
                roleBuilder.run(creep);
            }
            else {
                //creep.say('no targets to deposit');
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }

            if (creep.carry.energy == 0) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleHarvester;