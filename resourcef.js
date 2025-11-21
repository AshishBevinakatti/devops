document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.getElementById("education-form-section");
  const formContainer = document.getElementById("education-form-container");
  const nextButton = document.getElementById("next-btn");
  const prevButton = document.getElementById("prev-btn");
  const progressText = document.querySelector(".progress-indicator span");
  const progressBar = document.querySelector(".progress");
  const summaryContainer = document.getElementById("summary");
  const summaryContent = document.getElementById("summary-content");
  const exportButton = document.getElementById("export-json");
  const resourcesContainer = document.createElement("div");
  const typewriterText = document.getElementById("typewriter-text");

  resourcesContainer.id = "resources-container";

  let currentStep = 1;
  const totalSteps = 3;
  const userSelections = {};

  const typewriterPhrases = [
    "Find the Best Resources for Your Learning Journey",
    "Search once, and let our system bring you the most relevant content",
    "Get personalized recommendations that match your query and skill level",
    "Discover the Best Learning Resources for Your Goals",
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeWriter() {
    const currentPhrase = typewriterPhrases[phraseIndex];
    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
      setTimeout(typeWriter, 500);
    } else {
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
  }

  const questionnaire = {
    1: {
      title: "What is your Query?",
      subtext: "Enter a keyword or topic you want to learn about.",
      key: "query",
      type: "text",
      placeholder: "e.g., JavaScript, Machine Learning",
    },
    2: {
      title: "Category",
      subtext: "Help us narrow down the results by providing a category.",
      key: "category",
      type: "text",
      placeholder: "e.g., Web Development, Data Science",
    },
    3: {
      title: "What is your Role?",
      subtext: "Your role helps us tailor the content level.",
      key: "role",
      type: "radio",
      options: [
        { label: "School Student", value: "School Student" },
        { label: "College Student", value: "College Student" },
        { label: "Working Professional", value: "Working Professional" },
        { label: "Lifelong Learner", value: "Lifelong Learner" },
      ],
    },
  };

  const mockDatabase = [
    {
      title: "JavaScript for Beginners",
      category: "Web Development",
      description: "A comprehensive guide for beginners.",
      type: "Article",
      url: "#",
      keywords: ["javascript", "web development", "beginners"],
    },
    {
      title: "Advanced CSS Techniques",
      category: "Web Development",
      description: "Take your CSS skills to the next level.",
      type: "Video",
      url: "#",
      keywords: ["css", "web development", "advanced"],
    },
    {
      title: "Python for Data Science",
      category: "Data Science",
      description: "Learn the fundamentals of Python for data analysis.",
      type: "Course",
      url: "#",
      keywords: ["python", "data science", "beginners"],
    },
    {
      title: "Introduction to Machine Learning",
      category: "Data Science",
      description: "A beginner-friendly introduction to ML.",
      type: "Article",
      url: "#",
      keywords: ["machine learning", "data science", "introduction"],
    },
    {
      title: "The Design of Everyday Things",
      category: "Design",
      description: "A classic book on user-centered design.",
      type: "Book",
      url: "#",
      keywords: ["design", "ux", "usability"],
    },
  ];

  const renderStep = (step) => {
    formContainer.innerHTML = "";
    const stepData = questionnaire[step];

    const title = document.createElement("h1");
    title.textContent = stepData.title;
    formContainer.appendChild(title);

    if (stepData.subtext) {
      const subtext = document.createElement("p");
      subtext.className = "subtext";
      subtext.textContent = stepData.subtext;
      formContainer.appendChild(subtext);
    }

    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    if (stepData.type === "radio") {
      stepData.options.forEach((option) => {
        const optionContainer = document.createElement("div");
        optionContainer.className = "option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = stepData.key;
        input.value = option.value;

        if (userSelections[stepData.key] === option.value) input.checked = true;

        const label = document.createElement("label");
        label.textContent = option.label;

        optionContainer.appendChild(input);
        optionContainer.appendChild(label);
        formGroup.appendChild(optionContainer);
      });
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = stepData.placeholder;
      input.name = stepData.key;
      input.value = userSelections[stepData.key] || "";
      formGroup.appendChild(input);
    }

    formContainer.appendChild(formGroup);
    updateProgress();
  };

  const updateProgress = () => {
    progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
    prevButton.style.display = currentStep === 1 ? "none" : "inline-block";
    nextButton.textContent = currentStep === totalSteps ? "Finish" : "Next";
  };

  const saveStepData = () => {
    const stepData = questionnaire[currentStep];
    const input = formContainer.querySelector(
      `input[name="${stepData.key}"]:checked, input[name="${stepData.key}"]`
    );
    if (input) userSelections[stepData.key] = input.value.trim();
  };

  const displayResources = () => {
    formContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    progressText.parentElement.style.display = "none";

    summaryContainer.style.display = "block";
    summaryContent.innerHTML = "<h2>Recommended Resources</h2>";
    summaryContent.appendChild(resourcesContainer);

    const { query, category } = userSelections;

    const filteredResources = mockDatabase.filter((resource) => {
      const queryMatch = resource.keywords.some((k) =>
        query.toLowerCase().includes(k)
      );
      const categoryMatch = resource.category
        .toLowerCase()
        .includes(category.toLowerCase());
      return queryMatch || categoryMatch;
    });

    resourcesContainer.innerHTML = "";

    if (filteredResources.length === 0) {
      resourcesContainer.innerHTML =
        "<p>No resources found. Try a different search.</p>";
      return;
    }

    filteredResources.forEach((r) => {
      const card = document.createElement("div");
      card.className = "resource-card";
      card.innerHTML = `
                <h3>${r.title}</h3>
                <p>${r.description}</p>
                <a href="${r.url}" target="_blank">View Resource</a>
            `;
      resourcesContainer.appendChild(card);
    });
  };

  nextButton.addEventListener("click", () => {
    saveStepData();
    const currentKey = questionnaire[currentStep].key;

    if (
      !userSelections[currentKey] ||
      userSelections[currentKey].trim() === ""
    ) {
      alert("Please enter a value to continue.");
      return;
    }

    if (currentStep < totalSteps) {
      currentStep++;
      renderStep(currentStep);
    } else {
      displayResources();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      renderStep(currentStep);
      summaryContainer.style.display = "none";
    }
  });

  exportButton.addEventListener("click", () => {
    const json = JSON.stringify(userSelections, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "user_selections.json";
    a.click();

    URL.revokeObjectURL(url);
  });

  renderStep(currentStep);
  typeWriter();
});
