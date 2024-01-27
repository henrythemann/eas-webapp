import styles from '/styles/eas.module.css';
import footerStyles from '/styles/footer.module.css';
import Link from 'next/link';
import siteInfo from '../data/siteInfo';

export default function Footer() {
    return (
        <footer className={footerStyles.footer}>
            <section className={styles.container}>
                <div className={footerStyles.contactInfoContainer}>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, footerStyles.faMapMarkerAlt, footerStyles.icon].join(' ')}></span><span dangerouslySetInnerHTML={{__html: siteInfo.address}}></span>
                    </div>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, footerStyles.faEnvelope, footerStyles.icon].join(' ')}></span><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                    </div>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, footerStyles.faPhoneAlt, footerStyles.icon].join(' ')}></span><a href={`tel:${siteInfo.phone}`}>{`${siteInfo.phone.substr(0,3)}.${siteInfo.phone.substr(3,3)}.${siteInfo.phone.substr(6)}`}</a>
                    </div>
                </div>
            </section>
            <section className={styles.container}>
            <div className={footerStyles.creditCardSection}>
                <div className={footerStyles.text}>We are a Tech Net Professional Certified Shop based in Reseda, CA, serving the greater Los Angeles area.</div>
                <div className={footerStyles.creditCardsContainer}>
                    <img src="https://www.europeanautoreseda.com/wp-content/uploads/card-1.png" title="visa card" alt="visa card"/><img src="https://www.europeanautoreseda.com/wp-content/uploads/card-3.png" title="amex card" alt="amex card"/><img src="https://www.europeanautoreseda.com/wp-content/uploads/card-2.png" title="mastercard" alt="mastercard"/><img src="https://www.europeanautoreseda.com/wp-content/uploads/card-4.png" title="discover card" alt="discover card"/>
                </div>
                </div>
            </section>
            <section className={styles.container}>
                <div className={footerStyles.copyrightSection}>
                <div>&copy; {new Date().getFullYear()} European Auto Service</div>
                <div><Link href="/privacy-policy/">Privacy Policy</Link></div>
                </div>
            </section>
        </footer>
    )
}