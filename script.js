// Wedding date: May 13, 2026 at 11:24 PM
const weddingDate = new Date('2026-05-13T23:24:00');

// Page navigation - show invitation page but keep landing page accessible
function openInvitation() {
    const landingPage = document.getElementById('landing-page');
    const invitationPage = document.getElementById('invitation-page');
    
    landingPage.classList.remove('active');
    invitationPage.classList.add('active');
    
    // Reset scroll tracking
    lastScrollTop = 0;
    
    // Start countdown when page opens
    startCountdown();
    generateCalendar();
    loadBlessings();
    
    // Play background music
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Set volume to 50%
        backgroundMusic.play().catch(error => {
            // Handle autoplay restrictions - user interaction may be required
            console.log('Audio autoplay prevented:', error);
        });
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Go back to landing page
function goBack() {
    const landingPage = document.getElementById('landing-page');
    const invitationPage = document.getElementById('invitation-page');
    
    invitationPage.classList.remove('active');
    landingPage.classList.add('active');
    
    // Pause background music
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to beginning
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Map URLs for Wedding & Reception
const MAP_URLS = {
    wedding: 'https://www.google.com/maps/place/G78J%2B3GH+Indian+saloon.+Rampur+Quarter,+Rampur,+Santoshpur,+Maheshtala,+West+Bengal+700141/data=!4m2!3m1!1s0x3a027bd5f42c00b9:0x2b5e6b9741f5f0e5',
    reception: 'https://www.google.com/maps/place/Najrul+pathagar/@22.5151921,88.2717984,17z/data=!3m1!4b1!4m6!3m5!1s0x3a027ba042d29c3b:0x79d06acec4b010a0!8m2!3d22.5151921!4d88.2717984!16s%2Fg%2F11r62fzrz_!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D'
};

function openMapLocation(venue) {
    const url = MAP_URLS[venue] || MAP_URLS.reception;
    window.open(url, '_blank');
}

// Countdown timer
let countdownInterval = null;

function startCountdown() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate.getTime() - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Generate calendar for May 2026
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';

    const year = 2026;
    const month = 4; // May (0-indexed, so 4 = May)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weddingDay = 13;
    const receptionDay = 15;
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // After May 13 is over (on or after May 14), reception (15) becomes primary, wedding (13) becomes past
    const isAfterWedding = (todayYear > year) || (todayYear === year && todayMonth > month) || (todayYear === year && todayMonth === month && todayDate >= 14);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Wedding day (13): primary before May 14, past/faded on or after May 14
        if (day === weddingDay) {
            dayElement.classList.add(isAfterWedding ? 'past-event-day' : 'wedding-day');
        }
        // Reception day (15): faded before May 14, primary on or after May 14
        else if (day === receptionDay) {
            dayElement.classList.add(isAfterWedding ? 'wedding-day' : 'reception-day');
        }
        // Check if it's today
        else if (day === todayDate && month === todayMonth && year === todayYear) {
            dayElement.classList.add('today');
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Scroll detection to go back to first page
let lastScrollTop = 0;
let scrollTimeout = null;
let formInteracting = false;
let formCooldown = null;

// Track ALL form element interactions to prevent scroll-back
function setupFormProtection() {
    // Listen on all form elements: input, select, textarea, button inside RSVP
    document.addEventListener('focusin', function(e) {
        const tag = e.target.tagName;
        if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') {
            formInteracting = true;
            if (formCooldown) clearTimeout(formCooldown);
        }
    });

    document.addEventListener('focusout', function(e) {
        const tag = e.target.tagName;
        if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') {
            // Keep protection for 1 second after losing focus
            if (formCooldown) clearTimeout(formCooldown);
            formCooldown = setTimeout(() => {
                formInteracting = false;
            }, 1000);
        }
    });

    // Also catch touch/click on form elements
    document.addEventListener('touchstart', function(e) {
        const tag = e.target.tagName;
        if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'OPTION' || tag === 'LABEL') {
            formInteracting = true;
            if (formCooldown) clearTimeout(formCooldown);
            formCooldown = setTimeout(() => {
                formInteracting = false;
            }, 2000);
        }
    }, { passive: true });
}

function handleScroll() {
    const invitationPage = document.getElementById('invitation-page');
    if (!invitationPage || !invitationPage.classList.contains('active')) {
        return;
    }

    // NEVER go back if user is interacting with form elements
    if (formInteracting) {
        return;
    }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Clear existing timeout
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    // If scrolling up and at the very top of the page
    if (currentScrollTop < lastScrollTop && currentScrollTop === 0) {
        scrollTimeout = setTimeout(() => {
            // Triple-check: at top, not interacting with form, no focused form element
            if (window.pageYOffset === 0 && !formInteracting) {
                const active = document.activeElement;
                const tag = active ? active.tagName : '';
                if (tag !== 'SELECT' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
                    goBack();
                }
            }
        }, 500);
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar if on invitation page
    const invitationPage = document.getElementById('invitation-page');
    if (invitationPage && invitationPage.classList.contains('active')) {
        startCountdown();
        generateCalendar();
        loadBlessings();
    }
    
    // Setup form protection to prevent scroll-back during form interactions
    setupFormProtection();
    
    // Add scroll listener for going back to first page
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Add subtle animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.main-content, .qr-section, .countdown-section, .calendar-section, .sec').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// RSVP Functionality
function sendRSVP() {
    const nameEl = document.getElementById('r-name');
    const guestsEl = document.getElementById('r-guests');
    const attendEl = document.getElementById('r-attend');
    const wishEl = document.getElementById('r-wish');

    const name = nameEl ? nameEl.value.trim() : '';
    const guests = guestsEl ? guestsEl.value : '';
    const attend = attendEl ? attendEl.value : '';
    const wish = wishEl ? wishEl.value.trim() : '';

    if (!name) {
        alert('Please enter your name / অনুগ্রহ করে আপনার নাম লিখুন');
        return;
    }

    // Create RSVP data object
    const rsvpData = {
        name: name,
        guests: guests,
        attendance: attend,
        wish: wish,
        timestamp: new Date().toISOString()
    };

    // Store in localStorage (in a real app, you'd send this to a server)
    let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    rsvps.push(rsvpData);
    localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));

    // Add blessing if provided
    if (wish) {
        addBlessing(name, wish);
    }

    // Clear form
    if (nameEl) nameEl.value = '';
    if (guestsEl) guestsEl.selectedIndex = 0;
    if (attendEl) attendEl.selectedIndex = 0;
    if (wishEl) wishEl.value = '';

    // Show success message
    alert('Thank you for your RSVP! / আপনার উত্তর দেওয়ার জন্য ধন্যবাদ!');
}

// Blessings Management
function addBlessing(name, message) {
    let blessings = JSON.parse(localStorage.getItem('weddingBlessings') || '[]');
    blessings.push({
        name: name,
        message: message,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('weddingBlessings', JSON.stringify(blessings));
    displayBlessings();
}

function loadBlessings() {
    displayBlessings();
}

function displayBlessings() {
    const wishesWall = document.getElementById('wishes-wall');
    const clearBtn = document.getElementById('clear-blessings-btn');
    if (!wishesWall) return;
    
    const blessings = JSON.parse(localStorage.getItem('weddingBlessings') || '[]');
    
    // Show/hide clear button based on whether there are blessings
    if (clearBtn) {
        if (blessings.length > 0) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }
    }
    
    if (blessings.length === 0) {
        wishesWall.innerHTML = '<div class="wish-empty">আশীর্বাদ এখানে দেখা যাবে<br><span class="wish-empty-en">Blessings will appear here</span></div>';
        return;
    }
    
    wishesWall.innerHTML = '';
    blessings.forEach(blessing => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `
            <div class="wish-name">${escapeHtml(blessing.name)}</div>
            <div class="wish-message">${escapeHtml(blessing.message)}</div>
        `;
        wishesWall.appendChild(wishItem);
    });
}

function clearBlessings() {
    if (confirm('Are you sure you want to clear all blessings? / আপনি কি নিশ্চিত যে আপনি সব আশীর্বাদ মুছে ফেলতে চান?')) {
        localStorage.removeItem('weddingBlessings');
        displayBlessings();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
