import collection1 from "./assets/images/Collection1.jpg"
import collection2 from "./assets/images/Collection2.jpg"
import collection3 from "./assets/images/Collection3.jpg"

// ================================
// DATOS DE PRODUCTOS
// ================================

export const products = [
    {
        id: 1,
        name: "Camisa Casual Azul",
        alternative: "Camisa de algodón 100% con diseño moderno y cómodo",
        price: 45000,
        category: "camisas",
        sizes: ["s", "m", "l", "xl"],
        colors: ["azul"],
        image: "https://via.placeholder.com/300x300/3b82f6/ffffff?text=Camisa+Azul",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: "Pantalón Jean Clásico",
        alternative: "Jean de corte recto, resistente y versátil",
        price: 89000,
        category: "pantalones",
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["azul", "negro"],
        image: "https://via.placeholder.com/300x300/1e40af/ffffff?text=Jean",
        stock: 20,
        featured: true
    },
    {
        id: 3,
        name: "Vestido Floral Verano",
        alternative: "Vestido ligero perfecto para días soleados",
        price: 120000,
        category: "vestidos",
        sizes: ["xs", "s", "m", "l"],
        colors: ["rojo", "blanco"],
        image: "https://via.placeholder.com/300x300/ef4444/ffffff?text=Vestido",
        stock: 10,
        featured: false
    },
    {
        id: 4,
        name: "Zapatillas Deportivas",
        alternative: "Zapatillas cómodas para todo tipo de actividades",
        price: 150000,
        category: "zapatos",
        sizes: ["38", "39", "40", "41", "42"],
        colors: ["negro", "blanco"],
        image: "https://via.placeholder.com/300x300/111827/ffffff?text=Zapatillas",
        stock: 25,
        featured: true
    },
    {
        id: 5,
        name: "Camisa Formal Blanca",
        alternative: "Camisa elegante para ocasiones especiales",
        price: 65000,
        category: "camisas",
        sizes: ["s", "m", "l", "xl"],
        colors: ["blanco"],
        image: "https://via.placeholder.com/300x300/ffffff/000000?text=Camisa+Formal",
        stock: 12,
        featured: false
    },
    {
        id: 6,
        name: "Pantalón Chino Beige",
        alternative: "Pantalón versátil para look casual o semiformal",
        price: 75000,
        category: "pantalones",
        sizes: ["28", "30", "32", "34"],
        colors: ["beige", "negro"],
        image: "https://via.placeholder.com/300x300/d4a574/ffffff?text=Chino",
        stock: 18,
        featured: false
    },
    {
        id: 7,
        name: "Vestido Cóctel Negro",
        alternative: "Vestido elegante para eventos especiales",
        price: 180000,
        category: "vestidos",
        sizes: ["s", "m", "l"],
        colors: ["negro"],
        image: "https://via.placeholder.com/300x300/000000/ffffff?text=Vestido+Negro",
        stock: 8,
        featured: true
    },
    {
        id: 8,
        name: "Botas de Cuero",
        alternative: "Botas resistentes y con estilo",
        price: 220000,
        category: "zapatos",
        sizes: ["38", "39", "40", "41"],
        colors: ["negro", "marrón"],
        image: "https://via.placeholder.com/300x300/8b4513/ffffff?text=Botas",
        stock: 15,
        featured: false
    },
    {
        id: 9,
        name: "Gorra Deportiva",
        alternative: "Gorra ajustable de calidad premium",
        price: 35000,
        category: "accesorios",
        sizes: ["única"],
        colors: ["negro", "blanco", "azul"],
        image: "https://via.placeholder.com/300x300/2563eb/ffffff?text=Gorra",
        stock: 30,
        featured: false
    },
    {
        id: 10,
        name: "Bufanda de Lana",
        alternative: "Bufanda suave y cálida para invierno",
        price: 40000,
        category: "accesorios",
        sizes: ["única"],
        colors: ["rojo", "negro", "gris"],
        image: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Bufanda",
        stock: 22,
        featured: false
    },
    {
        id: 11,
        name: "Camiseta Estampada",
        alternative: "Camiseta de algodón con diseño exclusivo",
        price: 38000,
        category: "camisas",
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["blanco", "negro", "verde"],
        image: "https://via.placeholder.com/300x300/10b981/ffffff?text=Camiseta",
        stock: 40,
        featured: true
    },
    {
        id: 12,
        name: "Shorts Deportivos",
        alternative: "Shorts ligeros ideales para ejercicio",
        price: 45000,
        category: "pantalones",
        sizes: ["s", "m", "l", "xl"],
        colors: ["negro", "azul", "gris"],
        image: "https://via.placeholder.com/300x300/6b7280/ffffff?text=Shorts",
        stock: 35,
        featured: false
    },
    {
        id: 13,
        name: "Vestido Casual",
        alternative: "Vestido cómodo para el día a día",
        price: 95000,
        category: "vestidos",
        sizes: ["xs", "s", "m", "l", "xl"],
        colors: ["azul", "verde"],
        image: "https://via.placeholder.com/300x300/059669/ffffff?text=Vestido+Casual",
        stock: 14,
        featured: false
    },
    {
        id: 14,
        name: "Sandalias de Verano",
        alternative: "Sandalias cómodas para días calurosos",
        price: 55000,
        category: "zapatos",
        sizes: ["36", "37", "38", "39", "40"],
        colors: ["blanco", "negro"],
        image: "https://via.placeholder.com/300x300/f9fafb/000000?text=Sandalias",
        stock: 20,
        featured: false
    },
    {
        id: 15,
        name: "Cinturón de Cuero",
        alternative: "Cinturón elegante de cuero genuino",
        price: 60000,
        category: "accesorios",
        sizes: ["m", "l", "xl"],
        colors: ["negro", "marrón"],
        image: "https://via.placeholder.com/300x300/654321/ffffff?text=Cinturon",
        stock: 18,
        featured: false
    }
];

// ================================
// ANUNCIOS Y PROMOCIONES
// ================================

export const announcements = [
    {
        id: 1,
        message: "🎉 ¡Envío gratis en compras superiores a $50.000! 🎉",
        active: true,
        startDate: "2025-11-01",
        endDate: "2025-11-30"
    },
    {
        id: 2,
        message: "⚡ ¡Flash Sale! 20% de descuento en toda la tienda",
        active: false,
        startDate: "2025-11-15",
        endDate: "2025-11-20"
    },
    {
        id: 3,
        message: "🆕 Nuevos productos cada semana",
        active: false,
        startDate: "2025-11-01",
        endDate: "2025-12-31"
    }
];

// ==============================
// Datos Colecciones
// ==============================

export const collections = [
    {
        id: 1,
        image: collection1,
        name: "collection 1",
        description: "Esta es la colección número 1.",
        alternative: "Imagen de la colección número 1",
        redirect: "/"
    },
    {
        id: 2,
        image: collection2,
        name: "collection 2",
        description: "Esta es la colección número 2.",
        alternative: "Imagen de la colección número 2",
        redirect: "/"
    },
    {
        id: 3,
        image: collection3,
        name: "collection 3",
        description: "Esta es la colección número 3.",
        alternative: "Imagen de la colección número 3",
        redirect: "/"
    }
]
