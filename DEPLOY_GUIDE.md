# 🌐 Guía para Desplegar en crmiraflores.com

## 📋 Pasos para Poner tu Web Online

### 1. 🏷️ Registrar el Dominio
- **Comprar el dominio** `crmiraflores.com` en un registrador como:
  - GoDaddy
  - Namecheap
  - Google Domains
  - Hostinger
  - DonDominio (España)

### 2. 🖥️ Contratar Hosting Web
Opciones recomendadas:

#### **Opción A: Hosting Compartido (Más fácil para principiantes)**
- **Hostinger** (Recomendado)
- **SiteGround**
- **Bluehost**
- **A2 Hosting**

#### **Opción B: Hosting Gratuito (Para pruebas)**
- **Netlify** (Recomendado para sitios estáticos)
- **Vercel**
- **GitHub Pages**
- **Firebase Hosting**

#### **Opción C: VPS/Cloud (Más control)**
- **DigitalOcean**
- **AWS**
- **Google Cloud**
- **Vultr**

### 3. 📂 Preparar los Archivos para Subir

#### Estructura que debes subir:
```
/public_html/ (o carpeta raíz del hosting)
├── index.html
├── admin.html
├── css/
│   ├── styles.css
│   └── admin.css
├── js/
│   ├── main.js
│   └── admin.js
├── README.md
└── package.json
```

### 4. 🚀 Métodos de Subida

#### **Método A: Panel de Control del Hosting**
1. Accede al panel de control (cPanel, Plesk, etc.)
2. Busca "Administrador de archivos"
3. Ve a la carpeta `public_html`
4. Sube todos los archivos

#### **Método B: FTP/SFTP**
1. Usar cliente FTP como FileZilla
2. Conectar con los datos que te proporcione el hosting
3. Subir archivos a la carpeta raíz

#### **Método C: Git Deploy (Avanzado)**
1. Conectar tu repositorio GitHub
2. Configurar auto-deploy desde la rama main

### 5. 🔧 Configurar el Dominio
1. En tu registrador de dominio
2. Configurar los DNS para que apunten al hosting
3. Esperar propagación (24-48 horas máximo)

### 6. ✅ Verificar que Todo Funcione
- Visitar `https://crmiraflores.com`
- Probar todas las secciones
- Verificar panel de administración en `https://crmiraflores.com/admin.html`

---

## 🎯 Recomendación Específica: Netlify (Más Fácil)

### Pasos para Netlify:
1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratuita
3. Conecta tu repositorio GitHub
4. En configuraciones del sitio, agrega el dominio personalizado `crmiraflores.com`
5. Configura los DNS en tu registrador según las instrucciones de Netlify

### Ventajas de Netlify:
- ✅ Gratis para sitios estáticos
- ✅ HTTPS automático
- ✅ Deploy automático desde GitHub
- ✅ CDN global
- ✅ Fácil configuración de dominios

---

## 💰 Costos Estimados

### Dominio:
- **crmiraflores.com**: $10-15/año

### Hosting:
- **Netlify**: Gratis
- **Hostinger**: $2-5/mes
- **SiteGround**: $6-15/mes
- **VPS**: $5-20/mes

---

## 🛠️ Archivos de Configuración Adicionales

He creado archivos adicionales para facilitar el despliegue:
- `netlify.toml` - Configuración para Netlify
- `deploy.md` - Instrucciones detalladas
- `.htaccess` - Para hosting Apache
- `web.config` - Para hosting IIS

---

## 📞 Soporte

Si necesitas ayuda con algún paso:
1. Contacta al soporte del hosting elegido
2. Busca tutoriales específicos del proveedor
3. Considera contratar a un desarrollador web local

---

## ⚠️ Notas Importantes

1. **Backup**: Siempre mantén una copia de seguridad local
2. **SSL**: Asegúrate de que el hosting incluya certificado SSL
3. **Email**: Considera configurar cuentas de email con tu dominio
4. **Rendimiento**: Optimiza imágenes y archivos para web
5. **SEO**: Considera agregar Google Analytics y Search Console

---

## 🔄 Mantenimiento Continuo

- Actualizar contenido regularmente
- Renovar dominio anualmente
- Mantener backups actualizados
- Monitorear rendimiento del sitio
- Actualizar información de contacto
