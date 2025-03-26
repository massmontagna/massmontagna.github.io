document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const sidebar = document.getElementById('sidebar');
    let lastScroll = 0;
    let scrollTimeout;

    // Function to update header width
    function updateHeaderWidth() {
        if (sidebar.classList.contains('inactive')) {
            header.style.width = '100%';
            header.style.marginLeft = '0';
        } else {
            header.style.width = 'calc(100% - 26em)';
            header.style.marginLeft = '26em';
        }
    }

    // Listen for sidebar toggle
    sidebar.addEventListener('transitionstart', function(e) {
        if (e.propertyName === 'margin-left') {
            updateHeaderWidth();
        }
    });

    // Initial width setup
    updateHeaderWidth();

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Clear the timeout
        clearTimeout(scrollTimeout);
        
        // Add compact class when scrolling down
        if (currentScroll > 100) {
            header.classList.add('compact');
        } else {
            header.classList.remove('compact');
        }
        
        // Handle show/hide based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        
        // Set a timeout to show the header when scrolling stops
        scrollTimeout = setTimeout(function() {
            header.classList.remove('hidden');
        }, 100);
    });
}); 