document.addEventListener('DOMContentLoaded', function() {

  const loopGrid = document.querySelector('.er-online-partner-loop');
  const searchInput = document.querySelector('.er-online-partner-search input');
  const searchInputButton = document.querySelector('.er-online-partner-search-button');

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