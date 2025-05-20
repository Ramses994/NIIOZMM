// script.js

// Данные в формате JSON
const doctorsData = {
    "doctors": [
        {
            "id": 1,
            "name": "Иванова А.П.",
            "specialization": "Терапевт",
            "schedule": {
                "Пн": "09:00-12:00",
                "Ср": "09:00-12:00",
                "Пт": "10:00-13:00"
            },
            "room": "101"
        },
        {
            "id": 2,
            "name": "Петров В.С.",
            "specialization": "Хирург",
            "schedule": {
                "Вт": "13:00-17:00",
                "Чт": "14:00-18:00"
            },
            "room": "205"
        },
        {
            "id": 3,
            "name": "Сидорова Е.К.",
            "specialization": "Офтальмолог",
            "schedule": {
                "Пн": "10:00-15:00",
                "Ср": "10:00-15:00",
                "Пт": "09:00-14:00"
            },
            "room": "312"
        },
        {
            "id": 4,
            "name": "Козлов Д.М.",
            "specialization": "Невролог",
            "schedule": {
                "Вт": "08:30-14:00",
                "Чт": "08:30-14:00",
                "Сб": "10:00-13:00"
            },
            "room": "420"
        }
    ]
};

// Функция для форматирования графика работы
function formatSchedule(schedule) {
    return Object.entries(schedule)
        .map(([day, time]) => `${day}: ${time}`)
        .join('<br>');
}

// Загрузка данных в таблицу
function loadTableData(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    data.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${doctor.id}</td>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${formatSchedule(doctor.schedule)}</td>
            <td>${doctor.room}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Функция фильтрации
function filterDoctors() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const specialization = document.getElementById('specializationFilter').value;
    
    const filtered = doctorsData.doctors.filter(doctor => {
        const nameMatch = doctor.name.toLowerCase().includes(searchText);
        const specMatch = specialization === 'all' || doctor.specialization === specialization;
        return nameMatch && specMatch;
    });
    
    loadTableData(filtered);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadTableData(doctorsData.doctors);
    
    document.getElementById('searchInput').addEventListener('input', filterDoctors);
    document.getElementById('specializationFilter').addEventListener('change', filterDoctors);
});