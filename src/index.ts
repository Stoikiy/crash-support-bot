import client from '@modules/BotClient.mjs';
import ImageAnalyser from "@modules/ImageAnalyser.js";

import {ClientEvents} from "@enums/index";

const analyser = new ImageAnalyser();
client.on(ClientEvents.Ready, (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

client.on(ClientEvents.MessageCreate, (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello') {
        message.reply('hello');
    }
});

client.login(process.env.SECRET_KEY);