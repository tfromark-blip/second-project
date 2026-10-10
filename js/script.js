
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "lesothoDarkMode",
        document.body.classList.contains("dark-mode")
    );
}

if (localStorage.getItem("lesothoDarkMode") === "true") {
    document.body.classList.add("dark-mode");
}

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", toggleDarkMode);
}

function filterActivities(category, clickedButton) {
    document.querySelectorAll(".activity-card").forEach(function (activity) {
        const activityCategory = activity.getAttribute("data-category");

        activity.style.display =
            category === "all" || activityCategory === category ? "" : "none";
    });

    document.querySelectorAll(".filter-btn").forEach(function (button) {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }
}

function searchDestinations() {
    const searchInput = document.getElementById("destinationSearch");
    const destinationItems = document.querySelectorAll(".destination-item");
    const noResults = document.getElementById("noDestinationResults");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();
    let found = 0;

    destinationItems.forEach(function (item) {
        const matches = item.textContent.toLowerCase().includes(searchText);

        item.style.display = matches ? "" : "none";

        if (matches) found++;
    });

    if (noResults) {
        noResults.classList.toggle("d-none", found > 0);
    }
}

let currentGalleryIndex = 0;
let galleryImages = [];

function getGalleryImages() {
    const imageNames = [
        "qiloane.jpg",
        "mmaletsunyane (2).jpg",
        "Lesotho waterfall landscape.jpg",
        "scenic sghtseeng.jpg",
        "lesotho countrysite.jpg",
        "Qiloane landscape.jpg"
    ];

    const captions = [
        "Qiloane Mountain",
        "Maletsunyane",
        "Lesotho Highlands",
        "Mountain Scenery",
        "Countryside",
        "Natural Beauty"
    ];

    return imageNames.map(function (name, index) {
        return {
            src: new URL(name, document.baseURI).href,
            title: captions[index]
        };
    });
}

function openGallery(index) {
    galleryImages = getGalleryImages();

    if (!galleryImages.length) return;

    currentGalleryIndex = Math.max(
        0,
        Math.min(index, galleryImages.length - 1)
    );

    updateGalleryPreview();

    const modalElement = document.getElementById("galleryModal");

    if (modalElement && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }
}

function updateGalleryPreview() {
    if (!galleryImages.length) {
        galleryImages = getGalleryImages();
    }

    const preview = document.getElementById("galleryPreview");
    const title = document.getElementById("galleryModalTitle");

    if (!preview || !galleryImages.length) return;

    const currentImage = galleryImages[currentGalleryIndex];

    preview.src = currentImage.src;
    preview.alt = currentImage.title;

    if (title) {
        title.textContent = currentImage.title;
    }
}

function nextImage() {
    if (!galleryImages.length) {
        galleryImages = getGalleryImages();
    }

    if (!galleryImages.length) return;

    currentGalleryIndex =
        (currentGalleryIndex + 1) % galleryImages.length;

    updateGalleryPreview();
}

function previousImage() {
    if (!galleryImages.length) {
        galleryImages = getGalleryImages();
    }

    if (!galleryImages.length) return;

    currentGalleryIndex =
        (currentGalleryIndex - 1 + galleryImages.length) %
        galleryImages.length;

    updateGalleryPreview();
}

function showGalleryMessage() {
    const message = document.getElementById("galleryMessage");

    if (message) {
        message.classList.remove("d-none");
    }
}

const destinationPrices = {
    qiloane: 150,
    maletsunyane: 250,
    highlands: 200,
    villages: 120
};

const activityPrices = {
    hiking: 180,
    horse: 250,
    culture: 120,
    sightseeing: 100
};

const accommodationPricePerPersonPerDay = 450;

function calculateBooking() {
    const destination = document.getElementById("destination");
    const activity = document.getElementById("activity");
    const guests = document.getElementById("guests");
    const days = document.getElementById("days");

    if (!destination || !activity || !guests || !days) return;

    const guestNumber = Math.max(1, parseInt(guests.value, 10) || 1);
    const dayNumber = Math.max(1, parseInt(days.value, 10) || 1);

    const destinationTotal =
        (destinationPrices[destination.value] || 0) * guestNumber;

    const accommodationTotal =
        accommodationPricePerPersonPerDay * guestNumber * dayNumber;

    const activityTotal =
        (activityPrices[activity.value] || 0) * guestNumber;

    const total = destinationTotal + accommodationTotal + activityTotal;

    const destinationCost = document.getElementById("destinationCost");
    const accommodationCost = document.getElementById("accommodationCost");
    const activityCost = document.getElementById("activityCost");
    const guestDisplay = document.getElementById("guestDisplay");
    const dayDisplay = document.getElementById("dayDisplay");
    const totalCost = document.getElementById("totalCost");

    if (destinationCost) {
        destinationCost.textContent = "M" + destinationTotal.toLocaleString();
    }

    if (accommodationCost) {
        accommodationCost.textContent =
            "M" + accommodationTotal.toLocaleString();
    }

    if (activityCost) {
        activityCost.textContent = "M" + activityTotal.toLocaleString();
    }

    if (guestDisplay) {
        guestDisplay.textContent = guestNumber;
    }

    if (dayDisplay) {
        dayDisplay.textContent = dayNumber;
    }

    if (totalCost) {
        totalCost.textContent =
            "Estimated Total: M" + total.toLocaleString();
    }
}

["destination", "activity", "guests", "days"].forEach(function (id) {
    const field = document.getElementById(id);

    if (field) {
        field.addEventListener("change", calculateBooking);
        field.addEventListener("input", calculateBooking);
    }
});

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("bookingName");
        const email = document.getElementById("bookingEmail");
        const phone = document.getElementById("bookingPhone");
        const date = document.getElementById("travelDate");
        const destination = document.getElementById("destination");
        const guests = document.getElementById("guests");
        const days = document.getElementById("days");
        const activity = document.getElementById("activity");

        const fields = [
            {
                element: name,
                valid: name && name.value.trim().length >= 2
            },
            {
                element: email,
                valid: email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
            },
            {
                element: phone,
                valid: phone &&
                    /^[0-9+\-\s()]{7,20}$/.test(phone.value.trim())
            },
            {
                element: date,
                valid: date && date.value !== ""
            },
            {
                element: destination,
                valid: destination && destination.value !== ""
            },
            {
                element: guests,
                valid: guests &&
                    Number(guests.value) >= 1 &&
                    Number(guests.value) <= 50
            },
            {
                element: days,
                valid: days &&
                    Number(days.value) >= 1 &&
                    Number(days.value) <= 30
            },
            {
                element: activity,
                valid: activity && activity.value !== ""
            }
        ];

        let valid = true;

        fields.forEach(function (field) {
            if (!field.element) {
                valid = false;
                return;
            }

            field.element.classList.toggle("is-invalid", !field.valid);
            field.element.classList.toggle("is-valid", field.valid);

            if (!field.valid) valid = false;
        });

        if (!valid) return;

        calculateBooking();

        const bookingData = {
            name: name.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            travelDate: date.value,
            destination: destination.value,
            guests: Number(guests.value),
            days: Number(days.value),
            activity: activity.value,
            savedAt: new Date().toLocaleString()
        };

        localStorage.setItem(
            "lesothoBooking",
            JSON.stringify(bookingData)
        );

        const message = document.getElementById("bookingMessage");

        if (message) {
            message.classList.remove("d-none");

            message.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName");
        const email = document.getElementById("contactEmail");
        const subject = document.getElementById("contactSubject");
        const messageText = document.getElementById("contactMessageText");

        const fields = [
            {
                element: name,
                valid: name && name.value.trim().length >= 2
            },
            {
                element: email,
                valid: email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
            },
            {
                element: subject,
                valid: subject && subject.value.trim().length >= 2
            },
            {
                element: messageText,
                valid: messageText &&
                    messageText.value.trim().length >= 10
            }
        ];

        let valid = true;

        fields.forEach(function (field) {
            if (!field.element) {
                valid = false;
                return;
            }

            field.element.classList.toggle("is-invalid", !field.valid);
            field.element.classList.toggle("is-valid", field.valid);

            if (!field.valid) valid = false;
        });

        if (!valid) return;

        const contactData = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: subject.value.trim(),
            message: messageText.value.trim(),
            savedAt: new Date().toLocaleString()
        };

        localStorage.setItem(
            "lesothoContact",
            JSON.stringify(contactData)
        );

        const successMessage = document.getElementById("contactMessage");

        if (successMessage) {
            successMessage.classList.remove("d-none");

            successMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        contactForm.reset();

        contactForm.querySelectorAll(".is-valid").forEach(function (field) {
            field.classList.remove("is-valid");
        });
    });
}

function loadSavedBooking() {
    const savedBooking = localStorage.getItem("lesothoBooking");

    if (!savedBooking) return;

    try {
        const booking = JSON.parse(savedBooking);

        const name = document.getElementById("bookingName");
        const email = document.getElementById("bookingEmail");
        const phone = document.getElementById("bookingPhone");

        if (name && booking.name) name.value = booking.name;
        if (email && booking.email) email.value = booking.email;
        if (phone && booking.phone) phone.value = booking.phone;
    } catch (error) {
        console.error("Saved booking could not be loaded.");
    }
}

loadSavedBooking();

const travelDate = document.getElementById("travelDate");

if (travelDate) {
    travelDate.min = new Date().toISOString().split("T")[0];
}

calculateBooking();
