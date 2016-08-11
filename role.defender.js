/**
 * this module defines all the logic for a defender
 */

var roleDefender = {
    run: function (creep) {
        var intruder = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if (intruder) {
            creep.memory.working = true;
        }

        if (creep.memory.working == false) {
            var flag = creep.room.find(FIND_FLAGS, {
                filter: f => f.name == 'Defend'
            });
            creep.moveTo(flag[0]);
        }
        else {
            creep.say('attack!');
            if (creep.attack(intruder) == ERR_NOT_IN_RANGE) {
                creep.moveTo(intruder);
            }

            if (!intruder) {
                creep.memory.working = false;
            }
        }
    }
};

module.exports = roleDefender;