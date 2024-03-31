import Link from 'next/link';
import styles from '/styles/eas.module.css';
import topMenuStyles from '/styles/topMenu.module.css';
import siteInfo from '/data/siteInfo';
import ExpandableSubMenu from '/components/ExpandableSubMenu';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { debounce } from 'lodash';

export default function TopMenu({ headerRef }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuOpenRef = useRef(false);
    const menuButton = useRef(null);
    const navBarRef = useRef(null);
    const menuRef = useRef(null);
    const menuHeight = useRef(0);
    const [menuTop, setMenuTop] = useState(-9999);
    const instantAnimationRef = useRef(false);
    const handleResizeRef = useRef();

    // update the height of the menu
    const updateMenuHeight = () => {
        if (menuRef.current) {
            menuHeight.current = menuRef.current.scrollHeight;
        }
    };

    // Get the top value for the menu based on heights of the header, navBar, and its own height
    const getTopValueForMenu = () => {
        const navBarHeight = navBarRef.current?.scrollHeight ?? 0;
        const headerHeight = headerRef.current?.scrollHeight ?? 0;
        return (menuOpenRef.current ? (navBarHeight + headerHeight) : (-menuHeight.current + headerHeight + navBarHeight)) - 1;
    }
    
    // Update the top value based on the current state or viewport size
    const updateTopPosition = () => {
        const newTop = getTopValueForMenu(); // Your logic to get the new top value
        setMenuTop(newTop);
    };
        
    // Update the top value when the menu is opened or closed
    useLayoutEffect(() => {
        updateMenuHeight();
        updateTopPosition();
    }, [menuOpen]);
    
    // Function to reset instant animation after debouncing
    const debouncedResetInstantAnimation = debounce(() => {
        instantAnimationRef.current = false;
    }, 100);

    // when window resizes, make animation instant & update the menu height and top position
    // Store the function in a ref so that it can be used in the event listener without stale closure
    handleResizeRef.current = () => {
        instantAnimationRef.current = true;
        updateMenuHeight();
        updateTopPosition();
    }
    // Update the top value when the viewport size changes
    useLayoutEffect(() => {    
        const eventListener = () => handleResizeRef.current();
        // Add event listener for window resize
        window.addEventListener('resize', eventListener);
        // Debounce the reset of instant animation
        window.addEventListener('resize', debouncedResetInstantAnimation);
        
        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', eventListener);
            window.removeEventListener('resize', debouncedResetInstantAnimation);
            debouncedResetInstantAnimation.cancel();
        };
    }, []);
    
    const menuAnimation = useSpring({
        config: { duration: 200 },
        to: {
            top: menuTop,
        },
        from: { top: -9999 },
        immediate: instantAnimationRef.current,
    });
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpenRef.current);
        menuOpenRef.current = !menuOpenRef.current;
    }
    const toggleMenuInstant = () => {
        instantAnimationRef.current = true;
        toggleMenu();
        debouncedResetInstantAnimation();
    }

    return (
        <>
        <animated.div ref={menuRef} style={menuAnimation} className={topMenuStyles.navigationContainerContainer}>
        <div className={[topMenuStyles.navigationContainer, styles.container].join(' ')}>
            <ul className={topMenuStyles.navigationPages}>
                {siteInfo.pages.map((page, index) => {
                    if (page['group'] !== undefined) {
                        return (<ExpandableSubMenu page={page} key={index} toggleParentMenu={toggleMenuInstant}></ExpandableSubMenu>);
                    }
                    else {
                        return (
                            <li key={index} className={topMenuStyles.navigationItem}>
                                <Link onClick={toggleMenuInstant} href={page['link']} className={topMenuStyles.navigationLink}>{page.title}</Link>
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
        </animated.div>
        <div className={topMenuStyles.navBarContainer}>
        <div className={styles.container} ref={navBarRef}>
            <nav className={topMenuStyles.navBar}>
                <Link className={topMenuStyles.logoContainer} href="/"><img className={topMenuStyles.logo} src='/images/eas-logo-with-text.svg'/></Link>
                <button className={[topMenuStyles.navbarToggler, (menuOpen ? undefined : topMenuStyles.collapsed)].join(' ')} onClick={toggleMenu} ref={menuButton} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={menuOpen} aria-label="Toggle navigation">
                    <span></span>
                </button>
            </nav>
        </div>
        </div>
        </>
    );
}