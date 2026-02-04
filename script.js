const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const navLinks = document.querySelectorAll(".nav nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    event.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Highlight active section in navigation
const sections = document.querySelectorAll("section");
const navLinksArray = Array.from(navLinks);

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinksArray.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Update footer year dynamically
const footer = document.querySelector("footer p");
const currentYear = new Date().getFullYear();
footer.textContent = footer.textContent.replace(/\d{4}/, currentYear);

const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

document.body.classList.add(currentTheme);
themeToggle.textContent = currentTheme === "dark" ? "Light" : "Dark";

themeToggle.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  document.body.classList.remove("dark", "light");
  document.body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "Light" : "Dark";
});

const customCursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

document.addEventListener("click", () => {
  customCursor.classList.add("click-effect");
  setTimeout(() => customCursor.classList.remove("click-effect"), 300);
});
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / height) * 100;

  document.getElementById("scroll-progress").style.width = progress + "%";
});
const projects = [
  {
    title: "Car Rental Portal",
    desc: "Real-time booking, secure payments, admin dashboard.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Gym Management System",
    desc: "Memberships, billing, attendance tracking.",
    tech: ["Angular", "Flask", "MySQL"],
    link: "#"
  }
];

const projectContainer = document.getElementById("dynamic-projects");

projects.forEach(p => {
  projectContainer.innerHTML += `
    <article class="project">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="stack">
        ${p.tech.map(t => `<span>${t}</span>`).join("")}
      </div>
      <a class="button ghost" href="${p.link}">View Project</a>
    </article>
  `;
});
VanillaTilt.init(document.querySelectorAll(".project"), {
  max: 8,
  speed: 400,
  glare: true,
  "max-glare": 0.25
});
let secret = "";
document.addEventListener("keydown", e => {
  secret += e.key.toLowerCase();
  if (secret.includes("vivek")) {
    alert("👋 Hey recruiter, welcome to Vivek’s portfolio!");
    secret = "";
  }
});

// Debugging: Log when the contact form is added
console.log("Attempting to add contact form...");

// Update the script to use the placeholder for appending the contact form
const contactFormPlaceholder = document.getElementById("contact-form-placeholder");

if (contactFormPlaceholder) {
  const contactFormHTML = `
    <section id="contact-form" class="section reveal">
      <div class="section-title">
        <p>Contact Form</p>
        <h2>Get in Touch</h2>
      </div>
      <form id="contactForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit" class="button">Submit</button>
      </form>
    </section>
  `;

  contactFormPlaceholder.innerHTML = contactFormHTML;
  console.log("Contact form added successfully.");
} else {
  console.error("Contact form placeholder not found. Unable to add contact form.");
}

// Add event listener for form submission
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Form Submitted:", { name, email, message });
  alert("Thank you for reaching out! We will get back to you soon.");

  contactForm.reset();
});
fetch("data/projects.json")
  .then(res => res.json())
  .then(projects => {
    projects.forEach(p => {
      document.querySelector("#projects").innerHTML += `
        <article>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <img src="${p.image}" alt="${p.title} project screenshot">
        </article>
      `;
    });
  });
