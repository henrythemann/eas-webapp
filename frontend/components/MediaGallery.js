import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from '/styles/eas.module.css';
import mediaGalleryStyles from '/styles/mediaGallery.module.css';

export default function MediaGallery({images}) {
    const [imagesIndex, setImagesIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');
    const [intervalId, setIntervalId] = useState(null);
    console.log(images);
    
    const changeImageAutomatically = () => {
        clearInterval(intervalId); // Clear any existing interval
        const newIntervalId = setInterval(() => {
            setSlideDirection('right'); 
            setImagesIndex(imagesIndex => (imagesIndex + 1) % images.length);
        }, 10000);
        setIntervalId(newIntervalId);
    };

    useEffect(() => {
        changeImageAutomatically(); // Initialize the interval on mount
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const swipeLeft = () => {
        setImagesIndex(imagesIndex => imagesIndex === 0 ? images.length - 1 : imagesIndex - 1);
        setSlideDirection('left');
        changeImageAutomatically(); // Reset the interval after manual swipe
    }
    
    const swipeRight = () => {
        setImagesIndex(imagesIndex => imagesIndex === images.length - 1 ? 0 : imagesIndex + 1);
        setSlideDirection('right');
        changeImageAutomatically(); // Reset the interval after manual swipe
    }

    return (
        <section className={[mediaGalleryStyles.sectionContainer, styles.arrowParent].join(' ')} style={{position: 'relative'}}>
        <TransitionGroup component={null}>
            <CSSTransition
            key={imagesIndex}
            timeout={500} // Match the CSS transition duration
            classNames={{
                enter: slideDirection === 'right' ? styles.slideEnterFromRight : styles.slideEnterFromLeft,
                enterActive: slideDirection === 'right' ? styles.slideEnterFromRight : styles.slideEnterFromLeft,
                exit: slideDirection === 'right' ? styles.slideExitToRight : styles.slideExitToLeft,
                exitActive: slideDirection === 'right' ? styles.slideExitToRight : styles.slideExitToLeft,
            }}>
                    <div className={mediaGalleryStyles.imgElement} style={{backgroundImage: `url(${images[imagesIndex]})`}}>
                        <div onClick={swipeLeft} className={[styles.leftArrow, styles.fa, styles.faAngleLeft].join(' ')}></div>
                        <div onClick={swipeRight} className={[styles.rightArrow, styles.fa, styles.faAngleRight].join(' ')}></div>
                    </div>
            </CSSTransition>
        </TransitionGroup>
        </section>
    );
}
