// fetch('https://anastasijank.amocrm.ru/api/v4/leads')
//     .then(
//         response => response.json();
//         console.log(response);
//     )
//     .then(
//         console.log(response)
//     );

const bearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwOWFjOTg1OTVlNjRhOGM4MTg0ZmFiZTVkNzM5YzU4ZTY4YmNhNzI5Mjc5NzM0MGRlYmZlN2VkZGZlNmE2MzA1Y2Y4ZmE3YzM3MWViZDJmIn0.eyJhdWQiOiIzOTIwOGQzMS0wZjA5LTRlYzAtYTI4Yi01NWNmZmVjMDJmYzEiLCJqdGkiOiJkMDlhYzk4NTk1ZTY0YThjODE4NGZhYmU1ZDczOWM1OGU2OGJjYTcyOTI3OTczNDBkZWJmZTdlZGRmZTZhNjMwNWNmOGZhN2MzNzFlYmQyZiIsImlhdCI6MTcyNzI1NjYxOSwibmJmIjoxNzI3MjU2NjE5LCJleHAiOjE3MjczNDMwMTksInN1YiI6IjExNTY1MjQyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxOTcxMDU4LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYTI2NGRkM2MtZmNjNy00ODlhLWIzNDUtNzJmNjZiYWNlMmU5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.WIYkpwRRpIEMKJ_cxJjJ2GeG3zCNjoFanvJ-94VtS-DZC0DHwTAObkMRuTjVs91i_zRVfGO2kZPU2vlP-koardPGKgw4FtbrkoUSzfqipEkTKqmQ6VP-u5acvaRoJxAM5acd50dg0sRWjlen5uJ_kTURNM62kdixNBq2-w2SR1goPe1hc5LGwzfNSRqJjDHkOEN5ev9iMJAnUa_LIlL-0Iq2RDL5aiUeefFOU4hyfnhgi3w2VmFkGcTFsNpTHTNkdYfGDEBFMXYG_G_vanWFsDYIzIJ2gqg1aZsMh9mnDs6iISVnwvMdaTJk-e1mgAAg0ivSbbCG3nHvprUvdVk35g";
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://anastasijank.amocrm.ru/api/v4/leads');
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
                '<td>' + lead.price.toLocaleString() + '</td>';
            document.getElementById('lead_table').querySelector('tbody').append(leadRow);
        }
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