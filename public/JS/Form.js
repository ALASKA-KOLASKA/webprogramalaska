
function add_row(Data_new) {
    const card = document.getElementById("template_card").content.cloneNode(true);
    let newRow = document.getElementById("-table").insertRow();
    let newCell = newRow.insertCell(0)
    newCell.innerText=Data_new.name;
    newCell = newRow.insertCell(1)
    newCell.innerText=Data_new.task;
    newCell = newRow.insertCell(2)
    newCell.innerText=Data_new.deadline;
    newCell = newRow.insertCell(3)
    if (Data_new.condition == "performed") {
        newCell.innerHTML = "<button type=\"button\" class=\"-button condition shine-button\">Выполнено</button>" +
            "<button type=\"button\" class=\"-button delete_button\">x</button></td>";
    }
    else{
        newCell.innerHTML = "<button type=\"button\" class=\"-button condition shine-button\">Не выполнено</button>" +
            "<button type=\"button\" class=\"-button delete_button\">x</button></td>";
    }

}

function StorageClear(storage){
    let count = storage.getItem("Count")
    console.log(count)
    //storage.setItem("Count", String(count - 1))

    let last_id = 0;
    for (let i = 1; i < count; i ++ ){

        let serialData = storage.getItem(String(i));
        storage.removeItem(i)
        storage.setItem(String(i), serialData);
    }
    //storage.removeItem(count)
}

//Вот тут будет обработка кнопки, если я успею ее сделать


window.addEventListener('load', () => {


    const storage = window.localStorage;


    console.log(storage.getItem("Count"));

    if (storage.getItem("Count") == null) {
        storage.setItem("Count", "0");
    } else {
        let num = 1;
        while (true) {
            console.log(storage.getItem("Count"));
            let returnData = localStorage.getItem(String(num));
            console.log(returnData);
            if (returnData == null) {
                break;
            }

            let Data_new = JSON.parse(returnData);
            add_row(Data_new);
            num = num + 1;
        }
    }

    const form = document.getElementById("queue-web");

    function  buttons_delete_() {
        // слушаем все кнопки для удаления
        let buttons_delete = document.getElementsByClassName("delete_button"); //returns a nodelist
        for (let i = 0; i < buttons_delete.length; i++) {
            buttons_delete[i].addEventListener("click", function () {
                RemoveRow(this, i);
            }, false);
        }
    }

    //слушаем все кнопки для пометки

    function  buttons_() {
        let buttons = document.getElementsByClassName("condition"); //returns a nodelist
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function () {
                buttonsControl(this, i);
            }, false);
        }
    }

    buttons_delete_();
    buttons_();

    function buttonsControl(button, i) {
        console.log(i);
        button.innerHTML = "Выполнено";
        let returnData = localStorage.getItem(String(i));
        let Data_new = JSON.parse(returnData);
        Data_new.condition = "performed";
        const serialData = JSON.stringify(Data_new);
        storage.setItem(String(i), serialData);

    }

    document.getElementById("queue-btn").addEventListener('click', function(e) {
        const ev = new Event("submit");
        document.getElementById("queue-web").dispatchEvent(ev);
    });

    document.getElementById("queue-web").addEventListener('submit', function(e) {


        const data = {
            name: form.querySelector('[name="Имя"]').value,
            task: form.querySelector('[name="Задача"]').value,
            deadline: form.querySelector('[name="Дедлайн"]').value,
            condition: "not performed"
        };

        const serialData = JSON.stringify(data);
        let Count = Number(storage.getItem("Count"));
        Count = Count + 1;
        storage.setItem(String(Count), serialData);
        storage.setItem("Count", String(Count));
        add_row(data);
        e.target.reset(); // очистить форму


       // buttons_delete_();
        //buttons_();


          let buttons_delete = document.getElementsByClassName("delete_button"); //returns a nodelist
            buttons_delete[buttons_delete.length - 1].addEventListener("click", function() {
                RemoveRow(this, buttons_delete.length - 1);
            }, false);

        let buttons = document.getElementsByClassName("condition"); //returns a nodelist
        for (let i = 0; i < buttons.length; i++) {
            buttons[buttons.length - 1].addEventListener("click", function () {
                buttonsControl(this, buttons.length - 1);
            }, false);
        }

    });



    function RemoveRow(button, id) {
        console.log(id)


        let count = storage.getItem("Count")
        console.log(id, count)
        storage.setItem("Count", String(count - 1))
        storage.removeItem(id)
        for (let i = id; i < count; i ++ ){
            let serialData = storage.getItem(String(i + 1));
            storage.removeItem(i)
            storage.setItem(String(i), serialData);
        }
        storage.removeItem(count)



       //storage.removeItem(id)
        //  Count = Count - 1
        //  storage.setItem("Count", String(Count));
        // storage.setItem(String(Count), serialData);


        const table = document.getElementById("paragraph_table");
        let someElementsItems = table.querySelectorAll("tr");
        if (someElementsItems.length > 1) {
            let elt = button.parentElement.parentElement;
            elt.remove()

            let Count = Number(storage.getItem("Count"));

           // buttons_delete_();
           // buttons_();


        }
    }


    document.getElementById("clear-btn").addEventListener('click', function(e) {

        const table = document.getElementById('-table');
        const oldChild = table.querySelector('tbody');
        let tbody =  document.createElement("tbody");
        tbody.appendChild(document.createElement("tr"));
        table.replaceChild(tbody, oldChild);
        storage.clear();

    });

});