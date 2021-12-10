const { WAConnection, Browsers, MessageType } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const { getBuffer, getGroupAdmins, getRandom, runtime, sleep } = require('./lib/myfunc')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const set = JSON.parse(fs.readFileSync('./src/setting2.json'))
const welcome = require('./message/group')
baterai = 'TIDAK TERDETEKSI'
charging = 'TIDAK TERDETEKSI'

//nocache
require('./index.js')
nocache('../index.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./src/setting2.json')
nocache('../src/setting2.json', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'yellow'), 'File is updated!'))
require('./src/settingsymbol.json')
nocache('../src/settingsymbol.json', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))

const starts = async (dha = new WAConnection()) => {
	dha.logger.level = 'warn'
	console.log(color(figlet.textSync(`${set.NamaBot}`, {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	dha.browserDescription = ["Conect", "Chrome", "3.0.0"];

	// Menunggu QR
	dha.on('qr', () => {
		console.log(color('[', 'pink'), color('!', 'red'), color(']', 'pink'), color('Scan Qr Tersebut Menggunakan WhatsApp Web'))
	})

	// Menghubungkan
	fs.existsSync(`./sesi.json`) && dha.loadAuthInfo(`./sesi.json`)
	dha.on('connecting', () => {
		console.log(color('[ MESS ]', 'purple'), color('Connecting Process'));
	})
		//connect
	dha.on('open', () => {
		console.log(color('[ SUCCES ]', 'purple'), color('Conecting Succes'));
	})
	// session
	//dha.sendMessage(`${set.NomorOwner}`, `𝙃𝘼𝙄 𝙊𝙒𝙉𝙀𝙍 ${set.NamaOwner}!!\n𝘽𝙊𝙏 𝙎𝙐𝘿𝘼𝙃 𝙎𝙐𝘾𝘾𝙀𝙎 𝘾𝙊𝙉𝙉𝙀𝘾𝙏\n𝙅𝘼𝙉𝙂𝘼𝙉 𝙇𝙐𝙋𝘼 𝙎𝙐𝘽𝙎𝘾𝙍𝙄𝘽𝙀 𝙋𝙀𝙈𝘽𝙐𝘼𝙏 𝙎𝘾𝙍𝙄𝙋𝙏 𝙄𝙉𝙄\n\n\n𝘾𝙀𝙍𝘿𝙄𝙏\n𝙉𝙖𝙢𝙖 : 𝙔𝙚𝙧𝙞𝙠𝙤\n𝙉𝙤𝙢𝙤𝙧 : 𝙬𝙖.𝙢𝙚/6282132242606\n𝙔𝙩 : 𝙔𝙚𝙧𝙞𝙠𝙤 𝘽𝙤𝙩\n𝙅𝙖𝙣𝙜𝙖𝙣 𝙇𝙪𝙥𝙖 𝙅𝙤𝙞𝙣 𝙂𝙧𝙪𝙗 𝙅𝙪𝙜𝙖\nhttps://chat.whatsapp.com/EkS4MayHspdC1v2warsyVc`, MessageType.text)
	await dha.connect({timeoutMs: 30*1000})
	fs.writeFileSync('./sesi.json', JSON.stringify(dha.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	dha.on('CB:action,,battery', json => {
	global.batteryLevelStr = json[2][0][1].value
	global.batterylevel = parseInt(batteryLevelStr)
	baterai = batterylevel
	if (json[2][0][1].live == 'true') charging = true
	if (json[2][0][1].live == 'false') charging = false
	console.log(json[2][0][1])
	console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	dha.on('CB:action,,battery', json => {
	const batteryLevelStr = json[2][0][1].value
	const batterylevel = parseInt(batteryLevelStr)
	global.batrei.push(batterylevel)
	})

	// welcome
      dha.on("group-participants-update", async (anu) => {
      try {
      groupMet = await dha.groupMetadata(anu.jid);
      groupMembers = groupMet.participants;
      mem = anu.participants[0];
      console.log(anu);
      try {
      pp_user = await dha.getProfilePicture(mem);
      } catch (e) {
      pp_user =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
      }
      try {
      pp_grup = await dha.getProfilePicture(anu.jid)
      } catch (e) {
      pp_grup =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
      }
      if (anu.action == "add" && mem.includes(dha.user.jid)) {
      dha.sendMessage(anu.jid, "Hi Bang︎", "conversation");
      }
      hehe = await getBuffer(pp_user)
      if (anu.action == 'add' && !mem.includes(dha.user.jid)) {
          const mdata = await dha.groupMetadata(anu.jid)             
             const memeg = mdata.participants.length
             const thu = await dha.getStatus(anu.participants[0], MessageType.text)
             const num = anu.participants[0]
             const bosco1 = await dha.prepareMessage("0@s.whatsapp.net", hehe, MessageType.location,{ thumbnail: hehe})
			 const bosco2 = bosco1.message["ephemeralMessage"] ? bosco1.message.ephemeralMessage : bosco1
                let v = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
              //  time_welc = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
             //   time_wel = moment.tz('Asia/Kolkata').format("hh:mm")
                teks = `*${set.welcome1}* @${num.split('@')[0]}\n\n${set.welcome2}`
                welcomeBut = [{buttonId:`${prefix}ok`,buttonText:{displayText:`Thx ${set.NamaBot}`},type:1}, {buttonId:`${prefix}oc`,buttonText:{displayText:`Info ${mdata.subject}️`},type:1}]
                welcomeButt = { contentText: ` `, footerText: `${teks}`, buttons: welcomeBut, headerType: 6, locationMessage: bosco2.message.locationMessage}
                dha.sendMessage(mdata.id, welcomeButt, MessageType.buttonsMessage, { caption: 'hehe', "contextInfo": { "mentionedJid" : [num], },})
                 }
            if (anu.action == 'remove' && !mem.includes(dha.user.jid)) {
                const mdata = await dha.groupMetadata(anu.jid)
                const num = anu.participants[0]
                const bosco3 = await dha.prepareMessage("0@s.whatsapp.net", hehe, MessageType.location,{ thumbnail: hehe})
			    const bosco4 = bosco3.message["ephemeralMessage"] ? bosco3.message.ephemeralMessage : bosco3
                let w = dha.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
              // time_welc = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
               //. time_wel = moment.tz('Asia/Kolkata').format("hh:mm")
                memeg = mdata.participants.length
                out = `*${set.out1}* @${num.split('@')[0]}\n\n ${set.out2}`
                goodbyeBut = [{buttonId:`${prefix}h`,buttonText:{displayText: 'Byee Kak'},type:1}, {buttonId:`${prefix}okc`,buttonText:{displayText: 'Yah Keluar'}, type:1}]
                goodbyeButt = { contentText: ` `, footerText: `${out}`, buttons: goodbyeBut, headerType: 6, locationMessage: bosco3.message.locationMessage}
                dha.sendMessage(mdata.id, goodbyeButt, MessageType.buttonsMessage, { caption: 'hehe', "contextInfo": { "mentionedJid" : [num], },})
            }
                } catch (e) {
      console.log("Error : %s", color(e, "red"));
    }
  })

	dha.on('group-update', async (anu) => {
//if (!welkom.includes(anu.jid)) return
fkontakk = { key: {
                  fromMe: false,
                  participant: `0@s.whatsapp.net`, ...(anu.jid ? { remoteJid: '6285697725326-1604595598@g.us' } : {})
               },
               message: {
                  "contactMessage":{"displayName":fake,"vcard":"BEGIN:VCARD\nVERSION:3.0\nN:2; WHATSAPP BOT;;;\nFN:MARK\nitem1.TEL;waid=0:+0\nitem1.X-ABLabel:Mobile\nEND:VCARD"
               }}}
  metdata = await dha.groupMetadata(anu.jid)
    if(anu.announce == 'false'){
    teks = `- [ Group Opened ] -\n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`
    dha.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
    console.log(`- [ Group Opened ] - In ${metdata.subject}`)
  }
  else if(anu.announce == 'true'){
    teks = `- [ Group Closed ] -\n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`
    dha.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
    console.log(`- [ Group Closed ] - In ${metdata.subject}`)
  }
  else if(!anu.desc == ''){
    tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
    teks = `- [ Group Description Change ] -\n\nDeskripsi Group telah diubah oleh Admin @${anu.descOwner.split('@')[0]}\n• Deskripsi Baru : ${anu.desc}`
    dha.sendMessage(metdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [tag]}, quoted: fkontakk})
    console.log(`- [ Group Description Change ] - In ${metdata.subject}`)
  }
  else if(anu.restrict == 'false'){
    teks = `- [ Group Setting Change ] -\n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`
    dha.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
    console.log(`- [ Group Setting Change ] - In ${metdata.subject}`)
  }
  else if(anu.restrict == 'true'){
    teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`
    dha.sendMessage(metdata.id, teks, MessageType.text, {quoted: fkontakk})
    console.log(`- [ Group Setting Change ] - In ${metdata.subject}`)
  }
})
dha.on('chat-update', async (message) => {
		require('./index.js')(dha, message)
	})
}

starts()