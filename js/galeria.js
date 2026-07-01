/**
 * Script de visualización, filtros y formulario para la Galería
 * MultiFierro
 */

// Arreglo en memoria para almacenar las imágenes de la galería
const galeriaItems = [
    {
        titulo: "Pasillos de Ferretería",
        descripcion: "Amplia variedad en stock",
        categoria: "Nuestra Tienda",
        img: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Estándar",
        etiquetas: ["Popular"]
    },
    {
        titulo: "Taladros de Impacto",
        descripcion: "Potencia y precisión",
        categoria: "Herramientas",
        img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Estándar",
        etiquetas: ["Nuevo", "Recomendado"]
    },
    {
        titulo: "Remodelación de Cocina",
        descripcion: "Materiales de MultiFierro",
        categoria: "Proyectos de Clientes",
        img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Destacado",
        etiquetas: ["Popular"]
    },
    {
        titulo: "Sección de Pinturas",
        descripcion: "Todos los colores disponibles",
        categoria: "Nuestra Tienda",
        img: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Estándar",
        etiquetas: ["Nuevo"]
    },
    {
        titulo: "Materiales de Construcción",
        descripcion: "Calidad garantizada",
        categoria: "Herramientas",
        img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Estándar",
        etiquetas: ["Recomendado"]
    },
    {
        titulo: "Asesoramiento Experto",
        descripcion: "Nuestro equipo en acción",
        categoria: "Nuestra Tienda",
        img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tamano: "Estándar",
        etiquetas: ["Popular"]
    }
];

// Filtro inicialmente seleccionado
let filtroActivo = "Todos";

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("galeria-grid");
    const form = document.getElementById("registro-galeria-form");

    // Elementos del Formulario
    const tituloInput = document.getElementById("titulo");
    const urlInput = document.getElementById("url");
    const categoriaSelect = document.getElementById("categoria");
    const descripcionInput = document.getElementById("descripcion");

    // --- RENDERIZADO DE GALERÍA ---

    function renderizarGaleria() {
        if (!grid) return;
        grid.innerHTML = "";

        // Filtrado por categoría
        const filtrados = [];
        for (let i = 0; i < galeriaItems.length; i++) {
            const item = galeriaItems[i];
            if (filtroActivo === "Todos" || item.categoria === filtroActivo) {
                filtrados.push(item);
            }
        }

        if (filtrados.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 45px; font-style: italic;">
                    No hay elementos disponibles en la categoría "${filtroActivo}".
                </div>
            `;
            return;
        }

        // Crear elementos en el DOM
        filtrados.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "galeria-item";

            // Efecto destacado si aplica
            if (item.tamano === "Destacado") {
                itemDiv.style.border = "3px solid #FEC400";
            }

            // Generar etiquetas badge
            let badges = "";
            if (item.etiquetas && item.etiquetas.length > 0) {
                badges = `<div class="item-badges" style="margin-top:5px; display:flex; gap:5px; flex-wrap:wrap;">`;
                item.etiquetas.forEach(tag => {
                    badges += `<span style="background:#FEC400; color:#003092; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:bold;">${tag}</span>`;
                });
                badges += `</div>`;
            }

            itemDiv.innerHTML = `
                <img src="${escapeHTML(item.img)}" alt="${escapeHTML(item.titulo)}" class="img-galeria">
                <div class="item-info">
                    <h3>${escapeHTML(item.titulo)}</h3>
                    <p>${escapeHTML(item.descripcion)}</p>
                    <div style="font-size: 11px; margin-top: 5px; color: #FEC400; opacity: 0.9;">
                        Categoría: ${escapeHTML(item.categoria)} ${item.tamano === "Destacado" ? "★" : ""}
                    </div>
                    ${badges}
                </div>
            `;
            grid.appendChild(itemDiv);
        });
    }

    // --- FILTRADO ---

    const filterButtons = document.querySelectorAll(".galeria-filtros .filtro");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Quitar clase activo de todos y poner en el actual
            filterButtons.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");

            // Actualizar filtro y redibujar
            filtroActivo = btn.textContent.trim();
            renderizarGaleria();
        });
    });


    function showError(inputElement, spanId, message) {
        const errorSpan = document.getElementById(spanId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add("visible");
        }
        if (inputElement) {
            inputElement.classList.add("invalid");
        }
    }

    function clearError(inputElement, spanId) {
        const errorSpan = document.getElementById(spanId);
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.classList.remove("visible");
        }
        if (inputElement) {
            inputElement.classList.remove("invalid");
        }
    }

    function getSelectedCheckboxes(name) {
        const checkboxes = document.getElementsByName(name);
        const selected = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selected.push(checkboxes[i].value);
            }
        }
        return selected;
    }

    function validateRadio(name, spanId) {
        const radios = document.getElementsByName(name);
        const radioGroup = document.querySelector(`input[name="${name}"]`).closest(".radio-group");
        let valorSeleccionado = "";
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                valorSeleccionado = radios[i].value;
                break;
            }
        }
        if (valorSeleccionado === "") {
            showError(radioGroup, spanId, "Debe seleccionar un tamaño de visualización.");
            return null;
        } else {
            clearError(radioGroup, spanId);
            return valorSeleccionado;
        }
    }

    function validateCheckboxes(name, spanId) {
        const checkboxes = document.getElementsByName(name);
        const checkboxGroup = document.querySelector(`input[name="${name}"]`).closest(".checkbox-group");
        const seleccionados = getSelectedCheckboxes(name);

        if (seleccionados.length === 0) {
            showError(checkboxGroup, spanId, "Debe seleccionar al menos una etiqueta.");
            return null;
        } else {
            clearError(checkboxGroup, spanId);
            return seleccionados;
        }
    }

    // --- EVENTOS EN TIEMPO REAL PARA LIMPIAR ERRORES ---

    tituloInput.addEventListener("input", () => {
        if (tituloInput.value.trim().length >= 3) {
            clearError(tituloInput, "error-titulo");
        }
    });

    urlInput.addEventListener("input", () => {
        const val = urlInput.value.trim();
        if (val.startsWith("http://") || val.startsWith("https://")) {
            clearError(urlInput, "error-url");
        }
    });

    descripcionInput.addEventListener("input", () => {
        if (descripcionInput.value.trim().length >= 5) {
            clearError(descripcionInput, "error-descripcion");
        }
    });

    categoriaSelect.addEventListener("change", () => {
        if (categoriaSelect.value !== "") {
            clearError(categoriaSelect, "error-categoria");
        }
    });

    document.getElementsByName("tamano").forEach(radio => {
        radio.addEventListener("change", () => {
            const radioGroup = radio.closest(".radio-group");
            clearError(radioGroup, "error-tamano");
        });
    });

    document.getElementsByName("etiquetas").forEach(cb => {
        cb.addEventListener("change", () => {
            const checkboxGroup = cb.closest(".checkbox-group");
            const selected = getSelectedCheckboxes("etiquetas");
            if (selected.length > 0) {
                clearError(checkboxGroup, "error-etiquetas");
            }
        });
    });


    function validarFormulario() {
        let esValido = true;

        // Título
        const tituloVal = tituloInput.value.trim();
        if (tituloVal === "") {
            showError(tituloInput, "error-titulo", "El título es obligatorio.");
            esValido = false;
        } else if (tituloVal.length < 3) {
            showError(tituloInput, "error-titulo", "El título debe tener al menos 3 caracteres.");
            esValido = false;
        } else {
            clearError(tituloInput, "error-titulo");
        }

        // URL (sin regex)
        const urlVal = urlInput.value.trim();
        if (urlVal === "") {
            showError(urlInput, "error-url", "La URL de la imagen es obligatoria.");
            esValido = false;
        } else if (!urlVal.startsWith("http://") && !urlVal.startsWith("https://")) {
            showError(urlInput, "error-url", "La URL debe comenzar con http:// o https://");
            esValido = false;
        } else {
            clearError(urlInput, "error-url");
        }

        // Categoría
        if (categoriaSelect.value === "") {
            showError(categoriaSelect, "error-categoria", "Debe seleccionar una categoría.");
            esValido = false;
        } else {
            clearError(categoriaSelect, "error-categoria");
        }

        // Descripción
        const descVal = descripcionInput.value.trim();
        if (descVal === "") {
            showError(descripcionInput, "error-descripcion", "La descripción es obligatoria.");
            esValido = false;
        } else if (descVal.length < 5) {
            showError(descripcionInput, "error-descripcion", "La descripción debe tener al menos 5 caracteres.");
            esValido = false;
        } else {
            clearError(descripcionInput, "error-descripcion");
        }

        // Tamaño (Radios)
        const tamanoVal = validateRadio("tamano", "error-tamano");
        if (tamanoVal === null) {
            esValido = false;
        }

        // Etiquetas (Checkboxes)
        const etiquetasVal = validateCheckboxes("etiquetas", "error-etiquetas");
        if (etiquetasVal === null) {
            esValido = false;
        }

        return esValido;
    }


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validarFormulario()) {
            // Capturar datos
            const nuevoItem = {
                titulo: tituloInput.value.trim(),
                descripcion: descripcionInput.value.trim(),
                categoria: categoriaSelect.value,
                img: urlInput.value.trim(),
                tamano: document.querySelector('input[name="tamano"]:checked').value,
                etiquetas: getSelectedCheckboxes("etiquetas")
            };

            // Guardar en el array
            galeriaItems.push(nuevoItem);

            // Mostrar mensaje de éxito
            mostrarAlertaExito("¡Imagen agregada con éxito a la galería!");

            // Limpiar formulario y errores de validación
            form.reset();

            // Re-renderizar galería respetando el filtro actual
            renderizarGaleria();
        } else {
            // Scroll al primer error
            const primerError = document.querySelector(".error-msg.visible");
            if (primerError) {
                primerError.closest(".form-group").scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });


    function mostrarAlertaExito(mensaje) {
        const alertaPrevia = document.querySelector(".alert-exito");
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        const alerta = document.createElement("div");
        alerta.className = "alert-exito";
        alerta.textContent = mensaje;

        // Insertar alerta antes del formulario
        form.parentNode.insertBefore(alerta, form);

        // Desvanecimiento e eliminación automática
        setTimeout(() => {
            alerta.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            alerta.style.opacity = "0";
            alerta.style.transform = "translateY(-10px)";
            setTimeout(() => alerta.remove(), 500);
        }, 4000);
    }

    // Protección básica contra XSS
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // --- CARGA INICIAL ---
    renderizarGaleria();
});
