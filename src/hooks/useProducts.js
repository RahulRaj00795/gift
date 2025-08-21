import { useState, useEffect } from 'react';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/products');
            const data = await response.json();

            if (data.success) {
                setProducts(data.products);
            } else {
                setError(data.error || 'Failed to fetch products');
            }
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add new product
    const addProduct = async (productData) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (data.success) {
                // Refresh products list
                await fetchProducts();
                return { success: true, id: data.id };
            } else {
                return { success: false, error: data.error };
            }
        } catch (err) {
            console.error('Error adding product:', err);
            return { success: false, error: 'Failed to add product' };
        }
    };

    // Update product
    const updateProduct = async (id, updateData) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (data.success) {
                // Refresh products list
                await fetchProducts();
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (err) {
            console.error('Error updating product:', err);
            return { success: false, error: 'Failed to update product' };
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                // Refresh products list
                await fetchProducts();
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            return { success: false, error: 'Failed to delete product' };
        }
    };

    // Load products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};
