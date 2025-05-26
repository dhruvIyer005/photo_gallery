// Gallery functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photoCards = document.querySelectorAll(".photo-card");
  const modal = document.getElementById("photoModal");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLikeBtn = document.getElementById("modalLikeBtn");

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Filter photos
      photoCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.classList.remove("hidden");
          card.classList.add("show");
        } else {
          card.classList.add("hidden");
          card.classList.remove("show");
        }
      });
    });
  });

  // Like functionality
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      const icon = button.querySelector("i");
      const countSpan = button.querySelector(".like-count");
      const currentCount = Number.parseInt(countSpan.textContent);

      if (button.classList.contains("liked")) {
        // Unlike
        button.classList.remove("liked");
        icon.classList.remove("fas");
        icon.classList.add("far");
        countSpan.textContent = currentCount - 1;
      } else {
        // Like
        button.classList.add("liked");
        icon.classList.remove("far");
        icon.classList.add("fas");
        countSpan.textContent = currentCount + 1;

        // Add heart animation
        button.style.transform = "scale(1.2)";
        setTimeout(() => {
          button.style.transform = "scale(1)";
        }, 200);
      }
    });
  });

  // Modal functionality
  photoCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector(".photo-img");
      const title = card.querySelector(".photo-title").textContent;
      const description = card.querySelector(".photo-description").textContent;
      const categoryBadge = card.querySelector(".category-badge").innerHTML;
      const likeBtn = card.querySelector(".like-btn");
      const likeCount = likeBtn.querySelector(".like-count").textContent;

      // Set modal content
      modalImage.src = img.src;
      modalImage.alt = img.alt;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalCategory.innerHTML = categoryBadge;
      modalLikeBtn.querySelector(".like-count").textContent = likeCount;

      // Copy like state
      if (likeBtn.classList.contains("liked")) {
        modalLikeBtn.classList.add("liked");
        modalLikeBtn.querySelector("i").classList.remove("far");
        modalLikeBtn.querySelector("i").classList.add("fas");
      } else {
        modalLikeBtn.classList.remove("liked");
        modalLikeBtn.querySelector("i").classList.remove("fas");
        modalLikeBtn.querySelector("i").classList.add("far");
      }

      // Show modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Modal like functionality
  modalLikeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const icon = modalLikeBtn.querySelector("i");
    const countSpan = modalLikeBtn.querySelector(".like-count");
    const currentCount = Number.parseInt(countSpan.textContent);

    if (modalLikeBtn.classList.contains("liked")) {
      // Unlike
      modalLikeBtn.classList.remove("liked");
      icon.classList.remove("fas");
      icon.classList.add("far");
      countSpan.textContent = currentCount - 1;
    } else {
      // Like
      modalLikeBtn.classList.add("liked");
      icon.classList.remove("far");
      icon.classList.add("fas");
      countSpan.textContent = currentCount + 1;

      // Add heart animation
      modalLikeBtn.style.transform = "scale(1.2)";
      setTimeout(() => {
        modalLikeBtn.style.transform = "scale(1)";
      }, 200);
    }
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";
});
