# حلاوة Restaurant Event Reservation System

A professional, responsive landing page for a family-friendly Arabic restaurant event reservation system located in Khalda, Amman.

## 🌟 Features

### Language Support
- **Arabic** (default) and **English** support
- Automatic RTL/LTR text direction switching
- Complete bilingual content

### Design & Theme
- **Earthy color scheme**: Beige, sand, olive, and warm brown accents
- **Light & Dark mode** with smooth transitions
- **Responsive design** for all screen sizes
- **Family-friendly** and professional UI

### Functionality
- **Interactive reservation form** with validation
- **Date restrictions**: Thursday, Friday, Saturday only (Jan 20 - Feb 20)
- **Time slots**: 3:00 PM lunch or 8:00 PM dinner
- **Form validation** with Arabic/English error messages
- **Confirmation modal** after successful submission
- **Local storage** for user preferences

## 📁 Project Structure

```
project-3/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling with themes
├── script.js           # JavaScript functionality
├── assest/             # Images and assets
│   ├── README.md       # Image guidelines
│   └── [image files]   # Placeholder images
├── workflow.md         # Development notes
└── README.md           # This file
```

## 🎨 Color Scheme

### Light Theme
- Primary Background: `#FEFEFE`
- Secondary Background: `#F4E4BC` (Sandy Beige)
- Accent: `#F0E68C` (Warm Light)
- Text Primary: `#2F1B14` (Dark Brown)
- Brand Colors: `#8B4513` (Saddle Brown), `#D2691E` (Chocolate), `#6B8E23` (Olive Drab)

### Dark Theme
- Primary Background: `#1A1410` (Very Dark Brown)
- Secondary Background: `#2F1B14` (Dark Brown)
- Accent: `#3D2817` (Dark Olive)
- Text Primary: `#F4E4BC` (Sandy Beige)

## 🔧 Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Bilingual content with `data-ar` and `data-en` attributes
- Accessible form elements and navigation
- Custom SVG logo with brand colors

### CSS Features
- CSS Variables for theme management
- Flexbox and Grid layouts
- Responsive breakpoints (768px, 480px)
- Smooth animations and transitions
- RTL/LTR direction support
- Print-friendly styles

### JavaScript Functionality
- Language switching with DOM manipulation
- Theme toggling with localStorage persistence
- Form validation with date/time restrictions
- Modal management
- Accessibility enhancements
- Performance optimizations

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

## 🖼️ Images Required

See `assest/README.md` for detailed image specifications and recommendations.

### Current Placeholders
- Family dining scene (hero section)
- Arabic buffet spread (CTA section)

Replace with actual images from:
- Unsplash, Pexels, Pixabay
- Professional food photography
- Restaurant interior shots

## 🚀 Getting Started

1. **Clone/Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Replace placeholder images** with actual restaurant photos
4. **Customize content** as needed for the specific event
5. **Test functionality** across different devices and browsers

## 🎯 Form Validation Rules

### Date Restrictions
- **Available Days**: Thursday, Friday, Saturday only
- **Date Range**: January 20 - February 20
- **Current Year**: Automatically adjusts for next year if current date > Feb 20

### Required Fields
- **Full Name**: Minimum 2 characters
- **Phone Number**: 10-digit format
- **Number of People**: 2-10 people (family only)
- **Date**: Must be available day within range
- **Time**: 3:00 PM or 8:00 PM only

## 🌐 Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly content
- High contrast mode support
- Reduced motion preferences

## 🔒 Security Considerations

- Client-side validation only (add server-side validation for production)
- No sensitive data storage
- HTTPS recommended for production
- Input sanitization implemented

## 📞 Contact Information

- **Location**: Khalda, Amman
- **WhatsApp**: +962 777 123 456 (placeholder)
- **Event Capacity**: 200 seats
- **Price**: 20 JOD per person

## 🛠️ Customization Guide

### Changing Colors
Update CSS variables in `:root` and `[data-theme="dark"]` sections.

### Adding Languages
Add new `data-*` attributes and update JavaScript language switching logic.

### Modifying Form Fields
Update HTML form structure and JavaScript validation functions.

### Changing Date Restrictions
Modify `setDateRestrictions()` function in `script.js`.

## 📊 Performance Notes

- CSS and JavaScript minified for production
- Images optimized and lazy-loaded
- Font loading optimized with preconnect
- Minimal external dependencies

## 🎨 Design Philosophy

- **Warm & Inviting**: Earthy colors create cozy atmosphere
- **Family-Centric**: All design elements focus on family experience
- **Cultural Authenticity**: Arabic design elements and typography
- **Modern Simplicity**: Clean layouts with subtle animations
- **Mobile-First**: Responsive design prioritizing mobile experience

## 📈 Future Enhancements

- Backend integration for actual reservations
- Real-time availability checking
- Email/SMS notifications
- Admin dashboard for restaurant management
- Integration with payment systems
- Multi-location support

## 📝 Development Notes

See `workflow.md` for development planning and Arabic requirements.

## 📜 License

This project is created for educational and commercial use. Customize and deploy as needed.

---

**Built with ❤️ for حلاوة Restaurant**
