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

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// Gallery and Modal Functionality
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');
const newtownMeadowsCard = document.getElementById('newtown-meadows-card');
const modalThumbnails = document.querySelector('.modal-thumbnails');
const prevButton = document.querySelector('.modal-nav.prev');
const nextButton = document.querySelector('.modal-nav.next');

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

    // Event Listeners
    newtownMeadowsCard.addEventListener('click', (e) => {
        if (!e.target.classList.contains('interest-button')) {
            setActiveImage(0);
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (imageModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                imageModal.style.display = 'none';
                document.body.style.overflow = '';
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
}

// Form Submissions
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
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
