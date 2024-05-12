import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from '/styles/eas.module.css';
import mediaGalleryStyles from '/styles/mediaGallery.module.css';

export default function MediaGallery({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('positive');
    const duration = 256; // Duration of the transition

    const handleNav = (increment) => {
        let newIndex = currentIndex + increment;
        if (newIndex >= images.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = images.length - 1;
        }
        setDirection(increment > 0 ? 'positive' : 'opposite');
        setCurrentIndex(newIndex);
    };

    return (
        <section className={[mediaGalleryStyles.sectionContainer, styles.arrowParent].join(' ')} style={{ position: 'relative' }}>
            <div className={mediaGalleryStyles.carousel} style={{ '--duration': `${duration}ms` }}>
                <TransitionGroup component={null}>
                    <CSSTransition
                        key={`${currentIndex}-${images[currentIndex]}`} // Unique key based on currentIndex and image URL
                        in={true} // Always in because we're only showing one item at a time
                        timeout={duration}
                        classNames={{
                            enter: mediaGalleryStyles[`enter${direction.charAt(0).toUpperCase() + direction.slice(1)}`],
                            enterActive: mediaGalleryStyles.enterActive,
                            exitActive: mediaGalleryStyles.exitActive
                        }}
                        unmountOnExit
                    >
                        <div className={mediaGalleryStyles.carouselItem} style={{ backgroundImage: `url(${images[currentIndex]})` }}>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <div onClick={() => handleNav(-1)} className={[styles.leftArrow, styles.fa, styles.faAngleLeft].join(' ')}></div>
            <div onClick={() => handleNav(1)} className={[styles.rightArrow, styles.fa, styles.faAngleRight].join(' ')}></div>
        </section>
    );
}
