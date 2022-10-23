const socket = io(window.location.origin);

const message = document.getElementById("message");
const messages = document.getElementById("messages");

const handleSubmitNewMessage = () => {
    if (message.value instanceof String) return;
    if (message.value === "") {
        return;
    }
    const currentTime = Date.now();
    const dateTime = new Date(currentTime);
    socket.emit("message", {
        token: document.cookie === "" ? "" : document.cookie.split("=")[1],
        data: message.value,
        date:
            dateTime.getFullYear() +
            "-" +
            dateTime.getMonth() +
            "-" +
            dateTime.getDate() +
            " " +
            dateTime.getUTCHours() +
            ":" +
            dateTime.getUTCMinutes(),
    });
};

socket.on("message", (answer) => {
    handleNewMessage(answer);
});

handleNewMessage = (answer) => {
    const template = document.querySelector("#message-container").content;
    const clone = template.cloneNode(true);

    clone.querySelector("#p_user").innerHTML = answer.username;
    clone.querySelector("#p_date").innerHTML = answer.date;
    clone.querySelector("#p_message").innerHTML = answer.data;

    const div = document.createElement("div");
    div.appendChild(clone);

    messages.appendChild(div);
};
