document.addEventListener('DOMContentLoaded', () => {//esperar que carge el doom
    document.getElementById('boton4').addEventListener('click', async () => {
        await mostrarregistro();
    });
});

async function mostrarregistro(){
       const idmodificar =  document.getElementById("updateid").value;
       console.log(idmodificar);
       try{ 
        const response = await fetch(`/api/registros/${idmodificar}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        document.getElementById('userID2').value = data.userId 
        document.getElementById('title2').value = data.title; 
        document.getElementById('body2').value = data.body; 
    }catch(error){
        "error".error
    }
}

async function modificar2() {
    console.group("hola");
    try {
        const idmodificar2 =  document.getElementById("userID2").value;
        console.log(idmodificar2);
        const titleCapturar = document.getElementById("title2").value;
        const bodyCapturar = document.getElementById("body2").value;

        const persons = {
            userId: idmodificar2,
            title: titleCapturar,
            body: bodyCapturar,
        };

        const response = await fetch(`/api/Modificar/${idmodificar2}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(persons)
        });
        const data = await response.json();
        //console.log(data);
       alert("Datos Insertados correctamente");
    } catch (error) {
        console.error("Error:", error.message || error);
        alert('Error en la solicitud');
    }
}