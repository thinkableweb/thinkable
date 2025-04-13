        document.addEventListener('DOMContentLoaded', function() {
            const accordionTriggers = document.querySelectorAll('.accordion-trigger');
            
            function closeOtherAccordions(currentAccordion) {
                accordionTriggers.forEach(trigger => {
                    if (trigger !== currentAccordion) {
                        const content = trigger.nextElementSibling;
                        const icon = trigger.querySelector('.accordion-icon');
                        
                        content.style.maxHeight = '0px';
                        if(icon) {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
            }

            accordionTriggers.forEach(trigger => {
                trigger.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.accordion-icon');
                    
                    closeOtherAccordions(this);
                    
                    if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        if(icon) {
                            icon.style.transform = 'rotate(-45deg)';
                        }
                    } else {
                        content.style.maxHeight = '0px';
                        if(icon) {
                            icon.style.transform = 'rotate(0deg)';
                        }
                    }
                });
            });
        });
