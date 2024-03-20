import Link from 'next/link';
import styles from '/styles/eas.module.css';
import topMenuStyles from '/styles/topMenu.module.css';
import siteInfo from '/data/siteInfo';
import { useState, useRef } from 'react';

export default function TopMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButton = useRef(null);

    const toggleMenu = () => {
        let willOpen = !menuOpen;
        setMenuOpen(!menuOpen);
    }

    let navigationPages = {Home: '/', About: '/about'}
    return (
    <div className={[styles.container, topMenuStyles.navBarContainer].join(' ')}>
        <nav className={topMenuStyles.navBar}>
            <Link className={topMenuStyles.logoContainer} href="/"><img className={topMenuStyles.logo} src={siteInfo.site_logo}/></Link>
            <button className={[topMenuStyles.navbarToggler, (menuOpen ? undefined : topMenuStyles.collapsed)].join(' ')} onClick={toggleMenu} ref={menuButton} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={menuOpen} aria-label="Toggle navigation">
                <span></span>
            </button>
            <div className={[topMenuStyles.navigationContainer, (menuOpen ? undefined : topMenuStyles.collapse)].join(' ')}>
                <ul className={topMenuStyles.navigationPages}>
                    {Object.keys(navigationPages).map((page, index) => {
                        return (
                            <li key={index} className={topMenuStyles.navigationItem}>
                                <Link href={navigationPages[page]} className={topMenuStyles.navigationLink}>{page}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    </div>
    );
}