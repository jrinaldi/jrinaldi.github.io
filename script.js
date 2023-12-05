
let originalCount = 0;

function updateCount() {
  const updatedCount = parseInt(document.getElementById('wordCountInput').value);
  const difference = updatedCount - originalCount;
  const differenceText = document.getElementById('difference');

  differenceText.textContent = `Difference: ${difference}`;

  // Updating the color based on the difference value
  if (difference < 500) {
    differenceText.style.color = 'red';
  } else if (difference >= 501 && difference <= 1500) {
    differenceText.style.color = 'purple';
  } else {
    differenceText.style.color = 'green';
  }
}

function saveCount() {
  originalCount = parseInt(document.getElementById('wordCountInput').value);
  document.getElementById('originalCount').textContent = originalCount;
  document.getElementById('difference').textContent = 'Difference: ';
  document.getElementById('difference').style.color = ''; // Resetting color
}
