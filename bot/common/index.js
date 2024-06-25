async function findTalker(that, name) {
    const talker = await that.Contact.find({ name });
    return talker;
}

async function findContact(that, name) {
    const talker = await that.Contact.find({ name });
    return talker;
}

async function getFriendList(that) {
    const friendList = await that.Contact.findAll();
    friendList.forEach((item) => {
        if (item.friend() && item.type() === 1) {
            console.log(item.name());
        }
    });
    console.log(`好友数量: ${friendList.length}`);
}

async function findRoom(that, name) {
    const room = await that.Room.find({ topic: name });
    return room;
}

async function getRoomList(that) {
    const roomList = await that.Room.findAll();
    return roomList;
}

module.exports = {
    findTalker,
    getFriendList,
    findContact,
    getRoomList,
    findRoom,
};
