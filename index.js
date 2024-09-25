// fetch('https://anastasijank.amocrm.ru/api/v4/leads')
//     .then(
//         response => response.json();
//         console.log(response);
//     )
//     .then(
//         console.log(response)
//     );

const popupShadow = document.querySelector('.popup_shadow');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelectorAll('.j-close-popup');

popupShadow?.addEventListener('click',()=>{
    closePopup(document.querySelector('.popup--active'));
});

for(let button of popupClose) {
    button?.addEventListener('click',()=>{
        closePopup(document.querySelector('.popup--active'));
    });
}

function closePopup() {
    popupShadow?.classList.remove('popup_shadow--active');
    popup?.classList.remove('popup--active');
}


const bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwOWFjOTg1OTVlNjRhOGM4MTg0ZmFiZTVkNzM5YzU4ZTY4YmNhNzI5Mjc5NzM0MGRlYmZlN2VkZGZlNmE2MzA1Y2Y4ZmE3YzM3MWViZDJmIn0.eyJhdWQiOiIzOTIwOGQzMS0wZjA5LTRlYzAtYTI4Yi01NWNmZmVjMDJmYzEiLCJqdGkiOiJkMDlhYzk4NTk1ZTY0YThjODE4NGZhYmU1ZDczOWM1OGU2OGJjYTcyOTI3OTczNDBkZWJmZTdlZGRmZTZhNjMwNWNmOGZhN2MzNzFlYmQyZiIsImlhdCI6MTcyNzI1NjYxOSwibmJmIjoxNzI3MjU2NjE5LCJleHAiOjE3MjczNDMwMTksInN1YiI6IjExNTY1MjQyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTcxMDU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYTI2NGRkM2MtZmNjNy00ODlhLWIzNDUtNzJmNjZiYWNlMmU5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.WIYkpwRRpIEMKJ_cxJjJ2GeG3zCNjoFanvJ-94VtS-DZC0DHwTAObkMRuTjVs91i_zRVfGO2kZPU2vlP-koardPGKgw4FtbrkoUSzfqipEkTKqmQ6VP-u5acvaRoJxAM5acd50dg0sRWjlen5uJ_kTURNM62kdixNBq2-w2SR1goPe1hc5LGwzfNSRqJjDHkOEN5ev9iMJAnUa_LIlL-0Iq2RDL5aiUeefFOU4hyfnhgi3w2VmFkGcTFsNpTHTNkdYfGDEBFMXYG_G_vanWFsDYIzIJ2gqg1aZsMh9mnDs6iISVnwvMdaTJk-e1mgAAg0ivSbbCG3nHvprUvdVk35g";
function getInfoOnLeads() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://anastasijank.amocrm.ru/api/v4/leads?limit=3&offset=3');
    xhr.setRequestHeader("Authorization", `Bearer ${bearerToken}`);
    xhr.send();
    xhr.responseType = 'json';
    xhr.onload = function() {
        if (xhr.status == 200) {
            const leads = xhr.response._embedded.leads;
            if(!leads) return;
            for(let lead of leads) {
                const leadRow = document.createElement('tr');
                leadRow.innerHTML = '<td>' + lead.id + '</td>' +
                    '<td>' + lead.name + '</td>' +
                    '<td>' + lead.price.toLocaleString() + '</td>' +
                    '<td colspan="3" class="loader_wrap"><span class="loader"></span></td>';
                leadRow.setAttribute('data-id', lead.id);
                document.getElementById('lead_table').querySelector('tbody').append(leadRow);

                initClickOnLeadRow(leadRow);
            }
            document.querySelector('.table_loading')?.classList.remove('table_loading');
        }
    };
}
getInfoOnLeads();

function initClickOnLeadRow(lead) {
    lead?.addEventListener('click',()=>{
        lead.classList.add('info-loading');
        popup.querySelector('.popup__info')?.remove();

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://anastasijank.amocrm.ru/api/v4/leads/' + lead.getAttribute('data-id'));
        xhr.setRequestHeader("Authorization", `Bearer ${bearerToken}`);
        xhr.send();
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status == 200) {
                popupShadow?.classList.add('popup_shadow--active');
                popup?.classList.add('popup--active');

                const popupInfoWrap = document.createElement('div');
                popupInfoWrap.className = 'popup__info';
                popupInfoWrap.innerHTML = '<p class="popup__row">' +
                    '<span class="popup__subtitle">Название сделки:</span>' +
                    '<span class="popup__value">' + xhr.response.name + '</span>' +
                    '</p>' +
                    '<p class="popup__row">' +
                    '<span class="popup__subtitle">ID сделки:</span>' +
                    '<span class="popup__value">' + xhr.response.id + '</span>' +
                    '</p>' +
                    '<p class="popup__row">' +
                    '<span class="popup__subtitle">Дата создания сделки:</span>' +
                    '<span class="popup__value">' + new Date(xhr.response.created_at * 1000).toLocaleDateString() + '</span>' +
                    '</p>' +
                    '<p class="popup__row popup__row--closest">' +
                    '<span class="popup__subtitle">Дата ближайшей задачи к выполнению:</span>' +
                    '<span class="popup__value">' + new Date(xhr.response.closest_task_at * 1000).toLocaleDateString() + '</span>' +
                    '</p>' +
                    '<p class="popup__row popup__row--status">' +
                    '<span class="popup__subtitle">Статус задачи:</span>' +
                    '<span class="popup__value"><svg height="18" width="18"><circle r="9" cx="9" cy="9"></circle></svg></span>' +
                    '</p>';
                if(xhr.response.closest_task_at === null) {
                    popupInfoWrap.querySelector('.popup__row--closest .popup__value').innerHTML = 'задач нет';
                }
                if(new Date().setHours(0,0,0,0) === new Date(xhr.response.closest_task_at * 1000).setHours(0,0,0,0)) {
                    popupInfoWrap.querySelector('.popup__row--status').classList.add('popup__row--status-current');
                } else if(new Date().setHours(0,0,0,0) < new Date(xhr.response.closest_task_at * 1000).setHours(0,0,0,0)) {
                    popupInfoWrap.querySelector('.popup__row--status').classList.add('popup__row--status-future');
                }

                popup.querySelector('.popup__body').prepend(popupInfoWrap);

                lead.classList.remove('info-loading');
            }
        };
    });
}



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