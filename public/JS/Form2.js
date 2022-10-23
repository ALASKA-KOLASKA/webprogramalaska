function add_row(Data_new) {
    console.log(document.getElementById("main-todo-table"))
    const newCell = document.getElementById("main-todo-table").content.cloneNode(true);
    let td = newCell.querySelectorAll("td")
    td[0].innerText = Data_new.name;
    td[1].innerText = Data_new.task;
    td[2].innerText = Data_new.deadline;
    td[3].innerText = Data_new.counts;
    let new_row = document.getElementById("paragraph_table")
    new_row.appendChild(newCell);

}


window.addEventListener('load', () => {

        //window.localStorage.clear();

        const storage = window.localStorage;
        if (storage.getItem("count") == null) {
            storage.setItem("count", "0");
        }
        let count = Number(storage.getItem("count"))
        for (let i = 0, length = storage.length; i < length; i++) {
            const key = localStorage.key(i);
            if (key == "count") {
                continue;
            }
            const value = localStorage[key];
            let Data_new = JSON.parse(value);
            add_row(Data_new);
          //  console.log(`${key}: ${value}`);
    }


    function  buttons_delete_() {
        // слушаем все кнопки для удаления
        let buttons_delete = document.getElementsByClassName("delete_button"); //returns a nodelist
        for (let i = 0; i < buttons_delete.length; i++) {
            buttons_delete[i].addEventListener("click", function () {
                RemoveRow(this);
            }, false);
        }
    }

    buttons_delete_();

    const form = document.getElementById("line-web");

    document.getElementById("add-btn").addEventListener('click', function(e) {
        const ev = new Event("submit");
        document.getElementById("line-web").dispatchEvent(ev);
    });

    document.getElementById("line-web").addEventListener('submit', function(e) {

        count += 1;
        const data = {
            name: form.querySelector('[name="Имя"]').value.toLowerCase(),
            task: form.querySelector('[name="Задача"]').value.toLowerCase(),
            deadline: String(form.querySelector('[name="Дедлайн"]').value),
            counts: String(count)
        };
        if (data.name === '' || data.task === '') {;
            return;
        }
       // console.log(data.counts)
        const serialData = JSON.stringify(data);
        storage.setItem(String(serialData), serialData);
        storage.setItem("count", String(count));
        add_row(data);
        e.target.reset(); // очистить форму

        let buttons_delete = document.getElementsByClassName("delete_button");
        buttons_delete[buttons_delete.length - 1].addEventListener("click", function() {
            RemoveRow(this);
        }, false);

    });

    function RemoveRow(button) {
        console.log()

        const parent_button = button.parentElement.parentElement;
        let td = parent_button.querySelectorAll("td")
        const data = {
            name: td[0].innerText.toLowerCase(),
            task: td[1].innerText.toLowerCase(),
            deadline: td[2].innerText,
            counts: td[3].innerText
        };
        const serialData = JSON.stringify(data);
       // console.log(serialData)
        storage.removeItem(serialData);

        const table = document.getElementById("paragraph_table");
        let someElementsItems = table.querySelectorAll("tr");
        if (someElementsItems.length > 0) {
            let elt = button.parentElement.parentElement;
            elt.remove()
        }
    }

    document.getElementById("clear-btn").addEventListener('click', function(e){
        const table = document.getElementById('-table');
        const oldChild = table.querySelector('tbody');
        let tbody =  document.createElement("tbody");
        tbody.appendChild(document.createElement("tr"));
        table.replaceChild(tbody, oldChild);
        storage.clear();

    });

});




