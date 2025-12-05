document.addEventListener('DOMContentLoaded', function() {
  const firstNavItem = document.querySelector('.er-help-category-nav .e-filter-item');
  const listing = document.querySelector('.er-help-loop');
  const nav = document.querySelector('.er-help-category-nav');
  
  // Check if search query param is in URL
  const urlParams = new URLSearchParams(window.location.search);

  if (firstNavItem && ! urlParams.has('search')) {
    setTimeout(() => {
      // Triger click
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      firstNavItem.dispatchEvent(clickEvent);
      listing.classList.remove('init');
    }, 500)    
  }

  // if(urlParams.has('search')) {
  //   nav.classList.add('hidden');
  // }

  const loopGrid = document.querySelector('.er-help-loop');
  const searchInput = document.querySelector('.er-help-center-search input');
  const searchInputButton = document.querySelector('.er-help-center-search-button');

  const filterHelpCenter = (search) => {
    const loopGridItems = loopGrid.querySelectorAll('.e-loop-item');

    if(loopGridItems.length > 0) {
        loopGridItems.forEach((item) => {
        const itemContent = item.textContent.toLowerCase();
        const searchQuery = search.toLowerCase();
        if (itemContent.includes(searchQuery)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }    
  }

  if(searchInputButton) {
    searchInputButton.addEventListener('click', () => {
      filterHelpCenter(searchInput ? searchInput.value : '');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      if (searchInput.value === '') {
        filterHelpCenter('');
      }
    });

    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        filterHelpCenter(searchInput ? searchInput.value : '');
      }
    });
  }  

  if (searchInput && loopGrid) {
      const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        filterHelpCenter(searchInput ? searchInput.value : '');
      });
    });
    observer.observe(loopGrid, { childList: true, subtree: true });
  }
  

});