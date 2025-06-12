/**
 * Main theme JavaScript - Etsy-style Shopify theme
 * Modular architecture with build system integration
 */

// Import modules using CommonJS for webpack compatibility
const CartModule = require('./modules/cart.js');
const ProductGalleryModule = require('./modules/product-gallery.js');
const NavigationModule = require('./modules/navigation.js');
const AnimationModule = require('./modules/animations.js');

/**
 * EtsyTheme - Main theme controller
 */
const EtsyTheme = {
  // Initialize theme
  init() {
    try {
      // Initialize all modules
      if (typeof CartModule !== 'undefined' && CartModule.init) {
        CartModule.init();
      }
      
      if (typeof ProductGalleryModule !== 'undefined' && ProductGalleryModule.init) {
        ProductGalleryModule.init();
      }
      
      if (typeof NavigationModule !== 'undefined' && NavigationModule.init) {
        NavigationModule.init();
      }
      
      if (typeof AnimationModule !== 'undefined' && AnimationModule.init) {
        AnimationModule.init();
      }
      
      // Initialize core functionality
      this.initGlobalEvents();
      
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Fallback to basic functionality
      this.initBasicFunctionality();
    }
  },
  
  // Global event handlers
  initGlobalEvents() {
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
    
    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  },
  
  // Close all open modals/drawers
  closeAllModals() {
    // Close cart drawer
    const cartDrawer = document.getElementById('etsy-cart-drawer');
    if (cartDrawer && !cartDrawer.classList.contains('hidden')) {
      cartDrawer.classList.add('hidden');
    }
    
    // Close mobile menu  
    const mobileMenu = document.getElementById('etsy-mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
    
    // Close dropdowns
    const dropdowns = document.querySelectorAll('[data-dropdown-menu]:not(.hidden)');
    dropdowns.forEach(dropdown => {
      dropdown.classList.add('hidden');
    });
  },
  
  // Handle window resize
  handleResize() {
    if (window.innerWidth >= 768) {
      const mobileMenu = document.getElementById('etsy-mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  },
  
  // Basic functionality fallback
  initBasicFunctionality() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.getElementById('etsy-mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
    
    // Cart drawer toggle
    const cartBtns = document.querySelectorAll('[data-cart-toggle]');
    const cartDrawer = document.getElementById('etsy-cart-drawer');
    
    cartBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (cartDrawer) {
          cartDrawer.classList.toggle('hidden');
        }
      });
    });
  },
  
  // Utility function
  debounce(func, wait) {
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
};

// Global function for product gallery (backward compatibility)
window.changeMainImage = function(thumbnailButton, imageUrl) {
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.src = imageUrl;
  }
  
  const thumbnails = document.querySelectorAll('.thumbnail-btn');
  thumbnails.forEach(thumb => {
    thumb.classList.remove('border-etsy-orange');
    thumb.classList.add('border-transparent');
  });
  
  thumbnailButton.classList.remove('border-transparent');
  thumbnailButton.classList.add('border-etsy-orange');
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  EtsyTheme.init();
});

// Export for use in other scripts
window.EtsyTheme = EtsyTheme;

// Export for webpack
module.exports = EtsyTheme;
