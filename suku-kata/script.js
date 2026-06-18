// logika dasar untuk memilih suku kata secara acak dan menampilkan ke html
const sukuKata = [
    ['ba', 'bi', 'bu', 'be', 'bo'],
    ['ca', 'ci', 'cu', 'ce', 'co'],
    ['da', 'di', 'du', 'de', 'do'],
    ['fa', 'fi', 'fu', 'fe', 'fo'],
    ['ga', 'gi', 'gu', 'ge', 'go'],
    ['ha', 'hi', 'hu', 'he', 'ho'],
    ['ja', 'ji', 'ju', 'je', 'jo'],
    ['ka', 'ki', 'ku', 'ke', 'ko'],
    ['la', 'li', 'lu', 'le', 'lo'],
    ['ma', 'mi', 'mu', 'me', 'mo'],
    ['na', 'ni', 'nu', 'ne', 'no'],
    ['pa', 'pi', 'pu', 'pe', 'po'],
    ['ra', 'ri', 'ru', 're', 'ro'],
    ['sa', 'si', 'su', 'se', 'so'],
    ['ta', 'ti', 'tu', 'te', 'to'],
    ['ya', 'yi', 'yu', 'ye', 'yo']
];
const allSukuKata = sukuKata.flat(); // di ubah dulu jadi 1D

function acakKata(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    
    return array;
}

function pilihSukuKata(jumlah){
    const soalSukuKata = [...allSukuKata];
    const soal = acakKata(soalSukuKata);
    return soal.slice(0, jumlah);
}

const pilihanKata = pilihSukuKata(3);

document.getElementById('soal1').innerText = pilihanKata[0];
document.getElementById('soal2').innerText = pilihanKata[1];
document.getElementById('soal3').innerText = pilihanKata[2];

// fungsi buat ganti kata
function ulangKata(){
    location.reload();
}

// Logika nilai dan DOM
let nilai = Number(localStorage.getItem('nilaiSukuKata')) || 0;
const tambahNilai = document.querySelectorAll('.kotak-kata');
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
    localStorage.setItem('nilaiSukuKata', nilai);
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
    utama.style.display = '';
}

// Pengecekan saat halaman pertama kali di-load
if(nilai >= batas){
    peringatan.style.display = 'flex';
    utama.style.display = 'none';
    document.getElementById('nilai').innerText = nilai;
}

function ulangi(){
    localStorage.removeItem('nilaiSukuKata');
    location.reload();
}

function hadiah(){
    window.location.href = '../hadiah.html';
}

function lanjut(){
    window.location.href = 'lanjutan/lanjutan.html';
}