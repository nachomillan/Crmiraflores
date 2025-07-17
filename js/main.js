// Datos de ejemplo para la demostración
let regantes = [
    {
        id: 1,
        nombre: "Juan Carlos Pérez",
        parcela: "A-001",
        hectareas: 2.5,
        telefono: "+51 987 654 321",
        email: "juan.perez@email.com",
        estado: "activo"
    },
    {
        id: 2,
        nombre: "María Elena González",
        parcela: "B-045",
        hectareas: 1.8,
        telefono: "+51 987 654 322",
        email: "maria.gonzalez@email.com",
        estado: "activo"
    },
    {
        id: 3,
        nombre: "Pedro Ramírez Silva",
        parcela: "C-123",
        hectareas: 3.2,
        telefono: "+51 987 654 323",
        email: "pedro.ramirez@email.com",
        estado: "inactivo"
    },
    {
        id: 4,
        nombre: "Ana Lucía Torres",
        parcela: "A-087",
        hectareas: 1.5,
        telefono: "+51 987 654 324",
        email: "ana.torres@email.com",
        estado: "activo"
    },
    {
        id: 5,
        nombre: "Carlos Alberto Mendoza",
        parcela: "D-156",
        hectareas: 4.1,
        telefono: "+51 987 654 325",
        email: "carlos.mendoza@email.com",
        estado: "suspendido"
    }
];

let noticias = [
    {
        id: 1,
        titulo: "Nuevo Sistema de Monitoreo de Agua Implementado",
        fecha: "2025-01-15",
        resumen: "Se ha instalado un sistema avanzado de monitoreo que permitirá un mejor control del consumo de agua en tiempo real.",
        imagen: "fas fa-chart-line"
    },
    {
        id: 2,
        titulo: "Asamblea General Extraordinaria - 25 de Enero",
        fecha: "2025-01-10",
        resumen: "Se convoca a todos los regantes a la asamblea general para discutir las nuevas tarifas y proyectos de mejora.",
        imagen: "fas fa-users"
    },
    {
        id: 3,
        titulo: "Mantenimiento Preventivo del Canal Principal",
        fecha: "2025-01-08",
        resumen: "Durante los días 20-22 de enero se realizará mantenimiento del canal principal. Se suspenderá el riego temporalmente.",
        imagen: "fas fa-tools"
    },
    {
        id: 4,
        titulo: "Subsidio Gubernamental para Mejoras de Infraestructura",
        fecha: "2025-01-05",
        resumen: "El gobierno ha aprobado un subsidio de S/. 500,000 para mejoras en la infraestructura de riego de nuestra comunidad.",
        imagen: "fas fa-hand-holding-usd"
    }
];

let turnosRiego = {
    "2025-01-20": [
        { regante: "Juan Carlos Pérez", parcela: "A-001", hora: "06:00 - 10:00" },
        { regante: "María Elena González", parcela: "B-045", hora: "10:00 - 14:00" }
    ],
    "2025-01-21": [
        { regante: "Pedro Ramírez Silva", parcela: "C-123", hora: "06:00 - 11:00" },
        { regante: "Ana Lucía Torres", parcela: "A-087", hora: "11:00 - 15:00" }
    ],
    "2025-01-22": [
        { regante: "Carlos Alberto Mendoza", parcela: "D-156", hora: "06:00 - 12:00" }
    ]
};

// Variables globales para el calendario
let mesActual = new Date().getMonth();
let añoActual = new Date().getFullYear();
const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
});

function inicializarApp() {
    configurarNavegacion();
    cargarRegantes();
    cargarNoticias();
    generarCalendario();
    configurarFormularios();
    configurarBusqueda();
}

// Configuración de la navegación
function configurarNavegacion() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll suave y activo en enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    navMenu.classList.remove('active');
                    
                    // Actualizar enlace activo
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Detectar sección activa al hacer scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Gestión de regantes
function cargarRegantes() {
    const tableBody = document.getElementById('regantesTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    regantes.forEach(regante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${regante.id}</td>
            <td>${regante.nombre}</td>
            <td>${regante.parcela}</td>
            <td>${regante.hectareas} ha</td>
            <td>${regante.telefono}</td>
            <td><span class="status-badge status-${regante.estado}">${capitalize(regante.estado)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="editarRegante(${regante.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="eliminarRegante(${regante.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function mostrarFormularioRegante(id = null) {
    const modal = document.getElementById('modalRegante');
    const titulo = document.getElementById('modalTitulo');
    const form = document.getElementById('formRegante');
    
    if (id) {
        // Modo edición
        const regante = regantes.find(r => r.id === id);
        if (regante) {
            titulo.textContent = 'Editar Regante';
            document.getElementById('nombreRegante').value = regante.nombre;
            document.getElementById('parcelaRegante').value = regante.parcela;
            document.getElementById('hectareasRegante').value = regante.hectareas;
            document.getElementById('telefonoRegante').value = regante.telefono;
            document.getElementById('emailRegante').value = regante.email;
            document.getElementById('estadoRegante').value = regante.estado;
            form.dataset.editId = id;
        }
    } else {
        // Modo creación
        titulo.textContent = 'Nuevo Regante';
        form.reset();
        delete form.dataset.editId;
    }
    
    modal.style.display = 'block';
}

function cerrarModal() {
    const modal = document.getElementById('modalRegante');
    modal.style.display = 'none';
}

function editarRegante(id) {
    mostrarFormularioRegante(id);
}

function eliminarRegante(id) {
    if (confirm('¿Está seguro de que desea eliminar este regante?')) {
        regantes = regantes.filter(r => r.id !== id);
        cargarRegantes();
        mostrarAlerta('Regante eliminado exitosamente', 'success');
    }
}

// Gestión del calendario de turnos
function generarCalendario() {
    const calendario = document.getElementById('calendarioTurnos');
    const mesElement = document.getElementById('mesActual');
    
    if (!calendario || !mesElement) return;
    
    mesElement.textContent = `${meses[mesActual]} ${añoActual}`;
    
    // Limpiar calendario
    calendario.innerHTML = '';
    
    // Días de la semana
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    diasSemana.forEach(dia => {
        const diaHeader = document.createElement('div');
        diaHeader.className = 'calendar-day-header';
        diaHeader.textContent = dia;
        diaHeader.style.fontWeight = 'bold';
        diaHeader.style.background = 'var(--bg-accent)';
        calendario.appendChild(diaHeader);
    });
    
    // Obtener primer día del mes y número de días
    const primerDia = new Date(añoActual, mesActual, 1).getDay();
    const ultimoDia = new Date(añoActual, mesActual + 1, 0).getDate();
    
    // Días vacíos al inicio
    for (let i = 0; i < primerDia; i++) {
        const diaVacio = document.createElement('div');
        diaVacio.className = 'calendar-day';
        calendario.appendChild(diaVacio);
    }
    
    // Días del mes
    for (let dia = 1; dia <= ultimoDia; dia++) {
        const diaElement = document.createElement('div');
        diaElement.className = 'calendar-day';
        diaElement.textContent = dia;
        
        // Formatear fecha para buscar turnos
        const fecha = `${añoActual}-${String(mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        
        if (turnosRiego[fecha]) {
            diaElement.classList.add('has-turno');
        }
        
        diaElement.addEventListener('click', () => {
            // Remover selección anterior
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            diaElement.classList.add('selected');
            mostrarInfoTurno(fecha);
        });
        
        calendario.appendChild(diaElement);
    }
}

function cambiarMes(direccion) {
    mesActual += direccion;
    
    if (mesActual < 0) {
        mesActual = 11;
        añoActual--;
    } else if (mesActual > 11) {
        mesActual = 0;
        añoActual++;
    }
    
    generarCalendario();
}

function mostrarInfoTurno(fecha) {
    const infoTurno = document.getElementById('infoTurno');
    if (!infoTurno) return;
    
    const turnos = turnosRiego[fecha];
    
    if (turnos && turnos.length > 0) {
        let html = `<h4>Turnos para ${formatearFecha(fecha)}</h4>`;
        turnos.forEach(turno => {
            html += `
                <div class="turno-item" style="background: white; padding: 1rem; margin: 0.5rem 0; border-radius: 0.5rem; border-left: 4px solid var(--secondary-color);">
                    <strong>${turno.regante}</strong><br>
                    <small>Parcela: ${turno.parcela} | Horario: ${turno.hora}</small>
                </div>
            `;
        });
        infoTurno.innerHTML = html;
    } else {
        infoTurno.innerHTML = `<p>No hay turnos programados para ${formatearFecha(fecha)}</p>`;
    }
}

// Gestión de noticias
function cargarNoticias() {
    const noticiasGrid = document.getElementById('noticiasGrid');
    if (!noticiasGrid) return;
    
    noticiasGrid.innerHTML = '';
    
    noticias.forEach(noticia => {
        const noticiaCard = document.createElement('div');
        noticiaCard.className = 'noticia-card fade-in-up';
        noticiaCard.innerHTML = `
            <div class="noticia-image">
                <i class="${noticia.imagen}"></i>
            </div>
            <div class="noticia-content">
                <div class="noticia-fecha">${formatearFecha(noticia.fecha)}</div>
                <h3 class="noticia-titulo">${noticia.titulo}</h3>
                <p class="noticia-resumen">${noticia.resumen}</p>
            </div>
        `;
        noticiasGrid.appendChild(noticiaCard);
    });
}

// Configuración de formularios
function configurarFormularios() {
    // Formulario de regante
    const formRegante = document.getElementById('formRegante');
    if (formRegante) {
        formRegante.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarRegante(formRegante);
        });
    }
    
    // Formulario de contacto
    const formContacto = document.getElementById('contactoForm');
    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            enviarMensaje(formContacto);
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('modalRegante');
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

function guardarRegante(form) {
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    if (form.dataset.editId) {
        // Editar regante existente
        const id = parseInt(form.dataset.editId);
        const index = regantes.findIndex(r => r.id === id);
        if (index !== -1) {
            regantes[index] = { ...regantes[index], ...datos };
            mostrarAlerta('Regante actualizado exitosamente', 'success');
        }
    } else {
        // Crear nuevo regante
        const nuevoId = Math.max(...regantes.map(r => r.id)) + 1;
        regantes.push({ id: nuevoId, ...datos });
        mostrarAlerta('Regante creado exitosamente', 'success');
    }
    
    cargarRegantes();
    cerrarModal();
}

function enviarMensaje(form) {
    // Simular envío de mensaje
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.innerHTML;
    
    btn.innerHTML = '<span class="loading"></span> Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        mostrarAlerta('Mensaje enviado exitosamente. Te contactaremos pronto.', 'success');
        form.reset();
        btn.innerHTML = btnText;
        btn.disabled = false;
    }, 2000);
}

// Configuración de búsqueda
function configurarBusqueda() {
    const buscarInput = document.getElementById('buscarRegante');
    if (buscarInput) {
        buscarInput.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase();
            filtrarRegantes(termino);
        });
    }
}

function filtrarRegantes(termino) {
    const regantesFiltrados = regantes.filter(regante => 
        regante.nombre.toLowerCase().includes(termino) ||
        regante.parcela.toLowerCase().includes(termino) ||
        regante.telefono.includes(termino)
    );
    
    const tableBody = document.getElementById('regantesTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    regantesFiltrados.forEach(regante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${regante.id}</td>
            <td>${regante.nombre}</td>
            <td>${regante.parcela}</td>
            <td>${regante.hectareas} ha</td>
            <td>${regante.telefono}</td>
            <td><span class="status-badge status-${regante.estado}">${capitalize(regante.estado)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="editarRegante(${regante.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="eliminarRegante(${regante.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Funciones de utilidad
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatearFecha(fecha) {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function mostrarAlerta(mensaje, tipo = 'success') {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.top = '90px';
    alerta.style.right = '20px';
    alerta.style.zIndex = '3000';
    alerta.style.minWidth = '300px';
    alerta.style.animation = 'slideInRight 0.3s ease-out';
    
    document.body.appendChild(alerta);
    
    // Remover alerta después de 3 segundos
    setTimeout(() => {
        alerta.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (alerta.parentNode) {
                alerta.parentNode.removeChild(alerta);
            }
        }, 300);
    }, 3000);
}

// Animaciones para las alertas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Exportar funciones para uso global
window.mostrarFormularioRegante = mostrarFormularioRegante;
window.cerrarModal = cerrarModal;
window.editarRegante = editarRegante;
window.eliminarRegante = eliminarRegante;
window.cambiarMes = cambiarMes;
