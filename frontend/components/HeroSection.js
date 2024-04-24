import styles from '/styles/eas.module.css';

export default function HeroSection({ bkgd_img, page_title }) {
    return (
        <section className={styles.heroSection} style={{backgroundImage: `url(${bkgd_img})`}}>
            <div className={styles.container}>
                <h1>{page_title}</h1>
                <div className={styles.subheading}>European Auto Service | Reseda</div>
            </div>
        </section>
    )
}