const questions = [
      {
        question: "Kokios paskolos sumos jūs pageidaujate?",
        answers: [
          { text: "Mažiau nei 5 000 €", icon: "fas fa-coins" },
          { text: "Nuo 5 000 € iki 15 000 €", icon: "fas fa-money-bill-wave" },
          { text: "Nuo 15 000 € iki 50 000 €", icon: "fas fa-money-check-alt" },
          { text: "Daugiau nei 50 000 €", icon: "fas fa-university" }
        ]
      },
      {
        question: "Koks pageidaujamas grąžinimo terminas?",
        answers: [
          { text: "Mažiau nei 12 mėnesių", icon: "fas fa-clock" },
          { text: "Nuo 1 iki 3 metų", icon: "fas fa-calendar-alt" },
          { text: "Nuo 3 iki 5 metų", icon: "fas fa-calendar-check" },
          { text: "Daugiau nei 5 metai", icon: "fas fa-hourglass-end" }
        ]
      },
      {
        question: "Koks jūsų profesinis statusas?",
        answers: [
          { text: "Nuolatinis darbuotojas", icon: "fas fa-briefcase" },
          { text: "Terminuotas darbuotojas", icon: "fas fa-business-time" },
          { text: "Savarankiškai dirbantis", icon: "fas fa-laptop" },
          { text: "Pensininkas", icon: "fas fa-umbrella-beach" },
          { text: "Studentas", icon: "fas fa-user-graduate" }
        ]
      },
      {
        question: "Kokios jūsų mėnesinės grynosios pajamos?",
        answers: [
          { text: "Mažiau nei 1 500 €", icon: "fas fa-euro-sign" },
          { text: "Nuo 1 500 € iki 2 500 €", icon: "fas fa-comment-dollar" },
          { text: "Nuo 2 500 € iki 4 000 €", icon: "fas fa-hand-holding-usd" },
          { text: "Daugiau nei 4 000 €", icon: "fas fa-piggy-bank" }
        ]
      },
      {
        question: "Ar turite kitų paskolų?",
        answers: [
          { text: "Ne, jokių paskolų", icon: "fas fa-check-circle" },
          { text: "Taip, būsto paskolą", icon: "fas fa-home" },
          { text: "Taip, vieną ar kelias vartojimo paskolas", icon: "fas fa-shopping-cart" },
          { text: "Taip, kelių tipų paskolas", icon: "fas fa-layer-group" }
        ]
      }
    ];

    let currentQuestion = 0;
    
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const progressElement = document.getElementById("progress");
    const quizElement = document.getElementById("quiz");
    const contactFormElement = document.getElementById("contact-form");
    const prevBtn = document.getElementById("prevBtn");

    let userAnswers = [];

    function showQuestion(index) {
      const question = questions[index];
      questionElement.textContent = question.question;
      answersElement.innerHTML = "";
      question.answers.forEach((answer, i) => {
        const button = document.createElement("button");
        button.innerHTML = `<i class="${answer.icon}"></i><span>${answer.text}</span>`;
        button.classList.add("answer", "fade-in");
        button.addEventListener("click", () => selectAnswer(i));
        answersElement.appendChild(button);
      });
      updateProgress();
      updateNavButtons();
    }

    function selectAnswer(answerIndex) {
      userAnswers[currentQuestion] = answerIndex;
      updateAnswerStyles();
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          showQuestion(currentQuestion);
        } else {
          showResult();
        }
      }, 500);
    }

    function updateAnswerStyles() {
      const answerButtons = answersElement.querySelectorAll('.answer');
      answerButtons.forEach((button, index) => {
        if (index === userAnswers[currentQuestion]) {
          button.style.backgroundColor = '#d4edda';
          button.style.borderColor = '#c3e6cb';
        } else {
          button.style.backgroundColor = '#ffffff';
          button.style.borderColor = '#003366';
        }
      });
    }

    function updateProgress() {
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      progressElement.style.width = `${progress}%`;
    }

    function updateNavButtons() {
      prevBtn.disabled = currentQuestion === 0;
    }

    function showResult() {
      quizElement.style.display = "none";
      contactFormElement.style.display = "block";
    }

    prevBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
      }
    });

    document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  const loader = document.getElementById("loader");
  const popup = document.getElementById("popup");

  // Afficher le loader
  loader.style.display = "flex";

  // Récupération des réponses sous forme de texte pour l'email
const answersText = questions.map((question, i) => {
  const answerIndex = userAnswers[i];
  return `${question.question}: ${question.answers[answerIndex].text}`;
}).join('\n');

// Création des paramètres à envoyer via EmailJS
const templateParams = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  phone: document.getElementById("phone").value,
  message: document.getElementById("message").value,
  userAnswers: answersText
};

// Appel à EmailJS pour envoyer l'email
emailjs.send('service_acugylm', 'template_43w8pob', templateParams)
  .then(() => {
    console.log('Email envoyé avec succès');
    form.reset();
    // Afficher le popup après l'envoi de l'email
    loader.style.display = "none";
    popup.style.display = "flex";
  })
  .catch((error) => {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    // Masquer le loader même en cas d'erreur
    loader.style.display = "none";
  });
});

document.getElementById("closePopup").addEventListener("click", function() {
  document.getElementById("popup").style.display = "none";
});

showQuestion(currentQuestion);