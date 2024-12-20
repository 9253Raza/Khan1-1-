module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
	description: "Notify the Bot or the person leaving the group with a random gif/photo/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif", "randomgif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:s");
  const hours = moment.tz("Asia/Kolkata").format("HH");
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "leave" : "managed";
	const path = join(__dirname, "events", "123.mp4");
	const pathGif = join(path, `${threadID}123.mp4`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

(typeof data.customLeave == "undefined") ? msg = "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐓𝐨  𝐊𝐡𝐚𝐧 𝐒𝐚𝐡𝐚𝐛  𝐁𝐨𝐭 😇👈 ●============================●  [⚜️] •💜• === {name} === •💜• ●============================● KO Bhaga diya 🌝 ●============================● 𝐊𝐢𝐭𝐧𝐚 𝐐𝐮𝐭𝐞 𝐓𝐡𝐚 𝐍𝐚 𝐘𝐞 𝐀𝐛 𝐔𝐬𝐤𝐞 𝐁𝐢𝐧𝐚 𝐊𝐞𝐬𝐞 𝐌𝐚𝐧 𝐋𝐚𝐠𝐞𝐠𝐚 𝐌𝐞𝐫𝐚🥺🥺🥺 •💜• {type}  [⚜️] ●============================● 𝙃𝘼𝙈 𝙒𝙊 𝙃𝘼𝙄 𝙅𝙉𝘼𝘼𝘽 𝙅𝙊 𝘽𝘼𝘼𝙏 𝙎𝙀 𝙅𝘼𝘼𝙏 𝙊𝙍 𝙃𝘼𝙍𝙆𝙏𝙊 𝙎𝙀 𝙊𝙆𝘼𝘼𝙏 𝙉𝘼𝘼𝙋 𝙇𝙀𝙏𝙀 𝙃𝘼𝙄😎😎\n😒 𝐀𝐀𝐏𝐊𝐀 𝐀𝐏𝐍𝐀 (𝐎𝐰𝐧𝐞𝐫) ➻  ────  𝐊𝐡𝐚𝐧 𝐒𝐚𝐡𝐚𝐛 😒\n●============================● •💜• {name} •💜• ●============================● •💜• BEHTI HAWA SA THAA WO 😥 uDTI PATANG✨✨ SAA THAA WOO ♥ KAHA GAYA USE DHOONDHO🤔🤔🤔 ●============================● •💜•\n\n[❤️‍🔥] 🖤🖤😥😥...Good {session} || {time}" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{session}/g, hours <= 10 ? "𝙈𝙤𝙧𝙣𝙞𝙣𝙜" : 
    hours > 10 && hours <= 12 ? "𝘼𝙛𝙩𝙚𝙧𝙉𝙤𝙤𝙣" :
    hours > 12 && hours <= 18 ? "𝙀𝙫𝙚𝙣𝙞𝙣𝙜" : "𝙉𝙞𝙜𝙝𝙩").replace(/\{time}/g, time);  

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "randomgif"));

	if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
                            }
