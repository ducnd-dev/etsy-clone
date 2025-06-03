/**
 * Custom theme JavaScript for Etsy-style Shopify theme
 * Handles global functionality, UI interactions, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize global theme functionality
  EtsyTheme.init();
});

/**
 * EtsyTheme namespace to organize theme functionality
 */
const EtsyTheme = {
  // Settings
  settings: {
    mediaQueryMobile: '(max-width: 767px)',
    animationDuration: 300,
    headerSelector: '[data-header]',
    announcementBarSelector: '[data-announcement-bar]'
  },
  
  // DOM elements
  elements: {},
  
  /**
   * Initialize theme functionality
   */
  init: function() {
    this.cacheElements();
    this.setupEventListeners();
    this.initStickyHeader();
    this.initDropdowns();
    this.initProductGallery();
    this.initAnimations();
  },
  
  /**
   * Cache DOM elements for better performance
   */
  cacheElements: function() {
    this.elements = {
      body: document.body,
      header: document.querySelector(this.settings.headerSelector),
      announcementBar: document.querySelector(this.settings.announcementBarSelector),
      mobileMenuButton: document.querySelector('[data-mobile-menu-button]'),
      mobileMenu: document.getElementById('etsy-mobile-menu'),
      cartButtons: document.querySelectorAll('[data-cart-toggle]'),
      cartDrawer: document.getElementById('etsy-cart-drawer'),
      filterButtons: document.querySelectorAll('[data-filter-button]'),
      quantitySelectors: document.querySelectorAll('[data-quantity-selector]'),
      productGalleries: document.querySelectorAll('[data-product-gallery]')
    };
  },
  
  /**
   * Set up global event listeners
   */
  setupEventListeners: function() {
    // Mobile menu toggle
    if (this.elements.mobileMenuButton && this.elements.mobileMenu) {
      this.elements.mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this));
    }
    
    // Cart drawer toggle
    if (this.elements.cartButtons.length) {
      this.elements.cartButtons.forEach(button => {
        button.addEventListener('click', this.toggleCartDrawer.bind(this));
      });
    }
    
    // Close drawers on escape key
    document.addEventListener('keydown', this.handleKeyboardEvents.bind(this));
    
    // Filter dropdowns
    this.elements.filterButtons.forEach(button => {
      const dropdown = button.nextElementSibling;
      
      if (dropdown) {
        button.addEventListener('click', function() {
          dropdown.classList.toggle('hidden');
          button.setAttribute('aria-expanded', dropdown.classList.contains('hidden') ? 'false' : 'true');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
          if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
    },
  
  /**
   * Handle showing/hiding the mobile menu
   */
  toggleMobileMenu: function(event) {
    if (event) event.preventDefault();
    
    const mobileMenu = this.elements.mobileMenu;
    const mobileMenuPanel = mobileMenu.querySelector('#mobile-menu-panel');
    const mobileMenuBackdrop = mobileMenu.querySelector('#mobile-menu-backdrop');
    
    if (mobileMenu.classList.contains('hidden')) {
      // Open menu
      mobileMenu.classList.remove('hidden');
      this.elements.body.classList.add('overflow-hidden');
      
      // Animate backdrop and panel
      setTimeout(() => {
        mobileMenuBackdrop.classList.add('opacity-100');
        mobileMenuBackdrop.classList.remove('opacity-0');
      }, 10);
      
      setTimeout(() => {
        mobileMenuPanel.classList.remove('-translate-x-full');
      }, 100);
      
    } else {
      // Close menu
      mobileMenuPanel.classList.add('-translate-x-full');
      
      setTimeout(() => {
        mobileMenuBackdrop.classList.remove('opacity-100');
        mobileMenuBackdrop.classList.add('opacity-0');
      }, 200);
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        this.elements.body.classList.remove('overflow-hidden');
      }, 500);
    }
  },
  
  /**
   * Handle showing/hiding the cart drawer
   */
  toggleCartDrawer: function(event) {
    if (event) event.preventDefault();
    
    const cartDrawer = this.elements.cartDrawer;
    if (!cartDrawer) return;
    
    const cartDrawerPanel = cartDrawer.querySelector('.max-w-md');
    const cartBackdrop = cartDrawer.querySelector('#cart-backdrop');
    
    if (cartDrawer.classList.contains('hidden')) {
      // Open cart
      cartDrawer.classList.remove('hidden');
      this.elements.body.classList.add('overflow-hidden');
      
      // Animate backdrop and panel
      setTimeout(() => {
        cartBackdrop.classList.add('opacity-100');
        cartBackdrop.classList.remove('opacity-0');
      }, 10);
      
      setTimeout(() => {
        cartDrawerPanel.classList.remove('translate-x-full');
        cartDrawerPanel.classList.add('translate-x-0');
      }, 100);
      
    } else {
      // Close cart
      cartDrawerPanel.classList.remove('translate-x-0');
      cartDrawerPanel.classList.add('translate-x-full');
      
      setTimeout(() => {
        cartBackdrop.classList.remove('opacity-100');
        cartBackdrop.classList.add('opacity-0');
      }, 200);
      
      setTimeout(() => {
        cartDrawer.classList.add('hidden');
        this.elements.body.classList.remove('overflow-hidden');
      }, 500);
    }
  },
  
  /**
   * Handle keyboard events (esc key)
   */
  handleKeyboardEvents: function(event) {
    if (event.key === 'Escape') {
      // Close mobile menu if it's open
      if (this.elements.mobileMenu && !this.elements.mobileMenu.classList.contains('hidden')) {
        this.toggleMobileMenu();
      }
      
      // Close cart drawer if it's open
      if (this.elements.cartDrawer && !this.elements.cartDrawer.classList.contains('hidden')) {
        this.toggleCartDrawer();
      }
    }
  },
  
  /**
   * Initialize sticky header functionality
   */
  initStickyHeader: function() {
    if (!this.elements.header) return;
    
    let lastScrollTop = 0;
    const header = this.elements.header;
    const announcementBar = this.elements.announcementBar;
    let announcementBarHeight = announcementBar ? announcementBar.offsetHeight : 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > announcementBarHeight + 200) {
        header.classList.add('is-sticky', 'shadow-md', 'py-2');
        header.classList.remove('py-4');
      } else {
        header.classList.remove('is-sticky', 'shadow-md', 'py-2');
        header.classList.add('py-4');
      }
      
      if (scrollTop > lastScrollTop && scrollTop > announcementBarHeight + 300) {
        // Scrolling down, hide header
        header.classList.add('-translate-y-full');
      } else {
        // Scrolling up, show header
        header.classList.remove('-translate-y-full');
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Update announcement bar height on window resize
    window.addEventListener('resize', () => {
      if (announcementBar) {
        announcementBarHeight = announcementBar.offsetHeight;
      }
    });
  },
  
  /**
   * Initialize dropdown menus
   */
  initDropdowns: function() {
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    
    dropdownToggles.forEach(toggle => {
      const dropdown = document.getElementById(toggle.getAttribute('data-dropdown-toggle'));
      
      if (dropdown) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', dropdown.id);
        
        toggle.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          
          // Close all other dropdowns
          dropdownToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
              otherToggle.setAttribute('aria-expanded', 'false');
              const otherDropdown = document.getElementById(otherToggle.getAttribute('data-dropdown-toggle'));
              if (otherDropdown) {
                otherDropdown.classList.add('hidden');
                otherDropdown.classList.remove('block');
              }
            }
          });
          
          // Toggle current dropdown
          toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
          dropdown.classList.toggle('hidden');
          dropdown.classList.toggle('block');
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', event => {
      dropdownToggles.forEach(toggle => {
        const dropdown = document.getElementById(toggle.getAttribute('data-dropdown-toggle'));
        
        if (dropdown && !toggle.contains(event.target) && !dropdown.contains(event.target)) {
          toggle.setAttribute('aria-expanded', 'false');
          dropdown.classList.add('hidden');
          dropdown.classList.remove('block');
        }
      });
    });
  },
  
  /**
   * Initialize product gallery functionality
   */
  initProductGallery: function() {
    this.elements.productGalleries.forEach(gallery => {
      const mainImage = gallery.querySelector('[data-main-image]');
      const thumbnails = gallery.querySelectorAll('[data-thumbnail]');
      
      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
          const newSrc = thumbnail.getAttribute('data-src');
          const newAlt = thumbnail.getAttribute('alt') || '';
          
          // Update active state on thumbnails
          thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-etsy-orange'));
          thumbnail.classList.add('ring-2', 'ring-etsy-orange');
          
          // Animate image change
          if (mainImage) {
            mainImage.classList.add('opacity-50', 'scale-95');
            
            setTimeout(() => {
              mainImage.src = newSrc;
              mainImage.alt = newAlt;
              
              // Remove animation classes after image loads
              mainImage.onload = () => {
                mainImage.classList.remove('opacity-50', 'scale-95');
              };
            }, 200);
          }
        });
      });
    });
  },
  
  /**
   * Initialize animations for elements
   */
  initAnimations: function() {
    // Animated entrance for hero sections
    const heroSections = document.querySelectorAll('[data-animate-hero]');
    heroSections.forEach(section => {
      section.classList.add('opacity-0', 'translate-y-4');
      
      setTimeout(() => {
        section.classList.add('transition-all', 'duration-700');
        section.classList.remove('opacity-0', 'translate-y-4');
      }, 100);
    });
    
    // Animate product cards on scroll
    this.animateOnScroll('[data-animate-item]', 'opacity-0 translate-y-8', 100);
  },
  
  /**
   * Animate elements when they enter the viewport
   */
  animateOnScroll: function(selector, initialClasses, delay = 0) {
    const elements = document.querySelectorAll(selector);
    
    if (!elements.length) return;
    
    // Add initial classes
    elements.forEach(el => {
      el.classList.add(...initialClasses.split(' '));
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('transition-all', 'duration-700');
            entry.target.classList.remove(...initialClasses.split(' '));
            observer.unobserve(entry.target);
          }, delay * index);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    // Observe elements
    elements.forEach(el => {
      observer.observe(el);
    });
  }
};
