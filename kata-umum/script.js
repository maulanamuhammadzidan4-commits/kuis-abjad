const kataSehariHari = [
    'saya', 'kamu', 'kita', 'mereka', 'ada', 'mau', 'bisa', 'sudah',
    'belum', 'tolong', 'makan', 'minum', 'tidur', 'mandi', 'masak',
    'pergi', 'pulang', 'datang', 'main', 'baca', 'tulis', 'lihat',
    'dengar', 'rumah', 'sekolah', 'buku', 'meja', 'kursi', 'pintu',
    'jendela', 'jalan', 'taman', 'pasar', 'teman', 'keluarga', 'ibu',
    'ayah', 'adik', 'kakak', 'anak', 'orang', 'hari', 'pagi', 'siang',
    'malam', 'air', 'nasi', 'susu', 'roti', 'buah', 'besar', 'kecil',
    'bagus', 'baru', 'lama', 'satu', 'dua', 'tiga', 'mana', 'siapa',
    'apa', 'ini', 'itu', 'sini', 'sana'
];

function acakKata(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function pilihKata(jumlah) {
    return acakKata([...kataSehariHari]).slice(0, jumlah);
}

const pilihanKata = pilihKata(3);

pilihanKata.forEach((kata, index) => {
    document.getElementById(`soal${index + 1}`).innerText = kata;
});

function ulangKata() {
    location.reload();
}

let nilai = Number(localStorage.getItem('nilaiKataUmum')) || 0;
const tambahNilai = document.querySelectorAll('.kotak-kata');
const checkOrtuTua = document.querySelector('.cek');
const utama = document.querySelector('.container');
const batas = 100;
const peringatan = document.querySelector('.alert');

function updateUI() {
    document.getElementById('rNilai').innerText = nilai;
    const isiBar = document.getElementById('bar-isi');
    const persentase = Math.min((nilai / batas) * 100, 100);
    document.getElementById('persentase').innerText = `${persentase}%`;
    isiBar.style.width = persentase + '%';
}

updateUI();

tambahNilai.forEach((kotak) => {
    kotak.addEventListener('click', () => {
        setTimeout(() => {
            checkOrtuTua.style.display = 'flex';
            utama.style.display = 'none';
        }, 300);
    });
});

function benar() {
    nilai += 10;
    localStorage.setItem('nilaiKataUmum', nilai);
    updateUI();
    checkOrtuTua.style.display = 'none';

    if (nilai >= batas) {
        peringatan.style.display = 'flex';
        utama.style.display = 'none';
        document.getElementById('nilai').innerText = nilai;
    } else {
        utama.style.display = '';
        setTimeout(() => location.reload(), 300);
    }
}

function salah() {
    checkOrtuTua.style.display = 'none';
    utama.style.display = '';
}

if (nilai >= batas) {
    peringatan.style.display = 'flex';
    utama.style.display = 'none';
    document.getElementById('nilai').innerText = nilai;
}

function ulangi() {
    localStorage.removeItem('nilaiKataUmum');
    location.reload();
}

function hadiah() {
    window.location.href = '../hadiah.html';
}