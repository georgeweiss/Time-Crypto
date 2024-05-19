const bitcoinValueElement = document.getElementById('bitcoin-value');
let currentBitcoinValue = 0;

function animateBitcoinValue(newValue) {
  const diff = newValue - currentBitcoinValue;
  const directionClass = diff >= 0 ? 'up' : 'down';

  const btcElement = document.createElement('div');
  //btcElement.className = 'btc';
  //btcElement.textContent = 'BTC'; //informações não mostradas

  const usdElement = document.createElement('div');
  //usdElement.className = `value animate ${directionClass}`;
  //usdElement.textContent = `USD ${newValue}`; informações não mostras
  usdElement.textContent = `${newValue}`;

  bitcoinValueElement.innerHTML = '';
  bitcoinValueElement.appendChild(btcElement);
  bitcoinValueElement.appendChild(usdElement);

  currentBitcoinValue = newValue;
}

function fetchBitcoinValue() {
  fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')
    .then(response => response.json())
    .then(data => {
      const bitcoinValue = Math.round(parseFloat(data.lastPrice));
      animateBitcoinValue(bitcoinValue);
    })
    .catch(error => {
      console.error('Error fetching Bitcoin value:', error);
      bitcoinValueElement.textContent = 'Error fetching Bitcoin value';
    });
}

// Fetch Bitcoin value initially
fetchBitcoinValue();

// Update Bitcoin value every 10 seconds
setInterval(fetchBitcoinValue, 10000); // 10 seconds = 10000 milliseconds

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  document.getElementById('current-time').textContent = timeString;
}

// Atualize o horário a cada segundo
setInterval(updateTime, 1000);