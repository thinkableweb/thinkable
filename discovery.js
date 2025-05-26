// Brand Discovery Form with Password Protection and Formspree Integration
document.addEventListener('DOMContentLoaded', function() {
  // Password Protection Elements
  const passwordLayer = document.getElementById('password-protection');
  const mainContainer = document.getElementById('brand-discovery-container');
  const accessCodeInput = document.getElementById('access-code');
  const passwordSubmit = document.getElementById('password-submit');
  const passwordError = document.getElementById('password-error');
  
  // Form Elements
  const form = document.getElementById('brandDiscoveryForm');
  const sections = document.querySelectorAll('.form-section');
  const nextButtons = document.querySelectorAll('.btn-next');
  const backButtons = document.querySelectorAll('.btn-back');
  
  // Set current section
  let currentSection = 0; // Starting with the introduction section
  
  // Set the access codes (in a real implementation, you'd verify this server-side)
  // IMPORTANT: This is not secure for production use, as anyone can view the source
  const correctCodes = ['thinkable2025', 'revolution', 'client2025']; // You can add multiple codes
  
  // Check if user has already authenticated
  const isAuthenticated = sessionStorage.getItem('brandDiscoveryAuthenticated');
  if (isAuthenticated === 'true') {
    // Skip password entry if already authenticated
    passwordLayer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
  }
  
  // Password submission
  passwordSubmit.addEventListener('click', validatePassword);
  accessCodeInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      validatePassword();
    }
  });
  
  function validatePassword() {
    const enteredCode = accessCodeInput.value.trim();
    
    // Check if the entered code matches any of the correct codes
    if (correctCodes.includes(enteredCode)) {
      // Set authentication in session storage
      sessionStorage.setItem('brandDiscoveryAuthenticated', 'true');
      
      // Hide password layer and show main form with animation
      passwordLayer.style.opacity = '0';
      setTimeout(() => {
        passwordLayer.classList.add('hidden');
        mainContainer.classList.remove('hidden');
      }, 500);
    } else {
      // Show error message with shake animation
      passwordError.textContent = 'Invalid access code. Please try again.';
      passwordError.classList.add('visible');
      
      // Add shake animation to input
      accessCodeInput.classList.add('shake');
      
      // Remove shake animation after it completes
      setTimeout(() => {
        accessCodeInput.classList.remove('shake');
      }, 600);
    }
  }
  
  // Clear error message when input changes
  accessCodeInput.addEventListener('input', function() {
    passwordError.classList.remove('visible');
  });
  
  // Navigate to next section
  function goToNextSection(nextSection) {
    // Hide current section
    document.getElementById(`section-${currentSection}`).classList.remove('active');
    
    // Show next section
    document.getElementById(`section-${nextSection}`).classList.add('active');
    
    // Update current section
    currentSection = nextSection;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Next button event listeners
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nextSection = parseInt(this.getAttribute('data-next'));
      
      // Validate current section before proceeding (optional)
      if (validateSection(currentSection)) {
        goToNextSection(nextSection);
      }
    });
  });
  
  // Back button event listeners
  backButtons.forEach(button => {
    button.addEventListener('click', function() {
      const prevSection = parseInt(this.getAttribute('data-back'));
      goToNextSection(prevSection);
    });
  });

  // Brand Personality Slider Configuration
  const personalitySliders = [
    {
      id: 'casual-elegant',
      leftLabel: 'Casual',
      rightLabel: 'Elegant'
    },
    {
      id: 'detailed-minimalist',
      leftLabel: 'Detailed',
      rightLabel: 'Minimalist'
    },
    {
      id: 'mainstream-quirky',
      leftLabel: 'Mainstream',
      rightLabel: 'Quirky'
    },
    {
      id: 'innovative-traditional',
      leftLabel: 'Innovative',
      rightLabel: 'Traditional'
    },
    {
      id: 'luxury-affordable',
      leftLabel: 'Luxury',
      rightLabel: 'Affordable'
    }
  ];

  // Initialize personality sliders
  personalitySliders.forEach(sliderConfig => {
    const slider = document.getElementById(sliderConfig.id);
    const valueDisplay = document.getElementById(`${sliderConfig.id}-value`);
    const labelDisplay = document.getElementById(`${sliderConfig.id}-label`);
    
    if (slider && valueDisplay && labelDisplay) {
      // Update display on slider change
      slider.addEventListener('input', function() {
        const value = parseInt(this.value);
        valueDisplay.textContent = value;
        
        // Update label based on value
        if (value < 50) {
          labelDisplay.textContent = sliderConfig.leftLabel;
        } else {
          labelDisplay.textContent = sliderConfig.rightLabel;
        }
        
        // Update personality insight
        updatePersonalityInsight();
      });
      
      // Initialize display
      const initialValue = parseInt(slider.value);
      valueDisplay.textContent = initialValue;
      labelDisplay.textContent = initialValue < 50 ? sliderConfig.leftLabel : sliderConfig.rightLabel;
    }
  });

  // Function to generate personality insights
  function updatePersonalityInsight() {
    const casualElegant = parseInt(document.getElementById('casual-elegant')?.value || 30);
    const detailedMinimalist = parseInt(document.getElementById('detailed-minimalist')?.value || 70);
    const mainstreamQuirky = parseInt(document.getElementById('mainstream-quirky')?.value || 80);
    const innovativeTraditional = parseInt(document.getElementById('innovative-traditional')?.value || 35);
    const luxuryAffordable = parseInt(document.getElementById('luxury-affordable')?.value || 75);
    
    const insightElement = document.getElementById('personality-insight');
    
    if (!insightElement) return;
    
    let insight = '';
    
    // Revolutionary brand analysis based on Thinkable philosophy
    if (mainstreamQuirky > 60 && innovativeTraditional < 50 && casualElegant < 60) {
      insight = "Revolutionary Disruptor: Your brand is positioned to challenge conventions and rewrite industry rules. This combination suggests you’re ready to break the mold and create new market categories.";
    } else if (luxuryAffordable < 40 && detailedMinimalist > 60 && casualElegant > 50) {
      insight = "Premium Minimalist: Your brand commands attention through sophisticated simplicity. You're positioned to lead through understated excellence and refined experiences.";
    } else if (innovativeTraditional < 40 && mainstreamQuirky < 40) {
      insight = "Mainstream Innovator: Your brand brings cutting-edge thinking to mass markets. You have the potential to make revolutionary ideas accessible to everyone.";
    } else if (mainstreamQuirky > 70 && casualElegant < 40) {
      insight = "Quirky Authority: Your brand combines unconventional thinking with serious expertise. This positioning can make complex ideas memorable and engaging.";
    } else if (detailedMinimalist < 30 && luxuryAffordable < 30) {
      insight = "Luxury Maximalist: Your brand believes in abundant, rich experiences. You’re positioned to create brands that feel exclusive and comprehensive.";
    } else {
      insight = "Balanced Revolutionary: Your brand has the flexibility to lead change while maintaining broad appeal. This adaptability can be a powerful strategic advantage when applied with conviction.";
    }
    
    insightElement.textContent = insight;
  }

  // Initialize personality insight on page load
  updatePersonalityInsight();
  
  // Form submission with Formspree
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateSection(currentSection)) {
      // Show loading indicator
      const submitButton = document.querySelector('.btn-submit');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      // Collect form data
      const formData = new FormData(form);
      const formObject = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Add timestamp to formObject
      formObject['submission_time'] = new Date().toISOString();

      // Add a client identifier (optional)
      try {
        // Get from localStorage if they've visited before
        const clientId = localStorage.getItem('clientId') || generateClientId();
        localStorage.setItem('clientId', clientId);
        formObject['client_id'] = clientId;
      } catch (e) {
        console.error("Could not generate client ID:", e);
      }
      
      // Send data to Formspree
      fetch('https://formspree.io/f/xjkwebpl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        
        // Hide current section
        document.getElementById(`section-${currentSection}`).classList.remove('active');
        
        // Show completion screen
        document.getElementById('completion-screen').classList.add('active');
        
        // Clear form data from localStorage
        localStorage.removeItem('brandDiscoveryData');
      })
      .catch((error) => {
        console.error('Error:', error);
        
        // Show error message
        alert('There was an error submitting your form. Please try again or contact us directly.');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
    }
  });
  
  // Basic validation
  function validateSection(sectionNumber) {
    const section = document.getElementById(`section-${sectionNumber}`);
    const requiredFields = section.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else {
        field.classList.remove('error');
      }
    });
    
    return valid;
  }
  
  // Save form progress to localStorage when inputs change
  form.addEventListener('input', function(e) {
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    localStorage.setItem('brandDiscoveryData', JSON.stringify(formObject));
  });
  
  // Load saved progress from localStorage
  const savedData = localStorage.getItem('brandDiscoveryData');
  if (savedData) {
    try {
      const formObject = JSON.parse(savedData);
      
      Object.keys(formObject).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
          if (field.type === 'checkbox') {
            field.checked = formObject[key] === 'on';
          } else if (field.type === 'range') {
            field.value = formObject[key];
            // Update personality sliders
            personalitySliders.forEach(sliderConfig => {
              if (field.id === sliderConfig.id) {
                const valueDisplay = document.getElementById(`${sliderConfig.id}-value`);
                const labelDisplay = document.getElementById(`${sliderConfig.id}-label`);
                if (valueDisplay && labelDisplay) {
                  const value = parseInt(field.value);
                  valueDisplay.textContent = value;
                  labelDisplay.textContent = value < 50 ? sliderConfig.leftLabel : sliderConfig.rightLabel;
                }
              }
            });
          } else {
            field.value = formObject[key];
          }
        }
      });
      
      // Update personality insight after loading saved data
      updatePersonalityInsight();
    } catch (e) {
      console.error('Error loading saved form data:', e);
    }
  }
  
  // Helper function to generate a simple client ID
  function generateClientId() {
    return 'client_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  // Add smooth animation when transitioning between sections
  sections.forEach(section => {
    section.addEventListener('animationend', function() {
      if (this.classList.contains('active')) {
        this.style.opacity = 1;
      } else {
        this.style.opacity = 0;
      }
    });
  });
  
  // For demo/testing: Add a way to reset authentication (you can remove this in production)
  // This adds a "backdoor" to reset the password by adding ?reset=true to the URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('reset') === 'true') {
    sessionStorage.removeItem('brandDiscoveryAuthenticated');
    window.location.href = window.location.pathname; // Reload without the query parameter
  }
  
  // Add error styling for required fields
  document.querySelectorAll('input[required], textarea[required]').forEach(field => {
    field.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.classList.add('error');
      } else {
        this.classList.remove('error');
      }
    });
    
    field.addEventListener('input', function() {
      if (this.value.trim()) {
        this.classList.remove('error');
      }
    });
  });
});
