// Data for Branches
const branchesData = {
    branch1: {
        name: "سوق المشير بجانب جامع الناقة",
        phone: "0915031564",
        whatsapp: "0915031564",
        mapUrl: "https://maps.app.goo.gl/epNJJA5tmaey8QmD9?g_st=afm",
        images: [
            "images/branch1/one.jpg",
            "images/branch1/two.jpg",
            "images/branch1/three.jpg"
        ]
    },
    branch2: {
        name: "سوق المشير شارع شايب العين",
        phone: "0913112467",
        whatsapp: "0913112467",
        mapUrl: "https://maps.app.goo.gl/PUMCdu4JG9ZPig4v6?g_st=afm",
        images: [
            "images/branch2/one.jpg",
            "images/branch2/two.jpg",
            "images/branch2/three.jpg"
        ]
    },
    branch3: {
        name: "شارع المعري بجانب ملاهي طرابلس الدولية",
        phone: "0946494812",
        whatsapp: "0946494812",
        mapUrl: "https://maps.app.goo.gl/cLRwW2VQyS168usk6?g_st=afm",
        images: [
            "images/branch3/one.jpg",
            "images/branch3/two.jpg",
            "images/branch3/three.jpg"
        ]
    }
};

// DOM Elements
const branchContent = document.getElementById('branch-content');
const tabBtns = document.querySelectorAll('.tab-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Function to render branch content
function renderBranch(branchKey) {
    const branch = branchesData[branchKey];
    
    branchContent.innerHTML = `
        <div class="branch-details">
            <div class="branch-info">
                <h3>${branch.name}</h3>
                <p>تفضل بزيارتنا في فرعنا المتميز حيث نقدم لك أفضل الخدمات بأعلى معايير الجودة. نحن هنا لخدمتك دائماً.</p>
                
                <div class="contact-actions">
                    <a href="tel:${branch.phone}" class="action-btn btn-call">
                        <i class="fas fa-phone-alt"></i> إتصال مباشر
                    </a>
                    <a href="https://wa.me/${branch.whatsapp}" target="_blank" class="action-btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> واتساب
                    </a>
                    <a href="${branch.mapUrl}" target="_blank" class="action-btn btn-map">
                        <i class="fas fa-map-marker-alt"></i> الموقع على الخريطة
                    </a>
                </div>
            </div>
            
            <div class="branch-gallery">
                <div class="slider-container">
                    <div class="slider" id="slider">
                        ${branch.images.map(img => `
                            <div class="slide">
                                <img src="${img}" alt="${branch.name}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="slider-nav">
                        <button id="prevBtn"><i class="fas fa-chevron-right"></i></button>
                        <button id="nextBtn"><i class="fas fa-chevron-left"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Slider for the new content
    initSlider();
}

// Slider Logic
function initSlider() {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let counter = 0;

    function updateSlider() {
        const size = slides[0].clientWidth;
        slider.style.transform = 'translateX(' + (size * counter) + 'px)';
    }

    nextBtn.addEventListener('click', () => {
        if (counter >= slides.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (counter <= 0) {
            counter = slides.length - 1;
        } else {
            counter--;
        }
        updateSlider();
    });

    // Handle window resize to keep slider position correct
    window.addEventListener('resize', updateSlider);
}

// Tab Switching Logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Render the selected branch
        const branchKey = btn.getAttribute('data-branch');
        renderBranch(branchKey);
    });
});

// Initial Render (First Branch)
window.addEventListener('DOMContentLoaded', () => {
    renderBranch('branch1');
});
