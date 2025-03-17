const mainContent = document.getElementById("mainContent");
const profileButton = document.getElementById("profileButton");
const profileContent = document.getElementById("profileContent");

profileContent.style.display = "none";

profileButton.addEventListener("click", () => {
    mainContent.style.display = "none";
    profileContent.style.display = "block";
});

imageButton = document.getElementById("imageButton");

imageButton.addEventListener("click", () => {
    mainContent.style.display = "flex";
    profileContent.style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    const calendarTitle = document.getElementById("calendarTitle");
    const daysContainer = document.getElementById("days");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let currentDate = new Date();
    let today = new Date();
    let selectedDayDiv = null;

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();
        calendarTitle.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = "";
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            dayDiv.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });
            daysContainer.appendChild(dayDiv);
        }
        function formatDate(day, month, year) {
            const dd = day.toString().padStart(2, "0");
            const mm = (month + 1).toString().padStart(2, "0"); // month is zero-based
            return dd + "-" + mm + "-" + year;
        }
        
        // Inside your renderCalendar() function's loop for current month days:
        for (let i = 0; i < lastDay; i++){
            const day = i + 1;
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dayDiv.classList.add("today");
            }
            dayDiv.addEventListener('click', function() {
                // If the clicked day is today, log complete date and exit
                if (this.classList.contains("today")) {
                    if (selectedDayDiv && selectedDayDiv !== this) {
                        selectedDayDiv.classList.remove("highlight");
                    }
                    this.classList.remove("dim");
                    selectedDayDiv = null;
                    console.log("Current day clicked: " + formatDate(day, month, year));
                    return;
                }
                // Remove highlight from a previously selected day, if any
                if (selectedDayDiv && selectedDayDiv !== this) {
                    selectedDayDiv.classList.remove("highlight");
                }
                // Toggle highlight and log complete date if a new day is highlighted.
                if (this.classList.contains("highlight")) {
                    this.classList.remove("highlight");
                    let todayDiv = document.querySelector(".days .today");
                    if (todayDiv) todayDiv.classList.remove("dim");
                    selectedDayDiv = null;
                } else {
                    this.classList.add("highlight");
                    let todayDiv = document.querySelector(".days .today");
                    if (todayDiv) todayDiv.classList.add("dim");
                    selectedDayDiv = this;
                    console.log("Highlighted Day: " + formatDate(day, month, year));
                }
            });
            daysContainer.appendChild(dayDiv);
        }
    }
    prevButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});

const datedImage = document.querySelectorAll('.dated-image');

datedImage.forEach(image =>
    image.addEventListener('click', () => document.querySelector('.main-feed').src = image.src)
);

