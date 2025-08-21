import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// GET - Fetch all products
export async function GET() {
    try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);

        const products = [];
        snapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return NextResponse.json({ products, success: true });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products', success: false },
            { status: 500 }
        );
    }
}

// POST - Add new product
export async function POST(request) {
    try {
        const productData = await request.json();

        // Validate required fields
        if (!productData.name || !productData.price || !productData.category) {
            return NextResponse.json(
                { error: 'Missing required fields', success: false },
                { status: 400 }
            );
        }

        const productsRef = collection(db, 'products');
        const docRef = await addDoc(productsRef, {
            ...productData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return NextResponse.json({
            id: docRef.id,
            message: 'Product added successfully',
            success: true
        }, { status: 201 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json(
            { error: 'Failed to add product', success: false },
            { status: 500 }
        );
    }
}
