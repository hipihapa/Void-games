// This is the fixed category handler script
// Save this as 'category-sort.js' in your assets/js/ folder

document.addEventListener('DOMContentLoaded', function() {
    // Get references to the elements
    const categoryTabs = document.querySelectorAll('.tab');
    const gamesList = document.getElementById('gamesList');
    
    // Function to filter games by category
    function filterGamesByCategory(category) {
      console.log('Filtering by category:', category);
      
      // Clear the current games display
      gamesList.innerHTML = '';
      
      // Get the combined games data
      const allGames = window.gamesData && window.games2Data ? 
                      [...window.gamesData, ...window.games2Data] : 
                      (window.gamesData || window.games2Data || []);
      
      if (!allGames.length) {
        console.error('No games data available');
        return;
      }
      
      // Filter games based on the selected category
      const filteredGames = category === 'All' 
          ? allGames 
          : allGames.filter(game => game.category === category);
      
      console.log(`Found ${filteredGames.length} games for category ${category}`);
      
      // Display the filtered games
      filteredGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-item';
        gameElement.innerHTML = `
          <div class="game-icon">
            <img src="${game.imgSrc}" alt="${game.title} icon">
          </div>
          <h3 class="game-title">${game.title}</h3>
        `;
        
        // Add click handler with same logic as in the original code
        gameElement.onclick = async () => {
          // Show loading overlay if it exists
          const loadingOverlay = document.getElementById('loadingOverlay');
          if (loadingOverlay && loadingOverlay.classList.contains('fade-out')) {
            loadingOverlay.classList.remove('fade-out');
            document.getElementById('loadingText').textContent = 'Preparing game...';
            document.getElementById('progressFill').style.width = '0%';
          }
          
          try {
            // Progress animation
            const progressFill = document.getElementById('progressFill');
            if (progressFill) {
              progressFill.style.width = '30%';
              await new Promise(resolve => setTimeout(resolve, 100));
              progressFill.style.width = '60%';
              await new Promise(resolve => setTimeout(resolve, 100));
              progressFill.style.width = '100%';
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          } catch (error) {
            console.error('Error in loading animation:', error);
          } finally {
            // Navigate to the game
            window.location.href = `/Classes.html?game=${encodeURIComponent(game.link)}`;
          }
        };
        
        gamesList.appendChild(gameElement);
      });
      
      // If no games match the category
      if (filteredGames.length === 0) {
        gamesList.innerHTML = `<div style="color: white; text-align: center; width: 100%; padding: 20px;">No games found in the "${category}" category</div>`;
      }
    }
    
    // Add click event listeners to all category tabs
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Filter games by the selected category
        const category = this.textContent.trim();
        filterGamesByCategory(category);
      });
    });
    
    // Initialize with the default (All) category
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      filterGamesByCategory(activeTab.textContent.trim());
    }
    
    // Expose the filter function globally so it can be called from other scripts
    window.filterGamesByCategory = filterGamesByCategory;
  });