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
    generateMapQRCode();
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

// Open map location
function openMapLocation() {
    const mapUrl = 'https://www.google.com/maps/place/Nazrul+Mancha/@22.5133504,88.3441575,15z/data=!3m1!4b1!4m6!3m5!1s0x3a027715fa70c4c5:0x9defaebf49454c3d!8m2!3d22.5133316!4d88.3626116!16s%2Fm%2F0gmd99l?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D';
    window.open(mapUrl, '_blank');
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
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

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

        // Check if it's the wedding day
        if (day === weddingDay) {
            dayElement.classList.add('wedding-day');
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

function handleScroll() {
    const invitationPage = document.getElementById('invitation-page');
    if (!invitationPage || !invitationPage.classList.contains('active')) {
        return;
    }
    
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear existing timeout
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // If scrolling up and at the top of the page
    if (currentScrollTop < lastScrollTop && currentScrollTop < 50) {
        scrollTimeout = setTimeout(() => {
            // Only go back if still at top after a short delay
            if (window.pageYOffset < 50) {
                goBack();
            }
        }, 300);
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
        generateMapQRCode();
        loadBlessings();
    }
    
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

// Generate QR Code for Map Location
function generateMapQRCode() {
    const qrContainer = document.getElementById('map-qr-code');
    if (!qrContainer) return;
    
    // Clear existing content
    qrContainer.innerHTML = '';
    
    // Google Maps URL
    const mapUrl = 'https://www.google.com/maps/place/Nazrul+Mancha/@22.5133504,88.3441575,15z/data=!3m1!4b1!4m6!3m5!1s0x3a027715fa70c4c5:0x9defaebf49454c3d!8m2!3d22.5133316!4d88.3626116!16s%2Fm%2F0gmd99l?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D';
    
    // Generate QR code using QRCode library
    if (typeof QRCode !== 'undefined') {
        try {
            new QRCode(qrContainer, {
                text: mapUrl,
                width: 130,
                height: 130,
                colorDark: '#8B4513',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (error) {
            console.error('QR Code generation error:', error);
            // Fallback to placeholder
            qrContainer.innerHTML = '<div class="qr-icon">📍</div><p class="qr-text">QR Code</p>';
        }
    } else {
        // Retry if library not loaded yet
        setTimeout(generateMapQRCode, 500);
    }
}

// RSVP Functionality
function sendRSVP() {
    const name = document.getElementById('r-name').value.trim();
    const guests = document.getElementById('r-guests').value;
    const attend = document.getElementById('r-attend').value;
    const wish = document.getElementById('r-wish').value.trim();
    
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
    document.getElementById('r-name').value = '';
    document.getElementById('r-guests').selectedIndex = 0;
    document.getElementById('r-attend').selectedIndex = 0;
    document.getElementById('r-wish').value = '';
    
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
    if (!wishesWall) return;
    
    const blessings = JSON.parse(localStorage.getItem('weddingBlessings') || '[]');
    
    if (blessings.length === 0) {
        wishesWall.innerHTML = '<div class="wish-empty">আশীর্বাদ এখানে দেখা যাবে<br><span style="font-size:11px">Blessings will appear here</span></div>';
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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
