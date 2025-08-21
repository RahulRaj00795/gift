import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Initial products data
export const initialProducts = [
    {
        name: "Premium Gift Box Set",
        category: "Gift Sets",
        price: 2999,
        image: "/g1.webp",
        description: "Elegant gift box containing premium items perfect for special occasions.",
        inStock: true,
        featured: true
    },
    {
        name: "Custom Engraved Watch",
        category: "Accessories",
        price: 4999,
        image: "/g2.png",
        description: "Personalized watch with custom engraving for a unique gift.",
        inStock: true,
        featured: true
    },
    {
        name: "Luxury Perfume Collection",
        category: "Beauty",
        price: 3999,
        image: "/g3.png",
        description: "Exclusive collection of luxury fragrances in elegant packaging.",
        inStock: true,
        featured: true
    },
    {
        name: "Artisan Chocolate Box",
        category: "Food & Beverages",
        price: 1499,
        image: "/g4.png",
        description: "Handcrafted chocolates in a beautiful presentation box.",
        inStock: true,
        featured: false
    },
    {
        name: "Personalized Photo Frame",
        category: "Home & Garden",
        price: 1999,
        image: "/g5.png",
        description: "Custom photo frame with personal message and design.",
        inStock: true,
        featured: false
    },
    {
        name: "Premium Tea Set",
        category: "Home & Garden",
        price: 3499,
        image: "/g6.png",
        description: "Elegant tea set perfect for tea lovers and collectors.",
        inStock: true,
        featured: false
    }
];

// Function to seed the database
export const seedDatabase = async () => {
    try {
        const productsRef = collection(db, 'products');

        for (const product of initialProducts) {
            await addDoc(productsRef, {
                ...product,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        console.log('Database seeded successfully!');
        return true;
    } catch (error) {
        console.error('Error seeding database:', error);
        return false;
    }
};

// Function to check if database is empty
export const isDatabaseEmpty = async () => {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        return snapshot.empty;
    } catch (error) {
        console.error('Error checking database:', error);
        return true;
    }
};
