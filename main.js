/**
 * main.js of my script for the game 'screeps'
 * @author: Larsg7, https://github.com/Larsg7
 */
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var spawn = require('spawn');
var defend = require('defend');

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
            case 'defender':
                roleDefender.run(creep);
        }


    }

    /**
     * logic for spawning goes here
     */
    if (Game.time % 5 == 0) {
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
        
        spawn();
    }

    /**
     * logic for defending goes her
     */
    defend();

}