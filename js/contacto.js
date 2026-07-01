/**
 * Script de validación y gestión del Formulario de Contacto
 * MultiFierro
 */

// Arreglo en memoria para almacenar los contactos guardados
const contactosGuardados = [];

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contacto-form");
    const tablaBody = document.getElementById("tabla-body-contactos");

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const asuntoSelect = document.getElementById("asunto");
    const mensajeTextarea = document.getElementById("mensaje");
    const terminosCheckbox = document.getElementById("terminos");


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


    function validateRadio(name, spanId) {
        const radios = document.getElementsByName(name);
        const radioGroup = document.querySelector(`input[name="${name}"]`).closest(".radio-group");
        let checkedValue = "";
        for (const radio of radios) {
            if (radio.checked) {
                checkedValue = radio.value;
                break;
            }
        }
        if (!checkedValue) {
            showError(radioGroup, spanId, "Debe seleccionar un tipo de cliente.");
            return null;
        } else {
            clearError(radioGroup, spanId);
            return checkedValue;
        }
    }

    function getSelectedCheckboxes(name) {
        const checkboxes = document.getElementsByName(name);
        const selected = [];
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                selected.push(checkbox.value);
            }
        }
        return selected;
    }

    function validateCheckboxes(name, spanId) {
        const checkboxes = document.getElementsByName(name);
        const checkboxGroup = document.querySelector(`input[name="${name}"]`).closest(".checkbox-group");
        const selected = getSelectedCheckboxes(name);

        if (selected.length === 0) {
            showError(checkboxGroup, spanId, "Debe seleccionar al menos una opción de interés.");
            return null;
        } else {
            clearError(checkboxGroup, spanId);
            return selected;
        }
    }


    nombreInput.addEventListener("input", () => {
        const val = nombreInput.value.trim();
        if (val.length >= 3) {
            clearError(nombreInput, "error-nombre");
        }
    });

    emailInput.addEventListener("input", () => {
        if (emailInput.value.trim().includes("@")) {
            clearError(emailInput, "error-email");
        }
    });

    telefonoInput.addEventListener("input", () => {
        const val = telefonoInput.value.trim();
        if (val.length === 9 && !isNaN(val)) {
            clearError(telefonoInput, "error-telefono");
        }
    });

    asuntoSelect.addEventListener("change", () => {
        if (asuntoSelect.value !== "") {
            clearError(asuntoSelect, "error-asunto");
        }
    });

    mensajeTextarea.addEventListener("input", () => {
        if (mensajeTextarea.value.trim().length >= 10) {
            clearError(mensajeTextarea, "error-mensaje");
        }
    });

    terminosCheckbox.addEventListener("change", () => {
        if (terminosCheckbox.checked) {
            clearError(terminosCheckbox, "error-terminos");
        }
    });

    document.getElementsByName("tipoCliente").forEach(radio => {
        radio.addEventListener("change", () => {
            const radioGroup = radio.closest(".radio-group");
            clearError(radioGroup, "error-tipoCliente");
        });
    });

    document.getElementsByName("intereses").forEach(cb => {
        cb.addEventListener("change", () => {
            const checkboxGroup = cb.closest(".checkbox-group");
            const selected = getSelectedCheckboxes("intereses");
            if (selected.length > 0) {
                clearError(checkboxGroup, "error-intereses");
            }
        });
    });


    function validarFormulario() {
        let esValido = true;

        // Nombre
        const nombreVal = nombreInput.value.trim();
        if (nombreVal === "") {
            showError(nombreInput, "error-nombre", "El nombre completo es obligatorio.");
            esValido = false;
        } else if (nombreVal.length < 3) {
            showError(nombreInput, "error-nombre", "El nombre debe tener al menos 3 caracteres.");
            esValido = false;
        } else {
            clearError(nombreInput, "error-nombre");
        }

        // Email
        const emailVal = emailInput.value.trim();
        if (emailVal === "") {
            showError(emailInput, "error-email", "El correo electrónico es obligatorio.");
            esValido = false;
        } else if (!emailVal.includes("@")) {
            showError(emailInput, "error-email", "El correo electrónico debe contener un '@'.");
            esValido = false;
        } else {
            clearError(emailInput, "error-email");
        }

        // Teléfono
        const telefonoVal = telefonoInput.value.trim();
        if (telefonoVal === "") {
            showError(telefonoInput, "error-telefono", "El teléfono es obligatorio.");
            esValido = false;
        } else if (telefonoVal.length !== 9 || isNaN(telefonoVal)) {
            showError(telefonoInput, "error-telefono", "El teléfono debe tener exactamente 9 dígitos numéricos.");
            esValido = false;
        } else {
            clearError(telefonoInput, "error-telefono");
        }

        // Asunto
        if (asuntoSelect.value === "") {
            showError(asuntoSelect, "error-asunto", "Por favor selecciona un asunto.");
            esValido = false;
        } else {
            clearError(asuntoSelect, "error-asunto");
        }

        // Tipo de Cliente (Radios)
        const clienteVal = validateRadio("tipoCliente", "error-tipoCliente");
        if (clienteVal === null) {
            esValido = false;
        }

        const interesesVal = validateCheckboxes("intereses", "error-intereses");
        if (interesesVal === null) {
            esValido = false;
        }

        // Mensaje
        const mensajeVal = mensajeTextarea.value.trim();
        if (mensajeVal === "") {
            showError(mensajeTextarea, "error-mensaje", "El mensaje es obligatorio.");
            esValido = false;
        } else if (mensajeVal.length < 10) {
            showError(mensajeTextarea, "error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
            esValido = false;
        } else {
            clearError(mensajeTextarea, "error-mensaje");
        }

        // Términos y condiciones
        if (!terminosCheckbox.checked) {
            showError(terminosCheckbox, "error-terminos", "Debes aceptar las políticas de privacidad.");
            esValido = false;
        } else {
            clearError(terminosCheckbox, "error-terminos");
        }

        return esValido;
    }


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validarFormulario()) {
            // Capturar datos ingresados
            const nuevoContacto = {
                nombre: nombreInput.value.trim(),
                email: emailInput.value.trim(),
                telefono: telefonoInput.value.trim(),
                asunto: asuntoSelect.options[asuntoSelect.selectedIndex].text,
                tipoCliente: document.querySelector('input[name="tipoCliente"]:checked').value,
                intereses: getSelectedCheckboxes("intereses").join(", "),
                mensaje: mensajeTextarea.value.trim()
            };

            // Almacenar en el array global
            contactosGuardados.push(nuevoContacto);

            // Mostrar mensaje animado de éxito
            mostrarAlertaExito("¡Datos de contacto validados y guardados exitosamente!");

            // Limpiar el formulario
            form.reset();

            // Renderizar la tabla de resultados
            renderizarTabla();
        } else {
            // Desplazar la vista al primer error detectado
            const primerError = document.querySelector(".error-msg.visible");
            if (primerError) {
                primerError.closest(".form-group").scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });


    // function limpiarTodosLosErrores() {
    //     const errorSpans = document.querySelectorAll(".error-msg");
    //     errorSpans.forEach(span => {
    //         span.textContent = "";
    //         span.classList.remove("visible");
    //     });

    //     const inputs = document.querySelectorAll(".form-group input, .form-group select, .form-group textarea, .radio-group, .checkbox-group");
    //     inputs.forEach(input => {
    //         input.classList.remove("invalid");
    //     });
    // }

    function mostrarAlertaExito(mensaje) {
        const alertaPrevia = document.querySelector(".alert-exito");
        if (alertaPrevia) {
            alertaPrevia.remove();
        }

        const alerta = document.createElement("div");
        alerta.className = "alert-exito";
        alerta.textContent = mensaje;

        // Insertar alerta al inicio de la tarjeta de contacto
        form.parentNode.insertBefore(alerta, form);

        // Desvanecimiento e eliminación automática
        setTimeout(() => {
            alerta.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            alerta.style.opacity = "0";
            alerta.style.transform = "translateY(-10px)";
            setTimeout(() => alerta.remove(), 500);
        }, 4000);
    }

    function renderizarTabla() {
        if (contactosGuardados.length === 0) {
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="7" class="tabla-vacia">No hay registros guardados. Completa el formulario de arriba.</td>
                </tr>
            `;
            return;
        }

        let htmlFilas = "";
        contactosGuardados.forEach(contacto => {
            htmlFilas += `
                <tr>
                    <td><strong>${escapeHTML(contacto.nombre)}</strong></td>
                    <td>${escapeHTML(contacto.email)}</td>
                    <td>${escapeHTML(contacto.telefono)}</td>
                    <td>${escapeHTML(contacto.asunto)}</td>
                    <td>${escapeHTML(contacto.tipoCliente)}</td>
                    <td>${escapeHTML(contacto.intereses)}</td>
                    <td>${escapeHTML(contacto.mensaje)}</td>
                </tr>
            `;
        });

        tablaBody.innerHTML = htmlFilas;
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
});
