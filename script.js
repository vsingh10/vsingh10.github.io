// ========== Theme Toggle ========== //
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');
const body = document.body;

// Set saved theme from localStorage (if any)
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  body.classList.add(storedTheme);
  icon.className = storedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Toggle theme on click
toggleBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


// ========== Highlight Navbar Link on Scroll ========== //
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-right a");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active");
        }
      });
    }
  });
});


// ========== Restart GIF When in View (Project 3) ========== //
document.addEventListener("DOMContentLoaded", () => {
  const gif = document.getElementById("flowFieldGif");

  if (gif) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const src = gif.src;
          gif.src = "";      // Remove src temporarily
          gif.src = src;     // Reassign to reload
        }
      });
    }, { threshold: 0.05 });

    observer.observe(gif);
  }
});
