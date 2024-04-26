import { forwardRef } from 'react';
import styles from '/styles/eas.module.css'
import headerStyles from '/styles/header.module.css'
import siteInfo from '/data/siteInfo';
import { formatPhoneNumber } from '/utils/textUtils';

const Header = forwardRef((props, ref) => {
    return (
        <header ref={ref}>
            <div className={headerStyles.header}>
                <div className={[styles.container, headerStyles.container].join(' ')}>
                    <div className={headerStyles.contactInfoContainer}>
                        <div className={headerStyles.addressAndHoursContainer}>
                            <div>
                                <span aria-hidden="true" className={[styles.fas, styles.faBusinessHours, headerStyles.icon].join(' ')}></span><span className={headerStyles.businessHours} dangerouslySetInnerHTML={{__html: siteInfo.hours}}></span>
                            </div>
                            <div>
                                <span aria-hidden="true" className={[styles.fas, styles.faMapMarkerAlt, headerStyles.icon].join(' ')}></span><a href="https://maps.app.goo.gl/efyAT2CnbnyzgBCV9" target='_blank' rel='noopener noreferrer'>{siteInfo.address}</a>
                            </div>
                        </div>

                        <a className={headerStyles.redPhoneButtonContainer} href={`tel:${siteInfo.phone}`}><span className={headerStyles.redPhoneButton}>{formatPhoneNumber(siteInfo.phone)}</span></a>
                    </div>
                </div>
            </div>
            <div className={headerStyles.navBar}>
            </div>
        </header>
    )
});

export default Header;