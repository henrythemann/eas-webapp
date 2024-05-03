import { useState, useEffect } from 'react';
import Link from 'next/link';
import siteInfo from '/data/siteInfo';
import styles from '/styles/eas.module.css';
import manufacturerLogoStyles from '/styles/manufacturerLogos.module.css';

function ResponsiveImage({ src, alt }) {
    const [style, setStyle] = useState({});

    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            const aspectRatio = image.naturalWidth / image.naturalHeight;
            if (aspectRatio > 1) {
                // Landscape
                setStyle({ width: '8rem', height: 'auto' });
            } else {
                // Portrait
                setStyle({ width: 'auto', height: '5rem' });
            }
        };
    }, [src]);

    return <img src={src} alt={alt} style={style} />;
}

function ManufacturerLogoList({ manufacturers }) {
    return (
        <div className={manufacturerLogoStyles.halfContainer}>
            {manufacturers.map(manufacturer => (
                <Link key={manufacturer.title.toLowerCase().replace(' ', '-')} href={`/manufacturers/${manufacturer.title.toLowerCase().replace(' ', '-')}`}>
                    <ResponsiveImage src={`/images/manufacturer-logos/${manufacturer.title.toLowerCase().replace(' ', '-')}.svg`} alt={`${manufacturer.title} logo`} />
                </Link>
            ))}
        </div>
    );
}

export default function ManufacturerLogos() {
    const manufacturers = siteInfo.pages.find(x => x.group && x.group == 'manufacturers').pages;
    const midpoint = Math.ceil(manufacturers.length / 2);
    const firstHalf = manufacturers.slice(0, midpoint);
    const secondHalf = manufacturers.slice(midpoint);

    return (
        <section className={[manufacturerLogoStyles.manufacturerLogosContainer, styles.container].join(' ')}>
            <ManufacturerLogoList manufacturers={firstHalf} />
            <ManufacturerLogoList manufacturers={secondHalf} />
        </section>
    );
}
