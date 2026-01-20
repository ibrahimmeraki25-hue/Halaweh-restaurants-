// Global variables
let currentLanguage = 'ar';
let currentTheme = 'light';

// DOM Elements
const languageToggle = document.getElementById('language-toggle');
const footerLanguageToggle = document.getElementById('footer-language-toggle');
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const shareBtn = document.getElementById('share-btn');
const hamburgerMenu = document.getElementById('hamburger-menu');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarLanguageToggle = document.getElementById('sidebar-language-toggle');
const sidebarThemeToggle = document.getElementById('sidebar-theme-toggle');
const sidebarShareBtn = document.getElementById('sidebar-share-btn');
const bookNowBtn = document.getElementById('book-now-btn');
const ctaBookBtn = document.getElementById('cta-book-btn');
const reservationForm = document.getElementById('reservation-form');
const bookingForm = document.getElementById('booking-form');
const cancelBooking = document.getElementById('cancel-booking');
const confirmationModal = document.getElementById('confirmation-modal');
const modalClose = document.querySelector('.modal-close');
const errorModal = document.getElementById('error-modal');
const errorModalClose = document.getElementById('error-modal-close');
const errorMessage = document.getElementById('error-message');
const errorModalOk = document.getElementById('error-modal-ok');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load
    window.scrollTo(0, 0);

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

    // Share button
    shareBtn.addEventListener('click', shareWebsite);

    // Mobile sidebar
    hamburgerMenu.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    sidebarLanguageToggle.addEventListener('click', toggleLanguage);
    sidebarThemeToggle.addEventListener('click', toggleTheme);
    sidebarShareBtn.addEventListener('click', shareWebsite);

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
            hideConfirmationSection();
        }
    });

    // Error modal interactions
    errorModalClose.addEventListener('click', hideErrorModal);
    errorModalOk.addEventListener('click', hideErrorModal);
    errorModal.addEventListener('click', function(e) {
        if (e.target === errorModal) {
            hideErrorModal();
        }
    });

    // Date input validation
    dateInput.addEventListener('change', validateDateSelection);
    timeSelect.addEventListener('change', validateTimeSelection);

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideReservationForm();
            hideConfirmationSection();
            hideErrorModal();
            closeSidebar();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Remove previous highlight from location
                const locationElement = document.getElementById('location');
                if (locationElement) {
                    locationElement.classList.remove('location-highlight');
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add highlight effect for location
                if (target.id === 'location') {
                    setTimeout(() => {
                        target.classList.add('location-highlight');
                        // Update URL hash
                        window.history.pushState(null, '', '#location');
                        // Remove highlight after animation
                        setTimeout(() => {
                            target.classList.remove('location-highlight');
                        }, 2000);
                    }, 500);
                } else {
                    // Update URL hash for other links
                    window.history.pushState(null, '', this.getAttribute('href'));
                }
            }
        });
    });
}

// Language switching functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    applyLanguage(currentLanguage);
    updateToggleButtons();

    // Close sidebar on language change
    closeSidebar();

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
    updateSidebarNavLinks(lang);

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

function updateSidebarNavLinks(lang) {
    const sidebarNavLinks = document.querySelectorAll('.sidebar-nav-link');

    sidebarNavLinks.forEach(link => {
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
    // Cycle through themes: light -> dark -> copper -> light
    if (currentTheme === 'light') {
        currentTheme = 'dark';
    } else if (currentTheme === 'dark') {
        currentTheme = 'copper';
    } else {
        currentTheme = 'light';
    }

    applyTheme(currentTheme);
    updateToggleButtons();

    // Close sidebar on theme change
    closeSidebar();

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
    sidebarLanguageToggle.textContent = langText;

    // Update theme button icon based on current theme
    let themeIcon;
    if (currentTheme === 'light') {
        themeIcon = '☀️'; // Sun for light mode
    } else if (currentTheme === 'dark') {
        themeIcon = '🌙'; // Moon for dark mode
    } else {
        themeIcon = '🥉'; // Copper medal for copper mode
    }
    themeToggle.textContent = themeIcon;
    footerThemeToggle.textContent = themeIcon;
    sidebarThemeToggle.textContent = themeIcon;
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

    // Define allowed booking dates
    const allowedDates = [
        // January dates
        new Date(currentYear, 0, 22), // January 22
        new Date(currentYear, 0, 23), // January 23
        new Date(currentYear, 0, 24), // January 24
        new Date(currentYear, 0, 29), // January 29
        new Date(currentYear, 0, 30), // January 30
        new Date(currentYear, 0, 31), // January 31
        // February dates
        new Date(currentYear, 1, 5),  // February 5
        new Date(currentYear, 1, 6),  // February 6
        new Date(currentYear, 1, 7),  // February 7
        new Date(currentYear, 1, 12), // February 12
        new Date(currentYear, 1, 13), // February 13
        new Date(currentYear, 1, 14), // February 14
        new Date(currentYear, 1, 19), // February 19
        new Date(currentYear, 1, 20)  // February 20
    ];

    // Find the earliest allowed date that is today or in the future
    let defaultDate = null;
    for (const date of allowedDates) {
        if (date >= today) {
            defaultDate = date;
            break;
        }
    }

    // If no future dates available, set for next year
    if (!defaultDate) {
        const nextYear = currentYear + 1;
        allowedDates.forEach(date => date.setFullYear(nextYear));
        defaultDate = allowedDates[0];
    }

    // Set min and max dates to the range
    dateInput.min = formatDateForInput(allowedDates[0]);
    dateInput.max = formatDateForInput(allowedDates[allowedDates.length - 1]);

    // Set default value to first available date
    dateInput.value = formatDateForInput(defaultDate);

    // Prevent manual typing in date input
    dateInput.addEventListener('keydown', function(e) {
        e.preventDefault();
    });

    // Prevent paste in date input
    dateInput.addEventListener('paste', function(e) {
        e.preventDefault();
    });

    // Add custom validation to only allow specific dates
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const isAllowedDate = allowedDates.some(allowedDate =>
            selectedDate.toDateString() === allowedDate.toDateString()
        );

        if (!isAllowedDate) {
            this.setCustomValidity(currentLanguage === 'ar'
                ? 'يُرجى اختيار تاريخ من التواريخ المسموح بها فقط'
                : 'Please select a date from the allowed dates only'
            );
        } else {
            this.setCustomValidity('');
        }
    });
}

function formatDateForInput(date) {
    return date.toISOString().split('T')[0];
}

function validateDateSelection() {
    const selectedDate = new Date(dateInput.value);
    const currentYear = new Date().getFullYear();

    // Define allowed booking dates
    const allowedDates = [
        // January dates
        new Date(currentYear, 0, 22), // January 22
        new Date(currentYear, 0, 23), // January 23
        new Date(currentYear, 0, 24), // January 24
        new Date(currentYear, 0, 29), // January 29
        new Date(currentYear, 0, 30), // January 30
        new Date(currentYear, 0, 31), // January 31
        // February dates
        new Date(currentYear, 1, 5),  // February 5
        new Date(currentYear, 1, 6),  // February 6
        new Date(currentYear, 1, 7),  // February 7
        new Date(currentYear, 1, 12), // February 12
        new Date(currentYear, 1, 13), // February 13
        new Date(currentYear, 1, 14), // February 14
        new Date(currentYear, 1, 19), // February 19
        new Date(currentYear, 1, 20)  // February 20
    ];

    // Check if selected date is in the allowed dates list
    const isAllowedDate = allowedDates.some(allowedDate =>
        selectedDate.toDateString() === allowedDate.toDateString()
    );

    if (!isAllowedDate) {
        showErrorModal(currentLanguage === 'ar'
            ? 'يُرجى اختيار تاريخ من التواريخ المسموح بها فقط: 22-24 يناير، 29-31 يناير، 5-7 فبراير، 12-14 فبراير، 19-20 فبراير'
            : 'Please select a date from the allowed dates only: January 22-24, 29-31; February 5-7, 12-14, 19-20'
        );
        dateInput.value = '';
        return false;
    }

    return true;
}

function validateTimeSelection() {
    const selectedTime = timeSelect.value;
    if (!selectedTime) {
        showErrorModal(currentLanguage === 'ar'
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
        showErrorModal(currentLanguage === 'ar'
            ? 'يُرجى إدخال اسم كامل صحيح'
            : 'Please enter a valid full name'
        );
        document.getElementById('full-name').focus();
        return false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        showErrorModal(currentLanguage === 'ar'
            ? 'يُرجى إدخال رقم هاتف صحيح مكون من 10 أرقام'
            : 'Please enter a valid 10-digit phone number'
        );
        document.getElementById('phone').focus();
        return false;
    }

    // People count validation
    if (!peopleCount || peopleCount < 1 || peopleCount > 1000) {
        showErrorModal(currentLanguage === 'ar'
            ? 'يُرجى إدخال عدد أشخاص بين 1 و 1000'
            : 'Please enter number of people between 1 and 1000'
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
    const confirmationSection = document.getElementById('confirmation-section');
    confirmationSection.classList.remove('hidden');

    // Stay in current position (no scrolling)
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

// Error/Notification modal functions
function showErrorModal(message, isSuccess = false) {
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');

    errorMessage.textContent = message;

    if (isSuccess) {
        // Success styling
        modalIcon.textContent = '✅';
        modalIcon.className = 'success-icon';
        modalTitle.textContent = currentLanguage === 'ar' ? 'تم بنجاح' : 'Success';
        errorModal.querySelector('.modal-content').className = 'modal-content success-modal-content';
    } else {
        // Error styling
        modalIcon.textContent = '⚠️';
        modalIcon.className = 'error-icon';
        modalTitle.textContent = currentLanguage === 'ar' ? 'خطأ في الحجز' : 'Booking Error';
        errorModal.querySelector('.modal-content').className = 'modal-content error-modal-content';
    }

    errorModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Focus on OK button
    setTimeout(() => {
        errorModalOk.focus();
    }, 100);
}

function hideErrorModal() {
    errorModal.classList.add('hidden');
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
    hideErrorModal();
    closeSidebar();
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Mobile sidebar functions
function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Share website function
function shareWebsite() {
    const url = window.location.href;
    const title = currentLanguage === 'ar' ? 'حلاوة - مطعم عائلي في خلدا' : 'Halaweh - Family Restaurant in Khalda';

    if (navigator.share) {
        // Use native share API if available
        navigator.share({
            title: title,
            url: url
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showErrorModal(currentLanguage === 'ar'
                ? 'تم نسخ رابط الموقع إلى الحافظة!'
                : 'Website link copied to clipboard!'
            , true); // isSuccess = true
        }).catch(() => {
            // Fallback to prompt
            prompt(currentLanguage === 'ar' ? 'انسخ الرابط:' : 'Copy the link:', url);
        });
    }
}

// Force scroll to top on page load and prevent hash scrolling
window.addEventListener('load', function() {
    // Remove hash from URL if present
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    // Force scroll to top
    window.scrollTo(0, 0);
});

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
}
