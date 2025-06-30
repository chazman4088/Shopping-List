const API = 'https://script.google.com/macros/s/AKfycbwstHxViQiFYwQlc9ICcn258vhUcvbYSwIrCSoiSZrB_ReBGkvcKTOpC9KyB1gXghlrbA/exec'; // ← replace with your Apps Script URL

// Fetch & render the current list
async function fetchList() {
  const res = await fetch(`${API}?action=list`);
  const { items } = await res.json();
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  items.forEach(({id,item}) => {
    const li = document.createElement('li');
    li.textContent = item;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => deleteItem(id);
    li.appendChild(del);
    ul.appendChild(li);
  });
}

// Add a new item
async function addItem() {
  const input = document.getElementById('itemInput');
  const val = input.value.trim();
  if (!val) return;
  await fetch(`${API}?action=add&item=${encodeURIComponent(val)}`);
  input.value = '';
  fetchList();
}

// Delete by row-ID
async function deleteItem(id) {
  await fetch(`${API}?action=delete&id=${id}`);
  fetchList();
}

document.getElementById('addBtn').addEventListener('click', addItem);
window.addEventListener('DOMContentLoaded', fetchList);
