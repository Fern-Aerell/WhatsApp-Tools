import CommandHandler from "../core/CommandHandler";
import isStringNumber from "../utils/isStringNumber";

export async function execute(this: CommandHandler, args: string[]) {

    if(!(args.length > 0)) {
        this.wat.sendErrorToSelf('Silahkan setidak nya masukkan 1 argument pada perintah /group.');
        return;
    }

    // const getAllGroupData = async () => {
    //     if(!this.wat.socket) return;
    //     const groups = await this.wat.socket.groupFetchAllParticipating();
    //     const groupData = Object.values(groups).map(group => ({
    //         id: group.id,
    //         name: group.subject,
    //     }));
    //     return groupData;
    // }

    // const groupData = await getAllGroupData();

    // if(args.length == 1 && args[0] == 'list') {
    //     let result = '';
    //     if(groupData && groupData.length > 0) {
    //         let i = 0;
    //         for(const group of groupData) {
    //             result += `[${i}] ${group.name}\n`;
    //             i++;
    //         }
    //     }else{
    //         result = 'Tidak ada grup, kamu mungkin belum pernah masuk ke grup WhatsApp mana pun.';
    //     }
    //     this.wat.sendInfoToSelf(result);
    //     return;
    // }else if(args.length == 3 && args[1] == 'list' && args[2] == 'number') {

    //     if(!isStringNumber(args[0])) {
    //         this.wat.sendErrorToSelf(`'${args[0]}' bukanlah sebuah angka...`);
    //     }

    //     const index = parseInt(args[0]);

    //     if(index < groupData.length) {
    //         this.wat.sendErrorToSelf(`'${args[0]}' bukanlah sebuah angka...`);
    //     }

    //     const groupData = await getAllGroupData();
    //     return;
    // }

    this.wat.sendErrorToSelf(`Perintah /group tidak dapat menerima argument '${args[0]}'.`);
}