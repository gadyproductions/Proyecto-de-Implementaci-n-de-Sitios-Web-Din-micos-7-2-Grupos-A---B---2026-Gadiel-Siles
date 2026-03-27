const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = [
  { title: "Miniatura", src: "../img/todo.jpg" },
  { title: "AngryBird", src: "../img/amarillo.jpg" },
  { title: "Peruano", src: "../img/faraon.jpg" },
  { title: "Ferb", src: "../img/ferb.jpg" },
  { title: "Luffy", src: "../img/Luffy.jpg" },
  { title: "Goku", src: "../img/Goku.JPG" },
  { title: "Maduro", src: "../img/maduro.jpg" },
  { title: "Milei", src: "../img/milei.jpg" },
  { title: "Fino", src: "../img/perro.jpg" }
];

let currentIndex = 0;

// 🔥 GENERAR GALERÍA
function renderGallery() {
  gallery.innerHTML = images.map((img, index) => `
    <button class="thumb" data-index="${index}">
      <img src="${img.src}" alt="${img.title}" />
      <span>${img.title}</span>
    </button>
  `).join("");

  document.querySelectorAll(".thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      openLightbox(btn.dataset.index);
    });
  });
}

// 🔥 ABRIR
function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.remove("hidden");
}

// 🔥 CERRAR
function closeLightbox() {
  lightbox.classList.add("hidden");
}

// 🔥 ACTUALIZAR IMAGEN
function updateLightbox() {
  const img = images[currentIndex];
  lightboxImage.src = img.src;
  lightboxTitle.textContent = img.title;
}

// 🔥 NAVEGACIÓN
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightbox();
}

// EVENTOS
closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});

// INICIAR
renderGallery();