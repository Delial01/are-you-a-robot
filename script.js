let bot = new RiveScript();

const brains = ["brain/subs.rive", "brain/delia.rive", "brain/ruben.rive"];

bot.loadFile(brains).then(botReady).catch(botNotReady);

const message_container = document.querySelector(".messages");

const form = document.querySelector("form");

const input_box = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  selfReply(input_box.value);
  input_box.value = "";
  input_box.focus();
});

let messageCount = 0;

function botReply(message) {
  const messageId = `bot-message-${messageCount}`;
  const messageElement = document.createElement("div");
  messageElement.id = messageId;
  messageElement.className = "bot animate__animated animate__slideInLeft";
  messageElement.innerHTML += message;
  message_container.appendChild(messageElement);

  messageCount++;
  message_container.lastElementChild.scrollIntoView();
}

function selfReply(message) {
  const messageId = `self-message-${messageCount}`;
  const messageElement = document.createElement("div");
  messageElement.id = messageId;
  messageElement.className = "self animate__animated animate__slideInRight";
  messageElement.innerHTML += message;
  message_container.appendChild(messageElement);

  bot
    .reply("local-user", message)
    .then(function (reply) {
      botReply(reply);
    })
    .then(function () {
      message_container.lastElementChild.scrollIntoView();
    });

  messageCount++;
}

function botReady() {
  bot.sortReplies();
  message_container.innerHTML = ""; // Clear previous messages
}

function botNotReady(err) {
  console.log("An error has occurred.", err);
}