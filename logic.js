// ========== Navigation Handling ==========
const quizBtn = document.getElementById("quizBtn");
const carouselBtn = document.getElementById("carouselBtn");
const apiBtn = document.getElementById("apiBtn");

const quizSection = document.getElementById("quizSection");
const carouselSection = document.getElementById("carouselSection");
const apiSection = document.getElementById("apiSection");

function showSection(section) {
  quizSection.classList.add("hidden");
  carouselSection.classList.add("hidden");
  apiSection.classList.add("hidden");
  section.classList.remove("hidden");
}

quizBtn.addEventListener("click", () => showSection(quizSection));
carouselBtn.addEventListener("click", () => showSection(carouselSection));
apiBtn.addEventListener("click", () => showSection(apiSection));

// ========== Quiz ==========
const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
  { question: "Which language is used for styling web pages?", options: ["HTML", "CSS", "Python"], answer: 1 },
  { question: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<javascript>", "<script>"], answer: 2 }
];

const quizContainer = document.getElementById("quizContainer");

quizData.forEach((q, i) => {
  const div = document.createElement("div");
  div.innerHTML = `<p>${i+1}. ${q.question}</p>`;
  q.options.forEach((opt, j) => {
    div.innerHTML += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br>`;
  });
  quizContainer.appendChild(div);
});

document.getElementById("submitQuiz").addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, i) => {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (answer && parseInt(answer.value) === q.answer) score++;
  });
  document.getElementById("quizResult").textContent = `You scored ${score} / ${quizData.length}`;
});

// ========== Carousel ==========
const carouselImages = [
  "https://picsum.photos/600/300?random=1",
  "https://picsum.photos/600/300?random=2",
  "https://picsum.photos/600/300?random=3",
  "https://picsum.photos/600/300?random=4"
];

let currentIndex = 0;
const carouselImage = document.getElementById("carouselImage");

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
  carouselImage.src = carouselImages[currentIndex];
});

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  carouselImage.src = carouselImages[currentIndex];
});

// ========== API Fetch ==========
document.getElementById("loadJoke").addEventListener("click", async () => {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
});
