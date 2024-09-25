// fetch('https://anastasijank.amocrm.ru/api/v4/leads')
//     .then(
//         response => response.json();
//         console.log(response);
//     )
//     .then(
//         console.log(response)
//     );


let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL /article/.../load
xhr.open('GET', 'https://anastasijank.amocrm.ru/api/v4/leads');

// 3. Отсылаем запрос
xhr.send();

// Устанавливаем желаемый тип ответа // По умолчанию это строка
//xhr.responseType = 'json';

// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function() {
    if (xhr.status == 200) {
        console.log(response);
    }
};



// async function getInfoOnLeads() {
//     let url = 'https://anastasijank.amocrm.ru/api/v4/leads';
//     let response = await fetch(url);
//
//     let commits = await response.json(); // читаем ответ в формате JSON
//
//     console.log(commits);
// }
//
// getInfoOnLeads();