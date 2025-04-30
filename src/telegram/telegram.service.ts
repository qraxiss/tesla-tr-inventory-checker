// telegram-bot.service.ts
import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { EnvService } from 'src/env/env.service';

const NEW_INVENTORY = () => `
Yeni model mevcut!

https://www.tesla.com/tr_TR/inventory/new/my?arrangeby=plh&range=0

${new Date().toLocaleString("tr-TR")}
`
const SAME_INVENTORY = () => `
Mevcut değil, kontrol edildi ${new Date().toLocaleString("tr-TR")}
`

const UNKNOWN = (data) => `
Bilinmeyen durum.

${JSON.stringify(data)}

${new Date().toLocaleString("tr-TR")}
`


@Injectable()
export class TelegramService {
    private botNewInventory: TelegramBot;
    private botSameInventory: TelegramBot;

    constructor(public envService: EnvService) {
        this.botNewInventory = new TelegramBot(this.envService.envConfig.NEW_INVENTORY_BOT, { polling: false });
        this.botSameInventory = new TelegramBot(this.envService.envConfig.SAME_INVENTORY_BOT, { polling: false });
    }

    async newInventory() {
        try {
            await Promise.all(this.envService.envConfig.CHAT_IDS.map(id => this.botNewInventory.sendMessage(id, NEW_INVENTORY())));
        }
        catch (error) {
            console.error(error)
        }

    }

    async sameInventory() {
        try {
            await Promise.all(this.envService.envConfig.CHAT_IDS.map(id => this.botSameInventory.sendMessage(id, SAME_INVENTORY())));
        }
        catch (error) {
            console.error(error)
        }
    }

    async unknown(data) {
        try {
            await Promise.all(this.envService.envConfig.CHAT_IDS.map(id => this.botSameInventory.sendMessage(id, UNKNOWN(data))));
        }
        catch (error) {
            console.error(error)
        }
    }

}
