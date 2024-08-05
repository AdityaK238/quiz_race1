import styles from '@/app/(components)/Footer/Footer.module.css'
import Link from 'next/link'

const Footer: React.FC = () => {
    return ( 
        <div className={styles.footer}>
            <p> 2024 Quiz Race. <Link href="https://github.com/akashrajeshnair/quiz-race">Source Code</Link></p>
        </div>
    );
};

export default Footer;