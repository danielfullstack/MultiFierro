
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});



function mostrar() {

    let herramienta = document.querySelector('input[name="herramienta"]:checked');

    let origen = document.querySelector('input[name="origen"]:checked');

    if (!herramienta || !origen) {

        alert("Seleccione el tipo de herramienta y el origen.");

        return;

    }

    let servicios = [];

    if (document.getElementById("delivery").checked)
        servicios.push("Delivery");

    if (document.getElementById("asesoria").checked)
        servicios.push("Asesoría Técnica");

    if (document.getElementById("instalacion").checked)
        servicios.push("Instalación");

    document.getElementById("resultado").innerHTML =

        "Herramienta: " + herramienta.value +

        "<br>Origen: " + origen.value +

        "<br>Servicios: " +

        (servicios.length > 0 ? servicios.join(", ") : "Ninguno");

}






