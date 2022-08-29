const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const userInput = document.getElementById("user-input");
const msgConatiner = document.querySelector(".msg-container");

const appendMsg = (msg, pos) => {
    const positionClassNaame1 = pos==='center-msg'?'center-msg':pos;
    const positionClassNaame2 = pos==='center-msg'?'center-msg':'msg';

  const joinedMsg = document.createElement("div");
  joinedMsg.innerText = msg;
  joinedMsg.classList.add(positionClassNaame1);
  joinedMsg.classList.add(positionClassNaame2);
  msgConatiner.append(joinedMsg);
  console.log(msg, pos);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userMsg = userInput.value;
  appendMsg(`you: ${userMsg}`, "right-msg");
  socket.emit("send", userMsg);
  userInput.value = "";
});

let userName = prompt("Enter your name:");
socket.emit("new-user-name", userName);

socket.on("user-join", (name) => {
  appendMsg(`${name} joined the chat.`, "center-msg");
});

socket.on("res", (data) => {
  appendMsg(`${data.userName}: ${data.msg}`, "left-msg");
});

socket.on("left", (userName) => {
    appendMsg(`${userName} left the caht`, "center-msg");
  });
