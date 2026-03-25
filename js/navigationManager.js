/**
 * Navigation Manager — Dynamic Active State
 * 
 * Sets the active class on navigation links based on the current page URL.
 * Works across all pages and updates on page load.
 */

(function() {
  'use strict';

  function initNavigation() {
    // Get the current page filename from the URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Map of page files to nav link indices
    const pageMap = {
      'index.html': 0,        // Home
      '': 0,                  // Root (also Home)
      'about.html': 1,        // About
      'youtube.html': 2,      // Art Studio
      'contact.html': 3       // Contact
    };

    // Get the nav links
    const navLinks = document.querySelectorAll('.nav-center a');
    const mobileLinks = document.querySelectorAll('.mobile-drop a[href]');

    // Determine which link should be active
    const activeIndex = pageMap[currentPage] || pageMap['index.html'];
    const navAnchor = 'index.html';
    
    // Handle direct file access (e.g., opening about.html directly)
    let correctIndex = activeIndex;
    navLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      if (href && currentPage !== 'index.html' && currentPage !== '') {
        // For pages folder files, match the filename
        if (href.includes(currentPage)) {
          correctIndex = index;
        }
      }
    });

    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    mobileLinks.forEach(link => link.classList.remove('active'));

    // Add active class to the correct link
    if (navLinks[correctIndex]) {
      navLinks[correctIndex].classList.add('active');
    }
    
    // Also set active on mobile menu
    mobileLinks.forEach((link, index) => {
      if (index === correctIndex) {
        link.classList.add('active');
      }
    });

    // Handle navigation link clicks
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        // Remove active from all links
        navLinks.forEach(l => l.classList.remove('active'));
        mobileLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        link.classList.add('active');
        
        // Also update mobile menu if it's open
        const href = link.getAttribute('href');
        mobileLinks.forEach((mobileLink, index) => {
          if (mobileLink.getAttribute('href') === href) {
            mobileLink.classList.add('active');
          }
        });
        
        // Close mobile menu if open
        const mobileDrop = document.getElementById('mobile-drop');
        const hamburger = document.getElementById('hamburger');
        if (mobileDrop && mobileDrop.classList.contains('open')) {
          mobileDrop.classList.remove('open');
          hamburger.classList.remove('open');
        }
      });
    });

    // Also handle mobile menu link clicks
    mobileLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        // Remove active from all links
        navLinks.forEach(l => l.classList.remove('active'));
        mobileLinks.forEach(l => l.classList.remove('active'));
        
        // Add active to clicked link
        link.classList.add('active');
        
        // Also update desktop menu
        const href = link.getAttribute('href');
        navLinks.forEach((navLink) => {
          if (navLink.getAttribute('href') === href) {
            navLink.classList.add('active');
          }
        });
        
        // Close mobile menu
        const mobileDrop = document.getElementById('mobile-drop');
        const hamburger = document.getElementById('hamburger');
        if (mobileDrop) {
          mobileDrop.classList.remove('open');
        }
        if (hamburger) {
          hamburger.classList.remove('open');
        }
      });
    });
  }

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
