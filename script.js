// /docs/script.js
const API = 'https://script.google.com/macros/s/AKfycbz1pfGfJH3Lmxmxojbg3_XTY6BWpj04LUD8MnNiiuSeHF9usLwXKn0Krp-WK6uvPrJ8Sg/exec';

// Inject & auto-remove a JSONP <script>
function jsonp(src) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
  s.onload = () => document.head.removeChild(s);
}

// Render list
function listCallback(data) {
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  (data.items || []).forEach(({id, item}) => {
    const li = document.createElement('li');
    li.textContent = item;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteItem(id);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

// Refresh after mutations
function addCallback()    { fetchList(); }
function deleteCallback() { fetchList(); }

// Fetch current items
function fetchList() {
  jsonp(`${API}?action=list&callback=listCallback`);
}

// Add an item
function addItem() {
  const input = document.getElementById('itemInput');
  const v = input.value.trim();
  if (!v) return;
  jsonp(`${API}?action=add&item=${encodeURIComponent(v)}&callback=addCallback`);
  input.value = '';
}

// Delete an item by row ID
function deleteItem(id) {
  jsonp(`${API}?action=delete&id=${id}&callback=deleteCallback`);
}

// Wire up events
document.getElementById('addBtn').addEventListener('click', addItem);
window.addEventListener('DOMContentLoaded', fetchList);
