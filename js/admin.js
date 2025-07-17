// JavaScript específico para el panel de administración

// Datos extendidos para administración
let regantesAdmin = [
    ...regantes,
    {
        id: 6,
        nombre: "Roberto Silva Martín",
        parcela: "A-023",
        hectareas: 2.1,
        telefono: "+51 987 654 326",
        email: "roberto.silva@email.com",
        estado: "activo",
        fechaRegistro: "2024-03-15"
    },
    {
        id: 7,
        nombre: "Elena Vásquez Torres",
        parcela: "C-089",
        hectareas: 1.7,
        telefono: "+51 987 654 327",
        email: "elena.vasquez@email.com",
        estado: "activo",
        fechaRegistro: "2024-05-22"
    }
];

let noticiasAdmin = [...noticias];

// Variables para el estado de la administración
let sectionActiva = 'dashboard';
let filtroEstadoActual = '';

// Inicialización del panel de administración
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        inicializarAdmin();
    }
});

function inicializarAdmin() {
    configurarNavigacionAdmin();
    cargarDashboard();
    cargarRegantesAdmin();
    cargarNoticiasAdmin();
    configurarFormulariosAdmin();
    cargarSelectRegantes();
}

// Configuración de navegación del admin
function configurarNavigacionAdmin() {
    const menuLinks = document.querySelectorAll('.admin-menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const sectionId = href.substring(1);
            
            cambiarSeccionAdmin(sectionId);
            
            // Actualizar menú activo
            document.querySelectorAll('.admin-menu-item').forEach(item => {
                item.classList.remove('active');
            });
            link.closest('.admin-menu-item').classList.add('active');
        });
    });
}

function cambiarSeccionAdmin(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        sectionActiva = sectionId;
        
        // Cargar datos específicos según la sección
        switch(sectionId) {
            case 'dashboard':
                cargarDashboard();
                break;
            case 'regantes-admin':
                cargarRegantesAdmin();
                break;
            case 'noticias-admin':
                cargarNoticiasAdmin();
                break;
        }
    }
}

// Dashboard
function cargarDashboard() {
    actualizarEstadisticas();
    cargarActividadReciente();
    cargarProximosTurnos();
}

function actualizarEstadisticas() {
    // Las estadísticas ya están hardcodeadas en el HTML
    // En una implementación real, estos datos vendrían de una API
    console.log('Estadísticas actualizadas');
}

function cargarActividadReciente() {
    // La actividad reciente ya está en el HTML
    // En una implementación real, esto vendría de una API
    console.log('Actividad reciente cargada');
}

function cargarProximosTurnos() {
    // Los próximos turnos ya están en el HTML
    // En una implementación real, esto vendría de una API
    console.log('Próximos turnos cargados');
}

// Gestión de regantes en admin
function cargarRegantesAdmin() {
    const tableBody = document.getElementById('adminRegantesTableBody');
    if (!tableBody) return;
    
    const regantesFiltrados = filtrarRegantesPorEstado(regantesAdmin, filtroEstadoActual);
    
    tableBody.innerHTML = '';
    
    regantesFiltrados.forEach(regante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${regante.id}</td>
            <td>${regante.nombre}</td>
            <td>${regante.parcela}</td>
            <td>${regante.hectareas} ha</td>
            <td>${regante.telefono}</td>
            <td>${regante.email || 'No especificado'}</td>
            <td><span class="status-badge status-${regante.estado}">${capitalize(regante.estado)}</span></td>
            <td>${regante.fechaRegistro || '2024-01-01'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="editarReganteAdmin(${regante.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="verDetalleRegante(${regante.id})" title="Ver detalle">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="eliminarReganteAdmin(${regante.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filtrarRegantesPorEstado(regantes, estado) {
    if (!estado) return regantes;
    return regantes.filter(regante => regante.estado === estado);
}

function editarReganteAdmin(id) {
    // Reutilizar la función del main.js pero con datos extendidos
    const regante = regantesAdmin.find(r => r.id === id);
    if (regante) {
        mostrarFormularioRegante(id);
    }
}

function verDetalleRegante(id) {
    const regante = regantesAdmin.find(r => r.id === id);
    if (regante) {
        const modal = crearModalDetalle(regante);
        document.body.appendChild(modal);
    }
}

function crearModalDetalle(regante) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detalle del Regante</h3>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div style="padding: 1.5rem;">
                <div class="admin-form-grid">
                    <div>
                        <strong>ID:</strong> ${regante.id}
                    </div>
                    <div>
                        <strong>Nombre:</strong> ${regante.nombre}
                    </div>
                    <div>
                        <strong>Parcela:</strong> ${regante.parcela}
                    </div>
                    <div>
                        <strong>Hectáreas:</strong> ${regante.hectareas} ha
                    </div>
                    <div>
                        <strong>Teléfono:</strong> ${regante.telefono}
                    </div>
                    <div>
                        <strong>Email:</strong> ${regante.email || 'No especificado'}
                    </div>
                    <div>
                        <strong>Estado:</strong> 
                        <span class="status-badge status-${regante.estado}">${capitalize(regante.estado)}</span>
                    </div>
                    <div>
                        <strong>Fecha de Registro:</strong> ${formatearFecha(regante.fechaRegistro || '2024-01-01')}
                    </div>
                </div>
                <div class="admin-form-actions">
                    <button class="btn btn-primary" onclick="editarReganteAdmin(${regante.id}); this.closest('.modal').remove();">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove();">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    `;
    return modal;
}

function eliminarReganteAdmin(id) {
    if (confirm('¿Está seguro de que desea eliminar este regante? Esta acción no se puede deshacer.')) {
        regantesAdmin = regantesAdmin.filter(r => r.id !== id);
        cargarRegantesAdmin();
        mostrarAlertaAdmin('Regante eliminado exitosamente', 'success');
    }
}

function exportarRegantes() {
    // Simular exportación
    mostrarAlertaAdmin('Exportando datos...', 'info');
    
    setTimeout(() => {
        // En una implementación real, aquí se generaría y descargaría el archivo
        const datos = regantesAdmin.map(r => ({
            ID: r.id,
            Nombre: r.nombre,
            Parcela: r.parcela,
            Hectareas: r.hectareas,
            Telefono: r.telefono,
            Email: r.email || '',
            Estado: r.estado,
            FechaRegistro: r.fechaRegistro || '2024-01-01'
        }));
        
        console.log('Datos exportados:', datos);
        mostrarAlertaAdmin('Datos exportados exitosamente', 'success');
    }, 2000);
}

// Gestión de turnos de riego
function cargarSelectRegantes() {
    const select = document.getElementById('reganteSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Seleccionar regante...</option>';
    
    regantesAdmin
        .filter(r => r.estado === 'activo')
        .forEach(regante => {
            const option = document.createElement('option');
            option.value = regante.id;
            option.textContent = `${regante.nombre} - ${regante.parcela}`;
            select.appendChild(option);
        });
}

function programarTurno(formData) {
    const reganteId = parseInt(formData.get('regante'));
    const regante = regantesAdmin.find(r => r.id === reganteId);
    
    if (!regante) {
        mostrarAlertaAdmin('Regante no encontrado', 'error');
        return;
    }
    
    const fecha = formData.get('fecha');
    const horaInicio = formData.get('horaInicio');
    const horaFin = formData.get('horaFin');
    const observaciones = formData.get('observaciones');
    
    const nuevoTurno = {
        regante: regante.nombre,
        parcela: regante.parcela,
        hora: `${horaInicio} - ${horaFin}`,
        observaciones: observaciones
    };
    
    // Agregar turno a los datos
    if (!turnosRiego[fecha]) {
        turnosRiego[fecha] = [];
    }
    turnosRiego[fecha].push(nuevoTurno);
    
    mostrarAlertaAdmin('Turno programado exitosamente', 'success');
    
    // Limpiar formulario
    document.getElementById('formTurno').reset();
}

// Gestión de noticias en admin
function cargarNoticiasAdmin() {
    const container = document.getElementById('noticiasAdminList');
    if (!container) return;
    
    container.innerHTML = '';
    
    noticiasAdmin.forEach(noticia => {
        const card = document.createElement('div');
        card.className = 'noticia-admin-card';
        card.innerHTML = `
            <div class="noticia-admin-header">
                <div>
                    <h4>${noticia.titulo}</h4>
                    <small>Publicado el ${formatearFecha(noticia.fecha)}</small>
                </div>
                <div class="noticia-admin-actions">
                    <button class="btn btn-primary btn-small" onclick="editarNoticia(${noticia.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="eliminarNoticia(${noticia.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p>${noticia.resumen}</p>
            <div class="admin-badge info">
                <i class="${noticia.imagen}"></i> Publicada
            </div>
        `;
        container.appendChild(card);
    });
}

function mostrarFormularioNoticia(id = null) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    const noticia = id ? noticiasAdmin.find(n => n.id === id) : null;
    const titulo = noticia ? 'Editar Noticia' : 'Nueva Noticia';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${titulo}</h3>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <form id="formNoticia" style="padding: 1.5rem;">
                <div class="form-group">
                    <label for="tituloNoticia">Título</label>
                    <input type="text" id="tituloNoticia" name="titulo" required value="${noticia ? noticia.titulo : ''}">
                </div>
                <div class="form-group">
                    <label for="fechaNoticia">Fecha</label>
                    <input type="date" id="fechaNoticia" name="fecha" required value="${noticia ? noticia.fecha : ''}">
                </div>
                <div class="form-group">
                    <label for="resumenNoticia">Contenido</label>
                    <textarea id="resumenNoticia" name="resumen" rows="4" required>${noticia ? noticia.resumen : ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="iconoNoticia">Icono</label>
                    <select id="iconoNoticia" name="icono" required>
                        <option value="fas fa-newspaper" ${noticia && noticia.imagen === 'fas fa-newspaper' ? 'selected' : ''}>Noticia General</option>
                        <option value="fas fa-users" ${noticia && noticia.imagen === 'fas fa-users' ? 'selected' : ''}>Asamblea</option>
                        <option value="fas fa-tools" ${noticia && noticia.imagen === 'fas fa-tools' ? 'selected' : ''}>Mantenimiento</option>
                        <option value="fas fa-hand-holding-usd" ${noticia && noticia.imagen === 'fas fa-hand-holding-usd' ? 'selected' : ''}>Subsidio</option>
                        <option value="fas fa-chart-line" ${noticia && noticia.imagen === 'fas fa-chart-line' ? 'selected' : ''}>Estadísticas</option>
                        <option value="fas fa-bell" ${noticia && noticia.imagen === 'fas fa-bell' ? 'selected' : ''}>Aviso Importante</option>
                    </select>
                </div>
                <div class="modal-buttons">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> ${noticia ? 'Actualizar' : 'Crear'} Noticia
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Configurar el formulario
    const form = modal.querySelector('#formNoticia');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        guardarNoticia(form, noticia?.id);
        modal.remove();
    });
}

function guardarNoticia(form, id = null) {
    const formData = new FormData(form);
    const datos = {
        titulo: formData.get('titulo'),
        fecha: formData.get('fecha'),
        resumen: formData.get('resumen'),
        imagen: formData.get('icono')
    };
    
    if (id) {
        // Editar noticia existente
        const index = noticiasAdmin.findIndex(n => n.id === id);
        if (index !== -1) {
            noticiasAdmin[index] = { ...noticiasAdmin[index], ...datos };
            mostrarAlertaAdmin('Noticia actualizada exitosamente', 'success');
        }
    } else {
        // Crear nueva noticia
        const nuevoId = Math.max(...noticiasAdmin.map(n => n.id)) + 1;
        noticiasAdmin.push({ id: nuevoId, ...datos });
        mostrarAlertaAdmin('Noticia creada exitosamente', 'success');
    }
    
    cargarNoticiasAdmin();
    // También actualizar en la página principal
    noticias = [...noticiasAdmin];
}

function editarNoticia(id) {
    mostrarFormularioNoticia(id);
}

function eliminarNoticia(id) {
    if (confirm('¿Está seguro de que desea eliminar esta noticia?')) {
        noticiasAdmin = noticiasAdmin.filter(n => n.id !== id);
        cargarNoticiasAdmin();
        // También actualizar en la página principal
        noticias = [...noticiasAdmin];
        mostrarAlertaAdmin('Noticia eliminada exitosamente', 'success');
    }
}

// Configuración de formularios en admin
function configurarFormulariosAdmin() {
    // Filtro de estado
    const filtroEstado = document.getElementById('filtroEstado');
    if (filtroEstado) {
        filtroEstado.addEventListener('change', (e) => {
            filtroEstadoActual = e.target.value;
            cargarRegantesAdmin();
        });
    }
    
    // Búsqueda de regantes
    const buscarReganteAdmin = document.getElementById('buscarReganteAdmin');
    if (buscarReganteAdmin) {
        buscarReganteAdmin.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase();
            filtrarRegantesAdmin(termino);
        });
    }
    
    // Formulario de turno
    const formTurno = document.getElementById('formTurno');
    if (formTurno) {
        formTurno.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formTurno);
            programarTurno(formData);
        });
    }
    
    // Formularios de configuración
    const configGeneral = document.getElementById('configGeneral');
    if (configGeneral) {
        configGeneral.addEventListener('submit', (e) => {
            e.preventDefault();
            mostrarAlertaAdmin('Configuración guardada exitosamente', 'success');
        });
    }
    
    const configTarifas = document.getElementById('configTarifas');
    if (configTarifas) {
        configTarifas.addEventListener('submit', (e) => {
            e.preventDefault();
            mostrarAlertaAdmin('Tarifas actualizadas exitosamente', 'success');
        });
    }
}

function filtrarRegantesAdmin(termino) {
    const regantesTabla = document.getElementById('adminRegantesTableBody');
    if (!regantesTabla) return;
    
    const regantesFiltrados = regantesAdmin.filter(regante =>
        regante.nombre.toLowerCase().includes(termino) ||
        regante.parcela.toLowerCase().includes(termino) ||
        regante.telefono.includes(termino) ||
        (regante.email && regante.email.toLowerCase().includes(termino))
    );
    
    regantesTabla.innerHTML = '';
    
    regantesFiltrados.forEach(regante => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${regante.id}</td>
            <td>${regante.nombre}</td>
            <td>${regante.parcela}</td>
            <td>${regante.hectareas} ha</td>
            <td>${regante.telefono}</td>
            <td>${regante.email || 'No especificado'}</td>
            <td><span class="status-badge status-${regante.estado}">${capitalize(regante.estado)}</span></td>
            <td>${regante.fechaRegistro || '2024-01-01'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="editarReganteAdmin(${regante.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="verDetalleRegante(${regante.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-outline btn-small" onclick="eliminarReganteAdmin(${regante.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        regantesTabla.appendChild(row);
    });
}

// Función para mostrar alertas específicas del admin
function mostrarAlertaAdmin(mensaje, tipo = 'success') {
    mostrarAlerta(mensaje, tipo);
}

// Exportar funciones para uso global
window.cambiarSeccionAdmin = cambiarSeccionAdmin;
window.editarReganteAdmin = editarReganteAdmin;
window.verDetalleRegante = verDetalleRegante;
window.eliminarReganteAdmin = eliminarReganteAdmin;
window.exportarRegantes = exportarRegantes;
window.mostrarFormularioNoticia = mostrarFormularioNoticia;
window.editarNoticia = editarNoticia;
window.eliminarNoticia = eliminarNoticia;
