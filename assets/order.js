(function () {
  var MENU = [
    { cat: "Appetizers", items: [
      ["Sisig", 280], ["Calamares", 300], ["French Fries", 180], ["Hot Dog", 180],
      ["Spring Rolls", 250], ["Potato Wedges", 180], ["Onion Rings", 300], ["Nachos", 350]
    ]},
    { cat: "Soups", items: [
      ["Chicken Tinola", 280], ["Fish Tinola", 280], ["Pork Sinigang", 300],
      ["Wonton Chicken Soup", 310], ["Pochero", 750], ["Fish Sinigang", 310], ["Shrimp Sinigang", 310]
    ]},
    { cat: "Salads", items: [
      ["Chef Salad", 310], ["Green Salad", 280], ["Caesar Salad", 310], ["Greek Salad", 310]
    ]},
    { cat: "Steaks", items: [
      ["Ribeye 8 oz", 1890], ["Ribeye 16 oz", 2990], ["T-bone", 2790], ["Sirloin", 2590],
      ["6 oz Steak Sandwich", 1190], ["4 oz Steak Salad", 990], ["Add Mushrooms", 80]
    ]},
    { cat: "Breakfast", items: [
      ["Two eggs with rice or toast", 290], ["Breakfast add-on", 80]
    ]},
    { cat: "Main Courses", items: [
      ["Breaded Chicken", 390], ["Breaded Pork Chop", 390], ["Buttered Chicken", 350],
      ["Buttered Shrimp", 380], ["Crispy Pata", 650], ["Pancit Canton", 280], ["Bam-i", 280],
      ["Chicken Curry", 280], ["Lechon Kawali / Bagnet", 300], ["Fish Kinilaw", 280],
      ["Buffalo Wings", 300], ["Sweet & Sour Fish", 280], ["Pork Humba", 280],
      ["Chicken & Pork Adobo", 290], ["Pakbet", 290], ["Gambas", 310],
      ["Butter Garlic Shrimp", 290], ["Shrimp Scampi", 290], ["Beef with Broccoli", 280],
      ["Beef with Mushrooms", 280], ["Beef with Onion", 280], ["Beef Cebuano", 280],
      ["Baked Salmon", 350], ["Lemon Buttered Salmon", 350], ["Chop Suey", 280],
      ["Sweet & Sour Pork", 280]
    ]},
    { cat: "Sandwiches", items: [
      ["Classic Club Sandwich incl fries", 300], ["Classic BLT Sandwich incl fries", 300],
      ["Tuna Salad Sandwich incl fries", 300], ["Ham & Cheese Sandwich incl fries", 300],
      ["Classic Hamburger incl fries", 350]
    ]},
    { cat: "Rice", items: [
      ["D&D Special Fried Rice", 300], ["Garlic Rice Platter", 210],
      ["Plain Rice Platter", 160], ["Cup of Rice", 30], ["Cup of Garlic Rice", 45]
    ]},
    { cat: "Pasta", items: [
      ["Carbonara", 300], ["Aglio e Olio", 300], ["Bolognese", 300],
      ["Tuna Pasta", 300], ["Penne Arrabbiata", 300], ["Mac & Cheese", 300]
    ]},
    { cat: "Pizza 10 inch", items: [
      ["D&D Special Pizza 10\"", 480], ["Meat Lovers 10\"", 450], ["Pepperoni 10\"", 390],
      ["Hawaiian 10\"", 390], ["Veggie Pizza 10\"", 350], ["Extra pizza topping", 90]
    ]},
    { cat: "Pizza 14 inch", items: [
      ["D&D Special Pizza 14\"", 800], ["Meat Lovers 14\"", 780], ["Pepperoni 14\"", 720],
      ["Hawaiian 14\"", 720], ["Veggie Pizza 14\"", 680]
    ]},
    { cat: "Shakes", items: [
      ["Watermelon shake regular", 90], ["Watermelon shake large", 170],
      ["Pineapple shake regular", 90], ["Pineapple shake large", 170],
      ["Mango shake regular", 90], ["Mango shake large", 170],
      ["Banana shake regular", 90], ["Banana shake large", 170],
      ["Buko shake regular", 90], ["Buko shake large", 170]
    ]},
    { cat: "Juices & Iced Tea", items: [
      ["Four Seasons glass", 90], ["Four Seasons pitcher", 280],
      ["Nestea glass", 90], ["Nestea pitcher", 280],
      ["Mango juice glass", 90], ["Mango juice pitcher", 280],
      ["Orange juice glass", 90], ["Orange juice pitcher", 280],
      ["Pineapple juice glass", 90], ["Pineapple juice pitcher", 280]
    ]},
    { cat: "Drinks", items: [
      ["Bottled Water 500 ml", 30], ["Brewed Coffee or Tea", 80], ["Specialty Coffee", 170],
      ["1 L Red Horse or San Miguel Beer", 170], ["Local bottled beer or cooler", 90],
      ["Small Pepsi, 7-Up, Mirinda or C2", 50], ["Mountain Dew or Tropicana 355 ml", 70],
      ["Coke, Diet Coke, Coke Zero, Royal, Sprite or Gatorade", 90], ["Coke 1.5 L", 150],
      ["House wine, glass", 300], ["Spirits, 1 oz shot", 90], ["Spirits, bottle", 1500]
    ]}
  ];

  var PROFILE_KEY = "ddcc-customer";
  var ORDERS_KEY = "ddcc-orders";
  var DELIVERY_FEE = 150;
  var cart = [];
  var coords = { lat: null, lng: null };

  function $(id) { return document.getElementById(id); }
  function peso(n) { return "\u20b1" + Number(n).toLocaleString("en-PH"); }
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"); } catch (e) { return {}; }
  }
  function saveProfile(p) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); }
  function loadOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); } catch (e) { return []; }
  }
  function saveOrders(list) { localStorage.setItem(ORDERS_KEY, JSON.stringify(list)); }
  function serviceType() {
    var el = document.querySelector('input[name="order-type"]:checked');
    return el ? el.value : "delivery";
  }
  function tipMode() {
    var el = document.querySelector('input[name="order-tip"]:checked');
    return el ? el.value : "none";
  }
  function subtotal() {
    return cart.reduce(function (sum, c) { return sum + c.price * c.qty; }, 0);
  }
  function deliveryFee() {
    return serviceType() === "delivery" ? DELIVERY_FEE : 0;
  }
  function tipAmount() {
    var mode = tipMode();
    var base = subtotal();
    if (mode === "15") return Math.round(base * 0.15);
    if (mode === "other") {
      var n = Number($("order-tip-custom").value);
      return isFinite(n) && n > 0 ? Math.round(n) : 0;
    }
    return 0;
  }
  function grandTotal() {
    return subtotal() + deliveryFee() + tipAmount();
  }

  function renderCatalog() {
    var root = $("order-catalog");
    root.innerHTML = MENU.map(function (group, gi) {
      return '<div class="order-cat">' +
        "<h3>" + group.cat + "</h3>" +
        group.items.map(function (item, ii) {
          var id = gi + "-" + ii;
          return '<div class="order-item">' +
            "<span>" + item[0] + "</span>" +
            '<span class="order-price">' + peso(item[1]) + "</span>" +
            '<button type="button" class="btn order-add" data-id="' + id + '">Add</button>' +
            "</div>";
        }).join("") +
        "</div>";
    }).join("");
    root.querySelectorAll(".order-add").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var parts = btn.getAttribute("data-id").split("-");
        var item = MENU[parts[0]].items[parts[1]];
        var found = cart.find(function (c) { return c.name === item[0]; });
        if (found) found.qty += 1;
        else cart.push({ name: item[0], price: item[1], qty: 1 });
        renderCart();
      });
    });
  }

  function renderCart() {
    var box = $("order-cart-items");
    if (!cart.length) {
      box.innerHTML = '<p class="form-note">Your cart is empty. Add items from the menu.</p>';
    } else {
      box.innerHTML = cart.map(function (c, i) {
        return '<div class="order-cart-row">' +
          "<span>" + c.qty + " \u00d7 " + c.name + "</span>" +
          "<span>" + peso(c.price * c.qty) + "</span>" +
          '<button type="button" class="order-remove" data-i="' + i + '" aria-label="Remove">\u00d7</button>' +
          "</div>";
      }).join("");
      box.querySelectorAll(".order-remove").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var i = Number(btn.getAttribute("data-i"));
          if (cart[i].qty > 1) cart[i].qty -= 1;
          else cart.splice(i, 1);
          renderCart();
        });
      });
    }
    $("order-tip-custom-wrap").hidden = tipMode() !== "other";
    $("order-subtotal").textContent = peso(subtotal());
    $("order-fee-row").hidden = serviceType() !== "delivery";
    $("order-fee").textContent = peso(deliveryFee());
    $("order-tip-amount").textContent = peso(tipAmount());
    $("order-total").textContent = peso(grandTotal());
  }

  function updateServiceFields() {
    var type = serviceType();
    $("room-fields").hidden = type !== "room";
    $("address-fields").hidden = type === "takeout" || type === "room";
    $("gps-fields").hidden = type !== "delivery";
    $("order-address").required = type === "delivery";
    $("order-room").required = type === "room";
    renderCart();
  }

  function fillProfile() {
    var p = loadProfile();
    if (p.name) $("order-name").value = p.name;
    if (p.email) $("order-email").value = p.email;
    if (p.phone) $("order-phone").value = p.phone;
    if (p.address) $("order-address").value = p.address;
    if (p.room) $("order-room").value = p.room;
    if (p.lat && p.lng) {
      coords.lat = p.lat;
      coords.lng = p.lng;
      showMap(p.lat, p.lng);
    }
    renderHistory();
  }

  function showMap(lat, lng) {
    $("gps-status").textContent = "Pinned at " + Number(lat).toFixed(5) + ", " + Number(lng).toFixed(5);
    $("gps-map").hidden = false;
    $("gps-map").src = "https://maps.google.com/maps?q=" + encodeURIComponent(lat + "," + lng) + "&z=16&hl=en&output=embed";
    $("gps-link").hidden = false;
    $("gps-link").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(lat + "," + lng);
  }

  function useLocation() {
    if (!navigator.geolocation) {
      $("gps-status").textContent = "This browser cannot share GPS. Enter the address instead.";
      return;
    }
    $("gps-status").textContent = "Getting your location\u2026";
    navigator.geolocation.getCurrentPosition(function (pos) {
      coords.lat = pos.coords.latitude;
      coords.lng = pos.coords.longitude;
      showMap(coords.lat, coords.lng);
      var p = loadProfile();
      p.lat = coords.lat;
      p.lng = coords.lng;
      saveProfile(p);
    }, function () {
      $("gps-status").textContent = "Location was blocked. Allow location or type the delivery address.";
    }, { enableHighAccuracy: true, timeout: 12000 });
  }

  function orderText(order) {
    var lines = [
      "D&D Coastal Calm order " + order.id,
      "Type: " + order.type,
      "Name: " + order.name,
      "Email: " + order.email,
      "Phone: " + order.phone
    ];
    if (order.room) lines.push("Room: " + order.room);
    if (order.address) lines.push("Address: " + order.address);
    if (order.lat && order.lng) {
      lines.push("GPS: " + order.lat + ", " + order.lng);
      lines.push("Map: https://www.google.com/maps/search/?api=1&query=" + order.lat + "," + order.lng);
    }
    lines.push("Items:");
    order.items.forEach(function (c) {
      lines.push("- " + c.qty + " x " + c.name + " (" + peso(c.price * c.qty) + ")");
    });
    lines.push("Subtotal: " + peso(order.subtotal));
    if (order.deliveryFee) lines.push("Delivery fee: " + peso(order.deliveryFee));
    if (order.tip) lines.push("Tip: " + peso(order.tip));
    lines.push("Total: " + peso(order.total));
    if (order.notes) lines.push("Notes: " + order.notes);
    return lines.join("\n");
  }

  function renderHistory() {
    var list = loadOrders();
    var box = $("order-history");
    if (!list.length) {
      box.innerHTML = "";
      return;
    }
    box.innerHTML = "<h3>Your recent orders</h3>" + list.slice(0, 8).map(function (o) {
      return '<article class="order-hist">' +
        "<strong>" + o.id + "</strong> \u00b7 " + o.type + " \u00b7 " + peso(o.total) +
        "<div>" + o.when + "</div></article>";
    }).join("");
  }

  function submitOrder(event) {
    event.preventDefault();
    if (!cart.length) {
      $("order-alert").textContent = "Add at least one item before placing the order.";
      $("order-alert").hidden = false;
      return;
    }
    var type = serviceType();
    var order = {
      id: "CC-" + Date.now().toString().slice(-8),
      when: new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" }),
      type: type === "room" ? "Room service" : type === "takeout" ? "Takeout" : "Delivery",
      name: $("order-name").value.trim(),
      email: $("order-email").value.trim(),
      phone: $("order-phone").value.trim(),
      address: type === "delivery" ? $("order-address").value.trim() : "",
      room: type === "room" ? $("order-room").value.trim() : "",
      notes: $("order-notes").value.trim(),
      lat: type === "delivery" ? coords.lat : null,
      lng: type === "delivery" ? coords.lng : null,
      items: cart.map(function (c) { return { name: c.name, price: c.price, qty: c.qty }; }),
      subtotal: subtotal(),
      deliveryFee: deliveryFee(),
      tip: tipAmount(),
      total: grandTotal()
    };
    if (type === "delivery" && !order.address && !(order.lat && order.lng)) {
      $("order-alert").textContent = "For delivery, add an address or drop a GPS pin.";
      $("order-alert").hidden = false;
      return;
    }
    saveProfile({
      name: order.name, email: order.email, phone: order.phone,
      address: $("order-address").value.trim(), room: $("order-room").value.trim(),
      lat: coords.lat, lng: coords.lng
    });
    var all = loadOrders();
    all.unshift(order);
    saveOrders(all.slice(0, 30));
    var body = orderText(order);
    var wa = "https://wa.me/639609113729?text=" + encodeURIComponent(body);
    var mail = "mailto:stay@coastal-calm.com?subject=" + encodeURIComponent("Food order " + order.id) +
      "&body=" + encodeURIComponent(body);
    $("order-alert").hidden = true;
    $("order-thanks").hidden = false;
    $("order-thanks-text").textContent = "Order " + order.id + " is saved on this device. Send it to the restaurant by WhatsApp or email to complete it.";
    $("order-wa").href = wa;
    $("order-mail").href = mail;
    cart = [];
    renderCart();
    renderHistory();
    $("order-thanks").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  renderCatalog();
  renderCart();
  fillProfile();
  updateServiceFields();
  document.querySelectorAll('input[name="order-type"]').forEach(function (el) {
    el.addEventListener("change", updateServiceFields);
  });
  document.querySelectorAll('input[name="order-tip"]').forEach(function (el) {
    el.addEventListener("change", renderCart);
  });
  $("order-tip-custom").addEventListener("input", renderCart);
  $("use-gps").addEventListener("click", useLocation);
  $("order-form").addEventListener("submit", submitOrder);
})();
