document.getElementById("sendMessage").addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  const formdata = {
    email: email.value,
    message: message.value,
  };

  jsondata = JSON.stringify(formdata);

  fetch("http://localhost:3000/contact/contact", {
    method: "POST",
    body: jsondata,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let messageToSend = document.getElementById("contactStatus");

      if (data.message.split(" ")[0] == "Error") {
        data.message = data.message.split("Error : ");
        messageToSend.style.color = "red";
        messageToSend.innerHTML = data.message.join(" ");

        setTimeout(() => {
          messageToSend.innerHTML = "";
        }, 2500);
      } else {
        data.message = data.message.split("Success : ");
        messageToSend.style.color = "green";
        messageToSend.innerHTML = data.message.join(" ");

        setTimeout(() => {
          messageToSend.innerHTML = "";
        }, 2500);
      }

      message.value = "";
    });
});
