# Wedding Invitation Website - Complete Chat History & Project Documentation

## Project Overview
A beautiful, responsive wedding invitation website for Prithis & Priti's wedding on May 13, 2026. The website features a landing page and a detailed invitation page with multiple interactive sections.

---

## Complete Feature List

### 1. Landing Page (First Page)
- **Ganesh Logo**: Displayed at the top with golden styling
- **Invitation Badge**: "আমন্ত্রণ / INVITATION" badge with gradient background
- **Bride & Groom Combined Logo**: Animated logo box with `bride_grrom_logo.png`
- **Heart Icon**: Animated heart (❤) between logo and names
- **Names Section**: 
  - Bengali calligraphy images: `priti-removebg-preview.png` and `prithis-removebg-preview.png`
  - English names displayed below images
- **Subtitle Text**: "আমাদের বিবাহে আপনাকে আমন্ত্রণ জানাচ্ছি / We invite you to our wedding"
- **View Invitation Button**: Opens the invitation page and starts background music
- **Footer**: "প্রীতি ও পৃথ্বীশের বিবাহ / Prithis & Priti Wedding"

### 2. Invitation Page (Second Page)
- **Header Section**: 
  - Ganesh logo with glow animation
  - "ওঁ শ্রী গণেশায় নমঃ / Om Shri Ganeshaya Namah"
  - "মঙ্গল আমন্ত্রণ / Auspicious Invitation"
  
- **Bride & Groom Images**: Individual logos (`bride_logo.png` and `grrom_logo.png`) with slide-in animations

- **Main Invitation Section**:
  - Decorative top and bottom borders
  - Invitation text in Bengali and English
  - Couple names with parent information
  - Wedding details (date, time, venue)
  - Host information

- **Countdown Timer**: 
  - Days, Hours, Minutes, Seconds until wedding
  - Updates in real-time
  - Golden themed design

- **Calendar Section**: 
  - May 2026 calendar
  - Wedding day highlighted in red
  - Today's date highlighted in gold

- **Map & QR Code Section**:
  - Google Maps location image (`mapped_view.jpeg`)
  - QR code for location (generated dynamically)
  - Clickable to open in Google Maps
  - Responsive layout

- **Our Moments Section**:
  - Timeline design with 4 memory cards
  - Images: `memories_1.png`, `memories_2.png`, `memories_3.png`, `memories_4.png`
  - Each card has:
    - Image with hover zoom effect
    - Date/title in Bengali and English
    - Caption text
  - Vertical timeline with connecting line and dots
  - Staggered fade-in animations

- **RSVP Section**:
  - Form fields:
    - Name (Bengali/English)
    - Number of guests
    - Attendance status
    - Wishes/Blessings message
  - Data stored in localStorage
  - Success message on submission

- **Blessings Section**:
  - Displays all submitted wishes
  - Clear button to remove all blessings
  - Confirmation dialog before clearing
  - Empty state message

- **Contribution Section**:
  - PhonePe QR code (`Phone_pay_qr.jpeg`)
  - UPI ID: `7003167407-2@ibl`
  - Click to copy UPI ID functionality
  - Visual feedback on copy
  - Responsive layout

- **Footer**:
  - Ganesh emoji
  - Couple names
  - Wedding date
  - Note about blessings

- **Digital Footer**:
  - "Digital Invitation Created by @Subrata Pal"
  - Social media icons (Facebook, Instagram, LinkedIn)
  - Copyright notice
  - Clickable social icons that open in new tabs

### 3. Background Features
- **Background Music**: `ReelAudio-43395.mp3` plays automatically when invitation page opens
- **Scroll Navigation**: Scroll up at top of invitation page to return to landing page
- **Form Protection**: Prevents accidental scroll-back during form interactions
- **Translation Disabled**: Browser translation is disabled for the entire page
- **Responsive Design**: Works on both mobile and desktop devices

---

## Technical Implementation

### Files Structure
```
Prithis/
├── index.html          (Main HTML file)
├── style.css           (All styling)
├── script.js           (JavaScript functionality)
└── Assets/
    ├── bride_logo.png
    ├── grrom_logo.png
    ├── bride_grrom_logo.png
    ├── ganesh_logo.png
    ├── priti-removebg-preview.png
    ├── prithis-removebg-preview.png
    ├── palki.png (not currently used)
    ├── memories_1.png
    ├── memories_2.png
    ├── memories_3.png
    ├── memories_4.png
    ├── mapped_view.jpeg
    ├── Phone_pay_qr.jpeg
    ├── ReelAudio-43395.mp3
    └── js/
        └── qrcode.min.js
```

### Key Technologies
- **HTML5**: Semantic structure
- **CSS3**: 
  - Flexbox and Grid layouts
  - Animations and transitions
  - Responsive media queries
  - Custom gradients and shadows
- **JavaScript**:
  - DOM manipulation
  - LocalStorage for data persistence
  - QR code generation (qrcodejs library)
  - Countdown timer
  - Calendar generation
  - Audio playback control
  - Clipboard API for UPI ID copying
- **Google Fonts**: 
  - Noto Sans Bengali (for Bengali text)
  - Playfair Display (for English headings)

### Key Functions in script.js

1. **`openInvitation()`**: 
   - Switches from landing to invitation page
   - Starts countdown and calendar
   - Generates QR code
   - Loads blessings
   - Plays background music

2. **`goBack()`**: 
   - Returns to landing page
   - Pauses and resets music

3. **`startCountdown()`**: 
   - Calculates time until wedding
   - Updates every second
   - Displays in days, hours, minutes, seconds

4. **`generateCalendar()`**: 
   - Creates May 2026 calendar
   - Highlights wedding day (13th) and today

5. **`generateMapQRCode()`**: 
   - Generates QR code for Google Maps location
   - Uses qrcodejs library

6. **`openMapLocation()`**: 
   - Opens Google Maps in new tab

7. **`sendRSVP()`**: 
   - Validates form
   - Stores RSVP in localStorage
   - Adds blessing if provided
   - Shows success message

8. **`addBlessing()`**: 
   - Adds blessing to localStorage
   - Updates display

9. **`displayBlessings()`**: 
   - Loads and displays all blessings
   - Shows/hides clear button

10. **`clearBlessings()`**: 
    - Confirms before clearing
    - Removes all blessings from localStorage

11. **`copyUPI()`**: 
    - Copies UPI ID to clipboard
    - Shows visual feedback
    - Fallback for older browsers

12. **`setupFormProtection()`**: 
    - Prevents scroll-back during form interactions
    - Tracks focus events

13. **`handleScroll()`**: 
    - Detects scroll to top
    - Returns to landing page if conditions met

### CSS Key Features

- **Color Scheme**:
  - Primary Gold: `#DAA520`
  - Background: `#F5F5DC` (beige)
  - Text: `#8B4513` (brown)
  - Accents: `#B8860B`, `#654321`

- **Animations**:
  - `fadeInScale`: Logo entrance
  - `float`: Logo floating effect
  - `pulse`: Heart animation
  - `slideInLeft/Right`: Image entrances
  - `glow`: Ganesh logo glow
  - `momentFadeIn`: Memory cards stagger
  - `palkiFloat`: Palki animation (not currently used)

- **Responsive Breakpoints**:
  - Mobile: Default styles
  - Tablet/Desktop: `@media (min-width: 600px)` and `@media (min-width: 768px)`

---

## Social Media Links

- **Facebook**: https://www.facebook.com/share/1FMgeJs7G8/
- **Instagram**: https://www.instagram.com/mrpal___?igsh=MTMxcnUwdjUwNWxzOQ==
- **LinkedIn**: https://www.linkedin.com/in/subrata-pal-5b977632a

---

## Google Maps Location

**Venue**: Nazrul Mancha
**URL**: https://www.google.com/maps/place/Nazrul+Mancha/@22.5133504,88.3441575,15z/data=!3m1!4b1!4m6!3m5!1s0x3a027715fa70c4c5:0x9defaebf49454c3d!8m2!3d22.5133316!4d88.3626116!16s%2Fm%2F0gmd99l?entry=ttu&g_ep=EgoyMDI2MDIyMy4wIKXMDSoASAFQAw%3D%3D

---

## Payment Information

**UPI ID**: `7003167407-2@ibl`
**QR Code**: `Assets/Phone_pay_qr.jpeg`

---

## Wedding Details

- **Date**: May 13, 2026
- **Time**: 11:24 PM (রাত্রি ১১:২৪)
- **Venue**: রামপুর বি.বি.টি. রোড, ফ্ল্যাট- মাধুরী অ্যাপার্টমেন্ট, পিলার নং ৭০
- **English Venue**: Rampur B.B.T. Road, Flat - Madhuri Apartment, Pillar No. 70

---

## Development Notes

### Changes Made During Development

1. **Initial Setup**: Created landing page and invitation page structure
2. **Logo Integration**: Added bride, groom, and combined logos with animations
3. **Navigation**: Implemented scroll-based navigation between pages
4. **Countdown Timer**: Real-time countdown to wedding date
5. **Calendar**: Dynamic calendar generation for May 2026
6. **QR Code**: Map location QR code generation
7. **RSVP System**: Form with localStorage persistence
8. **Blessings Wall**: Display and management of guest wishes
9. **Our Moments**: Timeline section with 4 memory cards
10. **Map Integration**: Added map image and QR code section
11. **Contribution**: PhonePe QR and UPI ID with copy functionality
12. **Social Media**: Added social icons in footer
13. **Music**: Background audio playback
14. **Translation Control**: Disabled browser translation
15. **Responsive Fixes**: Mobile dropdown fixes, scroll protection

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Edge, Safari)
- Mobile browsers (iOS Safari, Chrome Mobile)
- QR code generation requires qrcodejs library
- Clipboard API for UPI copy (with fallback)

### Performance Considerations

- Images optimized for web
- CSS animations use transform/opacity for performance
- LocalStorage for data persistence (no server required)
- Lazy loading considerations for images

---

## Future Enhancements (Optional)

- Add image gallery
- Add more memory cards
- Implement server-side RSVP storage
- Add email notifications
- Add share functionality
- Add print-friendly version
- Add multiple language support
- Add guest book feature

---

## Credits

**Created by**: Subrata Pal
**For**: Prithis & Priti Wedding
**Date**: 2026

---

## Chat History Summary

This project was developed through an iterative process with the following major milestones:

1. Initial page structure and design
2. Logo and image integration
3. Navigation and page transitions
4. Interactive features (countdown, calendar, QR code)
5. RSVP and blessings system
6. Our Moments timeline section
7. Map and location features
8. Contribution/payment section
9. Social media integration
10. Final polish and responsive fixes

All features were implemented with attention to:
- Bengali and English bilingual support
- Mobile-first responsive design
- Smooth animations and transitions
- User experience optimization
- Visual consistency with golden wedding theme

---

*End of Documentation*

