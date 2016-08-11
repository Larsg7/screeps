module.exports = function () {
    var maxCreeps = 12;     // -1 for infinite
    var minHarvesters = 4;
    var minBuilders = 3;
    var minRepairers = 3;
    var minUpgraders = 2;
    var minDefenders = 1;

    var currentCreeps = _.sum(Game.creeps, c => true);
    var currentHarvesters = _.sum(Game.creeps, c => c.memory.role == 'harvester');
    var currentBuilders = _.sum(Game.creeps, c => c.memory.role == 'builder');
    var currentRepairers = _.sum(Game.creeps, c => c.memory.role == 'repairer');
    var currentUpgraders = _.sum(Game.creeps, c => c.memory.role == 'upgrader');
    var currentDefenders = _.sum(Game.creeps, c => c.memory.role == 'defender');
    console.log(currentCreeps+" "+currentHarvesters+" "+currentRepairers+" "+currentBuilders+" "+currentUpgraders);

    if (currentCreeps < maxCreeps
        || currentBuilders < minBuilders
        || currentRepairers < minRepairers
        || currentDefenders < minDefenders
        || currentUpgraders < minUpgraders
        || currentHarvesters < minHarvesters
        || maxCreeps == -1
    ) {
        var newRole = 'builder';
        var newBody = [WORK, CARRY, CARRY, MOVE, MOVE];

        if (currentBuilders < minBuilders) {
            newRole = 'builder'
        }
        if (currentRepairers < minRepairers){
            newRole = 'repairer'
        }
        if (currentDefenders < minDefenders){
            newRole = 'defender';
            newBody = [ATTACK, ATTACK, MOVE, MOVE];
        }
        if (currentUpgraders < minUpgraders) {
            newRole = 'upgrader'
        }
        if (currentHarvesters < minHarvesters) {
            newRole = 'harvester'
        }
        if (Game.spawns.Spawn1.canCreateCreep(newBody) == OK) {
            var newName = Game.spawns.Spawn1.createCreep(newBody, undefined, {
                role: newRole,
                working: false
            });
            console.log("A new " + newRole + " has been spawned.");
        }
    }
};