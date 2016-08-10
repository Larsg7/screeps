module.exports = function () {
    var maxCreeps = 20;
    var minHarvesters = 3;
    var minBuilders = 2;
    var minRepairers = 2;
    var minUpgraders = 2;

    var currentCreeps = _.sum(Game.creeps, c => true);
    var currentHarvesters = _.sum(Game.creeps, c => c.memory.role == 'harvester');
    var currentBuilders = _.sum(Game.creeps, c => c.memory.role == 'builder');
    var currentRepairers = _.sum(Game.creeps, c => c.memory.role == 'repairer');
    var currentUpgraders = _.sum(Game.creeps, c => c.memory.role == 'upgrader');
    console.log(currentCreeps+" "+currentHarvesters+" "+currentRepairers+" "+currentBuilders+" "+currentUpgraders);

    if (currentCreeps < maxCreeps) {
        var newRole = 'builder';
        if (currentBuilders < minBuilders) {
            newRole = 'builder'
        }
        if (currentRepairers < minRepairers){
            newRole = 'repairer'
        }
        if (currentUpgraders < minUpgraders) {
            newRole = 'upgrader'
        }
        if (currentHarvesters < minHarvesters) {
            newRole = 'harvester'
        }

        var newName = Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE, MOVE], undefined, {
            role: newRole,
            working: false
        });
        if (newName.pos) {
            console.log("A " + newRole + " named " + newName.name + " has spawned.");
        }
    }
};