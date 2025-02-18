// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Form Submissions
const contactForm = document.getElementById('contact-form');
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

// Interest Registration
const interestButtons = document.querySelectorAll('.interest-button');
interestButtons.forEach(button => {
    button.addEventListener('click', () => {
        const development = button.dataset.development;
        
        // Create and show modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Register Interest</h3>
                <p>Please complete the form below to register your interest in ${development.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}.</p>
                <form id="interest-form" class="interest-form">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Additional Information</label>
                        <textarea id="message" name="message"></textarea>
                    </div>
                    <button type="submit" class="submit-button">Submit Interest</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1001;
            }
            
            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .close-modal {
                float: right;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .interest-form {
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Handle interest form submission
        const interestForm = document.getElementById('interest-form');
        interestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(interestForm);
            const data = {
                ...Object.fromEntries(formData),
                development
            };
            
            // Here you would typically send the data to a server
            console.log('Interest registered:', data);
            
            // Show success message and close modal
            alert('Thank you for your interest. Our team will contact you shortly!');
            modal.remove();
        });
    });
});

// Career Application
const applyButton = document.querySelector('.apply-button');
applyButton.addEventListener('click', () => {
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Apply for Senior Quantity Surveyor Position</h3>
            <form id="career-form" class="career-form">
                <div class="form-group">
                    <label for="name">Full Name *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-group">
                    <label for="experience">Years of Experience *</label>
                    <input type="number" id="experience" name="experience" min="0" required>
                </div>
                <div class="form-group">
                    <label for="qualifications">Professional Qualifications *</label>
                    <textarea id="qualifications" name="qualifications" required></textarea>
                </div>
                <div class="form-group">
                    <label for="cv">Upload CV (PDF) *</label>
                    <input type="file" id="cv" name="cv" accept=".pdf" required>
                </div>
                <div class="form-group">
                    <label for="cover-letter">Cover Letter</label>
                    <textarea id="cover-letter" name="cover-letter"></textarea>
                </div>
                <button type="submit" class="submit-button">Submit Application</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Handle career form submission
    const careerForm = document.getElementById('career-form');
    careerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the data to a server
        console.log('Application submitted');
        
        // Show success message and close modal
        alert('Thank you for your application. We will review your details and get back to you soon!');
        modal.remove();
    });
});

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
            navLinks.style.display = 'none';
        }
    });
});
