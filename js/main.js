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
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Modal Functionality
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');
const newtownMeadowsCard = document.getElementById('newtown-meadows-card');
const previewImage = document.querySelector('#newtown-meadows-card .preview-image');

if (newtownMeadowsCard && imageModal && modalImage && previewImage) {
    // Open modal when clicking the Newtown Meadows card
    newtownMeadowsCard.addEventListener('click', (e) => {
        // Don't open modal if clicking the interest button
        if (!e.target.classList.contains('interest-button')) {
            modalImage.src = previewImage.src;
            modalImage.alt = previewImage.alt;
            imageModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside the image
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal.style.display === 'flex') {
            imageModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks) {
                navLinks.style.display = 'none';
            }
        }
    });
});
