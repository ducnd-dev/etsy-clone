/**
 * Navigation and mobile menu functionality
 */
const NavigationModule = {
  init() {
    this.bindEvents();
    this.initStickyHeader();
  },

  bindEvents() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Dropdown functionality
    this.initDropdowns();
  },

  toggleMobileMenu(event) {
    if (event) event.preventDefault();
    
    const mobileMenu = document.getElementById('etsy-mobile-menu');
    if (!mobileMenu) return;
    
    const mobileMenuPanel = mobileMenu.querySelector('.max-w-sm');
    const mobileMenuBackdrop = mobileMenu.querySelector('#mobile-menu-backdrop');
    
    if (mobileMenu.classList.contains('hidden')) {
      // Open menu
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
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
        document.body.classList.remove('overflow-hidden');
      }, 500);
    }
  },

  initStickyHeader() {
    const header = document.querySelector('[data-header]');
    const announcementBar = document.querySelector('[data-announcement-bar]');
    
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let isHeaderVisible = true;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const announcementBarHeight = announcementBar ? announcementBar.offsetHeight : 0;
      
      // Add sticky background when scrolled
      if (currentScrollY > announcementBarHeight) {
        header.classList.add('bg-white', 'shadow-sm');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-white', 'shadow-sm');
        header.classList.add('bg-transparent');
      }
      
      // Hide/show header on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100 && isHeaderVisible) {
        // Scrolling down - hide header
        header.style.transform = 'translateY(-100%)';
        isHeaderVisible = false;
      } else if (currentScrollY < lastScrollY && !isHeaderVisible) {
        // Scrolling up - show header
        header.style.transform = 'translateY(0)';
        isHeaderVisible = true;
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  },

  initDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('[data-dropdown-trigger]');
      const menu = dropdown.querySelector('[data-dropdown-menu]');
      
      if (!trigger || !menu) return;
      
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            const otherMenu = otherDropdown.querySelector('[data-dropdown-menu]');
            if (otherMenu) {
              otherMenu.classList.add('hidden');
              otherMenu.classList.remove('block');
            }
          }
        });
        
        // Toggle current dropdown
        if (menu.classList.contains('hidden')) {
          menu.classList.remove('hidden');
          menu.classList.add('block');
        } else {
          menu.classList.add('hidden');
          menu.classList.remove('block');
        }
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.add('hidden');
          menu.classList.remove('block');
        }
      });
    });
  }
};

// Export for CommonJS
module.exports = NavigationModule;
