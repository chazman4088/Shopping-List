// script.js
const API = 'https://script.google.com/macros/s/AKfycbz1pfGfJH3Lmxmxojbg3_XTY6BWpj04LUD8MnNiiuSeHF9usLwXKn0Krp-WK6uvPrJ8Sg/exec'; // ← replace with your Web-App exec URL

// Create & append a JSONP <script>, then auto-remove it
function jsonp(src) {
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
  s.onload = () => document.head.removeChild(s);
}

// Renders the list into the <ul>
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

// After mutations, reload
function addCallback()    { fetchList(); }
function deleteCallback() { fetchList(); }

// Fetch & render
function fetchList() {
  jsonp(`${API}?action=list&callback=listCallback`);
}

// Add new
function addItem() {
  const inpt = document.getElementById('itemInput');
  const v    = inpt.value.trim();
  if (!v) return;
  jsonp(`${API}?action=add&item=${encodeURIComponent(v)}&callback=addCallback`);
  inpt.value = '';
}

// Delete by row-ID
function deleteItem(id) {
  jsonp(`${API}?action=delete&id=${id}&callback=deleteCallback`);
}

// Hook up events
document.getElementById('addBtn').onclick = addItem;
window.addEventListener('DOMContentLoaded', fetchList);
