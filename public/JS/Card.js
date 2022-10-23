window.addEventListener('load', () => {


    const load_ = document.getElementById("load_");

    const cards = document.getElementById("cards");

    const button = document.getElementById("add_button");



    button.addEventListener('click', async function (e) {
        button.disabled = true;

        load_.classList.remove('disabled');
        load_.classList.add('loader')

        const card = document.getElementById("template_card").content.cloneNode(true);
        let title_card = card.getElementById("title_card");
        let card_body = card.getElementById("card_body");

        let id = Math.floor(Math.random() * 99) + 1;

        try {


            let response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);

            if (response.ok) {

                let json = await response.json();
                console.log(json)

                title_card.innerHTML = json.title;
                card_body.innerHTML = json.body;
                setTimeout(() => { }, 2000);
                load_.classList.add('disabled');
                load_.classList.remove('loader')

                cards.insertBefore(card, load_);
               // cards.appendChild(card);
                button.disabled = false;
            }
            else
            {
                alert("Error response");
            }
            button.disabled = false;
        }
        catch (error)
        {
            alert("Error");
            load_.classList.add('disabled');
            button.disabled = false;
        }
    });
})
