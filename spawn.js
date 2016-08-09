module.exports = function () {
    var maxCreeps = 15;
    var maxHarvesters = 3;
    var maxBuilders = 2;
    var maxRepairers = 2;
    var maxUpgraders = 2;

    var currentCreeps = _.sum(Game.creeps, c => true);
    var currentHarvesters = _.sum(Game.creeps, c => c.memory.role == 'harvester');
    var currentBuilders = _.sum(Game.creeps, c => c.memory.role == 'builder');
    var currentRepairers = _.sum(Game.creeps, c => c.memory.role == 'repairer');
    var currentUpgraders = _.sum(Game.creeps, c => c.memory.role == 'upgrader');


    if (currentCreeps < maxCreeps) {
        var newRole = 'builder';
        if (currentBuilders < maxBuilders) {
            newRole = 'builder'
        }
        if (currentHarvesters < maxHarvesters) {
            newRole = 'harvester'
        }
        if (currentUpgraders < maxUpgraders) {
            newRole = 'upgrader'
        }
        if (currentRepairers < maxRepairers) {
            newRole = 'repairer'
        }

        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {
            role: newRole,
            working: false
        });
        if (newName.pos) {
            console.log("A " + newRole + " named " + newName.name + " has spawned.");
        }
    }
};