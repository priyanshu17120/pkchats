var socket = io();
  
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("/ting.mp3");
var nasa = new Audio("/Nasa.mp3");

function scrollToBottom() {
    // const messageeee = document.getElementsByClassName('message');
    const container = document.getElementById('container');
    // container.scrollTop(messageeee.outerHeight());
    container.scrollTop = container.scrollHeight;
    console.log(container.scrollHeight);
    // var l = document.getElementsByClassName("message").length;
    // document.getElementsByClassName("message")[l+1].scrollIntoView();
}
  
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = message;
  messageElement.classList.add("conversation");
  messageElement.classList.add("conversation-container");
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "received") {
        audio.play();
  }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if(message != ""){ 
        scrollToBottom()
        append(`<b>You</b> : ${message}`, "sent");
        socket.emit("send", message);
        messageInput.value = ""; 
    }
    
});

const name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

append(`Hey,<b>${name}</b> Welcome To Pk's Chat`, "received");
socket.on("user-joined", (name) => {
  scrollToBottom()
  append(`<b>${name}</b> joined the chat`, "received");
});
socket.on("receive", (data) => {
    scrollToBottom()
    if(data.message == "nasa"){  
        audio.pause();
        nasa.play();
      }
  append(`<b>${data.name}</b> : ${data.message}`, "received");
});
socket.on("left", (name) => {
    scrollToBottom()
  append(`<b>${name}</b> left the chat`, "received");
});