'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/logout/logout.module.css'
import { UserAuth } from "@/lib/firebase/authContext";

export default function Logout() {
  const { user, logout } = UserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/')
      console.log("logged out!")
    } catch(err) {
      console.error(err);
    }
  }

  const handleReturn = () => {
    router.push('/');
  }

  console.log(user)

  return (
    <div className={styles.logoutPage}>
      <h3>Are you sure you want to logout?</h3>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      <button onClick={handleReturn} className={styles.logoutButton}>Return</button>
    </div>
  );
}
