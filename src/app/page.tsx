"use client"

import styles from '@/app/home.module.css'
import Image from 'next/image';

export default function Root() {


  return(
      <div className={[styles.appHeader, styles.appWrapper, styles.appBg].join("")} id='home'>
        <div className={styles.appWrapperInfo}>
          <h1 className={[styles.appHeader, styles.headtext__cormorant].join("")}>Welcome to the Ultimate Quiz Challenge!</h1>
          <p className={styles.p__opensans}>Test your knowledge across various topics and compete with others. Get ready to embark on a journey of fun and learning!</p>
        </div>
        <div className={styles.appWrapperImg}>
          <Image src={'/images.jpg'} alt='a classroom with students' width={600} height={650} quality={100}/>
        </div>
      </div>
    );
}

