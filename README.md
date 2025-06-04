# 🛍️ Etsy Clone - Shopify Theme

> A modern, responsive Shopify theme that replicates the user experience and visual design of Etsy, focusing on product discovery and visual browsing.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Shopify](https://img.shields.io/badge/shopify-theme-green.svg)
![Tailwind CSS](https://img.shields.io/badge/tailwind-v4.1.8-38B2AC.svg)
![Sass](https://img.shields.io/badge/sass-1.89.1-CF649A.svg)

## ✨ Features

### 🎨 **Design & UI**
- **Etsy-inspired Design**: Authentic recreation of Etsy's visual aesthetic
- **Responsive Layout**: Mobile-first design that works on all devices
- **Modern Typography**: Clean, readable Inter font family
- **Color Scheme**: Etsy's signature orange (#F1641E) and neutral palette
- **Smooth Animations**: Hover effects and transitions for enhanced UX

### 🛒 **E-commerce Functionality**
- **Product Grid**: Masonry-style product listings with hover effects
- **Product Cards**: Image galleries, ratings, and quick-add functionality
- **Shopping Cart**: Slide-out cart drawer with real-time updates
- **Search & Filters**: Advanced filtering and sorting options
- **Collections**: Category browsing with featured collections
- **Product Pages**: Detailed product views with image galleries

### 📱 **User Experience**
- **Mobile Menu**: Collapsible navigation for mobile devices
- **Quick Add**: Add products to cart without leaving the current page
- **Product Ratings**: Star-based rating system with review counts
- **Newsletter Signup**: Email collection with modern form design
- **Social Sharing**: Share products across social platforms

### 🔧 **Technical Features**
- **Tailwind CSS v4**: Modern utility-first CSS framework
- **Sass/SCSS**: Organized component-based stylesheets
- **Shopify Liquid**: Full template coverage for all page types
- **Performance Optimized**: Minified CSS and efficient asset loading
- **SEO Ready**: Semantic HTML and meta tag optimization

## 📁 Project Structure

```
etsy-clone/
├── 📂 assets/           # Compiled CSS, JS, and static assets
│   ├── theme.css        # Compiled SCSS styles
│   ├── theme-tailwind.css # Compiled Tailwind styles
│   ├── theme.js         # Custom JavaScript functionality
│   └── payment-*.svg    # Payment method icons
├── 📂 config/           # Theme configuration
│   ├── settings_data.json
│   └── settings_schema.json
├── 📂 layout/           # Base layout templates
│   └── theme.liquid     # Main theme layout
├── 📂 sections/         # Reusable theme sections
│   ├── etsy-header.liquid
│   ├── etsy-footer.liquid
│   ├── etsy-hero-search.liquid
│   ├── etsy-featured-categories.liquid
│   ├── etsy-product-grid.liquid
│   ├── etsy-newsletter.liquid
│   └── etsy-promotions-banner.liquid
├── 📂 snippets/         # Reusable code snippets
│   ├── etsy-cart-drawer.liquid
│   ├── etsy-mobile-menu.liquid
│   ├── etsy-product-rating.liquid
│   └── etsy-quick-add-button.liquid
├── 📂 templates/        # Page templates
│   ├── index.liquid     # Homepage
│   ├── collection.liquid
│   ├── product.liquid
│   ├── cart.liquid
│   ├── search.liquid
│   ├── blog.liquid
│   ├── article.liquid
│   ├── page.liquid
│   ├── 404.liquid
│   ├── password.liquid
│   ├── gift_card.liquid
│   ├── list-collections.liquid
│   └── 📂 customers/    # Customer account pages
└── 📂 styles/           # Source stylesheets
    ├── 📂 css/
    │   └── main-tailwind.css
    └── 📂 scss/
        ├── main.scss
        ├── _variables.scss
        ├── _mixins.scss
        ├── _base.scss
        ├── _utilities.scss
        ├── 📂 components/
        └── 📂 sections/
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Shopify CLI (optional, for development)

### Installation

1. **Clone or download** the theme files to your project directory

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the styles**:
   ```bash
   npm run build
   ```

4. **Upload to Shopify**:
   - Zip the theme files
   - Upload via Shopify Admin → Online Store → Themes
   - Or use Shopify CLI for development

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build both SCSS and Tailwind CSS for production |
| `npm run dev` | Start development with file watching |
| `npm run sass` | Compile SCSS to CSS (production) |
| `npm run sass:watch` | Watch SCSS files for changes |
| `npm run tailwind:build` | Build Tailwind CSS (production) |
| `npm run tailwind:watch` | Watch Tailwind files for changes |

### Development Workflow

1. **Start development mode**:
   ```bash
   npm run dev
   ```

2. **Edit styles**:
   - SCSS files in `styles/scss/`
   - Tailwind utilities in templates

3. **Customize components**:
   - Modify sections in `sections/`
   - Update snippets in `snippets/`
   - Edit templates in `templates/`

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Customization

## 🎨 Customization

### Colors (Tailwind v4 Modern Approach)
The theme uses direct color values in utility classes defined in `styles/css/main-tailwind.css`. To customize colors, update the hex values in the utility class definitions:

```css
/* Example: Changing the primary orange color */
.text-etsy-orange {
  color: #F1641E;  /* Change this value */
}

.bg-etsy-orange {
  background-color: #F1641E;  /* Change this value */
}
```

**Color Palette:**
- **Primary Orange**: `#F1641E` (Etsy brand color)
- **Dark Orange**: `#d44c0d` (hover states)
- **Dark Text**: `#222222` (primary text)
- **Light Grey**: `#F8F8F8` (backgrounds)

### Legacy SCSS Variables
SCSS variables are still available in `styles/scss/_variables.scss` for component styles that use the SCSS compilation pipeline.

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Responsive**: Fluid typography scales with viewport

### Components
Each component is modular and can be customized:

- **Headers**: `sections/etsy-header.liquid`
- **Product Cards**: `snippets/etsy-product-rating.liquid`
- **Cart Drawer**: `snippets/etsy-cart-drawer.liquid`
- **Mobile Menu**: `snippets/etsy-mobile-menu.liquid`

## 📋 Template Coverage

| Template | Description | Status |
|----------|-------------|--------|
| `index.liquid` | Homepage with hero and product grid | ✅ Complete |
| `collection.liquid` | Collection/category listing | ✅ Complete |
| `product.liquid` | Individual product page | ✅ Complete |
| `cart.liquid` | Shopping cart page | ✅ Complete |
| `search.liquid` | Search results | ✅ Complete |
| `blog.liquid` | Blog post listing | ✅ Complete |
| `article.liquid` | Individual blog post | ✅ Complete |
| `page.liquid` | Static pages | ✅ Complete |
| `404.liquid` | Error page | ✅ Complete |
| `password.liquid` | Password protection | ✅ Complete |
| `gift_card.liquid` | Gift card display | ✅ Complete |
| `list-collections.liquid` | All collections | ✅ Complete |
| Customer templates | Account, login, register, etc. | ✅ Complete |

## 🔧 Technical Stack

- **Frontend Framework**: Tailwind CSS v4.1.8 (configured for CSS variables)
- **Preprocessor**: Sass/SCSS v1.89.1
- **Template Engine**: Shopify Liquid
- **Build Tools**: Native Sass & Tailwind CLI
- **Task Runner**: npm scripts with concurrently
- **Browser Support**: Modern browsers (IE11+)

### Tailwind CSS v4 Configuration

This theme uses Tailwind CSS v4 with streamlined configuration. Custom colors are defined directly in utility classes rather than CSS variables:

**Custom Utility Classes Available:**
```css
/* Color utilities */
.text-etsy-orange        /* #F1641E */
.text-etsy-orange-dark   /* #d44c0d */
.text-etsy-dark          /* #222222 */

.bg-etsy-orange          /* #F1641E */
.bg-etsy-orange-dark     /* #d44c0d */
.bg-etsy-light-grey      /* #F8F8F8 */

.border-etsy-orange      /* #F1641E */

/* Hover states */
.hover:text-etsy-orange:hover
.hover:bg-etsy-orange:hover

/* Focus states */
.focus:ring-etsy-orange:focus
.focus:border-etsy-orange:focus

/* Gradients */
.from-etsy-orange
.to-etsy-orange
.bg-gradient-etsy        /* orange to lighter orange */
```

## 📱 Responsive Design

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px+ | Small tablets |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Small desktops |
| `xl` | 1280px+ | Large desktops |
| `2xl` | 1536px+ | Extra large screens |

## 🎯 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+
- **iOS Safari** 12+
- **Android Chrome** 60+

## 📝 Shopify Requirements

- **Shopify Plan**: Basic Shopify or higher
- **Theme Inspector**: Compatible with Shopify's theme inspector
- **Liquid**: Uses standard Shopify Liquid tags
- **Metafields**: Supports product ratings via metafields
- **Apps**: Compatible with most Shopify apps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Check the documentation above
- Review the code comments in template files
- Test in a Shopify development store

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Complete Etsy-style design implementation
- ✅ Full Shopify template coverage
- ✅ Responsive mobile-first design
- ✅ Tailwind CSS v4 integration
- ✅ Performance optimizations
- ✅ Clean, maintainable codebase

---

**Built with ❤️ for the Shopify community**

## 🎨 Advanced Customization

### Dynamic Theme Settings (New!)
The theme now includes a powerful theme settings system that allows store owners to customize colors through the Shopify admin panel:

#### Theme Settings Panel
Navigate to **Online Store → Themes → Customize** to access:

**Colors Section:**
- **Primary Color**: Main brand color (default: Etsy Orange #F1641E)
- **Secondary Color**: Text and secondary elements (default: #222222)  
- **Accent Color**: Highlights and accents (default: #4A6EE0)
- **Text Color**: Body text color
- **Heading Color**: Heading text color

**Typography Section:**
- **Heading Font**: Choose from Shopify's font library
- **Body Font**: Choose from Shopify's font library
- **Base Font Size**: Adjust base font size (12-18px)

**Product Display Section:**
- **Image Ratio**: Square, portrait, or landscape
- **Show Vendor**: Display/hide product vendor
- **Show Rating**: Display/hide product ratings

**Social Media Section:**
Configure links for Facebook, Instagram, Pinterest, and YouTube.

#### How It Works
The theme uses CSS custom properties (CSS variables) that are dynamically set from your theme settings:

```liquid
<!-- In theme.liquid head -->
<style>
  :root {
    --color-primary: {{ settings.primary_color | default: '#F1641E' }};
    --color-secondary: {{ settings.secondary_color | default: '#222222' }};
    --color-accent: {{ settings.accent_color | default: '#4A6EE0' }};
    --color-text: {{ settings.text_color | default: '#222222' }};
    --color-heading: {{ settings.heading_color | default: '#222222' }};
    --font-size-base: {{ settings.base_font_size | default: 16 }}px;
  }
</style>
```

#### Available CSS Classes
**New Dynamic Classes:**
- `.text-primary`, `.bg-primary`, `.border-primary`
- `.text-secondary`, `.bg-secondary`
- `.text-accent`, `.bg-accent`

**Legacy Compatible Classes:**
- `.text-etsy-orange` → now uses `var(--color-primary)`
- `.bg-etsy-orange` → now uses `var(--color-primary)`
- `.text-etsy-dark` → now uses `var(--color-secondary)`

**Example Usage in Templates:**
```liquid
<!-- Dynamic button that uses theme setting colors -->
<button class="bg-primary text-white hover:bg-primary-dark">
  Add to Cart
</button>

<!-- Compatible with existing Etsy classes -->
<div class="text-etsy-orange border-etsy-orange">
  Now uses your custom primary color!
</div>
```

### Legacy Color Customization (Tailwind v4)
