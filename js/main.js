// Parallax Effect for Sustainability Section
const parallaxBg = document.querySelector('.sustainability .parallax-bg');
let lastScrollY = window.pageYOffset;

function handleParallax() {
    if (parallaxBg) {
        const scrolled = window.pageYOffset;
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        parallaxBg.style.transform = `translateY(${yPos}px)`;
        lastScrollY = scrolled;
    }
}

// Add passive scroll listener for better performance
window.addEventListener('scroll', handleParallax, { passive: true });

// Initialize Swiper if it exists on the page
if (document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000, // Transition duration
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },

        // Events
        on: {
            init: function () {
                this.el.classList.add('initialized');
            },
            slideChangeTransitionStart: function () {
                const activeSlide = this.slides[this.activeIndex];
                activeSlide.querySelector('.slide-image').style.transform = 'scale(1.1)';
            },
            slideChangeTransitionEnd: function () {
                const activeSlide = this.slides[this.activeIndex];
                activeSlide.querySelector('.slide-image').style.transform = 'scale(1)';
            }
        }
    });
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
let menuTouchStartX = 0;
let menuTouchEndX = 0;
const MENU_SWIPE_THRESHOLD = 50;

if (mobileMenu && navLinks && navOverlay) {
    function toggleMenu(show) {
        mobileMenu.classList.toggle('active', show);
        navLinks.classList.toggle('active', show);
        navOverlay.classList.toggle('active', show);
        document.body.classList.toggle('menu-open', show);
        mobileMenu.setAttribute('aria-expanded', show);
    }

    mobileMenu.addEventListener('click', () => {
        const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
        toggleMenu(!isExpanded);
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => toggleMenu(false));

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Touch events for swipe to close
    navLinks.addEventListener('touchstart', (e) => {
        menuTouchStartX = e.touches[0].clientX;
    }, { passive: true });

    navLinks.addEventListener('touchmove', (e) => {
        if (navLinks.classList.contains('active')) {
            const currentX = e.touches[0].clientX;
            const diff = currentX - menuTouchStartX;
            if (diff > 0) {
                e.preventDefault();
                navLinks.style.transform = `translateX(${diff}px)`;
            }
        }
    });

    navLinks.addEventListener('touchend', (e) => {
        menuTouchEndX = e.changedTouches[0].clientX;
        const swipeDistance = menuTouchEndX - menuTouchStartX;
        
        if (swipeDistance > MENU_SWIPE_THRESHOLD) {
            toggleMenu(false);
        }
        navLinks.style.transform = '';
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}

// Gallery and Modal Functionality with Touch Support
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.querySelector('.close-modal');
const newtownMeadowsCard = document.getElementById('newtown-meadows-card');
const modalThumbnails = document.querySelector('.modal-thumbnails');
const prevButton = document.querySelector('.modal-nav.prev');
const nextButton = document.querySelector('.modal-nav.next');

// Gallery Touch variables
let galleryTouchStartX = 0;
let galleryTouchEndX = 0;
const GALLERY_SWIPE_THRESHOLD = 50;

// Gallery images array
const galleryImages = [
    {
        src: 'images/Newtown/Newtown01.JPG',
        alt: 'Newtown Meadows View 1'
    },
    {
        src: 'images/Newtown/Newtown02.JPG',
        alt: 'Newtown Meadows View 2'
    },
    {
        src: 'images/Newtown/Newtown03.JPG',
        alt: 'Newtown Meadows View 3'
    },
    {
        src: 'images/Newtown/Newtown04.JPG',
        alt: 'Newtown Meadows View 4'
    },
    {
        src: 'images/Newtown/Newtown05.JPG',
        alt: 'Newtown Meadows View 5'
    },
    {
        src: 'images/Newtown/Newtown06.JPG',
        alt: 'Newtown Meadows View 6'
    },
    {
        src: 'images/Newtown/Newtown07.JPG',
        alt: 'Newtown Meadows View 7'
    },
    {
        src: 'images/Newtown/Newtown08.JPG',
        alt: 'Newtown Meadows View 8'
    },
    {
        src: 'images/Newtown/Newtown09.JPG',
        alt: 'Newtown Meadows View 9'
    }
];

let currentImageIndex = 0;

if (newtownMeadowsCard && imageModal && modalImage) {
    // Create modal thumbnails
    galleryImages.forEach((image, index) => {
        const thumb = document.createElement('img');
        thumb.src = image.src;
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.dataset.index = index;
        modalThumbnails.appendChild(thumb);

        thumb.addEventListener('click', () => {
            setActiveImage(index);
        });
    });

    // Function to update active image
    function setActiveImage(index) {
        currentImageIndex = index;
        modalImage.src = galleryImages[index].src;
        modalImage.alt = galleryImages[index].alt;
        
        // Update thumbnails
        modalThumbnails.querySelectorAll('img').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Navigation functions
    function showNextImage() {
        const nextIndex = (currentImageIndex + 1) % galleryImages.length;
        setActiveImage(nextIndex);
    }

    function showPrevImage() {
        const prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        setActiveImage(prevIndex);
    }

    // Modal functions with transitions
    function openModal() {
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            imageModal.style.opacity = '1';
            modalImage.style.transform = 'scale(1)';
        });
    }

    function closeModal() {
        imageModal.style.opacity = '0';
        modalImage.style.transform = 'scale(0.95)';
        document.body.style.overflow = '';
        setTimeout(() => {
            imageModal.style.display = 'none';
        }, 300);
    }

    // Event Listeners
    newtownMeadowsCard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('interest-button')) {
            setActiveImage(0);
            openModal();
        }
    });

    closeModalBtn.addEventListener('click', () => closeModal());

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (imageModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });

    // Navigation buttons
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Touch event handlers
    modalImage.addEventListener('touchstart', (e) => {
        galleryTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modalImage.addEventListener('touchend', (e) => {
        galleryTouchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = galleryTouchEndX - galleryTouchStartX;
        
        if (Math.abs(swipeDistance) > GALLERY_SWIPE_THRESHOLD) {
            if (swipeDistance > 0) {
                // Swipe right
                showPrevImage();
            } else {
                // Swipe left
                showNextImage();
            }
        }
    }
}

// Job Listings Mobile Functionality
function initJobListings() {
    const jobListings = document.querySelectorAll('.job-listing');
    jobListings.forEach(listing => {
        const title = listing.querySelector('h3');
        title.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                listing.classList.toggle('expanded');
            }
        });
    });
}

// Initialize job listings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initJobListings();
});

// Form Submissions
function handleFormSubmission(form, successMessage, onSuccess = () => {}) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert(successMessage);
        form.reset();
        onSuccess();
    });
}

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    handleFormSubmission(contactForm, 'Thank you for your message. We will get back to you soon!');
}

// Application Modal
const applicationModal = document.getElementById('application-modal');
const applicationForm = document.getElementById('application-form');
const closeApplicationModalBtn = applicationModal?.querySelector('.close-modal');
const jobTitleSpan = applicationModal?.querySelector('.job-title');

function showApplicationModal(jobTitle, position) {
    if (!applicationModal || !applicationForm) return;
    
    // Set job details
    jobTitleSpan.textContent = jobTitle;
    applicationForm.querySelector('#position').value = position;
    
    // Show modal
    applicationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeApplicationModal() {
    if (!applicationModal) return;
    
    applicationModal.classList.remove('active');
    document.body.style.overflow = '';
    if (applicationForm) applicationForm.reset();
}

// Initialize Application Form
if (applicationForm && applicationModal) {
    // Handle form submission
    handleFormSubmission(
        applicationForm,
        'Thank you for your application. Our team will review it and contact you shortly.',
        closeApplicationModal
    );

    // Handle Apply Now buttons
    document.querySelectorAll('.apply-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent job listing expansion on mobile
            const jobListing = button.closest('.job-listing');
            const jobTitle = jobListing.querySelector('h3').textContent;
            const position = button.dataset.position;
            showApplicationModal(jobTitle, position);
        });
    });

    // Handle file upload UI
    const fileInput = applicationForm.querySelector('input[type="file"]');
    const fileUpload = applicationForm.querySelector('.file-upload');
    const fileUploadText = fileUpload.querySelector('.file-upload-text');

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileUploadText.innerHTML = `
                <strong>${file.name}</strong>
                <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            `;
            fileUpload.style.borderColor = 'var(--primary-color)';
            fileUpload.style.background = 'white';
        } else {
            fileUploadText.innerHTML = `
                <strong>Choose a file</strong>
                <span>or drag and drop here</span>
            `;
            fileUpload.style.borderColor = '#ddd';
            fileUpload.style.background = '#f8f9fa';
        }
    });

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
            fileUpload.style.borderColor = 'var(--primary-color)';
            fileUpload.style.background = 'white';
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileUpload.addEventListener(eventName, () => {
            fileUpload.style.borderColor = '#ddd';
            fileUpload.style.background = '#f8f9fa';
        });
    });

    fileUpload.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            fileInput.files = e.dataTransfer.files;
            fileUploadText.innerHTML = `
                <strong>${file.name}</strong>
                <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            `;
            fileUpload.style.borderColor = 'var(--primary-color)';
        }
    });

    // Close modal button
    closeApplicationModalBtn?.addEventListener('click', closeApplicationModal);

    // Close on background click
    applicationModal.addEventListener('click', (e) => {
        if (e.target === applicationModal) {
            closeApplicationModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && applicationModal.classList.contains('active')) {
            closeApplicationModal();
        }
    });
}

// Smooth scrolling for in-page navigation links
document.querySelectorAll('a[href^="#"]:not([href*=".html"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle pure anchor links (not page links with anchors)
        if (href.startsWith('#') && href.indexOf('.html') === -1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target && window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks) {
                    mobileMenu.classList.remove('active');
                    navLinks.classList.remove('active');
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});
