"use client"
import { useRouter } from 'next/navigation'
import { UserAuth } from '@/lib/firebase/authContext'
import { useEffect } from 'react'

const ProtectedUserRoute = ({children}) => {
    const router = useRouter();
    const {user} = UserAuth();

    if(!user) {
        useEffect(() => {
            router.push('/');
        }, [user, router]);
        return (
            <div>redirecting...</div>
        )
    }
    return children;
}

export default ProtectedUserRoute;