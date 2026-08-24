# Plan de Integración Frontend - Backend: Plataforma E-Commerce

Este documento describe la arquitectura, la estrategia de integración, las especificaciones de API por módulo, el manejo de estados y el flujo de trabajo para la integración de un frontend web con la API RESTful backend de una plataforma de comercio electrónico (E-Commerce).

---

## 1. Arquitectura General y Estrategia de Integración

### 1.1 Stack Tecnológico Recomendado
* **Frontend:** React / Javascript.
* **Backend:** REST API (JSON), Autenticación JWT / Bearer Tokens.
* **Manejo de Errores & Estados:**
  * **Global State:** Datos del usuario autenticado, carrito de compras local/sincronizado.
  * **Server State:** Caché de productos, categorías, inventario, órdenes e historial de facturas mediante TanStack Query.

### 1.2 Seguridad y Sesiones
* **Almacenamiento de Tokens:** 
  * `AccessToken` (Corta duración: 15-30 min) guardado en memoria / estado global.
  * `RefreshToken` (Larga duración: 7 días) almacenado en `httpOnly`, `Secure`, `SameSite=Strict` Cookie.
* **Interceptores HTTP:**
  * Configurar un interceptor en Axios/Fetch que adicione el header `Authorization: Bearer <AccessToken>` en cada petición.
  * Capturar respuestas `401 Unauthorized` para realizar automáticamente la renovación de token (`POST /auth/refresh-token`) antes de reintentar la solicitud original.

---

## 2. Definición y Estrategia por Módulo

---

### 🔑 Módulo 1: Autenticación (`auth`)

**Objetivo:** Permitir el registro, inicio de sesión, recuperación de credenciales y gestión de sesiones de usuario.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/auth/register` | Registro de nuevo usuario cliente | No |
| `POST` | `/api/v1/auth/login` | Inicio de sesión y entrega de tokens | No |
| `POST` | `/api/v1/auth/logout` | Cierre de sesión y del refresh token | Sí |
| `POST` | `/api/v1/auth/refresh-token` | Renovación de access token | Cookie |
| `POST` | `/api/v1/auth/forgot-password` | Solicitud de restablecimiento de contraseña | No |
| `POST` | `/api/v1/auth/reset-password` | Confirmación de nueva contraseña | No |

#### Flujo Frontend - Backend
1. **Login:** El usuario envía credenciales en `/auth/login`. El backend responde con el perfil del usuario y el `accessToken`. El `refreshToken` se establece vía cookie HTTP-Only.
2. **Persistencia:** Al recargar la página (`F5`), el frontend invoca `/auth/refresh-token` en una comprobación inicial (`bootstrapping`) para restaurar la sesión en memoria.

---

### 👤 Módulo 2: Usuarios (`user`)

**Objetivo:** Gestión del perfil del usuario, direcciones de envío/facturación y preferencias.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/users/me` | Obtener información del usuario autenticado | Sí |
| `PUT` | `/api/v1/users/me` | Actualizar datos personales (nombre, teléfono) | Sí |
| `GET` | `/api/v1/users/me/addresses` | Listar direcciones registradas | Sí |
| `POST` | `/api/v1/users/me/addresses` | Agregar nueva dirección de envío/facturación | Sí |
| `DELETE` | `/api/v1/users/me/addresses/:id` | Eliminar dirección | Sí |

#### Flujo Frontend - Backend
* Al cargar el Checkout o la sección "Mi Cuenta", se realiza `GET /users/me/addresses` para ofrecer opciones predeterminadas de entrega al usuario.

---

### 📂 Módulo 3: Categorías (`categories`)

**Objetivo:** Organización jerárquica y navegación del catálogo de productos.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/categories` | Obtener árbol/lista de categorías y subcategorías | No |
| `GET` | `/api/v1/categories/:slug` | Obtener detalle de categoría por slug | No |

#### Flujo Frontend - Backend
* **Navegación / Navbar:** Se consume `/categories` al renderizar la aplicación para construir los menús desplegables. Se recomienda almacenamiento en caché prolongado (`staleTime: 1 hora`).

---

### 📦 Módulo 4: Productos (`products`)

**Objetivo:** Despliegue de catálogo, búsquedas, filtros, ordenamiento y vista de detalle de producto.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/products` | Listado paginado con filtros (`category`, `search`, `priceMin`, `priceMax`, `page`, `limit`) | No |
| `GET` | `/api/v1/products/:idOrSlug` | Detalle completo del producto (imágenes, variantes, especificaciones) | No |

#### Flujo Frontend - Backend
* **Filtros dinámicos:** Los parámetros de búsqueda de la UI se sincronizan con las Query Params del navegador (`/products?category=electronics&page=1`) para permitir compartir URLs.

---

### 📊 Módulo 5: Inventario (`inventory`)

**Objetivo:** Consultar la disponibilidad en tiempo real de los productos y sus variaciones (tallas, colores).

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/inventory/check` | Consultar stock disponible por lista de SKU/IDs | No / Opcional |
| `GET` | `/api/v1/inventory/product/:productId` | Stock detallado por almacén o variante | No / Opcional |

#### Flujo Frontend - Backend
* Antes de agregar un ítem al carrito o procediendo al pago, el frontend valida el stock actual consumiendo `/inventory/check` para evitar ventas sin stock disponible.

---

### 🔄 Módulo 6: Movimientos de Inventario (`inventoryMovement`)

**Objetivo:** Módulo administrativo/auditoría para registrar ingresos, salidas, reservas y reajustes de stock.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/inventory-movements` | Listar historial de movimientos (Admin/Operador) | Sí (Admin) |
| `POST` | `/api/v1/inventory-movements` | Registrar ajuste manual (Ingreso/Mermas) | Sí (Admin) |

#### Flujo Frontend - Backend
* Utilizado en el Panel de Administración (Backoffice). Cuando se procesa una orden en el cliente, el backend crea de manera implícita un movimiento de tipo `RESERVATION` o `SALE`.

---

### 🛒 Módulo 7: Carrito de Compras (`cart`)

**Objetivo:** Gestión de los artículos seleccionados por el cliente previo a la compra.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/cart` | Obtener el carrito activo del usuario | Sí / Cookie |
| `POST` | `/api/v1/cart/items` | Agregar ítem al carrito | Sí / Cookie |
| `PUT` | `/api/v1/cart/items/:itemId` | Actualizar cantidad de un producto | Sí / Cookie |
| `DELETE` | `/api/v1/cart/items/:itemId` | Eliminar producto del carrito | Sí / Cookie |
| `POST` | `/api/v1/cart/merge` | Fusionar carrito anónimo (Local) con carrito de usuario autenticado | Sí |

#### Flujo Frontend - Backend
1. **Invitados (Guest):** Se puede manejar localmente en `localStorage` o sincronizar vía una cookie/sessionID temporal.
2. **Sincronización:** Al iniciar sesión, el frontend envía los ítems almacenados en local a `/cart/merge` para consolidarlos con el carrito guardado en base de datos.

---

### 💳 Módulo 8: Proceso de Pago (`checkout`)

**Objetivo:** Orquestación del flujo de compra: cálculo de envío, impuestos, descuentos y pasarela de pagos.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/checkout/summary` | Calcular totalidades (productos + envío + impuestos - descuentos) | Sí |
| `POST` | `/api/v1/checkout/apply-coupon` | Validar y aplicar un cupón de descuento | Sí |
| `POST` | `/api/v1/checkout/process` | Procesar intenciones de pago o pasarela (Stripe, PayPal, MercadoPago) | Sí |

#### Flujo Frontend - Backend
1. El cliente selecciona dirección y método de envío. El frontend llama a `/checkout/summary`.
2. Al confirmar compra, se invoca `/checkout/process`, el cual genera un intent token de pago o redirección de pasarela.

---

### 🧾 Módulo 9: Órdenes (`order`)

**Objetivo:** Creación, seguimiento y consulta de pedidos realizados.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/v1/orders` | Crear la orden final tras la confirmación de pago | Sí |
| `GET` | `/api/v1/orders` | Listar órdenes del usuario autenticado | Sí |
| `GET` | `/api/v1/orders/:id` | Consultar detalle y estado de una orden específica | Sí |

#### Flujo Frontend - Backend
* Tras un pago exitoso (o recepción del Webhook de la pasarela de pagos), el backend confirma la orden y cambia su estado a `PAID`/`PROCESSING`. El frontend redirige a la pantalla `/order-confirmation/:id`.

---

### 📄 Módulo 10: Facturación (`invoice`)

**Objetivo:** Generación, consulta y descarga de comprobantes de venta / facturas legales.

#### Endpoints Requeridos
| Método | Endpoint | Descripción | Requiere Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/invoices` | Listar facturas generadas del usuario | Sí |
| `GET` | `/api/v1/invoices/order/:orderId` | Obtener factura asociada a una orden | Sí |
| `GET` | `/api/v1/invoices/:id/download` | Descargar PDF / XML de la factura legal | Sí |

#### Flujo Frontend - Backend
* En la sección "Mis Pedidos" o al finalizar el Checkout, el usuario puede presionar "Descargar Factura". El frontend realiza la petición a `/invoices/:id/download` obteniendo un Blob/Stream para guardar el archivo PDF.

---

## 3. Diagrama del Flujo Integrado de Compra (Checkout Sequence)

```
[Cliente / Frontend]            [Backend API]            [Pasarela de Pago]
        |                             |                           |
        |--- 1. Agregar Ítem (Cart) ->|                           |
        |<-- Carrito Actualizado -----|                           |
        |                             |                           |
        |--- 2. GET /checkout/summary>|                           |
        |<-- Totales e Impuestos -----|                           |
        |                             |                           |
        |--- 3. POST /checkout/process -------------------------->|
        |<-- Payment Intent Token / Checkout URL -----------------|
        |                             |                           |
        |--- 4. Confirmación de Pago ---------------------------->|
        |                             |<-- Webhook / Confirmación-|
        |                             |    (Reserva Inventario &  |
        |                             |     Generación Factura)   |
        |                             |                           |
        |<-- 5. Redirección / Evento--|                           |
        |    GET /orders/:id          |                           |
        |<-- Detalles Orden & Factura-|                           |
```

---

## 4. Estrategia de Manejo de Errores y Validaciones

1. **Formato Estándar de Respuesta de Error:**
   ```json
   {
     "statusCode": 400,
     "message": "Stock insuficiente para el producto seleccionado.",
     "error": "Bad Request",
     "details": [
       { "field": "quantity", "issue": "Requested 5, available 2" }
     ]
   }
   ```
2. **Validación Frontend:**
   * Formularios validados previamente en el cliente usando esquemas (Zod / Yup).
   * Feedback visual inmediato (notificaciones Toast o alertas inline) mapeando las respuestas `400` y `422` del backend.
3. **Manejo de Errores Críticos:**
   * `401 Unauthorized`: Forzar refresco de token; si falla, redirigir a `/login`.
   * `403 Forbidden`: Redirigir a página de acceso no autorizado.
   * `409 Conflict` (ej. stock agotado durante el pago): Notificar al usuario e invalidar la caché del carrito.

---

## 5. Cronograma de Implementación Fase por Fase

* **Fase 1: Configuración Base y Módulos Núcleo**
  * Configuración de cliente HTTP e Interceptores JWT.
  * Módulos: `auth`, `user`, `categories`.
* **Fase 2: Catálogo y Carrito**
  * Módulos: `products`, `inventory`, `cart`.
  * Implementación de filtros de productos y persistencia del carrito local/remoto.
* **Fase 3: Flujo de Compra y Pagos**
  * Módulos: `checkout`, `order`, `inventoryMovement` (fase de reserva/descuento).
  * Integración con la pasarela de pagos.
* **Fase 4: Post-Venta y Administración**
  * Módulos: `invoice`, auditoría de `inventoryMovement`.
  * Pruebas de integración end-to-end (E2E) y optimización de renderizado.
