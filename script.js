// Tombol Ganti Tema
const toggleBtn = document.getElementById("theme-toggle");
            const icon = document.getElementById("theme-icon");
            const root = document.documentElement;
            if (localStorage.getItem("theme") === "dark") {
              setDarkMode();
            }
            toggleBtn.addEventListener("click", () => {
              if (root.classList.contains("dark-mode")) {
                setLightMode();
              } else {
                setDarkMode();
              }
            });
            function setDarkMode() {
              root.classList.add("dark-mode");
              icon.classList.remove("bx-moon");
              icon.classList.add("bx-sun");
              localStorage.setItem("theme", "dark");
            }
            function setLightMode() {
              root.classList.remove("dark-mode");
              icon.classList.remove("bx-sun");
              icon.classList.add("bx-moon");
              localStorage.setItem("theme", "light");
            }

// Card My Project
const projects = [
    {
      id: 1,
      name: "On Progress",
      shortDesc: "This Project Under Construction",
      description: "Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon",
      images: [
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg"
      ],
      hoverImages: [
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg"
      ]
    },
    {
      id: 2,
      name: "Coming Soon",
      shortDesc: "This Project Under Construction",
      description: "Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon",
      images: [
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg"
      ],
      hoverImages: [
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg"
      ]
    },
    {
      id: 3,
      name: "Coming Soon",
      shortDesc: "This Project Under Construction",
      description: "Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon",
      images: [
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg"
      ],
      hoverImages: [
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg"
      ]
    },
    {
      id: 2,
      name: "Coming Soon",
      shortDesc: "This Project Under Construction",
      description: "Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon Coming soon",
      images: [
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg"
      ],
      hoverImages: [
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg",
        "img/1.jpg",
        "img/2.jpg"
      ]
    }
  ];

  const projectsContainer = document.querySelector('.projects-container');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalBigImage = document.getElementById('modal-big-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const btnReview = document.getElementById('btn-review');
  const navPrev = document.getElementById('nav-prev');
  const navNext = document.getElementById('nav-next');
  const navThumbnails = document.getElementById('nav-thumbnails');
  const modalCloseBtn = document.querySelector('.modal-close');

  let currentProject = null;
  let currentBigImageIndex = 0;
  let navStartIndex = 0;  // For sliding thumbnails

  // We will keep track of intervals per card to cycle images on hover
  const cardIntervals = new WeakMap();

  // Create project cards
  function createProjectCards() {
    projects.forEach((project, index) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      card.setAttribute('aria-label', `View details for project ${project.name}`);

      // Image container with two images for hover effect
      const imageContainer = document.createElement('div');
      imageContainer.className = 'card-image-container';

      const imgDefault = document.createElement('img');
      imgDefault.src = project.images[0];
      imgDefault.className = 'default-img';
      imgDefault.alt = project.name + " main image";

      const imgHover = document.createElement('img');
      imgHover.src = project.hoverImages[0];
      imgHover.className = 'hover-img';
      imgHover.alt = project.name + " hover image";

      imageContainer.appendChild(imgDefault);
      imageContainer.appendChild(imgHover);

      // Content
      const content = document.createElement('div');
      content.className = 'card-content';

      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = project.name;

      const desc = document.createElement('p');
      desc.className = 'card-desc';
      desc.textContent = project.shortDesc;

      content.appendChild(title);
      content.appendChild(desc);

      card.appendChild(imageContainer);
      card.appendChild(content);

      // On click open modal with project
      card.addEventListener('click', () => {
        openModal(project);
      });
      // Keyboard accessible: Enter and Space
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(project);
        }
      });

      // On mouse enter, cycle through images
      card.addEventListener('mouseenter', () => {
          let i = 0; // Index untuk gambar
          const imgs = project.images; // Ambil gambar dari proyek
          const defaultImg = imgDefault; // Gambar default
          // Hentikan interval jika sudah ada
          if (cardIntervals.has(card)) {
              clearInterval(cardIntervals.get(card));
          }

        // Mulai interval untuk mengubah gambar setiap 2 detik
    const intervalId = setInterval(() => {
        defaultImg.src = imgs[i]; // Ubah gambar default
        imgHover.src = project.hoverImages[i]; // Ubah gambar hover
        i = (i + 1) % imgs.length; // Loop kembali ke gambar pertama
    }, 2000); // Ganti gambar setiap 2 detik
    // Simpan interval di WeakMap
    cardIntervals.set(card, intervalId);
});

      // On mouse leave, stop cycling and revert to the first image
      card.addEventListener('mouseleave', () => {
          // Hentikan interval jika ada
          if (cardIntervals.has(card)) {
              clearInterval(cardIntervals.get(card));
              cardIntervals.delete(card); // Hapus interval dari WeakMap
          }
          // Kembalikan gambar ke gambar pertama
          imgDefault.src = project.images[0];
          imgHover.src = project.hoverImages[0];
      });

      projectsContainer.appendChild(card);
    });
  }

  // Open modal, initialize modal state
  function openModal(project) {
    currentProject = project;
    currentBigImageIndex = 0;
    navStartIndex = 0;
    modalBackdrop.classList.add('active');
    modalTitle.textContent = project.name;
    modalDesc.textContent = project.description;
    btnReview.onclick = () => {
      window.location.href = `index.html`; //https://your-site.com/projects/${project.id}
    };
    renderModalImages();
    updateModalBigImage();
    updateNavButtons();
    // Focus the close button when modal opens
    modalCloseBtn.focus();
  }

  // Close modal
  function closeModal() {
    modalBackdrop.classList.remove('active');
    currentProject = null;
    currentBigImageIndex = 0;
    navStartIndex = 0;
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if(e.target === modalBackdrop) {
      closeModal();
    }
  });
  // Keyboard escape to close modal when open
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  // Render thumbnails based on navStartIndex
  function renderModalImages() {
    navThumbnails.innerHTML = '';
    if (!currentProject) return;
    const images = currentProject.images;

    // Show up to 5 thumbnails sliding window from navStartIndex
    for(let i = navStartIndex; i < Math.min(navStartIndex + 5, images.length); i++) {
      const thumb = document.createElement('div');
      thumb.className = 'nav-thumb';
      if (i === currentBigImageIndex) {
        thumb.classList.add('active');
      }
      const img = document.createElement('img');
      img.src = images[i];
      img.alt = `Thumbnail image ${i + 1} for ${currentProject.name}`;
      thumb.appendChild(img);
      thumb.tabIndex = 0;
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('aria-pressed', i === currentBigImageIndex);
      thumb.addEventListener('click', () => {
        currentBigImageIndex = i;
        updateModalBigImage();
        renderModalImages();
      });
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          currentBigImageIndex = i;
          updateModalBigImage();
          renderModalImages();
        }
      });
      navThumbnails.appendChild(thumb);
    }
  }

  // Update the big image shown in modal
  function updateModalBigImage() {
    if (!currentProject) return;
    modalBigImage.src = currentProject.images[currentBigImageIndex];
    modalBigImage.alt = `Image ${currentBigImageIndex + 1} for ${currentProject.name}`;

    // If the active big image is outside current nav range, shift nav window to include it
    if (currentBigImageIndex < navStartIndex) {
      navStartIndex = currentBigImageIndex;
      renderModalImages();
      updateNavButtons();
    } else if (currentBigImageIndex >= navStartIndex + 5) {
      navStartIndex = currentBigImageIndex - 4; // 5 - 1
      renderModalImages();
      updateNavButtons();
    }
  }

  // Update navigation buttons disabled state
  function updateNavButtons() {
    if (!currentProject) return;
    const totalImages = currentProject.images.length;

    navPrev.disabled = navStartIndex <= 0;
    navNext.disabled = navStartIndex + 5 >= totalImages;

    // Prevent cases where next disables but there are images left if images less than 5
    if (totalImages <= 5) {
      navPrev.disabled = true;
      navNext.disabled = true;
    }
  }

  // Navigation buttons click handlers
  navPrev.addEventListener('click', () => {
    if (navStartIndex > 0) {
      navStartIndex = Math.max(0, navStartIndex - 2); // Scroll back by 2 images
      renderModalImages();
      updateNavButtons();
    }
  });
  navNext.addEventListener('click', () => {
    if (currentProject) {
      const totalImages = currentProject.images.length;
      if (navStartIndex + 5 < totalImages) {
        navStartIndex = Math.min(totalImages - 5, navStartIndex + 2); // Scroll forward by 2 images
        renderModalImages();
        updateNavButtons();
      }
    }
  });

  // Initialize the project cards
  createProjectCards();

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  });
};

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};
