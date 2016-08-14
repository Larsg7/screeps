/**
 * mainAI Which is controlling the amount of creeps every AI gets,
 *              calling each AIs run/scan function
 *
 */

var HelperClass = require('helper.functions');
var RoomsClass = require('rooms');
var HarvestAIClass = require('harvestAI');
var RepairAIClass = require('repairAI');
var BuildAIClass = require('builderAI');
var UpgradeAIClass = require('upgradeAI');
var DefendAIClass = require('defendAI');
var SpawnAIClass = require('spawnAI');

class MainAI {

    Helper;
    RoomsObj;
    Rooms;
    HarvestAI;
    RepairAI;
    BuildAI;
    UpgradeAI;
    DefendAI;
    SpawnAI;
    AIs;

    constructor() {

        this.Helper = new HelperClass;
        this.RoomsObj = new RoomsClass;

        this.AIs = [this, this.HarvestAI, this.SpawnAI, this.DefendAI, this.UpgradeAI,
                    this.DefendAI, this.RepairAI, this.BuildAI];
    }

    run() {

        var scan = Game.ticks % 5 == 0;

        this.Rooms = this.RoomsObj.getFromMem();

        this.HarvestAI = new HarvestAIClass(this.AIs, this.Rooms);
        this.RepairAI = new RepairAIClass(this.AIs, this.Rooms);
        this.UpgradeAI = new UpgradeAIClass(this.AIs, this.Rooms);
        this.BuildAI = new BuildAIClass(this.AIs, this.Rooms);
        this.SpawnAI = new SpawnAIClass(this.AIs, this.Rooms);
        this.DefendAI = new DefendAIClass(this.AIs, this.Rooms);

        if (scan) {
            this.Helper.garbageCollection();

            this.RoomsObj.scan();
            for (let AI in this.AIs && AI != this)
                AI.scan();
        }

        for (let AI in this.AIs && AI != this)
            AI.run();

    }


}