# 📜 Instrucciones para Añadir Certificados

## 📁 Ubicación de los Archivos

Los certificados deben colocarse en la carpeta **`public/certificates/`** de tu proyecto:

```
mi-portafolio/
├── public/
│   ├── certificates/
│   │   ├── toeic-bridge.pdf    ← Coloca tus certificados aquí
│   │   ├── ef-set-b2.pdf
│   │   └── ...                 ← Puedes añadir más (PDF, JPG, PNG)
│   ├── CV.pdf
│   ├── igo-demo.mp4
│   └── ...
```

## ➕ Cómo Añadir un Nuevo Certificado

### 1. **Agrega el archivo del certificado**

Coloca tu certificado en **`public/certificates/`**:
- PDF: `/public/certificates/mi-certificado.pdf`
- Imagen: `/public/certificates/mi-certificado.jpg` (o .png)

### 2. **Añade los datos en `src/data/constants.ts`**

Edita el array `certificates` en [src/data/constants.ts](src/data/constants.ts):

```typescript
export const certificates: Certificate[] = [
  // ... certificados existentes ...

  {
    id: 'mi-nuevo-certificado',           // ID único (sin espacios ni caracteres especiales)
    title: {
      es: 'Título en Español',
      en: 'Title in English',
      it: 'Titolo in Italiano'
    },
    issuer: {
      es: 'Emisor en Español',
      en: 'Issuer in English',
      it: 'Emittente in Italiano'
    },
    date: '2024',                          // Año o fecha completa
    credentialUrl: 'https://...',          // (Opcional) URL para verificar online
    fileUrl: '/certificates/mi-certificado.pdf',  // Ruta al archivo
    fileType: 'pdf'                       // 'pdf' | 'jpg' | 'png'
  }
];
```

## 📋 Campos Obligatorios

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único (ej: 'aws-cert-2024') |
| `title` | Description | Título en los 3 idiomas |
| `issuer` | Description | Organización que emite el certificado |
| `date` | string | Año o fecha (ej: '2024' o 'Enero 2024') |
| `fileUrl` | string | Ruta del archivo (ej: '/certificates/archivo.pdf') |
| `fileType` | string | 'pdf', 'jpg', o 'png' |

## 📋 Campos Opcionales

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `credentialUrl` | string | URL externa para verificar la credencial |

## 🎯 Ejemplos de Certificados

### Ejemplo 1: Certificado PDF
```typescript
{
  id: 'azure-fundamentals',
  title: {
    es: 'Microsoft Azure Fundamentals',
    en: 'Microsoft Azure Fundamentals',
    it: 'Microsoft Azure Fundamentals'
  },
  issuer: {
    es: 'Microsoft',
    en: 'Microsoft',
    it: 'Microsoft'
  },
  date: '2024',
  credentialUrl: 'https://learn.microsoft.com/api/credentials/',
  fileUrl: '/certificates/azure-fundamentals.pdf',
  fileType: 'pdf'
}
```

### Ejemplo 2: Certificado de Imagen
```typescript
{
  id: 'python-bootcamp',
  title: {
    es: 'Python Bootcamp - Completo',
    en: 'Python Bootcamp - Complete',
    it: 'Python Bootcamp - Completo'
  },
  issuer: {
    es: 'Udemy',
    en: 'Udemy',
    it: 'Udemy'
  },
  date: 'Marzo 2024',
  fileUrl: '/certificates/python-bootcamp.jpg',
  fileType: 'jpg'
}
```

## 🔄 El sitio se actualiza automáticamente

Una vez que guardas los cambios en `src/data/constants.ts`:
1. Vite detecta los cambios automáticamente (HMR)
2. La sección de certificados se actualiza instantáneamente
3. No necesitas reiniciar el servidor

## 📂 Formatos Soportados

- **PDF** (`.pdf`) - Recomendado para certificados oficiales
- **Imágenes** (`.jpg`, `.png`, `.jpeg`) - Bueno para capturas de pantalla

## 💡 Consejos

1. **Optimiza el tamaño**: Los PDF deberían ser menos de 5MB
2. **Nombres descriptivos**: Usa nombres claros para los archivos
3. **IDs únicos**: Asegúrate de que cada `id` sea diferente
4. **Traducciones**: Completa los 3 idiomas (es, en, it)
5. **Credencial URL**: Si el certificado es verificable online, añade el enlace

## ✅ Verificación

Para verificar que tu certificado aparece correctamente:

1. **Abre tu navegador** en: `http://localhost:5173/Dratenkko/`

2. **Navega a la sección Certificados**:
   - Haz clic en "Certificados" en el menú de navegación
   - O desplázate hacia abajo hasta la sección

3. **Verifica**:
   - [ ] El certificado aparece en la lista
   - [ ] El título se muestra correctamente
   - [ ] El botón de descarga funciona
   - [ ] El archivo se descarga correctamente

## 🐛 Solución de Problemas

### El certificado no aparece:
- Verifica que el archivo exista en `public/certificates/`
- Verifica que el `fileUrl` sea correcto
- Revisa la consola del navegador (F12) buscando errores 404

### La descarga no funciona:
- Asegúrate de que la ruta en `fileUrl` comience con `/`
- Verifica que el archivo tenga el nombre correcto
- Confirma que el archivo no esté corrupto

### Los textos no se ven:
- Verifica que hayas completado los 3 idiomas (es, en, it)
- Revisa que no haya errores de sintaxis en `constants.ts`

## 📞 ¿Necesitas ayuda?

Si tienes problemas:
1. Revisa la consola del navegador (F12 → Console)
2. Verifica la pestaña Network (F12 → Network) para ver si los archivos cargan
3. Asegúrate de que el servidor esté corriendo (`pnpm dev`)
