document.addEventListener("DOMContentLoaded", () => {
  tabControl();

  if (localStorage.getItem("contactos")) {
    contactos = JSON.parse(localStorage.getItem("contactos"));
  }
  if (localStorage.getItem("eventos")) {
    eventos = JSON.parse(localStorage.getItem("eventos"));
  }
  showContactos();
  populateContactos();
  showEventos();
});

const tabControl = () => {
  const tabItems = [...document.querySelectorAll(".tabs ul li")];
  document.querySelector(".tabs ul").addEventListener("click", (e) => {
    let element = e.target;
    if (e.target.tagName === "A") {
      element = e.target.parentElement;
    }

    tabItems.forEach((e) => {
      e.classList.remove("is-active");
      const target = document.getElementById(e.attributes["target"].value);
      target.classList.remove("show");
    });

    element.classList.toggle("is-active");

    const target = document.getElementById(element.attributes["target"].value);
    target.classList.toggle("show");
  });
};

/* ----------------------- Modulo Contactos ----------------------- */
//Inputs Personales
const formContacto = document.getElementById("form-contacto");
const tablaContacto = document.getElementById("bodyTContactos");
const inputNomPersonal = document.getElementById("input-nomPersonal");
const inputDomPersonal = document.getElementById("input-domPersonal");
const inputTelPersonal = document.getElementById("input-tlfPersonal");
const inputCelPersonal = document.getElementById("input-celPersonal");
const inputFechaNac = document.getElementById("input-fechaNac");
const inputSexo = document.getElementById("input-sexo");
//Inputs Laborales
const inputNomEmpresa = document.getElementById("input-nomEmpresa");
const inputDomEmpresa = document.getElementById("input-domEmpresa");
const inputPuesto = document.getElementById("input-puesto");
const inputTelEmpresa = document.getElementById("input-telEmpresa");
const inputExtEmpresa = document.getElementById("input-extEmpresa");
const inputEmail = document.getElementById("input-email");

let contactos = {
  1658646084639: {
    id: 1658646084639,
    nombre: "Prueba",
    empresa: "Empresa",
    tlfno: "12345678",
    ext: "33",
    email: "user@mail.com",
  },
};
const templateContactos = document.getElementById(
  "template-tableContactos"
).content;
const fragment = document.createDocumentFragment();

formContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  setContacto(e);
});

const setContacto = (e) => {
  console.log("onclicked");
  if (inputNomPersonal.value.trim() === "") {
    alert("Nombre no puede quedar vacío");
    return;
  } else if (inputNomEmpresa.value.trim() === "") {
    alert("Nombre de Empresa no puede quedar vacío");
    return;
  } else if (inputTelEmpresa.value.trim() === "") {
    alert("Telefono de Empresa no puede quedar vacío");
    return;
  } else if (inputExtEmpresa.value.trim() === "") {
    alert("La Extensión no puede quedar vacía");
    return;
  } else if (inputEmail.value.trim() === "") {
    alert("Correo Electrónico no puede quedar vacío");
    return;
  }

  const contacto = {
    id: Date.now(),
    nombre: inputNomPersonal.value,
    empresa: inputNomEmpresa.value,
    tlfno: inputTelEmpresa.value,
    ext: inputExtEmpresa.value,
    email: inputEmail.value,
  };

  contactos[contacto.id] = contacto;

  formContacto.reset();
  alert("Se ha Guardado Correctamente");

  showContactos();
  populateContactos();
};

const showContactos = () => {
  localStorage.setItem("contactos", JSON.stringify(contactos));

  tablaContacto.innerHTML = "";
  Object.values(contactos).forEach((c) => {
    const clone = templateContactos.cloneNode(true);
    td = clone.querySelectorAll("td");
    td[0].textContent = c.nombre;
    td[1].textContent = c.empresa;
    td[2].textContent = c.tlfno;
    td[3].textContent = c.ext;
    td[4].textContent = c.email;
    fragment.appendChild(clone);
  });
  tablaContacto.appendChild(fragment);
};

/* ----------------------- Modulo Agenda ----------------------- */
//Inputs Agenda
const formAgenda = document.getElementById("form-agenda");
const tablaEventos = document.getElementById("bodyTEventos");
const inputDia = document.getElementById("input-dia");
const inputMes = document.getElementById("input-mes");
const inputAnio = document.getElementById("input-anio");
const inputNota = document.getElementById("input-nota");
const inputLugar = document.getElementById("input-lugar");
const inputContacto = document.getElementById("input-contacto");
const templateOption = document.getElementById("template-option").content;
const templateEventos = document.getElementById(
  "template-tableEventos"
).content;

const populateContactos = () => {
  inputContacto.innerHTML = "";

  Object.values(contactos).forEach((c) => {
    const clone = templateOption.cloneNode(true);
    clone.querySelector("option").textContent = c.nombre;
    fragment.appendChild(clone);
  });
  inputContacto.appendChild(fragment);
};

let eventos = {
  1658646084639: {
    id: 1658646084639,
    dia: 01,
    mes: 01,
    anio: 1990,
    nota: "Nota",
    lugar: "Lugar",
    contacto: "Prueba",
  },
};

formAgenda.addEventListener("submit", (e) => {
  e.preventDefault();
  setEvento(e);
});

const setEvento = (e) => {
  if (inputDia.value.trim() === "") {
    alert("Dia no puede quedar vacío");
    return;
  } else if (inputDia.value > 31 || inputDia.value < 0) {
    alert("Dia no puede ser mayor que 31");
    inputDia.focus();
    return;
  } else if (inputMes.value > 12 || inputMes.value < 0) {
    alert("Mes no puede ser mayor que 12");
    inputMes.focus();
    return;
  } else if (inputMes.value.trim() === "") {
    alert("Mes no puede quedar vacío");
    return;
  } else if (inputAnio.value.trim() === "") {
    alert("Año no puede quedar vacío");
    return;
  } else if (inputContacto.value.trim() === "") {
    alert("Debe haber registrado un Contacto");
    return;
  } else if (inputNota.value.trim() === "") {
    alert("Nota no puede quedar vacía");
    return;
  } else if (inputLugar.value.trim() === "") {
    alert("Lugar no puede quedar vacío");
    return;
  }

  const evento = {
    id: Date.now(),
    dia: inputDia.value,
    mes: inputMes.value,
    anio: inputAnio.value,
    lugar: inputLugar.value,
    nota: inputNota.value,
    contacto: inputContacto.value,
  };

  eventos[evento.id] = evento;

  console.log(eventos);

  formAgenda.reset();
  alert("Se ha Guardado Correctamente");

  showEventos();
};

const showEventos = () => {
  localStorage.setItem("eventos", JSON.stringify(eventos));

  tablaEventos.innerHTML = "";
  Object.values(eventos).forEach((e) => {
    const clone = templateEventos.cloneNode(true);
    td = clone.querySelectorAll("td");
    td[0].textContent = e.dia;
    td[1].textContent = e.mes;
    td[2].textContent = e.anio;
    td[3].textContent = e.lugar;
    td[4].textContent = e.nota;
    td[5].textContent = e.contacto;
    fragment.appendChild(clone);
  });
  tablaEventos.appendChild(fragment);
};

/* ----------------------- Modulo Buscar Contacto ----------------------- */
//Inputs Busqueda Contacto
const inputBContacto = document.getElementById("input-busqNombre");
const buscarContacto = document.getElementById("form-BContacto");
const contactoEncontrado = document.getElementById("resContactos");
const templateBContactos = document.getElementById(
  "template-BContactos"
).content;

buscarContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  findContacto(e);
});

const findContacto = (e) => {
  contactoEncontrado.innerHTML = "";

  if (inputBContacto.value.trim() === "") {
    alert("El parámetro de Búsqueda no puede quedar vacío");
    return;
  }
  const result = Object.values(contactos).find(
    (con) => inputBContacto.value === con.nombre
  );
  if (result) {
    const clone = templateBContactos.cloneNode(true);
    p = clone.querySelectorAll("p");
    p[0].textContent = result.nombre;
    p[1].textContent = result.empresa;
    p[2].textContent = result.tlfno;
    p[3].textContent = result.ext;
    p[4].textContent = result.email;
    fragment.appendChild(clone);
  }
  contactoEncontrado.appendChild(fragment);
};

/* ----------------------- Modulo Buscar Evento ----------------------- */
//Inputs Busqueda Contacto
const inputBDia = document.getElementById("input-busqDia");
const buscarEvento = document.getElementById("form-BEvento");
const eventoEncontrado = document.getElementById("resEventos");
const templateBEventos = document.getElementById("template-BEventos").content;

buscarEvento.addEventListener("submit", (e) => {
  e.preventDefault();
  findEvento(e);
});

const findEvento = (e) => {
  eventoEncontrado.innerHTML = "";

  if (inputBDia.value.trim() === "") {
    alert("El parámetro de Búsqueda no puede quedar vacío");
    return;
  }
  const result = Object.values(eventos).find(
    (con) => inputBDia.value === con.dia
  );
  if (result) {
    const clone = templateBEventos.cloneNode(true);
    p = clone.querySelectorAll("p");
    p[0].textContent = `${result.dia}/${result.mes}/${result.anio}`;
    p[1].textContent = result.lugar;
    p[2].textContent = result.nota;
    p[3].textContent = result.contacto;
    fragment.appendChild(clone);
  }
  eventoEncontrado.appendChild(fragment);
};
