import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web'
import topMenuStyles from '/styles/topMenu.module.css';

export default function ExpandableSubMenu ({ page, index, toggleParentMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentHeight = useRef(0);
    const subMenuRef = useRef(null);

    useEffect(() => {
        if (subMenuRef.current) {
            contentHeight.current = subMenuRef.current.scrollHeight;
        }
    }, [isOpen]);
    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const subMenuAnimation = useSpring({
        config: { duration: 200 },
        to: {
            maxHeight: isOpen ? contentHeight.current : 0,
        },
        from: { maxHeight: 0},
    });
    
    return (
        <li key={index} className={topMenuStyles.navigationItem}>
            <a onClick={toggleOpen} className={topMenuStyles.navigationLink}>{page.title}
            <span onClick={toggleOpen} className={[topMenuStyles.expandIcon, isOpen ? topMenuStyles.open : undefined].join(' ')}></span></a>
            <animated.ul ref={subMenuRef} style={subMenuAnimation} className={topMenuStyles.subMenuContainer}>
                {page['pages'].map((subPage, subIndex) => (
                    <li key={subIndex} className={topMenuStyles.subNavigationItem}>
                        <Link onClick={toggleParentMenu} href={subPage.link} className={topMenuStyles.subNavigationLink}>{subPage.title}</Link>
                    </li>
                ))}
            </animated.ul>
        </li>
    )
}