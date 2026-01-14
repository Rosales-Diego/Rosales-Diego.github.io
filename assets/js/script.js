// --- 1. TYPEWRITER EFFECT (TERMINAL) ---
const titleText = "DIEGO ROSALES";
const titleElement = document.getElementById('hero-title');
let charIndex = 0;
let typeTimeout; // Variable para controlar el timeout y poder limpiarlo

function typeWriter() {
    if (charIndex < titleText.length) {
        titleElement.innerHTML += titleText.charAt(charIndex);
        // Actualizamos data-text para que el glitch CSS funcione a medida que se escribe
        titleElement.setAttribute('data-text', titleElement.innerHTML);
        charIndex++;
        typeTimeout = setTimeout(typeWriter, 100); // Velocidad de escritura
    }
}

// Nueva función para reiniciar y comenzar la escritura
function resetAndStartTypeWriter() {
    clearTimeout(typeTimeout); // Detener cualquier escritura en curso
    titleElement.innerHTML = ""; // Limpiar texto
    titleElement.setAttribute('data-text', "");
    charIndex = 0; // Reiniciar índice
    typeWriter(); // Comenzar de nuevo
}

// --- 2. MATRIX RAIN WITH HOVER INTERACTION ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// CARACTERES CLÁSICOS DE MATRIX
const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let isMouseActive = false;
let mouseTimer;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseActive = true;

    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => { isMouseActive = false; }, 2000);
});

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

function draw() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        let color = '#00FF41';
        let shadow = 0;

        if (isMouseActive) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                color = '#FFFFFF';
                shadow = 15;
            }
        }

        if (!isMouseActive && Math.random() > 0.99) color = '#FFF';

        ctx.fillStyle = color;

        if (shadow > 0) {
            ctx.shadowBlur = shadow;
            ctx.shadowColor = '#FFFFFF';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);
        ctx.shadowBlur = 0;

        if (y > height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(draw, 40);

// --- 3. SCROLL ANIMATION (Bidirectional & Typewriter Trigger) ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const isVisible = entry.isIntersecting;
        entry.target.classList.toggle('visible', isVisible);

        // Si la sección es "home" y se vuelve visible, reiniciar efecto de escritura
        if (entry.target.id === 'home' && isVisible) {
            resetAndStartTypeWriter();
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// --- 4. LANGUAGE SWITCHER LOGIC ---
const content = {
    es: {
        navHome: "Inicio",
        navAbout: "Perfil",
        navStack: "Stack",
        navContact: "Contacto",
        heroSub: "Sistema Online",
        heroTitle: "DIEGO ROSALES",
        heroDesc: "Ingeniero de Software. Arquitecto. Constructor.",
        btnExplore: "Explorar Sistema",
        aboutTitle: "Perfil de Usuario",
        aboutText1: "Graduado de la <strong>UNLP</strong> y actualmente cursando una <strong>Maestría en Big Data</strong>. Además de escribir código, diseño arquitecturas modulares, sistemas escalables y aplicaciones basadas en datos.",
        aboutText2: "Disfruto conectar un diseño sólido de backend con experiencias web limpias y modernas. Tengo experiencia en diversos proyectos web trabajando por mi cuenta y también junto a otros desarrolladores.",
        aboutText3: "Dedicado a compartir conocimiento como <strong>Educador en Ciencias de la Computación</strong> (Python, Java). También con experiencia en IA, entrenando modelos vía <strong>RLHF</strong>.",
        stackTitle: "Arsenal Tecnológico",
        contactTitle: "Inicializar Protocolo",
        contactDesc: "¿Listo para construir el futuro? Revisa mi código fuente.",
        btnGithub: "GitHub",
        btnLinkedin: "LinkedIn",
        btnEmail: "Enviar Email",
        btnCV: "Descargar CV"
    },
    en: {
        navHome: "Home",
        navAbout: "About",
        navStack: "Stack",
        navContact: "Contact",
        heroSub: "System Online",
        heroTitle: "DIEGO ROSALES",
        heroDesc: "Software Engineer. Architect. Builder.",
        btnExplore: "Explore System",
        aboutTitle: "User Profile",
        aboutText1: "Graduate of <strong>UNLP</strong> and currently pursuing a <strong>Master's in Big Data</strong>. Besides writing code, I design modular architectures, scalable systems, and data-driven applications.",
        aboutText2: "I enjoy connecting solid backend design with clean and modern web experiences. I have experience in diverse web projects working on my own and also along side other fellow developers.",
        aboutText3: "Dedicated to knowledge sharing as a <strong>Computer Science Educator</strong> (Python, Java). Also experienced in AI, training models via <strong>RLHF</strong>.",
        stackTitle: "Tech Arsenal",
        contactTitle: "Initialize Protocol",
        contactDesc: "Ready to build the future? Check my source code.",
        btnGithub: "GitHub",
        btnLinkedin: "LinkedIn",
        btnEmail: "Send Email",
        btnCV: "Download CV"
    }
};

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';

    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (content[currentLang][key]) {
            elem.innerHTML = content[currentLang][key];

            if (elem.tagName === 'H1') {
                elem.setAttribute('data-text', content[currentLang][key]);
            }
        }
    });

    const enOpt = document.getElementById('lang-en');
    const esOpt = document.getElementById('lang-es');

    if (currentLang === 'en') {
        enOpt.classList.add('active');
        esOpt.classList.remove('active');
    } else {
        esOpt.classList.add('active');
        enOpt.classList.remove('active');
    }

    // Update CV Link
    const cvBtn = document.getElementById('btn-cv');
    if (cvBtn) {
        cvBtn.href = currentLang === 'es'
            ? 'assets/pdf/Diego_Rosales_CV_ES.pdf'
            : 'assets/pdf/Diego_Rosales_CV_EN.pdf';
    }
}

// --- 5. NAVBAR LOGIC ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Toggle Mobile Menu
mobileBtn.addEventListener('click', () => {
    mobileBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close Mobile Menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active Link on Scroll
window.addEventListener('scroll', () => {
    let currentSection = '';
    const sections = document.querySelectorAll('section');

    // Offset for fixed navbar
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - navHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});
