import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET - Fetch single product by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return NextResponse.json(
                { error: 'Product not found', success: false },
                { status: 404 }
            );
        }

        const product = {
            id: productSnap.id,
            ...productSnap.data()
        };

        return NextResponse.json({ product, success: true });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Failed to fetch product', success: false },
            { status: 500 }
        );
    }
}

// PUT - Update product
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const updateData = await request.json();

        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return NextResponse.json(
                { error: 'Product not found', success: false },
                { status: 404 }
            );
        }

        await updateDoc(productRef, {
            ...updateData,
            updatedAt: new Date().toISOString()
        });

        return NextResponse.json({
            message: 'Product updated successfully',
            success: true
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product', success: false },
            { status: 500 }
        );
    }
}

// DELETE - Delete product
export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return NextResponse.json(
                { error: 'Product not found', success: false },
                { status: 404 }
            );
        }

        await deleteDoc(productRef);

        return NextResponse.json({
            message: 'Product deleted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product', success: false },
            { status: 500 }
        );
    }
}
