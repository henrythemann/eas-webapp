import styles from '/styles/eas.module.css';
import footerStyles from '/styles/footer.module.css';
import Link from 'next/link';
import siteInfo from '/data/siteInfo';

export default function Footer() {
    return (
        <footer className={footerStyles.footer}>
            <section className={[styles.container, footerStyles.footerFirstSection].join(' ')}>
                <div className={footerStyles.contactInfoContainer}>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, styles.faMapMarkerAlt, footerStyles.icon].join(' ')}></span><a href="https://maps.app.goo.gl/efyAT2CnbnyzgBCV9" target='_blank' rel='noopener noreferrer'>{siteInfo.address}</a>
                    </div>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, styles.faEnvelope, footerStyles.icon].join(' ')}></span><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
                    </div>
                    <div className={footerStyles.contactInfoItem}>
                        <span aria-hidden="true" className={[styles.fas, footerStyles.fas, styles.faPhoneAlt, footerStyles.icon].join(' ')}></span><a href={`tel:${siteInfo.phone}`}>{`${siteInfo.phone.substr(0,3)}.${siteInfo.phone.substr(3,3)}.${siteInfo.phone.substr(6)}`}</a>
                    </div>
                </div>
                <div>
                    <div><h3>Info</h3></div>
                    <ul className={footerStyles.footerNavigation}>
                        {siteInfo.pages.map((page, index) => {
                            return (
                                page['group'] === undefined && page['link'] && (
                                    <li key={index}>
                                        <Link href={page['link']}>{page.title}</Link>
                                    </li>
                                )
                            );
                        })}
                    </ul>
                </div>
                <div className={footerStyles.socialMediaContainer}>
                    <div><h3>Follow Us</h3></div>
                    <ul>
                        <li>
                            <Link href={siteInfo.yelp_link} target="_blank" rel="nofollow"><i aria-hidden="true" className={[styles.fab, styles.faYelp].join(' ')}></i></Link>
                        </li>
                        <li>
                            <Link href={siteInfo.instagram_link} target="_blank" rel="nofollow"><i aria-hidden="true" className={[styles.fab, styles.faInstagram].join(' ')}></i></Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.container}>
            <div className={footerStyles.creditCardSection}>
                <div className={footerStyles.text}>{siteInfo.footer_description}</div>
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