async function mostrar(){
    try { 
        const response = await fetch('/api/registros', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        const body = document.getElementById("tmostrar");
        body.innerHTML='';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.tittle}</td>
                <td>${item.body}</td>
            `;
            body.appendChild(row);
        });

    } catch (error) {
        console.log("Error:", error); // Corregido para mostrar el error
    }
}

mostrar()
