# 🧉 Me hincharon los huevos los trapitos, así que con esta app les cabe toda 🧉 

### Ah, ¿me vas a cuidar el auto? Tomá comprobante, mostro.

Basta de darles de comer a esta gente. Ahora abrís la app, tocás dos botones y le mostrás una transferencia más trucha que billete de tres pesos.

---

Dicho todo eso: es un simulador que replica visualmente las pantallas de
comprobante de transferencia de distintos bancos argentinos, optimizado para
móvil.

## Flujo

1. Elegís el **banco de origen** (Mercado Pago o Galicia).
2. Ingresás el **monto**.
3. Ingresás el **CBU, CVU o alias** del destinatario. La app valida el formato:
   - CBU/CVU: 22 dígitos con verificación de ambos dígitos verificadores (algoritmo del BCRA).
   - Alias: reglas de formato del BCRA (6–20 caracteres).
   - Detecta/infiere la **entidad destino** (por el código de entidad del CBU o por palabras clave del alias).
4. Ingresás el **titular** de la cuenta destino.
5. Se genera el **comprobante a pantalla completa**, replicando el estilo del banco de origen elegido.

> No realiza transferencias reales ni
> consulta datos reales de terceros: la validación es solo de formato y la
> información del destinatario la ingresa el usuario.

## Stack

- Vite + React 19
- Tailwind CSS v4
- lucide-react (íconos)

Sin backend, sin login, sin router: es una sola pantalla con estado local.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera dist/
npm run preview
```

## Estructura

```
src/
  App.jsx                 # orquesta formulario -> comprobante según banco
  lib/
    cbu.js                # validación CBU/CVU/alias + inferencia de entidad
    banks.js              # catálogo de entidades y proveedores de CVU
    originBanks.js        # config visual de cada banco de origen
    format.js             # formato de moneda, CBU, fecha, nº de operación
    share.js              # Web Share API con fallback a portapapeles
  components/
    PhoneFrame.jsx        # marco de teléfono + status bar
    BrandMarks.jsx        # marcas/íconos SVG recreados (no oficiales)
  screens/
    TransferForm.jsx      # carga de datos
    MercadoPagoReceipt.jsx
    GaliciaReceipt.jsx
    ReceiptSheet.jsx      # comprobante detallado (bottom sheet)
```

### Agregar un banco de origen

1. Sumá su config visual en `src/lib/originBanks.js`.
2. Creá su pantalla de comprobante en `src/screens/`.
3. Registrala en el mapa `RECEIPTS` de `src/App.jsx`.

## Deploy (Vercel)

El proyecto incluye `vercel.json` (SPA rewrites). Para publicarlo:

```bash
npx vercel        # primera vez, vincula el proyecto
npx vercel --prod
```
