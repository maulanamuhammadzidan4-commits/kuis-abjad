// -----soal lanjutan-----
const mentahanSukuKata = [
    ['ba', 'bi', 'bu', 'be', 'bo'],
    ['ca', 'ci', 'cu', 'ce', 'co'],
    ['da', 'di', 'du', 'de', 'do'],
    ['fa', 'fi', 'fu', 'fe', 'fo'],
    ['ga', 'gi', 'gu', 'ge', 'go'],
    ['ha', 'hi', 'hu', 'he', 'ho']
];

const allSoal = mentahanSukuKata.flat()

// -----logika pemilihan kata-----
function acakKata(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    
    return array;
}

function pilihKata(jumlah, soal){
    const semuaSoal = [...soal];
    const pilihanSoal = acakKata(semuaSoal);
    return pilihanSoal.slice(0, jumlah);
}

const sukuK1 = pilihKata(3, allSoal);
const sukuK2 = pilihKata(3, allSoal);

// -----menampilkan hasil pilihan kata-----
document.getElementById('soal1').innerHTML = `<span class="suku1">${sukuK1[0]}</span><span class="suku2">${sukuK2[0]}</span>`;
document.getElementById('soal2').innerHTML = `<span class="suku1">${sukuK1[1]}</span><span class="suku2">${sukuK2[1]}</span>`;
document.getElementById('soal3').innerHTML = `<span class="suku1">${sukuK1[2]}</span><span class="suku2">${sukuK2[2]}</span>`;

// -----logika nilai-----
// deklarasi variabel
let nilai = Number(localStorage.getItem('nilaiSukuKata2')) || 0;
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

// -----fungsi pembantu-----
function ulangKata(){
    location.reload();
}
function benar(){
    nilai += 10;
    localStorage.setItem('nilaiSukuKata2', nilai);
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
}

// Pengecekan saat halaman pertama kali di-load
if(nilai >= batas){
    peringatan.style.display = 'flex';
    utama.style.display = 'none';
    document.getElementById('nilai').innerText = nilai;
}

function ulangi(){
    localStorage.removeItem('nilaiSukuKata2');
    location.reload();
}

function hadiah(){
    window.location.href = '../../hadiah.html';
}