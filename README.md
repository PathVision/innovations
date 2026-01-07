# IMAS - Intelligent Mobility & Driver Assistance System

A modern, responsive website for the IMAS AI-powered road safety platform. Built with vanilla HTML, CSS, and JavaScript for maximum performance.

![IMAS Website](assets/images/preview.png)

## 🚀 Features

- **Responsive Design** - Fully responsive across all devices
- **Dark Theme** - Premium deep-tech aesthetic with cyan/violet gradients
- **Smooth Animations** - Scroll-triggered animations with reduced motion support
- **Contact Form** - Integrated with Web3Forms for email notifications
- **Accessibility** - WCAG AA compliant, keyboard navigation, focus indicators
- **Performance** - No frameworks, native lazy loading, optimized CSS

## 📁 Project Structure

```
IMAS 1/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Complete CSS design system
├── js/
│   └── main.js         # Vanilla JavaScript functionality
└── assets/
    ├── images/         # Image assets
    └── icons/          # Icon assets
```

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - ES6+, IntersectionObserver, Fetch API
- **Web3Forms** - Contact form backend

## 🎨 Design System

### Colors
- Primary: `#00D4FF` (Cyan)
- Accent: `#8B5CF6` (Violet)
- Background: `#030712` (Deep Dark)

### Typography
- Font: Inter (Google Fonts)
- Scale: 0.8125rem - 4.5rem

## 📧 Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com). To configure:

1. Sign up at web3forms.com
2. Get your Access Key
3. Replace the key in `index.html`:
```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
```
4. Activate your key via the confirmation email

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in a browser
3. For development, use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## 📱 Sections

1. **Hero** - Main landing with CTA buttons
2. **Problem** - Road safety challenges (2x2 grid)
3. **Solution** - IMAS approach
4. **How It Works** - 4-step process
5. **Capabilities** - Safety features (2x2 grid)
6. **What We Solve** - Before/After comparison
7. **Use Cases** - Target audiences (5 cards)
8. **Vision & Mission** - Company purpose
9. **Contact** - Web3Forms integration

## 🔧 Customization

### Updating Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --color-primary: #00D4FF;
  --color-accent: #8B5CF6;
  --color-bg: #030712;
}
```

### Updating Content
All content is in `index.html`. Each section is clearly labeled with comments.

## 📄 License

© 2026 Pathvision Innovations. All rights reserved.

## 🤝 Contact

For inquiries, use the contact form on the website or reach out through the provided channels.
