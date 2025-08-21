"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Skip authentication check for login page
        if (pathname === '/admin/login') {
            return;
        }

        // Check if user is authenticated
        const isAuthenticated = localStorage.getItem('adminAuthenticated');
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [pathname, router]);

    // If on login page, don't check authentication
    if (pathname === '/admin/login') {
        return children;
    }

    // For other admin pages, check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return children;
}
