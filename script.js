// LOGIN
function login() {
    let u = username.value;
    let p = password.value;

    if (u === "admin" && p === "admin") {
        localStorage.setItem("user", u);
        location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}

function logout() {
    localStorage.removeItem("user");
    location.href = "login.html";
}

if (location.pathname.includes("dashboard")) {
    if (!localStorage.getItem("user")) logout();
}

// BILLING
let total = 0;

function addItem() {
    let name = pname.value;
    let price = +document.getElementById("price").value;
    let qty = +document.getElementById("qty").value;

    if (!name || price <= 0 || qty <= 0) return;

    let row = `<tr><td>${name}</td><td>${price}</td><td>${qty}</td><td>${price*qty}</td></tr>`;
    bill.innerHTML += row;

    total += price * qty;
    document.getElementById("total").innerText = total;
}

function pay() {
    let paymentMode = payment.value;
    let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

    invoices.push({
        amount: total,
        payment: paymentMode,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("invoices", JSON.stringify(invoices));
    alert("Payment Successful ✔");
    loadHistory();
}

function loadHistory() {
    let list = document.getElementById("history");
    let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

    list.innerHTML = "";
    invoices.forEach(i => {
        list.innerHTML += `<li>₹${i.amount} - ${i.payment} <br><small>${i.date}</small></li>`;
    });
}

loadHistory();
