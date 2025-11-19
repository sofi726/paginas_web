let cart = []; // El carrito de compras global

console.log("Sistema de Carrito Vape activado y listo.");

// --- 1. Agregar Producto al Carrito (CORREGIENDO EL NOMBRE) ---
function addToCart(nombre, precio) {
    
    const precioNumerico = parseFloat(precio);
    
    // Si el precio no es un número válido, mostramos un error y no agregamos.
    if (isNaN(precioNumerico)) {
        console.error("Error: El precio no es un número válido para " + nombre);
        alert("No se pudo agregar " + nombre + " al carrito por un problema en el precio.");
        return; 
    }

    const existingItem = cart.find(item => item.nombre === nombre);

    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        // *LÍNEA CLAVE:* Aseguramos que el 'nombre' del producto que se añade sea el que se pasa a la función.
        cart.push({ nombre: nombre, precio: precioNumerico, cantidad: 1 });
    }
    
    updateCartCount();
    alert(nombre + " agregado al carrito.");
}
// --- 2. Actualizar el Contador de Productos en el Menú ---
function updateCartCount() {
    // La longitud del carrito es la cantidad de tipos de productos únicos
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) { 
        cartCountElement.textContent = cart.length;
    }
}

// --- 3. Mostrar el Carrito (Verificar que usa item.nombre) ---
function showCart() {
    const cartDisplay = document.getElementById('cart-display');
    const cartContent = document.getElementById('cart-content');
    
    if (cart.length === 0) {
        // ... (código para carrito vacío)
        return;
    }

    let htmlContent = "";

    cart.forEach(item => {
        htmlContent += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed #eee;">';
        
        // *LÍNEA CLAVE:* Asegurarse de que aquí se usa 'item.nombre'
        htmlContent += '<span style="flex: 2; font-size: 1.1em; color: #444;">' + item.nombre + '</span>';
        
        htmlContent += '<div style="flex: 1; display: flex; align-items: center; justify-content: flex-end; font-weight: bold;">';
        htmlContent += '<span>Cantidad: x' + item.cantidad + '</span>';
        htmlContent += '</div>';
        
        htmlContent += '</div>';
    });

    htmlContent += '<hr style="margin: 20px 0; border-color: #eee;">';
    htmlContent += '<p style="text-align: center; font-weight: bold;">El precio y el total se calcularán por WhatsApp.</p>';

    cartContent.innerHTML = htmlContent;
    cartDisplay.style.display = 'block'; 
}
// --- 4. Enviar Pedido por WhatsApp (SIN CALCULAR TOTAL) ---
function sendCartToWhatsApp() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Por favor, agrega productos.");
        return;
    }

    let numeroWhatsApp = "573138816415"; // ¡REEMPLAZA CON TU NÚMERO REAL!
    let mensaje = "Hola! Quisiera ordenar lo siguiente de la lista de vapes:\n\n";

    cart.forEach(item => {
        // Solo agregamos el nombre y la cantidad al mensaje
        mensaje += "- " + item.nombre + " (x" + item.cantidad + ")\n";
    });

    mensaje += "\n--- POR FAVOR, CONFIRMAR  TOTAL ---\n";
    mensaje += "\nGracias!";
    
    let url = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}