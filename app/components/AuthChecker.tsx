'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!authContext?.isAuthenticated) {
            router.push('/login');
        }
    }, [authContext, router]);

    if (!authContext?.isAuthenticated) {
        return <div>Redirecting to login...</div>;
    }

    return <>{children}</>;
};

export default AuthChecker;
