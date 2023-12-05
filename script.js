let originalCount = 0;

function updateCount() {
  const updatedCount = parseInt(document.getElementById('wordCountInput').value);
  const difference = updatedCount - originalCount;
  
  document.getElementById('difference').textContent = `Difference: ${difference}`;
}

function saveCount() {
  originalCount = parseInt(document.getElementById('wordCountInput').value);
  document.getElementById('originalCount').textContent = originalCount;
  document.getElementById('difference').textContent = 'Difference: ';
}
