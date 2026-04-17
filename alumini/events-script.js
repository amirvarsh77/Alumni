const guestLectures = [
  {
    id: 1,
    title: "Fullstack Web Development Bootcamp",
    speaker: "Mr. P Yoganathan",
    date: "23-06-2023",
    venue: "Seminar Hall",
    shortDescription: "Career-focused session on starting in full-stack development.",
    description: "An interactive bootcamp introducing students to frontend and backend development, real-world learning paths, and how to begin a career in full-stack web development.",
    outcome: "Helped students understand web development roles, industry expectations, and beginner project directions.",
    poster: "poster1.png"
  },
  {
    id: 2,
    title: "Guest Lecture on Salesforce",
    speaker: "Mr. Rohid Sairam",
    date: "19-08-2023",
    venue: "Auditorium",
    shortDescription: "Introduction to cloud platforms, deployment models, and business tools.",
    description: "The session explored Salesforce basics, enterprise cloud applications, SaaS concepts, and how modern businesses manage digital workflows.",
    outcome: "Students gained understanding of cloud computing, CRM platforms, and enterprise deployment use cases.",
    poster: "poster2.png"
  },
  {
    id: 3,
    title: "Fullstack Web Development",
    speaker: "Mr. Antony Prince J",
    date: "05-09-2023",
    venue: "Main Conference Hall",
    shortDescription: "Practical introduction to frontend and backend integration.",
    description: "A hands-on lecture covering web architecture, user interface flow, backend APIs, and project structuring for full-stack applications.",
    outcome: "Students received foundational exposure to full-stack workflows and application building.",
    poster: "poster3.png"
  },
  {
    id: 4,
    title: "Fullstack Web Development Career Session",
    speaker: "Mr. Antonyraj",
    date: "08-09-2023",
    venue: "Seminar Hall A",
    shortDescription: "Career roadmap and opportunities in full-stack roles.",
    description: "This guest lecture focused on full-stack job roles, required skills, interview preparation, and how students can build strong portfolios.",
    outcome: "Helped students understand skill progression and career preparation for full-stack jobs.",
    poster: "poster4.png"
  },
  {
    id: 5,
    title: "Smart Tech",
    speaker: "Mr. Ayyappan Rajagopal",
    date: "16-09-2023",
    venue: "Innovation Lab",
    shortDescription: "Awareness session on emerging technologies and current trends.",
    description: "The talk covered rapidly evolving technologies, industry transformation, digital innovation, and how students can stay relevant in a changing tech landscape.",
    outcome: "Created awareness about the latest technology trends and future-ready skills.",
    poster: "poster5.png"
  },
  {
    id: 6,
    title: "Workshop on Ethical Hacking",
    speaker: "Mr. Ramsundar",
    date: "09-10-2023 to 10-10-2023",
    venue: "Cyber Security Lab",
    shortDescription: "Two-day cybersecurity workshop on ethical hacking fundamentals.",
    description: "Students were introduced to ethical hacking concepts, vulnerability awareness, safe testing practices, and cyber law basics in an academic setting.",
    outcome: "Strengthened understanding of cybersecurity concepts and the legal framework around ethical hacking.",
    poster: "poster6.png"
  },
  {
    id: 7,
    title: "Two Days Workshop on Full Stack Web Development",
    speaker: "Mr. Arokia Praveen",
    date: "05-01-2024 & 06-01-2024",
    venue: "Computer Lab 2",
    shortDescription: "Immersive workshop for building a strong full-stack base.",
    description: "A two-day hands-on workshop guiding students through web development fundamentals, application flow, frontend design, and backend connectivity.",
    outcome: "Built a strong practical foundation in full-stack development.",
    poster: "poster7.png"
  },
  {
    id: 8,
    title: "Two Days Bootcamp on Full Stack Development",
    speaker: "Mr. Praabindh P",
    date: "11-01-2024 & 12-01-2024",
    venue: "Tech Seminar Hall",
    shortDescription: "Bootcamp focused on frontend and backend development practice.",
    description: "This event emphasized project-oriented learning with exposure to UI building, backend logic, database flow, and deployment thinking.",
    outcome: "Students gained hands-on frontend and backend exposure through guided learning.",
    poster: "poster8.png"
  }
];

const guestTrack = document.getElementById("guestTrack");
const guestModal = document.getElementById("guestModal");
const guestModalBackdrop = document.getElementById("guestModalBackdrop");
const guestModalClose = document.getElementById("guestModalClose");

const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("guestModalTitle");
const modalSpeaker = document.getElementById("modalSpeaker");
const modalDate = document.getElementById("modalDate");
const modalVenue = document.getElementById("modalVenue");
const modalDescription = document.getElementById("modalDescription");
const modalOutcome = document.getElementById("modalOutcome");

function createGuestCards() {
  guestTrack.innerHTML = guestLectures.map((event, index) => `
    <article class="guest-card">
      <div class="guest-card-inner">
        <div class="guest-card-top">
          <div class="guest-card-index">${String(index + 1).padStart(2, "0")}</div>
          <div class="guest-card-date">${event.date}</div>
        </div>

        <h3 class="guest-card-title">${event.title}</h3>
        <p class="guest-card-speaker"><strong>Speaker:</strong> ${event.speaker}</p>
        <p class="guest-card-desc">${event.shortDescription}</p>

        <button class="btn btn-red" onclick="openGuestModal(${event.id})">View More</button>
      </div>
    </article>
  `).join("");
}

function openGuestModal(id) {
  const event = guestLectures.find(item => item.id === id);
  if (!event) return;

  modalPoster.src = event.poster;
  modalTitle.textContent = event.title;
  modalSpeaker.textContent = event.speaker;
  modalDate.textContent = event.date;
  modalVenue.textContent = event.venue || "Venue will be updated";
  modalDescription.textContent = event.description || "Details will be updated.";
  modalOutcome.textContent = event.outcome || "Outcome will be updated.";

  guestModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGuestModal() {
  guestModal.classList.remove("active");
  document.body.style.overflow = "";
}

guestModalClose.addEventListener("click", closeGuestModal);
guestModalBackdrop.addEventListener("click", closeGuestModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeGuestModal();
  }
});



createGuestCards();

const guestScrollLeft = document.querySelector(".guest-scroll-hint.left");
const guestScrollRight = document.querySelector(".guest-scroll-hint.right");

function scrollGuestTrack(direction = 1) {
  const offset = guestTrack.clientWidth * 0.75;
  guestTrack.scrollBy({
    left: direction * offset,
    behavior: "smooth"
  });
}

if (guestScrollLeft) {
  guestScrollLeft.addEventListener("click", () => scrollGuestTrack(-1));
}

if (guestScrollRight) {
  guestScrollRight.addEventListener("click", () => scrollGuestTrack(1));
}
