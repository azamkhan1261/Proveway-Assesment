const boxElements = document.querySelectorAll('.box-1');
let selectedBox = null;

// calculate the total price
function calculateTotalPriceWithDiscount(selectedBox) {
  const pairPriceElement = selectedBox.querySelector('.price');
  const pairPrice = parseFloat(pairPriceElement.textContent);

  const discountElement = selectedBox.querySelector('.discount');
  const discountPercentage = parseFloat(discountElement.textContent);

  const totalPrice = pairPrice - pairPrice * (discountPercentage / 100);

  return totalPrice;
}

function updateTotalPrice() {
  let totalPrice = 0;

  if (selectedBox) {
    totalPrice = calculateTotalPriceWithDiscount(selectedBox);
  }

  const totalPaymentElement = document.querySelector('.total-price');
  totalPaymentElement.textContent = totalPrice.toFixed(2);
}

//show the alert message
function showGreenAlert() {
  if (selectedBox) {
    const selectedPair = selectedBox.querySelector('.pair-dkk span:first-child').textContent;
    const totalPrice = calculateTotalPriceWithDiscount(selectedBox).toFixed(2);

    const alertText = `Added to Cart: ${selectedPair} - Total Price: DKK ${totalPrice}`;
    alert(alertText);
  } else {
    alert('Please select a pair before adding to cart.');
  }
}

boxElements.forEach(box => {
  box.addEventListener('mousedown', () => {
    selectedBox = box;
    boxElements.forEach(otherBox => {
      if (otherBox !== box) {
        otherBox.querySelector('.expanded').style.display = 'none';
        otherBox.classList.remove('selected');
        otherBox.querySelector('.cbox').checked = false;
      }
    });

    const expandedDiv = box.querySelector('.expanded');
    expandedDiv.style.display = 'flex';
    box.classList.add('selected');
    box.querySelector('.cbox').checked = true;
  });
});


document.addEventListener('mouseup', () => {
  updateTotalPrice();
});

const addToCartButton = document.querySelector('.save');
addToCartButton.addEventListener('click', () => {
  showGreenAlert();
});
