let params = new URL(document.location).searchParams;
let take = params.get("take");
let skip = parseInt(params.get("skip"));
const link =
    window.location.origin +
    "/api/v1/member" +
    "?take=" +
    take +
    "&skip=" +
    skip;

const getMembers = () => {
    fetch(link)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then((json) => {
            json.forEach((item) => {
                fillMemberTemplate(item);
            });
        });
};

const fillMemberTemplate = async (item) => {
    const template = document.querySelector("#member-template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("#member-name").innerHTML = item.name;

    document.querySelector("#template-result").appendChild(clone);

    const next = document.querySelector("#member_next");
    next.href = "list_members?take=" + take + "&skip=" + (skip + 10);
    if (skip - 10 >= 0) {
        const prev = document.querySelector("#member_prev");
        prev.href = "list_members?take=" + take + "&skip=" + (skip - 10);
    } else {
        const prev = document.querySelector("#carrier_prev");
        prev.style.display = "none";
    }
};

window.addEventListener("DOMContentLoaded", function () {
    getMembers();
});
