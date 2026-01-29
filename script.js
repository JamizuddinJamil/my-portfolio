const wrapper = document.getElementById('wrapper');
const progress = document.getElementById('progress');
const cursor = document.getElementById('cursor');
const bg = document.getElementById('bg');

let targetX = 0;
let currentX = 0;
const isDesktop = window.innerWidth >= 1024;

// 1. SCROLL & BRIGHTNESS LOGIC
const updateEffects = (percent) => {
    progress.style.width = percent + '%';
    // Brightness range: 0.12 (start) to 0.25 (end)
    const brightness = 0.12 + (percent / 100 * 0.13);
    bg.style.filter = `grayscale(1) brightness(${brightness})`;
};

if (isDesktop) {
    window.addEventListener('wheel', (e) => {
        targetX += e.deltaY * 0.8;
        const max = wrapper.offsetWidth - window.innerWidth;
        targetX = Math.max(0, Math.min(targetX, max));
    });

    function animate() {
        currentX += (targetX - currentX) * 0.08;
        wrapper.style.transform = `translateX(-${currentX}px)`;
        const max = wrapper.offsetWidth - window.innerWidth;
        if(max > 0) updateEffects((currentX / max * 100));
        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
} else {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        updateEffects((winScroll / height * 100));
    });
}

// 2. MOBILE INTERSECTION OBSERVER
if (!isDesktop) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-mobile');
            } else {
                entry.target.classList.remove('active-mobile');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-item').forEach(item => observer.observe(item));
}

// 3. INTERACTIVE ELEMENTS (Desktop Only)
if (isDesktop) {
    const interactives = document.querySelectorAll('.bento-item, button, a, .magnetic');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(6)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
        
        if (el.classList.contains('magnetic')) {
            el.addEventListener('mousemove', (e) => {
                const b = el.getBoundingClientRect();
                const x = e.clientX - b.left - b.width/2;
                const y = e.clientY - b.top - b.height/2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            el.addEventListener('mouseleave', () => el.style.transform = '');
        }
    });
}