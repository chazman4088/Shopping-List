const scriptURL = 'https://script.google.com/macros/s/AKfycbwstHxViQiFYwQlc9ICcn258vhUcvbYSwIrCSoiSZrB_ReBGkvcKTOpC9KyB1gXghlrbA/exec';

function addItem() {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();
  if (value === "") return;

  const ul = document.getElementById("list");

  const li = document.createElement("li");
  li.innerHTML = `${value} <button onclick="removeItem(this)">X</button>`;
  ul.appendChild(li);

  // Send the new item to your Google Sheet
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ item: value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("Item successfully sent to Google Sheet");
    } else {
      console.error("Failed to send item to Google Sheet");
    }
  })
  .catch(error => {
    console.error("Error sending to Google Sheet:", error);
  });

  // Clear input
  input.value = "";
}

function removeItem(button) {
  button.parentElement.remove();
}
