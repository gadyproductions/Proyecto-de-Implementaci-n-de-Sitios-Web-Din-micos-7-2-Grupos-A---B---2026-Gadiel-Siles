const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Usamos una copia de la fecha actual para la navegación
let date = new Date();

// Feriados 
const feriados = ["1-1", "1-5", "25-5", "9-7", "25-12"]; 

function drawCalendar() {
    const year = date.getFullYear();
    const month = date.getMonth();

    document.getElementById('month').textContent = monthNames[month];
    document.getElementById('year').textContent = year;

    const firstDay = new Date(year, month, 1).getDay(); 
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Ajuste para que Lunes sea el primer día 0=Lun, 6=Dom
    const startDay = (firstDay === 0) ? 6 : firstDay - 1; 

    let datesHTML = "";

    // Espacios vacíos del mes anterior
    for (let i = 0; i < startDay; i++) {
        datesHTML += `<div class="calendar__item"></div>`;
    }

    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
        let statusClass = "";
        const now = new Date();

        // Marcador día actual 
        if (day === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
            statusClass = "today";
        }

        // Marcador feriados 
        if (feriados.includes(`${day}-${month + 1}`)) {
            statusClass += " holiday";
        }

        datesHTML += `<div class="calendar__item ${statusClass}">${day}</div>`;
    }

    document.getElementById('dates').innerHTML = datesHTML;
}

// Navegación con corrección de seguridad
document.getElementById('prev-month').addEventListener('click', () => {
    date.setDate(1); // Evita errores si hoy es 31 y el mes anterior tiene 30
    date.setMonth(date.getMonth() - 1);
    drawCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    date.setDate(1); // Evita errores si hoy es 31 y el mes siguiente tiene 30
    date.setMonth(date.getMonth() + 1);
    drawCalendar();
});

drawCalendar();
