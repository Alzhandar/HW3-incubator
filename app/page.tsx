'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import PostsList from './components/PostsList';
import ThemeToggle from './components/ThemeToggle';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
        } else {
            authContext?.setIsAuthenticated(true);
        }
    }, [authContext, router]);

    if (!authContext?.isAuthenticated) {
        return <div>Redirecting to login...</div>;
    }

    return (
        <div>
            <h1>Posts List App</h1>
            <ThemeToggle />
            <PostsList />
        </div>
    );
}
