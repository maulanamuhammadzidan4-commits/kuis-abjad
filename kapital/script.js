// 1. Perbaikan: Menambahkan huruf 'N' yang sempat hilang
const huruf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function acakHuruf(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pilih(jumlah){
    const soalHuruf = [...huruf];
    const soal = acakHuruf(soalHuruf);
    return soal.slice(0, jumlah);
}

const pilihan = pilih(3);

document.getElementById('soal1').innerText = pilihan[0];
document.getElementById('soal2').innerText = pilihan[1];
document.getElementById('soal3').innerText = pilihan[2];

function ulangHuruf(){
    location.reload();
}

// Logika nilai dan DOM
let nilai = Number(localStorage.getItem('kNilaiSimpan')) || 0;
const tambahNilai = document.querySelectorAll('.kotak-huruf');
const checkOrtuTua = document.querySelector('.cek');
const utama = document.querySelector('.container');
const batas = 100;
const peringatan = document.querySelector('.alert');

// Fungsi tuk memperbarui Progress Bar & Angka Nilai secara real-time
function updateUI() {
    document.getElementById('rNilai').innerText = nilai;
    const isiBar = document.getElementById('bar-isi');
    const persentase = Math.min((nilai / batas) * 100, 100);
    document.getElementById('persentase').innerText = `${persentase}%`;
    isiBar.style.width = persentase + '%';
}

// Jalankan UI update di awal data dimuat
updateUI();

tambahNilai.forEach((kotak) => {
    kotak.addEventListener('click', () => {
        setTimeout(() => {
            checkOrtuTua.style.display = 'flex';
            utama.style.display = 'none';
        }, 300);
    });
});

function benar(){
    nilai += 10;
    localStorage.setItem('kNilaiSimpan', nilai);
    updateUI(); // Update UI segera setelah nilai bertambah

    checkOrtuTua.style.display = 'none';
    
    // Cek apakah setelah ditambah, nilainya mencapai atau melebihi batas
    if(nilai >= batas){
        peringatan.style.display = 'flex';
        utama.style.display = 'none';
        document.getElementById('nilai').innerText = nilai;
    } else {
        utama.style.display = '';
        setTimeout(() => {
            location.reload();
        }, 300);
    }
}

function salah(){
    checkOrtuTua.style.display = 'none';
    // Jika salah, nilai tidak bertambah, langsung cek apakah game sudah harus berakhir karena nilai sebelumnya sudah penuh
    if(nilai >= batas) {
        peringatan.style.display = 'flex';
        utama.style.display = 'none';
    } else {
        utama.style.display = '';
    }
}

// Pengecekan saat halaman pertama kali di-load
if(nilai >= batas){
    peringatan.style.display = 'flex';
    utama.style.display = 'none';
    document.getElementById('nilai').innerText = nilai;
}

function ulangi(){
    localStorage.removeItem('kNilaiSimpan');
    location.reload();
}

function hadiah(){
    window.location.href = '../hadiah.html';
}