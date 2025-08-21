import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

// POST - Submit new inquiry
export async function POST(request) {
    try {
        const inquiryData = await request.json();

        // Validate required fields
        if (!inquiryData.firstName || !inquiryData.lastName || !inquiryData.email || !inquiryData.phone) {
            return NextResponse.json(
                { error: 'Missing required fields', success: false },
                { status: 400 }
            );
        }

        const inquiriesRef = collection(db, 'inquiries');
        const docRef = await addDoc(inquiriesRef, {
            ...inquiryData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return NextResponse.json({
            id: docRef.id,
            message: 'Inquiry submitted successfully',
            success: true
        }, { status: 201 });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return NextResponse.json(
            { error: 'Failed to submit inquiry', success: false },
            { status: 500 }
        );
    }
}
