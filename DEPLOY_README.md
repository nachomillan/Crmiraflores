# 🚀 Despliegue de crmiraflores.com

## 📋 Lista de Tareas para Poner Online

### ✅ Completado
- [x] Desarrollo de la página web
- [x] Archivos de configuración creados
- [x] Script de preparación listo
- [x] Documentación de despliegue

### 🔲 Por Hacer

#### 1. Registro de Dominio
- [ ] Ir a un registrador (GoDaddy, Namecheap, etc.)
- [ ] Buscar y comprar `crmiraflores.com`
- [ ] Guardar credenciales de acceso

#### 2. Hosting Web
**Opción Recomendada: Netlify (Gratis)**
- [ ] Crear cuenta en netlify.com
- [ ] Conectar repositorio GitHub
- [ ] Configurar dominio personalizado

**Alternativa: Hosting Tradicional**
- [ ] Contratar hosting (Hostinger, SiteGround, etc.)
- [ ] Obtener credenciales FTP
- [ ] Subir archivos de la carpeta `deploy`

#### 3. Configuración
- [ ] Ejecutar `preparar-deploy.bat`
- [ ] Subir archivos al hosting
- [ ] Configurar DNS del dominio
- [ ] Verificar que funcione en crmiraflores.com

## 💰 Costos Estimados

| Servicio | Costo | Recomendación |
|----------|--------|---------------|
| Dominio .com | $10-15/año | ⭐ Necesario |
| Netlify | Gratis | ⭐⭐⭐ Recomendado |
| Hostinger | $30/año | ⭐⭐ Buena opción |
| SiteGround | $100/año | ⭐ Profesional |

## 🔧 Archivos Incluidos para Despliegue

- `netlify.toml` - Configuración para Netlify
- `.htaccess` - Configuración para Apache
- `web.config` - Configuración para IIS
- `preparar-deploy.bat` - Script de preparación
- `DEPLOY_GUIDE.md` - Guía detallada

## 📞 Contacto para Soporte

Si necesitas ayuda técnica:
1. Soporte del hosting elegido
2. Documentación oficial de cada plataforma
3. Foros de desarrollo web
4. Contratar desarrollador local

## ⚡ Despliegue Rápido con Netlify

1. Ve a [netlify.com](https://netlify.com)
2. "New site from Git"
3. Conecta tu GitHub
4. Selecciona el repositorio
5. Deploy settings:
   - Build command: (dejar vacío)
   - Publish directory: `.`
6. Deploy site
7. En Site settings > Domain management
8. Add custom domain: `crmiraflores.com`
9. Seguir instrucciones DNS

## 🌐 URLs una vez desplegado

- **Sitio principal**: https://crmiraflores.com
- **Panel admin**: https://crmiraflores.com/admin.html
- **Documentos**: https://crmiraflores.com/#documentos
- **Contacto**: https://crmiraflores.com/#contacto

¡Tu comunidad de regantes tendrá presencia web profesional! 🌊
