// Menú móvil
const menuButton = document.getElementById('menu-button');
const nav = document.getElementById('nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const open = nav.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuButton.innerHTML = open
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// =========================================
// WHATSAPP
// Cambia este número por el de ustedes:
// código de país + número, sin +, espacios ni guiones.
// Ejemplo Colombia: 573001234567
// =========================================
const WHATSAPP_NUMBER = '573103721710';

// El botón flotante de WhatsApp usa el mismo número
const floatBtn = document.querySelector('.whatsapp');
if (floatBtn) {
    floatBtn.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    floatBtn.rel = 'noopener noreferrer';
}

// Formulario: al enviarlo abre WhatsApp con el mensaje listo
const form = document.getElementById('contact-form');

if (form) form.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.getElementById('name').value.trim();
    const telefono = document.getElementById('phone').value.trim();
    const correo = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('message').value.trim();

    const texto =
        '*Nuevo mensaje desde la página web*\n\n' +
        `*Nombre:* ${nombre}\n` +
        `*Teléfono:* ${telefono}\n` +
        `*Correo:* ${correo}\n\n` +
        `*Mensaje:*\n${mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

    // En celular abre la app; si el navegador bloquea la ventana, redirige
    const ventana = window.open(url, '_blank');
    if (!ventana) {
        window.location.href = url;
    }

    form.reset();
});

// =========================================
// PÁGINA DE PRODUCTOS
// Los botones "Consultar" abren WhatsApp con el nombre del
// producto (se toma del título <h3> de cada tarjeta).
// =========================================
document.querySelectorAll('.product-card .wa-link').forEach(link => {
    const nombre = link.closest('.product-card').querySelector('h3').textContent.trim();
    const texto = `Hola, me interesa el producto: ${nombre}. ¿Me das más información?`;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    link.target = '_blank';
    link.rel = 'noopener';
});

// Botones de cotización por categoría
document.querySelectorAll('.cat-wa').forEach(link => {
    const categoria = link.dataset.categoria;
    const texto = `Hola, quiero cotizar ${categoria}. ¿Me das más información?`;
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    link.target = '_blank';
    link.rel = 'noopener';
});