// /docs/script.js
const API = 'https://script.google.com/macros/s/AKfycbwstHxViQiFYwQlc9ICcn258vhUcvbYSwIrCSoiSZrB_ReBGkvcKTOpC9KyB1gXghlrbA/exec'; // ← your exec URL

// inject a JSONP <script> and cleanup old ones
function jsonp(url) {
  const s = document.createElement('script');
  s.src = url;
  document.head.appendChild(s);
  // remove after load to avoid memory leaks
  s.onload = () => document.head.removeChild(s);
}

// render callback for listing items
function listCallback(data) {
  const ul = document.getElementById('list');
  ul.innerHTML = '';
  (data.items || []).forEach(({id, item}) => {
    const li = document.createElement('li');
    li.textContent = item;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = () => deleteItem(id);
    li.appendChild(del);
    ul.appendChild(li);
  });
}

// after add/delete, re-fetch list
function addCallback(_){ fetchList(); }
function deleteCallback(_){ fetchList(); }

// fetch current list
function fetchList() {
  const url = `${API}?action=list&callback=listCallback`;
  jsonp(url);
}

// add a new item
function addItem() {
  const input = document.getElementById('itemInput');
  const val = input.value.trim();
  if (!val) return;
  const url = `${API}?action=add&item=${encodeURIComponent(val)}&callback=addCallback`;
  jsonp(url);
  input.value = '';
}

// delete by row ID
function deleteItem(id) {
  const url = `${API}?action=delete&id=${id}&callback=deleteCallback`;
  jsonp(url);
}

// wire up
document.getElementById('addBtn').addEventListener('click', addItem);
window.addEventListener('DOMContentLoaded', fetchList);
