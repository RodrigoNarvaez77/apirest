document.addEventListener('DOMContentLoaded', () => {
    // Esperar a que cargue el DOM
    document.getElementById('submit-button').addEventListener('click', async (event) => {
        event.preventDefault(); // Evitar recargar la página
        await enviarFormulario(); // Llamar a la función asíncrona
    });
});

async function enviarFormulario() {
    try {
        // Capturar los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        const datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            mensaje: mensaje,
        };

        console.log("Datos capturados:", datos);

        // Mostrar feedback visual en el botón
        const submitButton = document.getElementById('submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Enviar los datos al servidor
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Leer detalles del error
            console.error('Error en la respuesta:', errorDetails);
            alert('Error al enviar el formulario: ' + errorDetails);
            return;
        }

        const data = await response.json();
        if (data.success) {
            alert('Formulario enviado correctamente');
            document.getElementById('contactForm').reset(); // Limpiar el formulario
        } else {
            alert('Error al procesar los datos');
        }
    } catch (error) {
        console.error("Error:", error.message || error);
        alert('Hubo un error en la solicitud.');
    } finally {
        // Restaurar el botón
        const submitButton = document.getElementById('submit-button');
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar Cotización';
    }
}