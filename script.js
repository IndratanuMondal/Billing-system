
let items = [];

const CURRENCY = "₹";

const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const qtyInput = document.getElementById("item-quantity");
const priceInput = document.getElementById("item-price");
const tbody = document.getElementById("bill-body");
const totalEl = document.getElementById("total-price");
const clearBtn = document.getElementById("clear-items");

// Helpers
const money = n => `${CURRENCY}${Number(n).toFixed(2)}`;
const escapeHtml = (str) => {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

function render() {
  tbody.innerHTML = "";

  if (items.length === 0) {
    const row = document.createElement("tr");
    row.className = "text-muted";
    row.innerHTML = `<td colspan="5" class="text-center">No items added yet.</td>`;
    tbody.appendChild(row);
    totalEl.textContent = `Billing Amount: ${money(0)}`;
    return;
  }

  let total = 0;

  items.forEach((item, idx) => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(item.name)}</td>
      <td class="text-right">${item.quantity}</td>
      <td class="text-right">${money(item.price)}</td>
      <td class="text-right font-weight-bold">${money(lineTotal)}</td>
      <td class="text-right">
        <button class="btn btn-sm btn-outline-danger" data-index="${idx}">Remove</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  totalEl.textContent = `Billing Amount: ${money(total)}`;

  tbody.querySelectorAll("button[data-index]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = Number(e.currentTarget.getAttribute("data-index"));
      items.splice(idx, 1);
      render();
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const quantity = Number(qtyInput.value);
  const price = Number(priceInput.value);

  let valid = true;

  if (!name) { nameInput.classList.add("is-invalid"); valid = false; }
  else nameInput.classList.remove("is-invalid");

  if (!Number.isFinite(quantity) || quantity < 1) {
    qtyInput.classList.add("is-invalid"); valid = false;
  } else qtyInput.classList.remove("is-invalid");

  if (!Number.isFinite(price) || price < 0) {
    priceInput.classList.add("is-invalid"); valid = false;
  } else priceInput.classList.remove("is-invalid");

  if (!valid) return;

  items.push({ name, quantity, price });
  render();

  form.reset();
  qtyInput.value = 1; 
  nameInput.focus();
});

clearBtn.addEventListener("click", () => {
  items = [];
  render();
});

render();
