# 🎬 Instrucciones para Configurar Videos

## 📁 Ubicación del Video

El video debe colocarse en la carpeta **`public/`** de tu proyecto:

```
mi-portafolio/
├── public/
│   ├── igo-demo.mp4  ← COLOCA TU VIDEO AQUÍ
│   ├── CV.pdf
│   ├── art.png
│   ├── flutter.png
│   ├── scrappers.png
│   ├── spare.png
│   └── ...
```

## ⚠️ IMPORTANTE - Ruta del Video

En el código, la ruta está configurada como:
```typescript
videoUrl: '/igo-demo.mp4'
```

Esto significa que el video se buscará en:
- **CORRECTO**: `public/igo-demo.mp4`
- **INCORRECTO**: `public/videos/igo-demo.mp4`

## 🎥 Formato Recomendado del Video

- **Formato**: MP4 (H.264 codec)
- **Resolución**: 1920x1080 (Full HD) o 1280x720 (HD)
- **Duración**: 30-60 segundos ideal
- **Tamaño máximo**: 50 MB recomendado
- **Bitrate**: 2-5 Mbps para buena calidad

## 🔄 Conversión de Video (Si necesitas)

### Usando FFmpeg:
```bash
ffmpeg -i tu-video-original.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k igo-demo.mp4
```

### Usando HandBrake (GUI):
1. Abre HandBrake
2. Selecciona tu video original
3. Preset: "General → Fast 1080p30"
4. Guarda como `igo-demo.mp4` en la carpeta `public/`

## ✅ Verificación

Una vez colocado el video en `public/igo-demo.mp4`:

1. **Reinicia el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

2. **Abre tu navegador** en: `http://localhost:5173/Dratenkko/`

3. **Haz clic en el proyecto I-GO**

4. **El video debería reproducirse** en el modal

## 🐛 Solución de Problemas

### El video no se reproduce:

1. **Verifica que el archivo exista**:
   ```bash
   ls public/igo-demo.mp4
   ```
   Debería mostrar el archivo.

2. **Verifica la consola del navegador** (F12):
   - Busca errores 404 para el video
   - Verifica que la URL sea correcta

3. **Verifica el formato del video**:
   ```bash
   ffprobe public/igo-demo.mp4
   ```
   Debería mostrar: `Video: h264 (High)` o similar

4. **Si el archivo es muy grande**, el navegador puede tardar en cargar.
   Considera comprimirlo más.

### El video se ve negro:

- El video puede estar corrupto. Intenta reconvertinglo.
- Verifica que el codec sea H.264.

### El audio no se oye:

- Verifica que el video tenga audio:
  ```bash
  ffprobe public/igo-demo.mp4 | grep Audio
  ```

## 📋 Checklist Antes de Deploy

- [ ] Video en `public/igo-demo.mp4`
- [ ] Video se reproduce en desarrollo
- [ ] Video tiene buen calidad y tamaño razonable
- [ ] Audio funciona (si aplica)
- [ ] Modal se abre correctamente
- [ ] Carrusel de imágenes funciona

## 🎯 Pro Tip

Si no tienes video aún, puedes:
1. Dejar `videoUrl: '/igo-demo.mp4'` y el proyecto mostrará solo las imágenes
2. O eliminar completamente la línea `videoUrl` para desactivar el video

## 📞 Ayuda

Si tienes problemas:
1. Verifica la consola del navegador (F12 → Console)
2. Verifica la pestaña Network (F12 → Network) para ver si el video carga
3. Asegúrate de que el servidor esté corriendo
