/**
 * main file for my ai-script for the game 'screeps'
 * @author: Larsg7, https://github.com/Larsg7
 */

var HelperClass = require('hellper.functions');
var MainAIClass = require('mainAI');

module.exports.loop = function () {

    var Helper = new HelperClass;
    Helper.garbageCollection();

    var MainAI = new MainAIClass;
    MainAI.run();

};