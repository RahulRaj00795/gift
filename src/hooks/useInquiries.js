import { useState } from 'react';

export const useInquiries = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Submit new inquiry
    const submitInquiry = async (inquiryData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inquiryData),
            });

            const data = await response.json();

            if (data.success) {
                return { success: true, id: data.id };
            } else {
                setError(data.error || 'Failed to submit inquiry');
                return { success: false, error: data.error };
            }
        } catch (err) {
            const errorMessage = 'Failed to submit inquiry';
            setError(errorMessage);
            console.error('Error submitting inquiry:', err);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        submitInquiry,
    };
};
