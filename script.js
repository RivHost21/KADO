// Atur PIN akses di sini (Contoh: 1234)
const CORRECT_PIN = "1234"; 
let currentPin = "";

// Data Konten Foto & Caption Cerita (Babak 1 - 5)
const galleryData = [
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-1
        desc: "setiapp pap yang kamuu kasii mungkinn peyy ga selaluu ngomong cantikk, tapiii..."
    },
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-2
        desc: "walaupunn peyy ga pernahh bilang gituu, kamuu selaluu cantikk tiapp harii"
    },
    {
        img: "https://via.placeholder.com/400x500", // Ganti dengan URL foto ke-3
        desc: "Makasih yaa udah sabar banget nemenin aku terus selama ini 🥰"
    }
];

let currentGalleryIndex = 0;

// Fungsi Navigasi Halaman
function nextScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Logika Input PIN
function pressKey(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
    }
    
    if (currentPin.length === 4) {
        setTimeout(() => {
            if (currentPin === CORRECT_PIN) {
                nextScreen('screen-heart');
            } else {
                alert("Kodenya salah, coba ingat-ingat lagi! 🤫");
                clearKey();
            }
        }, 300);
    }
}

function deleteKey() {
    currentPin = currentPin.slice(0, -1);
    updateDots();
}

function clearKey() {
    currentPin = "";
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.pin-dots .dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

// Logika Navigasi Slide Galeri / Cerita
function nextGallery() {
    currentGalleryIndex++;
    if (currentGalleryIndex < galleryData.length) {
        // Update konten galeri berikutnya
        document.getElementById('babak-title').innerText = `BABAK ${currentGalleryIndex + 1} / ${galleryData.length}`;
        document.getElementById('gallery-img').src = galleryData[currentGalleryIndex].img;
        document.getElementById('gallery-desc').innerText = galleryData[currentGalleryIndex].desc;
    } else {
        // Jika babak foto habis, pindah ke halaman closing
        nextScreen('screen-closing');
    }
}

// Mengulang Aplikasi ke Awal
function resetApp() {
    currentGalleryIndex = 0;
    clearKey();
    // Kembalikan teks galeri ke data pertama
    document.getElementById('babak-title').innerText = `BABAK 1 / ${galleryData.length}`;
    document.getElementById('gallery-img').src = galleryData[0].img;
    document.getElementById('gallery-desc').innerText = galleryData[0].desc;
    nextScreen('screen-lock');
}
