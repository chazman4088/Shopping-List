function addItem() {
  const input = document.getElementById("itemInput");
  const value = input.value.trim();
  if (value === "") return;

  const ul = document.getElementById("list");

  const li = document.createElement("li");
  li.innerHTML = `${value} <button onclick="removeItem(this)">X</button>`;
  ul.appendChild(li);

  input.value = "";
}

function removeItem(button) {
  button.parentElement.remove();
}
