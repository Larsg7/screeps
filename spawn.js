module.exports = function () {
    var maxCreeps = 9;     // -1 for infinite
    var minHarvesters = 3;
    var minBuilders = 2;
    var minRepairers = 2;
    var minUpgraders = 4;
    var minDefenders = 0;

    var currentCreeps = _.sum(Game.creeps, c => true);
    var currentHarvesters = _.sum(Game.creeps, c => c.memory.role == 'harvester');
    var currentBuilders = _.sum(Game.creeps, c => c.memory.role == 'builder');
    var currentRepairers = _.sum(Game.creeps, c => c.memory.role == 'repairer');
    var currentUpgraders = _.sum(Game.creeps, c => c.memory.role == 'upgrader');
    var currentDefenders = _.sum(Game.creeps, c => c.memory.role == 'defender');
    console.log(currentCreeps+" "+currentHarvesters+" "+currentRepairers+" "+currentBuilders+" "+currentUpgraders+" "+currentDefenders);

    if (currentCreeps < maxCreeps
        || currentBuilders < minBuilders
        || currentRepairers < minRepairers
        || currentDefenders < minDefenders
        || currentUpgraders < minUpgraders
        || currentHarvesters < minHarvesters
        || maxCreeps == -1
    ) {
        var newRole = 'builder';
        var newBodyDefault = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        var newBody;

        if (currentBuilders < minBuilders) {
            newRole = 'builder';
            newBody = newBodyDefault;
        }
        if (currentRepairers < minRepairers){
            newRole = 'repairer';
            newBody = newBodyDefault;
        }
        if (currentDefenders < minDefenders){
            newRole = 'defender';
            newBody = [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
        }
        if (currentUpgraders < minUpgraders) {
            newRole = 'upgrader';
            newBody = newBodyDefault;
        }
        if (currentHarvesters < minHarvesters) {
            newRole = 'harvester';
            newBody = newBodyDefault;
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