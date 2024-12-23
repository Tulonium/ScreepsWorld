module.exports.loop = function() {
    var roleHarvester = require('./roleHarvester');
    var roleUpgrader = require('./roleUpgrader');
    const Main_Spawn_Name = 'Tulon';
    const Harvester_Role_Name = 'harvester';
    const Upgrader_Role_Name = 'upgrader';
    var harvestersCount = 5;
    var upgradersCount = 5;
    var curCounts = {};
    curCounts[Harvester_Role_Name] = 0;
    curCounts[Upgrader_Role_Name] = 0;
    var spawn = Game.spawns[Main_Spawn_Name];
    
    for (var crName in Game.creeps) {
        var creep = Game.creeps[crName];
        curCounts[creep.memory.role]++;
        
        switch (creep.memory.role) {
            case Harvester_Role_Name:
                roleHarvester.Run(creep);
                break;
            case Upgrader_Role_Name:
                roleUpgrader.Run(creep);
                break;
        }
    }
    
    if (curCounts[Harvester_Role_Name] < harvestersCount) {
        spawn.createCreep([WORK, CARRY, MOVE], null, { role: Harvester_Role_Name, state: 'Harvesting' });
    }
    if (curCounts[Upgrader_Role_Name] < upgradersCount) {
        spawn.createCreep([WORK, CARRY, MOVE], null, { role: Upgrader_Role_Name, state: 'Harvesting' });
    }
}