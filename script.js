// Function to handle item addition and posting to Google Sheets
function addItem() {
  const itemToAdd = document.getElementById('itemInput').value;  // Get the item from the input field
  if (!itemToAdd) {
    alert("Please enter an item.");
    return;
  }

  // POST request to the Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbwstHxViQiFYwQlc9ICcn258vhUcvbYSwIrCSoiSZrB_ReBGkvcKTOpC9KyB1gXghlrbA/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Set the content type to JSON
    },
    body: JSON.stringify({ item: itemToAdd })  // Send the item in JSON format
  })
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    if (data.status === "success") {
      alert("Item added successfully!");
      document.getElementById('itemInput').value = '';  // Clear the input field after success
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(error => {
    console.error("Error sending to Google Sheet:", error);
    alert("Error sending to Google Sheet.");
  });
}
