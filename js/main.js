/* ============================================
   Veterinary Website - Main JavaScript
   ============================================ */

$(document).ready(function() {
    
    // ============================================
    // Dark/Light Mode Toggle
    // ============================================
    function initTheme() {
        var theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            updateThemeIcon('dark');
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon('light');
        }
    }
    
    function updateThemeIcon(theme) {
        var icon = $('#themeIcon');
        var text = $('#themeText');
        if (theme === 'dark') {
            icon.removeClass('fa-moon').addClass('fa-sun');
            text.text('Light Mode');
        } else {
            icon.removeClass('fa-sun').addClass('fa-moon');
            text.text('Dark Mode');
        }
    }
    
    $('#themeToggle').on('click', function() {
        var isDark = document.body.classList.contains('dark-mode');
        if (isDark) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });
    
    initTheme();
    
    // ============================================
    // Navbar Active State
    // ============================================
    function setActiveNav() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Handle regular nav links
        $('.navbar-nav .nav-link').each(function() {
            var linkPage = $(this).attr('href');
            if (linkPage && (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html'))) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
        
        // Handle dropdown items
        $('.dropdown-item').each(function() {
            var linkPage = $(this).attr('href');
            if (linkPage && linkPage === currentPage) {
                $(this).closest('.dropdown').find('.nav-link').addClass('active');
            }
        });
    }
    
    setActiveNav();
    
    // ============================================
    // Smooth Scroll
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // ============================================
    // Contact Form AJAX Submission
    // ============================================
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate AJAX submission
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        
        // Simulate API call
        setTimeout(function() {
            showMessage('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
            $('#contactForm')[0].reset();
            submitBtn.prop('disabled', false).html(originalText);
        }, 1500);
    });
    
    // ============================================
    // Appointment Form AJAX Submission
    // ============================================
    $('#appointmentForm').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            name: $('#apptName').val(),
            email: $('#apptEmail').val(),
            phone: $('#apptPhone').val(),
            petName: $('#petName').val(),
            petType: $('#petType').val(),
            service: $('#service').val(),
            date: $('#apptDate').val(),
            time: $('#apptTime').val(),
            message: $('#apptMessage').val()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.petName || !formData.service || !formData.date || !formData.time) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate AJAX submission
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Booking...');
        
        // Simulate API call
        setTimeout(function() {
            showMessage('Appointment booked successfully! We will confirm your appointment via email.', 'success');
            $('#appointmentForm')[0].reset();
            submitBtn.prop('disabled', false).html(originalText);
        }, 1500);
    });
    
    // ============================================
    // Login Form AJAX Submission
    // ============================================
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();
        
        if (!email || !password) {
            showMessage('Please enter both email and password.', 'error');
            return;
        }
        
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Logging in...');
        
        setTimeout(function() {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    });
    
    // ============================================
    // Register Form AJAX Submission
    // ============================================
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        var formData = {
            name: $('#regName').val(),
            email: $('#regEmail').val(),
            phone: $('#regPhone').val(),
            password: $('#regPassword').val(),
            confirmPassword: $('#regConfirmPassword').val()
        };
        
        if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }
        
        if (formData.password.length < 6) {
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }
        
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Registering...');
        
        setTimeout(function() {
            showMessage('Registration successful! Redirecting to login...', 'success');
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1500);
        }, 1500);
    });
    
    // ============================================
    // Show Message Function
    // ============================================
    function showMessage(message, type) {
        var alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        var alertHtml = '<div class="alert ' + alertClass + ' alert-dismissible fade show" role="alert">' +
                       message +
                       '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                       '</div>';
        
        // Remove existing alerts
        $('.alert').remove();
        
        // Add new alert
        $('body').prepend(alertHtml);
        
        // Auto dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
        
        // Scroll to top
        $('html, body').animate({ scrollTop: 0 }, 500);
    }
    
    // ============================================
    // FAQ Accordion
    // ============================================
    $('.faq-item .faq-question').on('click', function() {
        var faqItem = $(this).parent();
        var faqAnswer = faqItem.find('.faq-answer');
        
        // Close other items
        $('.faq-item').not(faqItem).find('.faq-answer').slideUp();
        $('.faq-item').not(faqItem).removeClass('active');
        
        // Toggle current item
        faqItem.toggleClass('active');
        faqAnswer.slideToggle();
    });
    
    // ============================================
    // Gallery Lightbox (if needed)
    // ============================================
    $('.gallery-item img').on('click', function() {
        var imgSrc = $(this).attr('src');
        var lightbox = '<div class="lightbox"><img src="' + imgSrc + '"><span class="lightbox-close">&times;</span></div>';
        $('body').append(lightbox);
        $('.lightbox').fadeIn();
    });
    
    $(document).on('click', '.lightbox-close, .lightbox', function(e) {
        if (e.target === this) {
            $('.lightbox').fadeOut(function() {
                $(this).remove();
            });
        }
    });
    
    // ============================================
    // Phone Number Formatting
    // ============================================
    $('input[type="tel"]').on('input', function() {
        var value = $(this).val();
        if (value && !value.startsWith('+')) {
            // Auto-add + if not present (for international numbers)
            // This is just a placeholder - adjust based on your needs
        }
    });
    
    // ============================================
    // Lazy Loading Images
    // ============================================
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // Mobile Menu Close on Link Click
    // ============================================
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // ============================================
    // Animation on Scroll
    // ============================================
    function animateOnScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }
    
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();
    
});

