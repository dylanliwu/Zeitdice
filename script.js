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
        for (let i = 0; i < lastDay; i++){
            const day = i + 1;
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
                dayDiv.classList.add("today");
            }
            dayDiv.addEventListener('click', function() {
                if (this.classList.contains("today")) {
                    if (selectedDayDiv && selectedDayDiv !== this) {
                        selectedDayDiv.classList.remove("highlight");
                    }
                    this.classList.remove("dim");
                    selectedDayDiv = null;
                    return;
                }
                if (selectedDayDiv && selectedDayDiv !== this) {
                    selectedDayDiv.classList.remove("highlight");
                }
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
                }
            });
            daysContainer.appendChild(dayDiv);
        }
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthStartDay; i++){
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            dayDiv.addEventListener('click', function() {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
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
