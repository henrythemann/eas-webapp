import HeroSection from '/components/HeroSection';
import ManufacturerLogos from '/components/ManufacturerLogos';
import MapSection from '/components/MapSection';
import siteInfo from '/data/siteInfo';
import styles from '/styles/eas.module.css';
import contactStyles from '/styles/contact.module.css';
import { formatPhoneNumber } from '/utils/textUtils';

export async function getStaticProps() {
    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/contact/`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function Contact({data}) {
    return (<>
        <HeroSection bkgd_img={data.hero_bkgd_img} page_title={"Contact Us"}></HeroSection>
        <section>
            <div className={[styles.container, contactStyles.contactContainer].join(' ')}>
                <div className={[styles.row, contactStyles.contactInfoInner].join(' ')}>
                <div className={[contactStyles.contactInfoItem, styles.colLg4, styles.colSm6].join(' ')}>
                        <i className={[styles.fa, styles.faMapPin].join(' ')}></i>
                        <h4>Location</h4>
                        <div className={contactStyles.contactInfoDetail} dangerouslySetInnerHTML={{__html: siteInfo.address.replace(', ','<br></br>')}}></div>
                    </div>
                    <div className={[contactStyles.contactInfoItem, styles.colLg4, styles.colSm6].join(' ')}>
                        <i className={[styles.fa, styles.faPhoneAlt].join(' ')}></i>
                        <h4>Phone Number</h4>
                        <div className={contactStyles.contactInfoDetail}><a href={`tel:${siteInfo.phone}`}>{formatPhoneNumber(siteInfo.phone)}</a></div>
                    </div>
                    <div className={[contactStyles.contactInfoItem, styles.colLg4, styles.colSm6].join(' ')}>
                        <i className={[styles.fa, styles.faEnvelope].join(' ')}></i>
                        <h4>Email Us</h4>
                        <div className={contactStyles.contactInfoDetail}><a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a></div>
                    </div>
                    <div className={[contactStyles.contactInfoItem, styles.colLg4, styles.colSm6].join(' ')}>
                        <i className={[styles.fa, styles.faBusinessHours].join(' ')}></i>
                        <h4>Hours of Operation</h4>
                        <div className={contactStyles.contactInfoDetail} dangerouslySetInnerHTML={{__html: siteInfo.hours}}></div>
                    </div>
                </div>
            </div>
        </section>
        <MapSection></MapSection>
        <ManufacturerLogos></ManufacturerLogos>
    </>)
}