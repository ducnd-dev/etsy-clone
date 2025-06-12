/**
 * Product gallery functionality module
 */
const ProductGalleryModule = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const galleries = document.querySelectorAll('[data-product-gallery]');
    galleries.forEach(gallery => {
      this.initGallery(gallery);
    });
  },

  initGallery(gallery) {
    const mainImage = gallery.querySelector('[data-main-image]');
    const thumbnails = gallery.querySelectorAll('[data-thumbnail]');
    
    if (!mainImage || !thumbnails.length) return;
    
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.changeMainImage(mainImage, thumbnail, thumbnails);
      });
    });
  },

  changeMainImage(mainImage, clickedThumbnail, allThumbnails) {
    const newSrc = clickedThumbnail.getAttribute('data-src') || clickedThumbnail.querySelector('img').src;
    const newAlt = clickedThumbnail.getAttribute('alt') || clickedThumbnail.querySelector('img').alt || '';
    
    // Update active state on thumbnails
    allThumbnails.forEach(thumbnail => {
      thumbnail.classList.remove('border-etsy-orange', 'ring-2', 'ring-etsy-orange');
      thumbnail.classList.add('border-transparent');
    });
    
    clickedThumbnail.classList.remove('border-transparent');
    clickedThumbnail.classList.add('border-etsy-orange');
    
    // Animate image change
    mainImage.style.transition = 'opacity 0.3s ease';
    mainImage.style.opacity = '0.5';
    
    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.alt = newAlt;
      
      mainImage.onload = () => {
        mainImage.style.opacity = '1';
      };
    }, 150);
  }
};

/**
 * Global function for product templates (backward compatibility)
 */
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

// Export for ES6 modules
export default ProductGalleryModule;
