import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web'
import topMenuStyles from '/styles/topMenu.module.css';

export default function ExpandableSubMenu ({ page, index }) {
    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const subMenuRef = useRef(null);

    const menuAnimation = useSpring({
        to: {
            height: isOpen ? contentHeight : 0,
            opacity: isOpen ? 1 : 0,
        },
        from: { height: 0, opacity: 0 },
    });

    useEffect(() => {
        if (subMenuRef.current) {
            setContentHeight(subMenuRef.current.scrollHeight + 20);
        }
    }, [isOpen]);

    
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <li key={index} className={topMenuStyles.navigationItem} onClick={toggleOpen}>
            <a className={topMenuStyles.navigationLink}>{page.title}</a>
            <span className={topMenuStyles.expandIcon}></span>
            <ul className={topMenuStyles.subNavigationPages}>
                {page['pages'].map((subPage, subIndex) => (
                    <li key={subIndex} className={topMenuStyles.subNavigationItem}>
                        <Link href={subPage.link} className={topMenuStyles.subNavigationLink}>{subPage.title}</Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}