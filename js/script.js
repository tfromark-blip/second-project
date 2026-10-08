

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "lesothoDarkMode",
        darkModeEnabled
    );

}


if (localStorage.getItem("lesothoDarkMode") === "true") {

    document.body.classList.add("dark-mode");

}

function filterActivities(category, clickedButton) {

    const activities =
        document.querySelectorAll(".activity-card");

    activities.forEach(function(activity) {

        const activityCategory =
            activity.getAttribute("data-category");

        if (
            category === "all" ||
            activityCategory === category
        ) {

            activity.style.display = "";

        } else {

            activity.style.display = "none";

        }

    });

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function(button) {

        button.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }

}

function searchDestinations() {

    const searchInput =
        document.getElementById("destinationSearch");

    const destinationItems =
        document.querySelectorAll(".destination-item");

    const noResults =
        document.getElementById("noDestinationResults");


    if (!searchInput) {

        return;

    }


    const searchText =
        searchInput.value.toLowerCase().trim();

    let found = 0;


    destinationItems.forEach(function(item) {

        const text =
            item.textContent.toLowerCase();

        if (text.includes(searchText)) {

            item.style.display = "";

            found++;

        } else {

            item.style.display = "none";

        }

    });


    if (noResults) {

        if (found === 0) {

            noResults.classList.remove("d-none");

        } else {

            noResults.classList.add("d-none");

        }

    }

}

const galleryImages = [

    {
        src: "images/qiloane.png",
        title: "Qiloane Mountain"
    },

    {
        src: "images/mmaletsunyane.jpg",
        title: "Maletsunyane"
    },

    {
        src: "images/qiloane.png",
        title: "Lesotho Highlands"
    },

    {
        src: "images/mmaletsunyane.jpg",
        title: "Mountain Scenery"
    },

    {
        src: "images/qiloane.png",
        title: "Lesotho Countryside"
    },

    {
        src: "images/mmaletsunyane.jpg",
        title: "Natural Beauty"
    }

];


let currentGalleryIndex = 0;

function openGallery(index) {

    currentGalleryIndex = index;

    updateGalleryPreview();

    const modalElement =
        document.getElementById("galleryModal");

    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}

function updateGalleryPreview() {

    const image =
        document.getElementById("galleryPreview");

    const title =
        document.getElementById("galleryModalTitle");


    if (!image) {

        return;

    }


    const currentImage =
        galleryImages[currentGalleryIndex];


    image.src = currentImage.src;

    image.alt = currentImage.title;


    if (title) {

        title.textContent =
            currentImage.title;

    }

}

function nextImage() {

    currentGalleryIndex++;

    if (
        currentGalleryIndex >=
        galleryImages.length
    ) {

        currentGalleryIndex = 0;

    }

    updateGalleryPreview();

}

function previousImage() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            galleryImages.length - 1;

    }

    updateGalleryPreview();

}

function showGalleryMessage() {

    const message =
        document.getElementById("galleryMessage");

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

    const destination =
        document.getElementById("destination");

    const activity =
        document.getElementById("activity");

    const guests =
        document.getElementById("guests");

    const days =
        document.getElementById("days");


    if (
        !destination ||
        !activity ||
        !guests ||
        !days
    ) {

        return;

    }


    const destinationValue =
        destination.value;

    const activityValue =
        activity.value;

    const guestNumber =
        Math.max(
            1,
            parseInt(guests.value) || 1
        );

    const dayNumber =
        Math.max(
            1,
            parseInt(days.value) || 1
        );


    const destinationPrice =
        destinationPrices[destinationValue] || 0;

    const activityPrice =
        activityPrices[activityValue] || 0;


    const destinationTotal =
        destinationPrice * guestNumber;

    const accommodationTotal =
        accommodationPricePerPersonPerDay *
        guestNumber *
        dayNumber;

    const activityTotal =
        activityPrice *
        guestNumber;


    const total =
        destinationTotal +
        accommodationTotal +
        activityTotal;


    const destinationCost =
        document.getElementById("destinationCost");

    const accommodationCost =
        document.getElementById("accommodationCost");

    const activityCost =
        document.getElementById("activityCost");

    const guestDisplay =
        document.getElementById("guestDisplay");

    const dayDisplay =
        document.getElementById("dayDisplay");

    const totalCost =
        document.getElementById("totalCost");


    if (destinationCost) {

        destinationCost.textContent =
            "M" + destinationTotal.toLocaleString();

    }


    if (accommodationCost) {

        accommodationCost.textContent =
            "M" + accommodationTotal.toLocaleString();

    }


    if (activityCost) {

        activityCost.textContent =
            "M" + activityTotal.toLocaleString();

    }


    if (guestDisplay) {

        guestDisplay.textContent =
            guestNumber;

    }


    if (dayDisplay) {

        dayDisplay.textContent =
            dayNumber;

    }


    if (totalCost) {

        totalCost.textContent =
            "Estimated Total: M" +
            total.toLocaleString();

    }

}

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            let valid = true;

            const name =
                document.getElementById("bookingName");

            const email =
                document.getElementById("bookingEmail");

            const phone =
                document.getElementById("bookingPhone");

            const date =
                document.getElementById("travelDate");

            const destination =
                document.getElementById("destination");

            const guests =
                document.getElementById("guests");

            const days =
                document.getElementById("days");

            const activity =
                document.getElementById("activity");

            if (
                !name ||
                name.value.trim().length < 2
            ) {

                name.classList.add("is-invalid");

                valid = false;

            } else {

                name.classList.remove("is-invalid");
                name.classList.add("is-valid");

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !email ||
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                email.classList.add("is-invalid");

                valid = false;

            } else {

                email.classList.remove("is-invalid");
                email.classList.add("is-valid");

            }


            const phonePattern =
                /^[0-9+\-\s]{7,20}$/;


            if (
                !phone ||
                !phonePattern.test(
                    phone.value.trim()
                )
            ) {

                phone.classList.add("is-invalid");

                valid = false;

            } else {

                phone.classList.remove("is-invalid");
                phone.classList.add("is-valid");

            }


           

            if (!date || !date.value) {

                date.classList.add("is-invalid");

                valid = false;

            } else {

                date.classList.remove("is-invalid");
                date.classList.add("is-valid");

            }

            if (!destination.value) {

                destination.classList.add("is-invalid");

                valid = false;

            } else {

                destination.classList.remove("is-invalid");
                destination.classList.add("is-valid");

            }

            const guestNumber =
                parseInt(guests.value);


            if (
                isNaN(guestNumber) ||
                guestNumber < 1 ||
                guestNumber > 50
            ) {

                guests.classList.add("is-invalid");

                valid = false;

            } else {

                guests.classList.remove("is-invalid");
                guests.classList.add("is-valid");

            }


            const dayNumber =
                parseInt(days.value);


            if (
                isNaN(dayNumber) ||
                dayNumber < 1 ||
                dayNumber > 30
            ) {

                days.classList.add("is-invalid");

                valid = false;

            } else {

                days.classList.remove("is-invalid");
                days.classList.add("is-valid");

            }


            if (!activity.value) {

                activity.classList.add("is-invalid");

                valid = false;

            } else {

                activity.classList.remove("is-invalid");
                activity.classList.add("is-valid");

            }


            if (valid) {

                calculateBooking();

                const bookingData = {

                    name: name.value.trim(),

                    email: email.value.trim(),

                    phone: phone.value.trim(),

                    travelDate: date.value,

                    destination: destination.value,

                    guests: guestNumber,

                    days: dayNumber,

                    activity: activity.value,

                    savedAt:
                        new Date().toLocaleString()

                };


                localStorage.setItem(
                    "lesothoBooking",
                    JSON.stringify(bookingData)
                );


                const message =
                    document.getElementById(
                        "bookingMessage"
                    );


                if (message) {

                    message.classList.remove("d-none");

                    message.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }

        }
    );

}


const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            event.stopPropagation();


            const name =
                document.getElementById("contactName");

            const email =
                document.getElementById("contactEmail");

            const subject =
                document.getElementById("contactSubject");

            const messageText =
                document.getElementById(
                    "contactMessageText"
                );


            let valid = true;

            if (
                !name ||
                name.value.trim().length < 2
            ) {

                name.classList.add("is-invalid");

                valid = false;

            } else {

                name.classList.remove("is-invalid");
                name.classList.add("is-valid");

            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !email ||
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                email.classList.add("is-invalid");

                valid = false;

            } else {

                email.classList.remove("is-invalid");
                email.classList.add("is-valid");

            }

            if (
                !subject ||
                subject.value.trim().length < 2
            ) {

                subject.classList.add("is-invalid");

                valid = false;

            } else {

                subject.classList.remove("is-invalid");
                subject.classList.add("is-valid");

            }



            if (
                !messageText ||
                messageText.value.trim().length < 10
            ) {

                messageText.classList.add("is-invalid");

                valid = false;

            } else {

                messageText.classList.remove("is-invalid");
                messageText.classList.add("is-valid");

            }

            if (valid) {

                const contactData = {

                    name: name.value.trim(),

                    email: email.value.trim(),

                    subject: subject.value.trim(),

                    message:
                        messageText.value.trim(),

                    savedAt:
                        new Date().toLocaleString()

                };


                localStorage.setItem(
                    "lesothoContact",
                    JSON.stringify(contactData)
                );


                const successMessage =
                    document.getElementById(
                        "contactMessage"
                    );


                if (successMessage) {

                    successMessage.classList.remove(
                        "d-none"
                    );

                    successMessage.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }


                contactForm.reset();


                const fields =
                    contactForm.querySelectorAll(
                        ".is-valid"
                    );


                fields.forEach(function(field) {

                    field.classList.remove("is-valid");

                });

            }

        }
    );

}

function loadSavedBooking() {

    const savedBooking =
        localStorage.getItem("lesothoBooking");


    if (!savedBooking) {

        return;

    }


    try {

        const booking =
            JSON.parse(savedBooking);


        const name =
            document.getElementById("bookingName");

        const email =
            document.getElementById("bookingEmail");

        const phone =
            document.getElementById("bookingPhone");


        if (name && booking.name) {

            name.value = booking.name;

        }


        if (email && booking.email) {

            email.value = booking.email;

        }


        if (phone && booking.phone) {

            phone.value = booking.phone;

        }


    } catch (error) {

        console.log(
            "Saved booking could not be loaded."
        );

    }

}


loadSavedBooking();


const travelDate =
    document.getElementById("travelDate");


if (travelDate) {

    const today =
        new Date().toISOString().split("T")[0];

    travelDate.setAttribute(
        "min",
        today
    );

}


if (
    document.getElementById("destination") &&
    document.getElementById("guests") &&
    document.getElementById("days")
) {

    calculateBooking();

}


document.addEventListener(
    "keydown",
    function(event) {

        const modal =
            document.getElementById("galleryModal");


        if (
            modal &&
            modal.classList.contains("show")
        ) {

            if (event.key === "ArrowRight") {

                nextImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }

    }
);