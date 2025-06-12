/**
 * Cart functionality module
 */
const CartModule = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Cart drawer toggle
    const cartButtons = document.querySelectorAll('[data-cart-toggle]');
    cartButtons.forEach(button => {
      button.addEventListener('click', this.toggleCartDrawer.bind(this));
    });

    // Add to cart forms
    const addToCartForms = document.querySelectorAll('.add-to-cart-form');
    addToCartForms.forEach(form => {
      form.addEventListener('submit', this.handleAddToCart.bind(this));
    });
  },

  toggleCartDrawer(event) {
    if (event) event.preventDefault();
    
    const cartDrawer = document.getElementById('etsy-cart-drawer');
    if (!cartDrawer) return;
    
    const cartDrawerPanel = cartDrawer.querySelector('.max-w-md');
    const cartBackdrop = cartDrawer.querySelector('#cart-backdrop');
    
    if (cartDrawer.classList.contains('hidden')) {
      // Open cart
      cartDrawer.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      
      setTimeout(() => {
        cartBackdrop.classList.add('opacity-100');
        cartBackdrop.classList.remove('opacity-0');
      }, 10);
      
      setTimeout(() => {
        cartDrawerPanel.classList.remove('translate-x-full');
      }, 100);
      
    } else {
      // Close cart
      cartDrawerPanel.classList.add('translate-x-full');
      
      setTimeout(() => {
        cartBackdrop.classList.remove('opacity-100');
        cartBackdrop.classList.add('opacity-0');
      }, 200);
      
      setTimeout(() => {
        cartDrawer.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 500);
    }
  },

  async handleAddToCart(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Adding...';
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const product = await response.json();
        
        // Show success state
        button.textContent = 'Added!';
        button.classList.add('bg-green-600');
        
        // Update cart count
        this.updateCartCount();
        
        // Show cart drawer after a short delay
        setTimeout(() => {
          this.toggleCartDrawer();
        }, 300);
        
        // Reset button after delay
        setTimeout(() => {
          button.disabled = false;
          button.textContent = originalText;
          button.classList.remove('bg-green-600');
        }, 2000);
        
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      
      // Show error state
      button.textContent = 'Error - try again';
      button.classList.add('bg-red-600');
      
      setTimeout(() => {
        button.disabled = false;
        button.textContent = originalText;
        button.classList.remove('bg-red-600');
      }, 2000);
    }
  },

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
        element.style.display = cart.item_count > 0 ? 'block' : 'none';
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }
};

// Export for CommonJS
module.exports = CartModule;
