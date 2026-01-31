const wrapper = document.getElementById('wrapper');
const progress = document.getElementById('progress');
const cursor = document.getElementById('cursor');
const bg = document.getElementById('bg');

let targetX = 0;
let currentX = 0;
const isDesktop = window.innerWidth >= 1024;

// 1. SCROLL & BRIGHTNESS LOGIC
const updateEffects = (percent) => {
    if (!progress || !bg) return;
    progress.style.width = percent + '%';
    // Brightness range: 0.12 (start) hingga 0.25 (end)
    const brightness = 0.12 + (percent / 100 * 0.13);
    bg.style.filter = `grayscale(1) brightness(${brightness})`;
};

// Fungsi untuk kira had scroll (dikira selepas semua content load)
const getMaxScroll = () => wrapper.offsetWidth - window.innerWidth;

if (isDesktop) {
    // Tunggu semua gambar load baru aktifkan scroll horizontal
    window.addEventListener('load', () => {
        window.addEventListener('wheel', (e) => {
            targetX += e.deltaY * 0.8;
            const max = getMaxScroll();
            targetX = Math.max(0, Math.min(targetX, max));
        });

        function animate() {
            currentX += (targetX - currentX) * 0.08; // Lerp effect
            wrapper.style.transform = `translateX(-${currentX}px)`;
            
            const max = getMaxScroll();
            if (max > 0) {
                updateEffects((currentX / max * 100));
            }
            requestAnimationFrame(animate);
        }
        animate();
    });

    // Cursor Follower
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
} else {
    // Mobile Scroll Logic
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        updateEffects((winScroll / height * 100));
    });
}

// 2. MOBILE INTERSECTION OBSERVER
// Kita tambah sekali untuk 'about-image-container' supaya gambar about pun ada efek
if (!isDesktop) {
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-mobile');
            } else {
                entry.target.classList.remove('active-mobile');
            }
        });
    }, observerOptions);

    // Observe bento items dan gambar about
    document.querySelectorAll('.bento-item, .about-image-container').forEach(item => {
        observer.observe(item);
    });
}

// 3. INTERACTIVE ELEMENTS (Desktop Only)
if (isDesktop && cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactives = document.querySelectorAll('.bento-item, button, a, .magnetic, .about-image-container');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(6)';
            cursor.style.background = 'rgba(255,255,255,0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent)';
        });
    });
}