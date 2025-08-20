// 1. LÓGICA PARA AGREGAR Y MOSTRAR NOMBRES

let amigos = [];

function agregarAmigo() {
    let nombreCompleto = document.getElementById('nombre').value.trim();

    // Validaciones para asegurar que el nombre sea válido
    if (nombreCompleto === '') {
        alert('Por favor, ingresa tu nombre completo.');
        return;
    }
    if (amigos.includes(nombreCompleto)) {
        alert('Este nombre ya ha sido agregado. Por favor, verifica la lista o ingresa un nombre diferente para participar.');
        return;
    }

    let palabras = nombreCompleto.split(/\s+/);
    
    if (palabras.length < 2) {
        alert('Por favor, ingresa al menos un nombre y un apellido.');
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreCompleto)) {
        alert('Por favor, ingresa solo letras y espacios.');
        return;
    }

    amigos.push(nombreCompleto); // Agrega el nombre al array de amigos
    document.getElementById('nombre').value = ''; // Limpia el campo de entrada

    // Llama a las funciones para actualizar la interfaz
    mostrarAmigos();
    actualizarConteo();

// Condición para habilitar el botón de sortear Se activa solo si hay 2 o más amigos en la lista

    if (amigos.length >= 2) {
        document.querySelector('.button-draw').disabled = false;
    }
}

function mostrarAmigos() { // Obtiene la lista y la limpia antes de volver a renderizar
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    // Itera sobre el array de amigos para mostrar cada nombre
    for (let i = 0; i < amigos.length; i++) {
        let nombre = amigos[i];
        let li = document.createElement('li');
        li.textContent = `${i + 1}. ${nombre}`;
        lista.appendChild(li);
    }
}

// 2. LÓGICA PARA EL SORTEO
// Validación para asegurar que hay suficientes participantes
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 participantes para el sorteo.");
        return;
    }
    // Selecciona un nombre aleatorio del array
    let numeroAmigoSecreto = Math.floor(Math.random() * amigos.length);
    let amigoSecreto = amigos[numeroAmigoSecreto];
    
    // Obtiene la lista de resultados y la limpia
    let resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = '';
    
    // Muestra el nombre del amigo secreto
    let li = document.createElement('li');
    li.textContent = `🎁 ${amigoSecreto} ha sido sorteado como tu amigo secreto 🎁`;
    resultadoLista.appendChild(li);

    // Muestra el mensaje de finalización del sorteo
    document.getElementById('mensaje-finalizado').textContent = '🔒 Sorteo finalizado, clic en "Iniciar nuevo juego". 🔒';

    // Deshabilita el botón de sortear y habilita el de reiniciar
    document.querySelector('.button-draw').disabled = true;
    document.querySelector('.button-reset').disabled = false;
}

// Función para actualizar el contador de participantes
function actualizarConteo() {
    let mensaje = document.getElementById('mensaje-participantes');
    if (amigos.length > 0) {
        mensaje.textContent = `Total de participantes: ${amigos.length}`;
    } else {
        mensaje.textContent = '';
    }
}

// 3. LÓGICA PARA REINICIAR EL JUEGO
function iniciarNuevoJuego() { // Limpia el array de amigos y la interfaz
    amigos = [];
    document.getElementById('nombre').value = '';
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('mensaje-finalizado').textContent = '';
    actualizarConteo();

    // Deshabilita ambos botones al reiniciar el juego
    document.querySelector('.button-draw').disabled = true;
    document.querySelector('.button-reset').disabled = true;
}