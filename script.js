
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("primary-navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });
}

const images = document.querySelectorAll(".heritage-card img");

const imageModal = document.createElement("div");

imageModal.setAttribute("role", "dialog");
imageModal.setAttribute("aria-modal", "true");
imageModal.setAttribute("aria-label", "Image preview");

Object.assign(imageModal.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    zIndex: "1000",
    overflow: "auto"
});

const previewImage = document.createElement("img");

Object.assign(previewImage.style, {
    maxWidth: "90%",
    maxHeight: "80vh",
    objectFit: "contain",
    borderRadius: "10px"
});

const imageCaption = document.createElement("p");

Object.assign(imageCaption.style, {
    color: "white",
    marginTop: "15px",
    textAlign: "center"
});

const closeButton = document.createElement("button");

closeButton.textContent = "×";
closeButton.setAttribute("aria-label", "Close image preview");

Object.assign(closeButton.style, {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "40px",
    color: "white",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px 12px"
});

imageModal.appendChild(closeButton);
imageModal.appendChild(previewImage);
imageModal.appendChild(imageCaption);

document.body.appendChild(imageModal);

let previousFocus = null;

images.forEach(image => {
    image.style.cursor = "pointer";

    image.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        previousFocus = document.activeElement;

        previewImage.src = image.src;
        previewImage.alt = image.alt;
        imageCaption.textContent = image.alt;

        imageModal.style.display = "flex";
        document.body.style.overflow = "hidden";

        closeButton.focus();
    });
});

function closeImageModal() {
    imageModal.style.display = "none";
    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }
}

closeButton.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", event => {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && imageModal.style.display === "flex") {
        closeImageModal();
    }
});

const topButton = document.createElement("button");

topButton.textContent = "↑";
topButton.setAttribute("aria-label", "Back to top");

Object.assign(topButton.style, {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    width: "48px",
    height: "48px",
    border: "none",
    borderRadius: "50%",
    backgroundColor: "#b77b42",
    color: "white",
    fontSize: "25px",
    cursor: "pointer",
    display: "none",
    zIndex: "999",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)"
});

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display = window.scrollY > 300 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
