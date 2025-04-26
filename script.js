document.addEventListener('DOMContentLoaded', function() {
    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    let itemWidth = carouselItems[0].offsetWidth;
    const itemGap = 24; // Gap between items in pixels
    
    // Update the active dot
    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    
    // Scroll to a specific item
    function scrollToItem(index) {
        if (index < 0) index = 0;
        if (index >= carouselItems.length) index = carouselItems.length - 1;
        
        currentIndex = index;
        const scrollAmount = index * (itemWidth + itemGap);
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        updateDots(index);
    }
    
    // Handle next and previous buttons
    nextBtn.addEventListener('click', function() {
        scrollToItem(currentIndex + 1);
    });
    
    prevBtn.addEventListener('click', function() {
        scrollToItem(currentIndex - 1);
    });
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            scrollToItem(index);
        });
    });
    
    // Handle scroll events to update the dots
    carousel.addEventListener('scroll', function() {
        itemWidth = carouselItems[0].offsetWidth; // Recalculate on scroll
        const scrollPosition = carousel.scrollLeft;
        const newIndex = Math.round(scrollPosition / (itemWidth + itemGap));
        
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updateDots(currentIndex);
        }
    });
    
    // Recalculate item width on resize and adjust position
    window.addEventListener('resize', function() {
        const newItemWidth = carouselItems[0].offsetWidth;
        if (Math.abs(newItemWidth - itemWidth) > 5) {
            itemWidth = newItemWidth;
            const scrollAmount = currentIndex * (itemWidth + itemGap);
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'auto'
            });
        }
    });
    
    // CTA Share Button Functionality
    const shareCtaBtn = document.getElementById('shareCtaBtn');
    
    shareCtaBtn.addEventListener('click', function() {
        const shareData = {
            title: 'SDG2: Zero Hunger - Target 2.2',
            text: 'Join the fight against hunger! Learn about ending malnutrition and achieving food security worldwide.',
            url: window.location.href
        };
        
        if (navigator.share) {
            // Mobile share using Web Share API
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            // Fallback for desktop: Copy URL to clipboard
            navigator.clipboard.writeText(shareData.url)
                .then(() => {
                    alert('Link copied to clipboard! Share it with your friends.');
                })
                .catch((error) => {
                    console.log('Error copying to clipboard:', error);
                    alert('Please copy this link manually: ' + shareData.url);
                });
        }
    });
    
    // Lazy loading for images (simulated)
    const placeholders = document.querySelectorAll('.bg-placeholder');
    
    function simulateLazyLoading() {
        placeholders.forEach((placeholder, index) => {
            setTimeout(() => {
                placeholder.style.backgroundColor = getRandomColor();
                placeholder.innerHTML = '<p>Image Loaded</p>';
            }, index * 300);
        });
    }
    
    function getRandomColor() {
        const colors = ['#e0e0e0', '#d0d0d0', '#c0c0c0', '#b0b0b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setTimeout(simulateLazyLoading, 1000);
    
    // Animation on scroll
    const highlightCards = document.querySelectorAll('.highlight-card');
    const storyCards = document.querySelectorAll('.story-card');
    
    function checkVisibility() {
        const threshold = window.innerHeight * 0.8;
        
        highlightCards.forEach(card => {
            const distanceFromTop = card.getBoundingClientRect().top;
            if (distanceFromTop < threshold) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        storyCards.forEach(card => {
            const distanceFromTop = card.getBoundingClientRect().top;
            if (distanceFromTop < threshold) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    highlightCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    storyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
});