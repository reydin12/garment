// const form = document.querySelector('form#process_2');
// console.log(form);
// const button = document.querySelector('form#process_2 button#submitProcess');
// console.log(button);


// // let deleteButtons = document.querySelectorAll('button#deleteProcess');
// //     deleteButtons.forEach(button => {
// //         button.addEventListener('click', async (e) => {
// //             const id = e.target.dataset.id;
// //             const response = await fetch(`/api/process/${id}`, {
// //                 method: 'DELETE'
// //             });
// //             const json = await response.json();
// //             if (json.status === 'success') {
// //                 e.target.parentNode.parentNode.remove();
// //             }
// //         });
// //     });
// //async function to handle the form submission using button
// button.addEventListener('click', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData);
//     console.log(data);
//     //
//     const response = await fetch('/api/process', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)

//     });
    
//     const json = response.json();
//     console.log(json);
// sampe sini

    // if (json.status === 'success') {
    //     let data = json.data;
    //     const row = document.createElement('tr');
    //     row.innerHTML = `
    //         <td class="border px-4 py-2">${data.process_name}</td>
    //         <td class="border px-4 py-2">${data.process_input_material_id}</td>
    //         <td class="border px-4 py-2">${data.process_output_material_id}</td>
    //         <td class="border px-4 py-2">${data.process_input_quantity}</td>
    //         <td class="border px-4 py-2">${data.process_output_quantity}</td>
    //         <td class="border px-4 py-2">${data.process_start_date}</td>
    //         <td class="border px-4 py-2">${data.process_end_date}</td>
    //         <td class="border px-4 py-2">${data.process_status}</td>
    //         <td class="border px-4 py-2"><button class="bg-red-500 text-white" id="deleteProcess" data-id="${data.id}">Delete</button></td>
    //     `;
    //     console.log(processTable);
    //     processTable.appendChild(row);

    //     form.reset();
        
    // }
    // deleteButtons = document.querySelectorAll('button#deleteProcess');
    // deleteButtons.forEach(button => {
    //     button.addEventListener('click', async (e) => {
    //         const id = e.target.dataset.id;
    //         const response = await fetch(`/api/process/${id}`, {
    //             method: 'DELETE'
    //         });
    //         const json = await response.json();
    //         if (json.status === 'success') {
    //             e.target.parentNode.parentNode.remove();
    //         }
    //     });
    // });
    



// });


//event listener to handle the form submission

const select= document.querySelector('select#process_output_material_id');
const input = document.querySelector('input#process_output_quantity');
console.log(select);
const ukuranBagian= document.querySelector('#ukuranBagian');
console.log(ukuranBagian);
//see selected
if (select.value == "0") {
    ukuranBagian.classList.remove('hidden');
    ukuranBagian.classList.add('flex');
    input.classList.add('hidden');
    input.classList.remove('flex');
}
else {
    ukuranBagian.classList.add('hidden');
    ukuranBagian.classList.remove('flex');
    input.classList.remove('hidden');
    input.classList.add('flex');

}

select.addEventListener('change', (e) => {
    if (select.value == "0") {
        ukuranBagian.classList.remove('hidden');
        ukuranBagian.classList.add('flex');
        input.classList.remove('flex');
        input.classList.add('hidden');
    }
    else {
        ukuranBagian.classList.add('hidden');
        ukuranBagian.classList.remove('flex');
        input.classList.add('flex');
        input.classList.remove('hidden');
    }
});

function printExternal(url) {
    var printWindow = window.open( url, 'Print', 'toolbar=0, resizable=0');

    printWindow.addEventListener('load', function() {
        if (Boolean(printWindow.chrome)) {
            printWindow.print();
            setTimeout(function(){
                printWindow.close();
            }, 500);
        } else {
            printWindow.print();
            printWindow.close();
        }
    }, true);
}

const selectprocessid= document.querySelector('select#process_id');
console.log(selectprocessid);
const selectuserid= document.querySelector('select#user_id');
selectprocessid.addEventListener('change', (e) => {
    //api request
    const response = fetch(`/api/process/${selectprocessid.value}`, {
        method: 'GET',
    }
    ).then(response => response.json());
    response.then(data => {
        console.log(data);
        //if data empty
        if (data.length == 0) {
            selectuserid.innerHTML = ``;
            selectuserid.innerHTML = `<option value="0">No User</option>`;
            //alert to hyperlink to add user
            confirms=confirm("No User Found. Do you want to add user?");
            if (confirms==true) {
                window.location.href = '/user/create';
            }
        }
        else {
            selectuserid.innerHTML = ``;
            data.forEach(element => {
                selectuserid.innerHTML += `<option value="${element.id}">${element.name}</option>`;
            });
        }
    });
    //if selected first option
    const lengthProcess = selectprocessid.options.length;
    const lengthSelect = select.options.length;
    if (selectprocessid.selectedIndex == 0) {
        for (i = 1; i < lengthSelect; i++) {
            select.options[i].disabled = true;
        }
        select.options[0].selected = true;
        select.options[0].disabled = false;
        ukuranBagian.classList.remove('hidden');
        ukuranBagian.classList.add('flex');
        input.classList.add('hidden');
        input.classList.remove('flex');
    }
    else if(selectprocessid.selectedIndex == lengthProcess) {
        for (i = 0; i < lengthSelect; i++) {
            //if name contains (rusak)
            if (select.options[i].text.includes("(Rusak)")) {
                select.options[i].disabled = false;
                select.options[i].selected = true;
            }
            else {

            select.options[i].disabled = true;
            }
        }
    }

    else {
        for (i = 1; i < lengthSelect; i++) {
            select.options[i].disabled = false;
        }
        select.options[1].selected = true;
        select.options[0].disabled = true;
        ukuranBagian.classList.add('hidden');
        ukuranBagian.classList.remove('flex');
        input.classList.remove('hidden');
        input.classList.add('flex');
    
    }

});



