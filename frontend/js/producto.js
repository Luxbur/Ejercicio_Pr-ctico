const API_URL = "http://localhost/Ejercicio_Pr-ctico/backend/api_productos.php";

// Obtener todos los productos (GET)
function listarProductos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log("Productos:", data); // Verifica que los datos se están obteniendo
            mostrarTablaProductos(data); // Llama a la función para mostrar la tabla
        })
        .catch(err => console.error("Error al obtener productos:", err));
}

// Función para mostrar la tabla de productos en el div 'productosContainer'
function mostrarTablaProductos(productos) {
    const container = document.getElementById('productosContainer');
    if (!Array.isArray(productos) || productos.length === 0) {
        container.innerHTML = '<p>No hay productos para mostrar.</p>';
        return;
    }
    let html = '<table border="1" cellpadding="5"><thead><tr>';
    html += '<th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>';
    productos.forEach(p => {
        html += `<tr>
                    <td>${p.id}</td>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>${p.precio}</td>
                    <td>
                        <button onclick="modificarProductoPrompt(${p.id})">Modificar</button>
                        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
                    </td>
                  </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Obtener un producto por ID (GET)
function mostrarProducto(id) {
  fetch(`${API_URL}?id=${id}`)
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => console.log("Producto:", data)) // Muestra el producto en consola
    .catch(err => console.error("Error al obtener producto:", err));
}

// Función para agregar producto desde el formulario
        function agregarProductoDesdeFormulario() {
            let nombre = document.getElementById('nombreProducto').value;
            let descripcion = document.getElementById('descripcionProducto').value;
            let precio = parseFloat(document.getElementById('precioProducto').value);
            agregarProducto(nombre, descripcion, precio);
        }

// Agregar un producto nuevo (POST)
function agregarProducto(nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio })
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    then(listarProductos())
    .catche(err => console.error("Error al agregar producto:", err));
}

// Modificar un producto (PUT)
function modificarProducto(id, nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, descripcion, precio })
  })
    .then(res => res.json())
    .then(data => {
        console.log("Producto modificado:", data);
        listarProductos(); // Actualizar la lista de productos
    })
    .catch(err => console.error("Error al modificar producto:", err));
}

// Eliminar un producto (DELETE)
function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        fetch(`${API_URL}?id=${id}`, {
            method: "DELETE"
        })
        .then(res => res.json()) // Convierte la respuesta a JSON
        .then(data => {
            console.log("Producto eliminado:", data); // Muestra el resultado en consola
            listarProductos(); // Actualizar la lista de productos
        })
        .catch(err => console.error("Error al eliminar producto:", err));
    }
}

function modificarProductoPrompt(id) {
    const nombre = prompt("Nuevo nombre:");
    const descripcion = prompt("Nueva descripción:");
    const precio = parseFloat(prompt("Nuevo precio:"));
    if (nombre && descripcion && !isNaN(precio)) {
        modificarProducto(id, nombre, descripcion, precio);
    } else {
        alert("Por favor, ingresa valores válidos.");
    }
}

// Ejemplos de uso
// listarProductos();
// mostrarProducto(1);
// agregarProducto("Producto X", "Descripción X", 99.99);
// modificarProducto(1, "Nuevo nombre", "Nueva descripción", 123.45);
// eliminarProducto(1);