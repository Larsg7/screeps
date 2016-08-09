/**
 * this module defines all the logic for a builder
 */
var roleBuilder = require('role.builder');

var roleRepairer = {
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
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.hits < s.hitsMax
            });

            if (structure) {
                //creep.say('repairing');
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                //creep.say('no targets to build');
                roleBuilder.run(creep);
            }

            if (creep.carry.energy == 0) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleRepairer;