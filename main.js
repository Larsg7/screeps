var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var spawn = require('spawn');

module.exports.loop = function () {


    /**
     * logic for creeps goes here
     */
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'repairer':
                roleRepairer.run(creep);
                break;
        }
    }

    /**
     * logic for spawning goes here
     */
    if (Game.time % 5 == 0) {
        spawn();
    }

}