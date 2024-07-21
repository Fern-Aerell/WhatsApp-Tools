// import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import WhatsAppTools from "./core/WhatsAppTools";

const whatsAppTools = new WhatsAppTools();

whatsAppTools.run();

// async function connectToWhatsApp() {

//     let user: UserWa;
//     let broadcastNomors: Array<string> = [];
//     let broadcastPesan: string = '';

//     const { state, saveCreds } = await useMultiFileAuthState('authentication');

//     const sock = makeWASocket({
//         auth: state,
//         printQRInTerminal: true,
//         browser: [
//             'WhatsApp Tools',
//             'Browser',
//             '1.0.0'
//         ],
//         logger: pino({
//             transport: {
//                 target: 'pino-pretty',
//                 options: {
//                     colorize: true
//                 }
//             }
//         })
//     });

//     sock.ev.on('creds.update', saveCreds)

//     sock.ev.on('connection.update', async (update) => {
//         const { connection, lastDisconnect } = update;
//         if (connection === 'close') {
//             const shouldReconnect = (lastDisconnect!.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
//             console.log('Koneksi terputus karena ', lastDisconnect!.error, ', mencoba menghubungkan kembali ', shouldReconnect);
//             // reconnect if not logged out
//             if (shouldReconnect) {
//                 connectToWhatsApp();
//             }
//         } else if (connection === 'open') {
//             console.log('Koneksi berhasil dibuka');

//             user = {
//                 id: toNoWaAndToJid(sock.user!.id),
//                 nama: sock.user!.name!
//             };

//             console.log(`Koneksi terhubung ke user dengan:`);
//             console.log(`id: ${user.id}`);
//             console.log(`nama: ${user.nama}`);


//         }
//     });

//     sock.ev.on('messages.upsert', async ({ messages, type }) => {

//         if (messages.length <= 0) return;

//         const message = messages[0];

//         if (message.key.remoteJid !== user.id || !message.message) return;

//         console.log('messages:\n', messages);
//         console.log('type:\n', type);
        
//         let perintah: string | undefined | null;

//         if(message.message.conversation) {
//             perintah = message.message.conversation;
//         }else if(message.message.extendedTextMessage) {
//             perintah = message.message.extendedTextMessage.text;
//         }

//         if (perintah) {

//             if (perintah === '/jumlah grup') {
//                 const kumpulanGrup = await sock.groupFetchAllParticipating();
//                 await sock.sendMessage(user.id, { text: `Ada ${Object.keys(kumpulanGrup).length} grup` });
//             }

//             if (perintah.startsWith('/grup id ')) {

//                 const namaGrupYangDiCari = perintah.replace('/grup id ', '').toLowerCase();
//                 const kumpulanGrup = await sock.groupFetchAllParticipating();
//                 const grupYangMungkinDiCari: Array<GrupWa> = [];

//                 for (const [id, grup] of Object.entries(kumpulanGrup)) {
//                     if (grup.subject.toLowerCase().includes(namaGrupYangDiCari)) {
//                         grupYangMungkinDiCari.push({
//                             id: id,
//                             nama: grup.subject,
//                             deskripsi: grup.desc ?? '',
//                             pembuat: grup.owner ?? '',
//                             jumlah_anggota: grup.participants.length
//                         });
//                     }
//                 }

//                 if (grupYangMungkinDiCari.length > 0) {
//                     grupYangMungkinDiCari.forEach(async (grup) => {
//                         await sock.sendMessage(user.id, { text: `Nama Grup: ${grup.nama}\nId Grup: dibawah ini` });
//                         await sock.sendMessage(user.id, { text: grup.id });
//                     });
//                 } else {
//                     await sock.sendMessage(user.id, { text: `Tidak ada grup dengan nama ${namaGrupYangDiCari}` });
//                 }

//             }

//             if (perintah.startsWith('/grup nomor semua anggota ')) {
//                 const grupJid = perintah.replace('/grup nomor semua anggota ', '').trim();
//                 try {
//                     const grupMetaData = await sock.groupMetadata(grupJid);
//                     const grupNama = grupMetaData.subject;
//                     const anggotas = grupMetaData.participants;
//                     const nomors: Array<string> = [];
//                     anggotas.forEach((anggota) => {
//                         const nomor = anggota.id.split('@')[0];
//                         nomors.push(nomor);
//                     });
//                     await sock.sendMessage(user.id, { text: `Berikut adalah nomor semua anggota yang ada di grup ${grupNama}` });
//                     await sock.sendMessage(user.id, { text: nomors.join('\n') });
//                 } catch (error) {
//                     await sock.sendMessage(user.id, { text: `Tidak ada grup dengan id ${grupJid}` });
//                 }
//             }

//             if (perintah.startsWith('/cek apakah nomor ini terdaftar wa\n')) {
//                 let nomors = perintah.replace('/cek apakah nomor ini terdaftar wa\n', '').split('\n');
//                 // Membuat array of Promises
//                 const checkPromises = nomors.map(async (nomor) => {
//                     try {
//                         const [hasil] = await sock.onWhatsApp(formatWhatsAppNumber(nomor));
//                         if (hasil?.exists) {
//                             return `${nomor}`;
//                         } else {
//                             return `${nomor} (tidak terdaftar)`;
//                         }
//                     } catch (error) {
//                         console.error(`Error checking number ${nomor}:`, error);
//                         return `${nomor} (error saat pengecekan)`;
//                     }
//                 });
//                 try {
//                     // Menunggu semua Promise selesai
//                     const hasil = await Promise.all(checkPromises);

//                     // Mengirim pesan dengan hasil
//                     await sock.sendMessage(user.id, {
//                         text: `Berikut hasil pengecekan yang saya lakukan:`
//                     });
//                     await sock.sendMessage(user.id, {
//                         text: hasil.join('\n')
//                     });
//                 } catch (error) {
//                     console.error('Error saat melakukan pengecekan:', error);
//                     await sock.sendMessage(user.id, {
//                         text: 'Maaf, terjadi kesalahan saat melakukan pengecekan nomor.'
//                     });
//                 }
//             }

//             // BROADCAST

//             if (perintah.startsWith('/broadcast tambah nomor\n')) {

//                 let nomors = perintah.replace('/broadcast tambah nomor\n', '').split('\n');

//                 // Membuat array of Promises
//                 const checkPromises = nomors.map(async (nomor) => {
//                     try {
//                         const [hasil] = await sock.onWhatsApp(formatWhatsAppNumber(nomor));
//                         if (hasil?.exists) {
//                             return `${nomor}`;
//                         } else {
//                             return `${nomor} (tidak terdaftar)`;
//                         }
//                     } catch (error) {
//                         console.error(`Error checking number ${nomor}:`, error);
//                         return `${nomor} (error saat pengecekan)`;
//                     }
//                 });

//                 try {
//                     // Menunggu semua Promise selesai
//                     const hasil = await Promise.all(checkPromises);
//                     hasil.forEach((nomor) => {
//                         if(!nomor.endsWith('(tidak terdaftar)') && !nomor.endsWith('(error saat pengecekan)')) {
//                             broadcastNomors.push(nomor);
//                         }
//                     });

//                     // Mengirim pesan dengan hasil
//                     await sock.sendMessage(user.id, {
//                         text: `Berikut hasil pengecekan yang saya lakukan:`
//                     });
//                     await sock.sendMessage(user.id, {
//                         text: hasil.join('\n')
//                     });
//                     await sock.sendMessage(user.id, {
//                         text: `Berikut nomor yang saya masukkan ke bagian broadcast:`
//                     });
//                     await sock.sendMessage(user.id, {
//                         text: broadcastNomors.join('\n')
//                     });
//                 } catch (error) {
//                     console.error('Error saat melakukan pengecekan dan penambahan nomor broadcast:', error);
//                     await sock.sendMessage(user.id, {
//                         text: 'Maaf, terjadi kesalahan saat melakukan pengecekan dan penambahan nomor broadcast.'
//                     });
//                 }
//             }

//             if (perintah.startsWith('/broadcast list nomor')) {
//                 await sock.sendMessage(user.id, {
//                     text: `Berikut adalah nomor yang ada di bagian broadcast:`
//                 });
//                 if(broadcastNomors.length > 0) {
//                     await sock.sendMessage(user.id, {
//                         text: broadcastNomors.join('\n')
//                     });
//                 }else{
//                     await sock.sendMessage(user.id, {
//                         text: 'Tidak ada nomor di bagian broadcast'
//                     });
//                 }
//             }

//             if (perintah.startsWith('/broadcast pesan preview')) {
//                 if(broadcastPesan.length > 0) {
//                     await sock.sendMessage(user.id, {
//                         text: `Berikut adalah preview pesan broadcast:`
//                     });
//                     await sock.sendMessage(user.id, {
//                         text: broadcastPesan
//                     });
//                 }else{
//                     await sock.sendMessage(user.id, {
//                         text: 'Tidak ada pesan broadcast'
//                     });
//                 }
//             }

//             if (perintah.startsWith('/broadcast set pesan\n')) {
//                 const pesan = perintah.replace('/broadcast set pesan\n', '');
//                 broadcastPesan = pesan;
//                 await sock.sendMessage(user.id, {
//                     text: `Pesan broadcast sudah di atur menjadi:`
//                 });
//                 await sock.sendMessage(user.id, {
//                     text: broadcastPesan
//                 });
//             }

//             if (perintah.startsWith('/broadcast kirim')) {
//                 if(broadcastNomors.length <= 0) {
//                     await sock.sendMessage(user.id, {
//                         text: `Tidak ada nomor satupun di bagian broadcast`
//                     }); 
//                     return;
//                 }
//                 if(broadcastPesan.length <= 0) {
//                     await sock.sendMessage(user.id, {
//                         text: `Tidak ada pesan broadcast`
//                     }); 
//                     return;
//                 }
//                 broadcastNomors.forEach(async (nomor) => {
//                     await sock.sendMessage(user.id, {
//                         text: `Mengirim pesan broadcast ke ${nomor}`
//                     }); 
//                     try {
//                         await sock.sendMessage(formatWhatsAppNumber(nomor, true), {
//                             text: broadcastPesan
//                         });
//                         await sock.sendMessage(user.id, {
//                             text: `Berhasil mengirim pesan broadcast ke ${nomor}`
//                         }); 
//                     }catch(error) {
//                         console.error(`Gagal mengirim pesan broadcast ke ${nomor} karena error:\n${error}`);
//                         await sock.sendMessage(user.id, {
//                             text: `Gagal mengirim pesan broadcast ke ${nomor}`
//                         }); 
//                     }
//                 });
//             }

//         }
//     });

// }

// connectToWhatsApp();