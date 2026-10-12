let siteData = {};

document.addEventListener("DOMContentLoaded", () => {

    fetch("site-data.json")
        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load site-data.json");
            }

            return response.json();
        })
        .then(data => {

            siteData = data;

            renderProfile();
            renderServices();
            renderPracticeKeywords();
            renderGallery();
            renderCourtOrders();
            renderContact();

        })
        .catch(error => {

            console.error("Website data error:", error);

        });

});


/* ================= PROFILE ================= */

function renderProfile() {

    const profile = siteData.profile;

    if (!profile) return;

    const highlight = document.getElementById("professional-highlight");

if (highlight) {
    highlight.style.display =
        profile.professionalHighlight ? "inline-block" : "none";

    highlight.innerHTML =
        `<i class="fas fa-building-columns me-2"></i>
         ${profile.professionalHighlight || ""}`;
}


    document.getElementById("hero-title").textContent =
        profile.name || "Advocate Kanchan Das";


    document.getElementById("hero-designation").textContent =
        profile.designation || "";

    const heroQualifications =
        document.getElementById("hero-qualifications");

    if (heroQualifications) {
        heroQualifications.textContent =
            profile.qualifications || "";
        heroQualifications.style.display =
            profile.qualifications ? "block" : "none";
    }


    document.getElementById("hero-tagline").textContent =
        profile.tagline || "";


    document.getElementById("hero-intro").textContent =
        profile.intro || "";


    document.getElementById("about-intro").textContent =
        profile.about || "";


const chamberBox =
    document.getElementById("chamber-address-text");

const mapIframe =
    document.getElementById("map-iframe");

if (chamberBox && profile.chambers) {

    chamberBox.innerHTML = profile.chambers.map((chamber, index) => `
        <div class="chamber-option mb-4">

            <h5>
                <i class="fas fa-location-dot me-2"></i>
                ${chamber.name}
            </h5>

            <a
                href="#map-iframe"
                class="chamber-address-link"
                data-chamber-index="${index}">
                ${chamber.address}
            </a>

            <div class="mt-2">
                <a
                    href="${chamber.googleMapUrl}"
                    target="_blank"
                    rel="noopener"
                    class="btn btn-gold btn-sm">
                    <i class="fas fa-diamond-turn-right me-2"></i>
                    Get Directions
                </a>
            </div>

        </div>
    `).join("");

    chamberBox
        .querySelectorAll(".chamber-address-link")
        .forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                const index =
                    Number(link.dataset.chamberIndex);

                const chamber =
                    profile.chambers[index];

                if (mapIframe && chamber.mapEmbedUrl) {
                    mapIframe.src = chamber.mapEmbedUrl;
                }

            });

        });
}

   const footerPhone =
    document.getElementById("footer-phone");

if (footerPhone && profile.phone) {
    footerPhone.innerHTML =
        `<a href="tel:${profile.phone}">
            ${profile.phone}
         </a>`;
}


const footerEmail =
    document.getElementById("footer-email");

if (footerEmail && profile.email) {
    footerEmail.innerHTML =
        `<a href="mailto:${profile.email}">
            ${profile.email}
         </a>`;
}

   

    if (profile.phone) {

        const phoneLink = `tel:${profile.phone}`;

        document.getElementById("btn-call-hero").href = phoneLink;
        document.getElementById("contact-call").href = phoneLink;
        document.getElementById("float-call").href = phoneLink;

    }


    if (profile.whatsapp) {

        const whatsappMessage =
            "Hello Advocate Kanchan Das, I would like to enquire regarding a legal matter.";

        const whatsappUrl =
            `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

        document.getElementById("btn-wa-hero").href = whatsappUrl;
        document.getElementById("contact-wa").href = whatsappUrl;
        document.getElementById("float-wa").href = whatsappUrl;

    }


  

    document.getElementById("footer-year").textContent =
        new Date().getFullYear();

}


/* ================= SERVICES ================= */


/* ===== Compact Practice-Area Cards ===== */

const practiceKeywords = [
    { title: "Debt Recovery & DRT", serviceId: "drt-recovery" },
    { title: "Military & Service Law", serviceId: "aft-military-law" },
    { title: "Pension & Disability Matters", serviceId: "disability-pension" },
    { title: "Civil & Landlord-Tenant Disputes", serviceId: "civil-matters" },
    { title: "Property & Real Estate", serviceId: "land-property" },
    { title: "Criminal & Cyber Law", serviceId: "criminal-cyber" },
    { title: "Family & Divorce Matters", serviceId: "matrimonial-family" },
    { title: "Banking & Financial Disputes", serviceId: "banking-financial" },
    { title: "Labour & Employment Law", serviceId: "labour-employment" },
    { title: "Consumer Protection", serviceId: "consumer-protection" },
    { title: "Cheque Bounce Cases", serviceId: "cheque-bounce" },
    { title: "Trademark & Intellectual Property", serviceId: "trademark-ip" },
    { title: "Company & Taxation Matters", serviceId: "company-taxation" }
];


/* ===== Render Compact Cards ===== */

function renderPracticeKeywords() {
    const grid = document.getElementById("practice-keywords-grid");

    if (!grid) return;

    grid.innerHTML = "";

    practiceKeywords.forEach(item => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "practice-keyword-card";
        card.textContent = item.title;
        card.setAttribute("aria-label", `Learn about ${item.title}`);

        card.addEventListener("click", () => {
            openServiceModal(item.serviceId, item.title);
        });

        grid.appendChild(card);
    });
}


/* ===== Render Existing Detailed Cards ===== */

function renderServices() {
    const grid = document.getElementById("services-grid");

    if (!grid) return;

    grid.innerHTML = "";

    if (!siteData.services || siteData.services.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center text-white">
                Practice areas will be added shortly.
            </div>`;
        return;
    }

    siteData.services.forEach(service => {
        const column = document.createElement("div");

        column.className = "col-md-6 col-lg-4";

        const card = document.createElement("div");
        card.className = "service-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Read about ${service.title}`);

        const icon = document.createElement("div");
        icon.className = "service-icon";

        const iconElement = document.createElement("i");
        iconElement.className = `fas ${service.icon || "fa-scale-balanced"}`;
        iconElement.setAttribute("aria-hidden", "true");
        icon.appendChild(iconElement);

        const heading = document.createElement("h4");
        heading.textContent = service.title;

        const description = document.createElement("p");
        description.textContent = service.short || "";

        const readMore = document.createElement("span");
        readMore.className = "service-read";
        readMore.textContent = "Read Details ";

        const arrow = document.createElement("i");
        arrow.className = "fas fa-arrow-right ms-1";
        arrow.setAttribute("aria-hidden", "true");
        readMore.appendChild(arrow);

        card.append(icon, heading, description, readMore);

        card.addEventListener("click", () => {
            openServiceModal(service.id);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openServiceModal(service.id);
            }
        });

        column.appendChild(card);
        grid.appendChild(column);
    });
}


/* ===== Popup Content for Additional Demonstration Topics ===== */

const additionalPracticeDetails = {
    "criminal-cyber": {
        title: "Criminal & Cyber Law",
        paragraphs: [
            "This fictional demonstration section illustrates how general information about criminal-law and cyber-related issues may be organised.",
            "Illustrative topics may include criminal proceedings, cybercrime complaints and related legal processes, subject to applicable law and jurisdiction.",
            "The actual services offered must be confirmed by the advocate before publication."
        ]
    },
    "labour-employment": {
        title: "Labour & Employment Law",
        paragraphs: [
            "This fictional demonstration section presents general information about employment-related disputes.",
            "Illustrative topics may include wages, employment terms, workplace disputes and applicable labour-law proceedings.",
            "The appropriate legal route depends on the facts and applicable law."
        ]
    },
    "consumer-protection": {
        title: "Consumer Protection",
        paragraphs: [
            "This fictional demonstration section illustrates information about consumer rights and consumer disputes.",
            "Illustrative topics may include defective goods, deficient services and consumer complaints before competent forums.",
            "The appropriate remedy depends on the facts and applicable law."
        ]
    },
    "cheque-bounce": {
        title: "Cheque Bounce Cases",
        paragraphs: [
            "This fictional demonstration section provides an example of how information about cheque dishonour matters may be presented.",
            "Applicable legal requirements, notices, limitation periods and procedures depend on the circumstances of each matter.",
            "Actual professional services must be confirmed before publication."
        ]
    },
    "company-taxation": {
        title: "Company & Taxation Matters",
        paragraphs: [
            "This fictional demonstration section illustrates general information about company-related and taxation matters.",
            "Illustrative topics may include company compliance, commercial disputes and tax-related proceedings, subject to the relevant professional qualifications and jurisdiction.",
            "The advocate must verify the scope and accuracy of this information before publication."
        ]
    }
};


/* ===== Open the Shared Service Popup ===== */

function openServiceModal(serviceId, fallbackTitle = "") {
    const service = (siteData.services || []).find(
        item => item.id === serviceId
    );

    const extra = additionalPracticeDetails[serviceId];

    if (!service && !extra) return;

    const title = service ? service.title : extra.title;
    const paragraphs = service
        ? service.paragraphs
        : extra.paragraphs;

    document.getElementById("modalServiceTitle").textContent =
        title || fallbackTitle || "Service Details";

    const body = document.getElementById("modalServiceBody");
    body.innerHTML = "";

    if (Array.isArray(paragraphs)) {
        paragraphs.forEach(paragraph => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            body.appendChild(p);
        });
    } else {
        const p = document.createElement("p");
        p.textContent = service?.full || "";
        body.appendChild(p);
    }

    const profile = siteData.profile || {};
    const whatsappNumber = String(profile.whatsapp || "").replace(/\D/g, "");

    const message =
        `Hello, I would like to enquire regarding ${title}.`;

    const waButton = document.getElementById("modalWaBtn");

    if (whatsappNumber) {
        waButton.href =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        waButton.style.display = "";
    } else {
        waButton.removeAttribute("href");
        waButton.style.display = "none";
    }

    const modalElement = document.getElementById("serviceModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
}


/* ================= GALLERY ================= */

function renderGallery() {

    const track =
        document.getElementById("gallery-track");

    const empty =
        document.getElementById("gallery-empty");


    track.innerHTML = "";


    if (!siteData.gallery || siteData.gallery.length === 0) {

        empty.style.display = "block";

        return;
    }


    empty.style.display = "none";


    siteData.gallery.forEach(image => {

        const item = document.createElement("div");

        item.className = "gallery-item";


        item.innerHTML = `
    <img
    src="${image.image}"
    alt="${image.alt || image.caption || "Professional photograph"}"
    loading="lazy"
    draggable="false"
    onload="this.classList.add('loaded')">

    ${image.caption
        ? `<div class="p-3 fw-bold text-center">${image.caption}</div>`
        : ""}
`;

        track.appendChild(item);

    });
     startContinuousLoop("gallery-track");

}


/* ================= COURT ORDERS ================= */
function renderCourtOrders() {

    const grid = document.getElementById("orders-grid");
    const empty = document.getElementById("orders-empty");

    grid.innerHTML = "";

    if (!siteData.courtOrders || siteData.courtOrders.length === 0) {
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    siteData.courtOrders.forEach((order, index) => {

        const col = document.createElement("div");

        col.className = "court-order-slide";

        const isPDF = order.type === "pdf";

        if (isPDF) {

            col.innerHTML = `
                <div class="order-card pdf-order-card">

                    <div class="pdf-preview"
                         onclick="openCourtOrder(${index})">

                        <i class="fas fa-file-pdf"></i>

                        <h4>PDF Court Order</h4>

                        <p>Click to view the complete document</p>

                    </div>

                    <div class="order-card-content">

                        <h5>${order.title}</h5>

                        <p class="text-muted mb-2">
                            ${order.court || ""}
                        </p>

                        <p>
                            ${order.description || ""}
                        </p>

                        <button
                            type="button"
                            class="btn btn-outline-primary"
                            onclick="openCourtOrder(${index})">

                            <i class="fas fa-file-pdf me-1"></i>
                            View PDF

                        </button>

                    </div>

                </div>
            `;

        } else {

            col.innerHTML = `
                <div class="order-card">

                    <img
                        src="${order.image}"
                        alt="${order.alt || order.title}"
                        loading="lazy"
                        onclick="openCourtOrder(${index})"
                        style="cursor:pointer;">

                    <div class="order-card-content">

                        <h5>${order.title}</h5>

                        <p class="text-muted mb-2">
                            ${order.court || ""}
                        </p>

                        <p>
                            ${order.description || ""}
                        </p>

                        <button
                            type="button"
                            class="btn btn-outline-primary"
                            onclick="openCourtOrder(${index})">

                            <i class="fas fa-expand me-1"></i>
                            View Full Order

                        </button>

                    </div>

                </div>
            `;
        }

 grid.appendChild(col);

});

startContinuousLoop("orders-grid");

}

function openCourtOrder(index) {

    const order = siteData.courtOrders[index];

    if (!order) {
        console.error("Court order not found:", index);
        return;
    }


    const modalElement =
        document.getElementById("courtOrderModal");

    const modalTitle =
        document.getElementById("courtOrderModalTitle");

    const body =
        document.getElementById("courtOrderModalBody");


    if (!modalElement || !modalTitle || !body) {
        console.error("Court Order modal elements are missing.");
        return;
    }


    modalTitle.textContent =
        order.title || "Court Order";


    body.innerHTML = "";


    /* =====================================================
       PDF COURT ORDER
       ===================================================== */

    if (order.type === "pdf") {

        if (!order.file) {

            body.innerHTML = `
                <div class="pdf-error-message">
                    <i class="fas fa-triangle-exclamation"></i>
                    <p>PDF document is not available.</p>
                </div>
            `;

            console.error(
                "PDF file path is missing for:",
                order.title
            );

        } else {

            const iframe =
                document.createElement("iframe");

            iframe.src = order.file;

            iframe.title =
                order.title || "Court Order PDF";

            iframe.className =
                "court-order-pdf-viewer";

            iframe.setAttribute(
                "allowfullscreen",
                ""
            );

            body.appendChild(iframe);


            /*
               Helpful diagnostic if the PDF path
               is incorrect.
            */

            iframe.addEventListener("load", () => {

                console.log(
                    "Court Order PDF loaded:",
                    order.file
                );

            });

        }

    }


    /* =====================================================
       IMAGE COURT ORDER
       ===================================================== */

    else {

        const img =
            document.createElement("img");

        img.src = order.image;

        img.alt =
            order.alt || order.title;

        img.className =
            "court-order-full-image";

        body.appendChild(img);

    }


    /* =====================================================
       SHOW MODAL
       ===================================================== */

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();

}
/* ================= CONTACT ================= */

function renderContact() {

    if (!siteData.profile) return;

    const phone =
        siteData.profile.phone;

    const whatsapp =
        siteData.profile.whatsapp;


    if (phone) {

        document.getElementById("contact-call").textContent =
            phone;

    }


    if (whatsapp) {

        document.getElementById("float-wa").title =
            "WhatsApp Advocate";

    }

}
/* ================= COURT ORDER AUTO SLIDER ================= */

let courtOrderSliderTimer = null;

function startCourtOrderAutoScroll() {

    const grid = document.getElementById("orders-grid");

    if (!grid) return;

    clearInterval(courtOrderSliderTimer);

    courtOrderSliderTimer = setInterval(() => {

        const firstCard = grid.querySelector(".court-order-slide");

        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth + 16;

        if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {

            grid.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            grid.scrollBy({
                left: cardWidth,
                behavior: "smooth"
            });

        }

    }, 3500);
}

/* =========================================================
   CONTINUOUS HORIZONTAL LOOP
   ========================================================= */
/* =========================================================
   FIXED VIEWPORT + SEAMLESS CONTINUOUS LOOP + DRAG/SWIPE
   ========================================================= */

function startContinuousLoop(elementId) {

    const track = document.getElementById(elementId);

    if (!track) return;

    if (track.dataset.loopStarted === "true") return;

    const originalItems = Array.from(track.children);

    if (originalItems.length < 2) return;

    track.dataset.loopStarted = "true";

    /*
       The viewport now exists in HTML.
       JavaScript controls ONLY the moving track.
    */

    track.classList.add("loop-track");

    /* -----------------------------------------------------
       Wait for original images
       ----------------------------------------------------- */

    const images = track.querySelectorAll("img");

    // The loop waits for image readiness before measuring card widths.
    // Off-screen lazy images may never load, preventing the loop from starting.
    images.forEach(img => {
        if (!img.complete) img.loading = "eager";
    });

    const imagePromises = Array.from(images).map(img => {

        if (img.complete) {

            return img.decode
                ? img.decode().catch(() => {})
                : Promise.resolve();

        }

        return new Promise(resolve => {

            img.addEventListener("load", resolve, {
                once: true
            });

            img.addEventListener("error", resolve, {
                once: true
            });

        });

    });


    Promise.all(imagePromises).then(() => {

        /* -------------------------------------------------
           Duplicate the original cards
           ------------------------------------------------- */

        originalItems.forEach(item => {

            const clone = item.cloneNode(true);

            clone.querySelectorAll("img").forEach(img => {

                img.loading = "eager";

                if (img.complete) {
                    img.classList.add("loaded");
                }

            });

            track.appendChild(clone);

        });


        /*
           Force browser to calculate dimensions
        */

        track.offsetWidth;


        /* -------------------------------------------------
           Calculate exact width of ONE original set
           ------------------------------------------------- */

        let loopWidth = 0;

        originalItems.forEach(item => {

            loopWidth += item.getBoundingClientRect().width;

        });


        const trackStyle =
            window.getComputedStyle(track);

        const gap =
            parseFloat(trackStyle.columnGap) ||
            parseFloat(trackStyle.gap) ||
            0;


        /*
           There is a gap between every original card.
        */

        loopWidth +=
            gap * originalItems.length;


        /* -------------------------------------------------
           Animation state
           ------------------------------------------------- */

        let position = 0;

        let lastTime = performance.now();

        let dragging = false;

        let pointerStartX = 0;

        let positionAtPointerStart = 0;

        let hasDragged = false;


        /*
           Elegant movement speed
        */

        const speed = 30;


        /* -------------------------------------------------
           NORMALIZE LOOP POSITION
           ------------------------------------------------- */

        function normalizePosition() {

            while (position >= loopWidth) {
                position -= loopWidth;
            }

            while (position < 0) {
                position += loopWidth;
            }

        }


        /* -------------------------------------------------
           APPLY POSITION
           ------------------------------------------------- */

        function applyPosition() {

            track.style.transform =
                `translate3d(${-position}px, 0, 0)`;

        }


        /* -------------------------------------------------
           POINTER DOWN
           ------------------------------------------------- */

       track.addEventListener("pointerdown", event => {
            // Keep buttons/links usable, but allow dragging to begin on images.
            const interactiveElement = event.target.closest(
                "button, a, input, textarea, select, label"
            );
            if (interactiveElement) return;

            dragging = true;
            hasDragged = false;
            pointerStartX = event.clientX;
            positionAtPointerStart = position;
            track.classList.add("is-dragging");

            // Do not capture on pointerdown: a normal image tap must still
            // generate a click for the lightbox. Capture only after drag begins.
        });


        /* -------------------------------------------------
           POINTER MOVE
           ------------------------------------------------- */

        track.addEventListener("pointermove", event => {

            if (!dragging) return;

            const deltaX =
                event.clientX - pointerStartX;


            if (Math.abs(deltaX) > 8 && !hasDragged) {
                hasDragged = true;
                // Capture only once this is a real drag so the swipe continues
                // smoothly if the pointer leaves the track.
                if (track.setPointerCapture) {
                    try { track.setPointerCapture(event.pointerId); } catch (_) {}
                }
            }

            if (hasDragged) event.preventDefault();

            // Dragging left moves cards left; dragging right moves them right.
            position = positionAtPointerStart - deltaX;

            normalizePosition();

            applyPosition();

        });


        /* -------------------------------------------------
           POINTER UP
           ------------------------------------------------- */

        function endDrag(event) {

            if (!dragging) return;

            dragging = false;

            track.classList.remove("is-dragging");

            if (
                event &&
                track.hasPointerCapture &&
                track.hasPointerCapture(event.pointerId)
            ) {
                track.releasePointerCapture(event.pointerId);
            }

            lastTime = performance.now();

        }


        track.addEventListener(
            "pointerup",
            endDrag
        );

        track.addEventListener(
            "pointercancel",
            endDrag
        );


        /* -------------------------------------------------
           CONTINUOUS AUTO MOVEMENT
           ------------------------------------------------- */

        function animate(timestamp) {

            const elapsed =
                timestamp - lastTime;

            lastTime = timestamp;


            if (!dragging) {

                position +=
                    speed * elapsed / 1000;

                normalizePosition();

                applyPosition();

            }


            requestAnimationFrame(animate);

        }


        requestAnimationFrame(animate);

    });

}
// =========================================================
// MOBILE NAVBAR — CLOSE WHEN CLICKING OUTSIDE
// =========================================================

document.addEventListener("click", function (event) {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (!navbar || !navbarCollapse || !navbarToggler) return;

    // Only act when the mobile menu is currently open
    if (!navbarCollapse.classList.contains("show")) return;

    // If the visitor clicked inside the navbar, leave it alone
    if (navbar.contains(event.target)) return;

    // Clicked outside → close the menu
    const collapseInstance =
        bootstrap.Collapse.getInstance(navbarCollapse) ||
        new bootstrap.Collapse(navbarCollapse, { toggle: false });

    collapseInstance.hide();
});

// Navigate after the mobile menu has collapsed so its changing height does
// not leave the destination heading hidden behind the sticky navbar.
document.querySelectorAll(".main-navbar a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();

        const navbarCollapse = document.getElementById("navMenu");
        const menuIsOpen = navbarCollapse &&
            navbarCollapse.classList.contains("show") &&
            window.matchMedia("(max-width: 991.98px)").matches;

        const scrollToTarget = () => {
            if (window.location.hash !== href) history.pushState(null, "", href);
            const navbar = document.querySelector(".main-navbar");
            const offset = (navbar ? navbar.getBoundingClientRect().height : 0) + 12;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        };

        if (menuIsOpen) {
            const collapseInstance =
                bootstrap.Collapse.getOrCreateInstance(navbarCollapse, { toggle: false });
            navbarCollapse.addEventListener("hidden.bs.collapse", scrollToTarget, { once: true });
            collapseInstance.hide();
        } else {
            scrollToTarget();
        }
    });
});

/* ===== Click-to-Enlarge Image Lightbox ===== */

let activeImageLightbox = null;
let lightboxHistoryOpen = false;
let previousBodyOverflow = "";

function removeImageLightbox() {
    if (!activeImageLightbox) return;

    activeImageLightbox.remove();
    activeImageLightbox = null;
    document.body.style.overflow = previousBodyOverflow;
    lightboxHistoryOpen = false;
}

function requestCloseImageLightbox() {
    if (!activeImageLightbox) return;

    if (lightboxHistoryOpen) {
        // The popstate handler closes the lightbox.
        history.back();
    } else {
        removeImageLightbox();
    }
}

document.addEventListener("click", function (event) {
   
const image = event.target.closest(
   '#hero-photo, #gallery-track img, ' +
'#gallery img, #gallery-grid img, .gallery-section img'
);

    if (!image) return;

    event.preventDefault();

    if (activeImageLightbox) {
        removeImageLightbox();
        if (lightboxHistoryOpen) {
            history.back();
        }
    }

    previousBodyOverflow = document.body.style.overflow;

    const overlay = document.createElement("div");
    overlay.className = "image-lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged image");

    const enlargedImage = document.createElement("img");
    enlargedImage.className = "image-lightbox-image";
    enlargedImage.src = image.currentSrc || image.src;
    enlargedImage.alt = image.alt || "Enlarged website image";

    const closeButton = document.createElement("button");
    closeButton.className = "image-lightbox-close";
    closeButton.type = "button";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("aria-label", "Close enlarged image");

    overlay.appendChild(enlargedImage);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);

    activeImageLightbox = overlay;
    document.body.style.overflow = "hidden";

    closeButton.addEventListener("click", function (e) {
        e.stopPropagation();
        requestCloseImageLightbox();
    });

    overlay.addEventListener("click", function (e) {
        // Close only when the backdrop is touched.
        if (e.target === overlay) {
            requestCloseImageLightbox();
        }
    });

    // Add a browser-history entry so Back closes the image first.
    history.pushState(
        { ...(history.state || {}), imageLightbox: true },
        "",
        location.href
    );
    lightboxHistoryOpen = true;

    closeButton.focus();
});

// Escape closes the enlarged image.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeImageLightbox) {
        requestCloseImageLightbox();
    }
});

// Browser Back closes the lightbox instead of leaving the page.
window.addEventListener("popstate", function () {
    if (activeImageLightbox) {
        removeImageLightbox();
    }
});
