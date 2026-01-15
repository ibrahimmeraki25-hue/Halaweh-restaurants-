// Global variables
let currentLanguage = 'ar';
let currentTheme = 'light';

// DOM Elements
const languageToggle = document.getElementById('language-toggle');
const footerLanguageToggle = document.getElementById('footer-language-toggle');
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const bookNowBtn = document.getElementById('book-now-btn');
const ctaBookBtn = document.getElementById('cta-book-btn');
const reservationForm = document.getElementById('reservation-form');
const bookingForm = document.getElementById('booking-form');
const cancelBooking = document.getElementById('cancel-booking');
const confirmationModal = document.getElementById('confirmation-modal');
const modalClose = document.querySelector('.modal-close');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setDateRestrictions();
});

// Initialize application settings
function initializeApp() {
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('halawa-language');
    const savedTheme = localStorage.getItem('halawa-theme');

    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }

    if (savedTheme) {
        currentTheme = savedTheme;
    }

    // Apply initial settings
    applyLanguage(currentLanguage);
    applyTheme(currentTheme);
    updateToggleButtons();

    // Initialize logo based on current language
    updateLogoText(currentLanguage);
}

// Setup all event listeners
function setupEventListeners() {
    // Language toggle buttons
    languageToggle.addEventListener('click', toggleLanguage);
    footerLanguageToggle.addEventListener('click', toggleLanguage);

    // Theme toggle buttons
    themeToggle.addEventListener('click', toggleTheme);
    footerThemeToggle.addEventListener('click', toggleTheme);

    // Book now buttons
    bookNowBtn.addEventListener('click', showReservationForm);
    ctaBookBtn.addEventListener('click', showReservationForm);

    // Form interactions
    cancelBooking.addEventListener('click', hideReservationForm);
    bookingForm.addEventListener('submit', handleFormSubmission);

    // Confirmation section interactions
    document.getElementById('new-reservation-btn').addEventListener('click', function() {
        hideConfirmationSection();
        showReservationForm();
    });
    document.getElementById('close-confirmation-btn').addEventListener('click', hideConfirmationSection);

    // Modal interactions
    modalClose.addEventListener('click', hideConfirmationModal);
    confirmationModal.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            hideConfirmationModal();
        }
    });

    // Date input validation
    dateInput.addEventListener('change', validateDateSelection);
    timeSelect.addEventListener('change', validateTimeSelection);

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideReservationForm();
            hideConfirmationModal();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Language switching functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLanguage);
    updateToggleButtons();

    // Save preference
    localStorage.setItem('halawa-language', currentLanguage);
}

function applyLanguage(lang) {
    const html = document.documentElement;
    const body = document.body;

    if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        html.setAttribute('data-lang', 'ar');
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        html.setAttribute('data-lang', 'en');
        body.classList.remove('lang-ar');
        body.classList.add('lang-en');
    }

    // Update all text content based on data attributes
    updateTextContent(lang);
    updateNavLinks(lang);

    // Update logo based on language
    updateLogoText(lang);
}

function updateTextContent(lang) {
    const elements = document.querySelectorAll('[data-ar], [data-en]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.placeholder = text;
            } else if (element.tagName === 'TITLE') {
                document.title = text;
            } else if (element.tagName === 'OPTION') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

function updateNavLinks(lang) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const text = link.getAttribute(`data-${lang}`);
        if (text) {
            link.textContent = text;
        }
    });
}

// SVG template for Arabic logo with proper Arabic text rendering
const arabicLogoSVG = `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" style="direction: rtl;">
    <defs>
        <linearGradient id="arabicLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#8B4513"/>
            <stop offset="100%" style="stop-color:#D2691E"/>
        </linearGradient>
    </defs>
    <!-- Arabic text with proper font and positioning -->
    <text x="100" y="50" font-family="'Cairo', 'Noto Sans Arabic', serif" font-size="36" font-weight="700" fill="url(#arabicLogoGradient)" text-anchor="middle" dominant-baseline="middle">حلاوة</text>
</svg>`;

// Logo is now a static image file - no dynamic switching needed
function updateLogoText(lang) {
    // Static logo image - no changes needed based on language
}

// Theme switching functionality
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    updateToggleButtons();

    // Save preference
    localStorage.setItem('halawa-theme', currentTheme);
}

function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
}

function updateToggleButtons() {
    // Update language button text
    const langText = currentLanguage === 'ar' ? 'EN' : 'AR';
    languageToggle.textContent = langText;
    footerLanguageToggle.textContent = langText;

    // Update theme button icon
    const themeIcon = currentTheme === 'light' ? '🌙' : '☀️';
    themeToggle.textContent = themeIcon;
    footerThemeToggle.textContent = themeIcon;
}

// Form visibility functions
function showReservationForm() {
    reservationForm.classList.remove('hidden');
    // Also hide confirmation section when showing form
    hideConfirmationSection();

    // Smooth scroll to form
    reservationForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Focus on first input
    setTimeout(() => {
        document.getElementById('full-name').focus();
    }, 500);
}

function hideReservationForm() {
    reservationForm.classList.add('hidden');

    // Reset form
    bookingForm.reset();
}

// Date and time validation
function setDateRestrictions() {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Set minimum date to January 20, 2025
    const minDate = new Date(currentYear, 0, 20); // January 20
    const maxDate = new Date(currentYear, 1, 20); // February 20

    // If current date is after Feb 20, set for next year
    if (today > maxDate) {
        minDate.setFullYear(currentYear + 1);
        maxDate.setFullYear(currentYear + 1);
    }
    // If current date is before Jan 20, keep current year
    else if (today < minDate) {
        // Keep dates as is
    }
    // If between Jan 20 and Feb 20, adjust min date to today if today is Thursday-Saturday
    else {
        const dayOfWeek = today.getDay(); // 0 = Sunday, 4 = Thursday, 5 = Friday, 6 = Saturday
        if (dayOfWeek === 4 || dayOfWeek === 5 || dayOfWeek === 6) {
            // Keep today as min date
        } else {
            // Find next Thursday
            const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
            minDate.setDate(today.getDate() + daysUntilThursday);
        }
    }

    dateInput.min = formatDateForInput(minDate);
    dateInput.max = formatDateForInput(maxDate);

    // Set default value to first available Thursday
    dateInput.value = formatDateForInput(minDate);
}

function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

function validateDateSelection() {
    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay();

    // Check if selected day is Thursday (4), Friday (5), or Saturday (6)
    if (dayOfWeek !== 4 && dayOfWeek !== 5 && dayOfWeek !== 6) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى اختيار يوم الخميس أو الجمعة أو السبت فقط'
            : 'Please select Thursday, Friday, or Saturday only'
        );
        dateInput.value = '';
        return false;
    }

    // Check if date is within valid range
    const minDate = new Date(dateInput.min);
    const maxDate = new Date(dateInput.max);

    if (selectedDate < minDate || selectedDate > maxDate) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى اختيار تاريخ بين 20 يناير و 20 فبراير'
            : 'Please select a date between January 20 and February 20'
        );
        dateInput.value = '';
        return false;
    }

    return true;
}

function validateTimeSelection() {
    const selectedTime = timeSelect.value;
    if (!selectedTime) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى اختيار وقت الحجز'
            : 'Please select reservation time'
        );
        return false;
    }
    return true;
}

// Form submission handling
function handleFormSubmission(e) {
    e.preventDefault();

    // Validate all fields
    if (!validateForm()) {
        return;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('full-name').value,
        phone: document.getElementById('phone').value,
        peopleCount: document.getElementById('people-count').value,
        date: dateInput.value,
        time: timeSelect.value
    };

    // Simulate form submission (in real app, this would send data to server)
    console.log('Form submitted:', formData);

    // Show confirmation section with details
    showConfirmationSection(formData);

    // Hide reservation form
    hideReservationForm();
}

function validateForm() {
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const peopleCount = parseInt(document.getElementById('people-count').value);
    const date = dateInput.value;
    const time = timeSelect.value;

    // Name validation
    if (!fullName || fullName.length < 2) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى إدخال اسم كامل صحيح'
            : 'Please enter a valid full name'
        );
        document.getElementById('full-name').focus();
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى إدخال رقم هاتف صحيح مكون من 10 أرقام'
            : 'Please enter a valid 10-digit phone number'
        );
        document.getElementById('phone').focus();
        return false;
    }

    // People count validation
    if (!peopleCount || peopleCount < 2 || peopleCount > 10) {
        alert(currentLanguage === 'ar'
            ? 'يُرجى إدخال عدد أشخاص بين 2 و 10'
            : 'Please enter number of people between 2 and 10'
        );
        document.getElementById('people-count').focus();
        return false;
    }

    // Date validation
    if (!date || !validateDateSelection()) {
        return false;
    }

    // Time validation
    if (!time || !validateTimeSelection()) {
        return false;
    }

    return true;
}

// Confirmation section functions
function showConfirmationSection(formData) {
    const confirmationSection = document.getElementById('confirmation-section');
    const confirmationDetails = document.getElementById('confirmation-details');

    // Set language attribute for styling
    confirmationDetails.setAttribute('data-lang', currentLanguage);

    // Populate confirmation details
    const formattedDate = new Date(formData.date).toLocaleDateString(
        currentLanguage === 'ar' ? 'ar-JO' : 'en-US',
        {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );

    const formattedTime = formData.time === '15:00' ? '3:00 مساءً' : '8:00 مساءً';
    const formattedTimeEn = formData.time === '15:00' ? '3:00 PM' : '8:00 PM';

    confirmationDetails.innerHTML = `
        <div class="detail-row">
            <span class="detail-label" data-ar="الاسم" data-en="Name">${currentLanguage === 'ar' ? 'الاسم' : 'Name'}</span>
            <span class="detail-value">${formData.fullName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label" data-ar="رقم الهاتف" data-en="Phone">${currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone'}</span>
            <span class="detail-value">${formData.phone}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label" data-ar="عدد الأشخاص" data-en="Number of People">${currentLanguage === 'ar' ? 'عدد الأشخاص' : 'Number of People'}</span>
            <span class="detail-value">${formData.peopleCount}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label" data-ar="التاريخ" data-en="Date">${currentLanguage === 'ar' ? 'التاريخ' : 'Date'}</span>
            <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label" data-ar="الوقت" data-en="Time">${currentLanguage === 'ar' ? 'الوقت' : 'Time'}</span>
            <span class="detail-value">${currentLanguage === 'ar' ? formattedTime : formattedTimeEn}</span>
        </div>
    `;

    // Show confirmation section
    confirmationSection.classList.remove('hidden');

    // Smooth scroll to confirmation
    confirmationSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function hideConfirmationSection() {
    const confirmationSection = document.getElementById('confirmation-section');
    confirmationSection.classList.add('hidden');
}

// Modal functions
function showConfirmationModal() {
    confirmationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideConfirmationModal() {
    confirmationModal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states for better UX
function showLoading(element) {
    element.disabled = true;
    element.dataset.originalText = element.textContent;
    element.textContent = currentLanguage === 'ar' ? 'جاري التحميل...' : 'Loading...';
}

function hideLoading(element) {
    element.disabled = false;
    element.textContent = element.dataset.originalText;
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
lazyLoadImages();

// Add smooth scrolling behavior for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    // Close any open modals
    hideReservationForm();
    hideConfirmationModal();
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
}
