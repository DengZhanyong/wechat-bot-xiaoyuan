async function onRoomLeave(room, leaverList, remover) {
    // 离开群的人
    console.log(leaverList);
    console.log(remover);
    const leaverNames = leaverList.map((member) => member.name()).join(",");
    room.say(`${leaverNames}离开了群！江湖再见！`);
    // const removerName = remover ? remover.name() : 'someone'
    // console.log(`${room.topic()} 中 ${leaverNames} 被 ${removerName} 踢出了`)
}

module.exports = onRoomLeave;
