let items = [];

function addItems() {
    let itemName = document.getElementById('item-name').value;
    let itemPrice = document.getElementById('item-price').value;
    let itemQuantity = document.getElementById('item-quantity').value;

    if (itemName && itemQuantity && itemPrice) {
        items.push({
            name: itemName,
            price: parseInt(itemPrice),
            quantity: parseInt(itemQuantity)
        });

        console.log(items);
        showItems();
        calculatingTotalPrice();
        clearForm();
    }
}

function showItems() {
    const tbody = document.querySelector('#billing-table tbody');
    tbody.innerHTML = "";

    items.forEach(item => {
        const tr = document.createElement('tr');

        const nameTd = document.createElement('td');
        nameTd.innerText = item.name;

        const quantityTd = document.createElement('td');
        quantityTd.innerText = item.quantity;

        const priceTd = document.createElement('td');
        priceTd.innerText = item.price.toFixed(2);

        tr.appendChild(nameTd);
        tr.appendChild(quantityTd);
        tr.appendChild(priceTd);

        tbody.appendChild(tr);
    });
}

function calculatingTotalPrice() {
    let totalPrice = 0;
    items.forEach(item => {
        totalPrice += item.price* item.quantity;
    });

    console.log(totalPrice);
    document.getElementById('total-price').innerText = `Billing Amount: $${totalPrice.toFixed(2)}.00`;
}

function clearForm() {
    document.getElementById('item-name').value = "";
    document.getElementById('item-quantity').value = "";
    document.getElementById('item-price').value = "";
}
