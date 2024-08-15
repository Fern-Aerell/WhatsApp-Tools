/**
 * ! NOTE : Script ini berbahaya, jika tidak hati hati ketika menggunakannya
 */

import WhatsAppTools from "../../core/WhatsAppTools";
import path from 'path';
import wait from "../../utils/wait";
import capitalizeWords from "../../utils/capitalizeWords";
import { formatWhatsAppId } from "../../utils/formatWhatsAppId";

export async function run(this: WhatsAppTools, args: string[]) {

    const namaKita = 'Aerell';
    const delay = 30000;

    const datas = [
        { nama: "nama orang nya", nomor: "nomor orang nya" }
    ];

    const pesan01 = (namaOrang: string) => `Assalamualaikum..
Selamat sore ${namaOrang}
Perkenalkan saya ${namaKita}
Dari tim PMB, Penerimaan Mahasiswa Baru Unilak tahun 2024.

Jadi saya mendapatkan kontak WhatsAppnya ini dari tim data base Unilak, untuk memberikan info penting seputar perkuliahan khususnya di Unilak☺️

Untuk itu apakah kak ${namaOrang.split(' ')[0]}
Sudah ada rencana lanjut kuliah atau rencana kuliah diunilak ?

Saya izin mempromosikan Universitas Lancang Kuning ya kak ${namaOrang.split(' ')[0]}

Yang pertama, Diunilak saat ini sedang ada promo dan potongan harga sebesar 500.000 rupiah, dengan rincian biaya masuk yang sangat terjangkau dibanding kampus-kampus lain.
Jadi kalau kuliah diunilak itu pasti bisa jauh lebih HEMAT loh..

Yang kedua, Diunilak juga tersedia berbagai jurusan unggulan yang dibutuhkan oleh para calon mahasiswa saat ini.
Tersedia 8 fakultas dengan berbagai jurusan unggulan.
Jadi gak perlu khawatir pilih jurusan yang diinginkan.

Yang ketiga Di Unilak juga ada program RPL, sederhana nya ini adalah program kuliah singkat, hanya 2 tahun, dan bisa sambil kerja, ini sangat diunggulkan dari Unilak untuk orang-orang yang ingin kuliah S1, sambil bekerja dengan waktu yang singkat, tentunya kampus yang berkualitas dan harga terjangkau 

Yang keempat, Diunilak juga memiliki fasilitas dan infrastruktur yang sangat baik dengan lingkungan hijau yang asri.
Jadi dengan fasilitas yang lengkap akan memudahkan kita dalam proses perkuliahan dan lingkungan asri yang membuat mahasiswa nyaman untuk kuliah 

Jadi kalau mau kuliah, dengan fasilitas yang bagus, berkualitas, dan harga yang sangat terjangkau, maka unilak adalah pilihan yang tepat..

Jika kak ${namaOrang.split(' ')[0]} tertarik bisa hubungi saya kembali. Berikut akan saya kirimkan juga brosur biaya kuliah di Unilak☺️

Terima kasih 
Wassalamu'alaikum warahmatullahi wabarokatu`;

    const gambarBrosur1 = path.join(__dirname, './broadcast_unilak/brosur1.jpeg');
    const gambarBrosur2 = path.join(__dirname, './broadcast_unilak/brosur2.jpeg');
    
    const videoRpl = path.join(__dirname, './broadcast_unilak/video_rpl.mp4');
    const pesan02 = `Ingin menyelesaikan kuliah lebih cepat? 

Dengan program RPL kamu bisa meraih gelar sarjana dalam tempo 2 tahun❗️

‼️Dapatkan pendidikan berkualitas dengan jadwal yang fleksibel dan dukungan penuh dari pengajar berpengalaman‼️

Segera daftarkan diri mu dan capai tujuan akademis mu dalam waktu yang lebih singkat.

HEMAT WAKTU❗️
HEMAT BIAYA❗️
CEPAT TAMAT❗️`

    console.log('Memulai broadcast...');
    let i = 1;
    for(const data of datas) {
        
        const broadcastDataCounter = `(${i}/${datas.length})`;

        process.stdout.write(`${broadcastDataCounter} | ${data.nomor} sedang broadcasting...\r`);

        const nomorWa = formatWhatsAppId(data.nomor, 'ID');

        await this.sendTextTo(nomorWa, pesan01(capitalizeWords(data.nama)));
        await this.sendImageTo(nomorWa, gambarBrosur1);
        await this.sendImageTo(nomorWa, gambarBrosur2);
        await this.sendVideoWithCaptionTo(nomorWa, videoRpl, pesan02);

        console.log(`${broadcastDataCounter} | ${data.nomor} broadcasting selesai... \n selanjutnya dalam ${delay} miliseconds...\r`);

        await wait(delay);

        i++;
    }
    console.log('Broadcast selesai...');

}