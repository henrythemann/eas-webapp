import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web'
import topMenuStyles from '/styles/topMenu.module.css';

export default function ExpandableSubMenu ({ page, index }) {
    const [isOpen, setIsOpen] = useState(false);

    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    
    return (
        <li key={index} className={topMenuStyles.navigationItem}>
            <a onClick={toggleOpen} className={topMenuStyles.navigationLink}>{page.title}</a>
            <span onClick={toggleOpen} className={topMenuStyles.expandIcon}></span>
            <ul  className={[topMenuStyles.subMenuContainer, isOpen ? undefined : topMenuStyles.subMenuCollapsed].join(' ')}>
                {page['pages'].map((subPage, subIndex) => (
                    <li key={subIndex} className={topMenuStyles.subNavigationItem}>
                        <Link href={subPage.link} className={topMenuStyles.subNavigationLink}>{subPage.title}</Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}