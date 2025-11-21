document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dream-college-form');
    if (!form) return;

    const questions = form.querySelectorAll('.question');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const stepCounter = document.getElementById('step-counter');
    const progressBarFill = document.querySelector('.progress-bar-fill');

    let currentStep = 1;
    const totalSteps = questions.length;

    const updateFormView = () => {
        // Update step counter text
        stepCounter.textContent = Step ${currentStep} of ${totalSteps};

        // Update progress bar
        const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBarFill.style.width = ${progressPercent}%;

        // Show the current question and hide others
        questions.forEach(question => {
            const step = parseInt(question.dataset.step);
            if (step === currentStep) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });

        // Update button visibility
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
        nextBtn.style.display = currentStep === totalSteps ? 'none' : 'inline-block';
        submitBtn.style.display = currentStep === totalSteps ? 'inline-block' : 'none';
    };

    nextBtn.addEventListener('click', () => {
        const currentQuestion = form.querySelector(.question[data-step="${currentStep}"]);
        const input = currentQuestion.querySelector('input');
        
        // Basic validation for required fields
        if (input.hasAttribute('required') && !input.value.trim()) {
            alert('This field is required.');
            return;
        }

        if (currentStep < totalSteps) {
            currentStep++;
            updateFormView();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateFormView();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submissionData = {};
        for (const [key, value] of formData.entries()) {
            submissionData[key] = value;
        }
        console.log('Form Submission Data:', submissionData);
        alert('Thank you! Your dream college profile is being generated.');
        // Optionally, reset the form and go back to the start
        // form.reset();
        // currentStep = 1;
        // updateFormView();
    });

    // Initial setup
    updateFormView();
});

// Theme switcher logic needs to be available for the new page as well.
// This can be part of the global main.js which is already included.
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const getPreferredTheme = () => {
        return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };

    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        if (sunIcon && moonIcon) {
            sunIcon.style.display = theme === 'light' ? 'block' : 'none';
            moonIcon.style.display = theme === 'light' ? 'none' : 'block';
        }
    };

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // Apply theme on initial load
    applyTheme(getPreferredTheme());
});