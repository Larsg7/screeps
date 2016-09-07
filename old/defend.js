/**
 * script for defending rooms (with towers) goes here
 */
module.exports = function () {
    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: {structureType: STRUCTURE_TOWER}
    });

    if (towers) {
        for (let tower in towers) {
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            tower.attack(target);
        }
    }
};