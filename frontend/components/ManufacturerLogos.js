import { useState, useEffect } from 'react';
import Link from 'next/link';
import siteInfo from '/data/siteInfo';
import manufacturerLogoStyles from '/styles/manufacturerLogos.module.css';

export default function ManufacturerLogos () {

    // Custom hook to resize images based whichever dimension is larger
    function ResponsiveImage({ src, alt }) {
        const [style, setStyle] = useState({});

        useEffect(() => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                const aspectRatio = image.naturalWidth / image.naturalHeight;
                if (aspectRatio > 1) {
                    // Landscape
                    setStyle({ width: '5rem', height: 'auto' });
                } else {
                    // Portrait
                    setStyle({ width: 'auto', height: '3rem' });
                }
            };
        }, [src]);

        return <img src={src} alt={alt} style={style} />;
    }
    return (
        <div className={manufacturerLogoStyles.manufacturerLogosContainer}>
            {siteInfo.pages.find(x => x.group && x.group == 'manufacturers').pages.map(x => (x.title.toLowerCase().replace(' ','-'))).map((manufacturer) => {
                return (
                    <Link key={manufacturer} href={`/manufacturers/${manufacturer}`}>
                        <ResponsiveImage src={`/images/manufacturer-logos/${manufacturer}.svg`} alt={`${manufacturer} logo`} />
                    </Link>
                )
            }
            )}
        </div>
    )
}