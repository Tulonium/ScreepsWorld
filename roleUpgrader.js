const Run = (creep) => {
    if (creep.memory.state == 'Harvesting') {
        source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.state = 'Carrying';
            creep.say("Выгружать");
        }
    };
    if (creep.memory.state == 'Carrying') {
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        if (creep.store.getUsedCapacity() == 0) {
            creep.memory.state = 'Harvesting';
            creep.say("Копать");
        }
    };
}

module.exports = {
    Run
};