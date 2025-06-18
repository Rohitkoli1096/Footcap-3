
  // Select elements
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");
  const body = document.body;

  // Open navigation
  navOpenBtn.addEventListener("click", () => {
    navbar.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("nav-active");
  });

  // Close navigation
  navCloseBtn.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("nav-active");
  });

  // Close nav when clicking on overlay
  overlay.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("nav-active");
  });










/// fOR tHE CART WISHLIST BUTTON  

  // Initialize counts and state on page load
  const wishlistKey = "wishlistItems";
  const cartKey = "cartItems";

  function loadState() {
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Update counts in navbar
    document.querySelectorAll(".nav-action-btn").forEach(btn => {
      if (btn.querySelector("ion-icon")?.name === "heart-outline") {
        btn.querySelector(".nav-action-badge").textContent = wishlist.length;
      }
      if (btn.querySelector("ion-icon")?.name === "bag-outline") {
        btn.querySelector(".nav-action-badge").textContent = cart.length;
      }
    });

    // Set active icons in product cards
    document.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".card-title a").textContent.trim();
      const heartBtn = card.querySelector("ion-icon[name='heart-outline'], ion-icon[name='heart']");
      const cartBtn = card.querySelector("ion-icon[name='cart-outline'], ion-icon[name='cart']");

      if (wishlist.includes(title) && heartBtn) {
        heartBtn.name = "heart";
      }
      if (cart.includes(title) && cartBtn) {
        cartBtn.name = "cart";
      }
    });
  }

  function updateCount(type, items) {
    const selector = type === "wishlist" ? "heart-outline" : "bag-outline";
    const icon = document.querySelector(`.nav-action-btn ion-icon[name="${selector}"]`);
    if (icon) {
      const badge = icon.closest(".nav-action-btn").querySelector(".nav-action-badge");
      if (badge) badge.textContent = items.length;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadState();

    document.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".card-title a").textContent.trim();

      // Wishlist
      const heartBtn = card.querySelector("ion-icon[name='heart-outline'], ion-icon[name='heart']");
      if (heartBtn) {
        heartBtn.closest("button").addEventListener("click", () => {
          let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
          if (wishlist.includes(title)) {
            wishlist = wishlist.filter(item => item !== title);
            heartBtn.name = "heart-outline";
          } else {
            wishlist.push(title);
            heartBtn.name = "heart";
          }
          localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
          updateCount("wishlist", wishlist);
        });
      }

      // Cart
      const cartBtn = card.querySelector("ion-icon[name='cart-outline'], ion-icon[name='cart']");
      if (cartBtn) {
        cartBtn.closest("button").addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
          if (cart.includes(title)) {
            cart = cart.filter(item => item !== title);
            cartBtn.name = "cart-outline";
          } else {
            cart.push(title);
            cartBtn.name = "cart";
          }
          localStorage.setItem(cartKey, JSON.stringify(cart));
          updateCount("cart", cart);
        });
      }
    });
  });

