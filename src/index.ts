import client from './modules/BotClient.js'; // FIXME why modules not work? why js instead of ts?
import ImageAnalyser from "./modules/ImageAnalyser.js";

import {ClientEvents} from "./enums/index.js";
import {Message} from "discord.js";
import * as process from "process";

const analyser = new ImageAnalyser();

//TODO create class?
async function respondWithAnswer(message:  Message, samples: string[]) {
    try {
        const formattedArray = samples.map(item => `* ${item}`);
        await message.reply(`Looks like you need some help with following errors: \n ${formattedArray.join('\n')} \n try to use this guide: \n ${process.env.FAQ_LINK}`)
    } catch (e) {
        console.error(e)
    }
}

// TODO do i need this?
// async function getAnalyserData(): Promise<string | string[]> {
//     try {
//         return await analyser.searchOnImage();
//     } catch (e) {
//         return e;
//     }
// }

client.on(ClientEvents.Ready, (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

client.on(ClientEvents.MessageCreate, (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content) {
        analyser.text = message.content;

        // message.reply('hello');
    }

    if (message.attachments.size !== 0) {
        const firstItem = message.attachments.first();
        analyser.image = firstItem.url;
        analyser.searchOnImage().then(data => {
            if (data.length > 0) {
                respondWithAnswer(message, data).catch(e => {
                    console.warn(e);
                })
            }
        }).catch(e => {
            console.warn(e)
        })
    }
});

client.login(process.env.SECRET_KEY);