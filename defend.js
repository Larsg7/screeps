/**
 * script for defending rooms (with towers) goes here
 */
module.exports = function () {
    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: t => t.structureType == STRUCTURE_TOWER
    });

    if (towers) {
        for (let tower in towers) {
            var target = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            towers[0].attack(target);
        }
    }
};