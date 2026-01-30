# 🇨🇱 Cómo Usar Banderas PNG en el Selector de Idiomas

## 📁 Ubicación de las Banderas

Las banderas se deben colocar en: **`public/flags/`**

```
public/
└── flags/
    ├── chile.png      ← Bandera de Chile (120x70px recomendado)
    ├── uk.png         ← Bandera del Reino Unido
    ├── brazil.png     ← Bandera de Brasil
    └── italy.png      ← Bandera de Italia
```

## 🔄 Dos Opciones de Banderas

### **Opción 1: Banderas PNG (Imágenes)**

Si quieres usar imágenes PNG para las banderas:

1. **Descarga las banderas** y colócalas en `public/flags/`:
   - `chile.png` - Bandera de Chile
   - `uk.png` - Bandera del Reino Unido
   - `brazil.png` - Bandera de Brasil
   - `italy.png` - Bandera de Italia

2. **Usa el componente `Flags`** que está en `src/components/ui/Flags.tsx`

El componente ya está configurado para cargar las imágenes desde `/flags/`.

### **Opción 2: Banderas SVG (Actual)**

Actualmente el sitio usa **banderas SVG integradas** en `src/components/layout/Navbar.tsx` (líneas 29-59).

**Ventajas de SVG:**
- ✅ No necesitan archivos externos
- ✅ Cargan instantáneamente
- ✅ Se ven nítidas en cualquier resolución
- ✅ Ya están configuradas y funcionando

## 🎨 ¿Cambiar a PNG?

Si prefieres usar PNG en lugar de SVG:

1. **Coloca tus archivos PNG** en `public/flags/`:
   ```
   public/flags/chile.png
   public/flags/uk.png
   public/flags/brazil.png
   public/flags/italy.png
   ```

2. **En `src/components/layout/Navbar.tsx`**:
   - Comenta o elimina el objeto `SVGFlags` (líneas 29-59)
   - Usa el componente `Flags` en su lugar:
     ```typescript
     import { Flags } from '../ui/Flags';

     // Reemplazar SVGFlags por Flags:
     {Flags[language as keyof typeof Flags]}
     ```

## 📏 Tamaño Recomendado para PNG

- **Dimensiones**: 120px × 70px (w-12 h-7 en Tailwind)
- **Formato**: PNG con transparencia
- **Resolución**: 72 DPI (web)

## ✅ Verificación

Para verificar que las banderas PNG funcionan:

1. **Coloca los archivos** en `public/flags/`
2. **Abre el navegador** en `http://localhost:5173/Dratenkko/`
3. **Prueba el selector de idiomas**
4. **Verifica** que las banderas se vean correctamente

## 🎯 Recomendación

**Yo recomiendo usar las banderas SVG actuales** porque:
- Ya están configuradas y funcionando
- No necesitan archivos adicionales
- Cargan más rápido
- Se ven perfectas

Las PNG solo son necesarias si quieres usar imágenes específicas o personalizadas.
