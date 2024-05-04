import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import siteInfo from '/data/siteInfo';
import styles from '/styles/eas.module.css';
import reviewSectionStyles from '/styles/reviewSection.module.css';

export default function ReviewSection() {
    const [activeReview, setActiveReview] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    
    const updateReviewAutomatically = () => {
        clearInterval(intervalId); // Clear any existing interval
        const newIntervalId = setInterval(() => {
            setActiveReview(activeReview => (activeReview + 1) % siteInfo.yelp_reviews.length);
        }, 10000);
        setIntervalId(newIntervalId);
    };

    useEffect(() => {
        updateReviewAutomatically(); // Initialize the interval on mount
        return () => clearInterval(intervalId); // Clean up on unmount
    }, []);

    const swipeLeft = () => {
        setActiveReview(activeReview => activeReview === 0 ? siteInfo.yelp_reviews.length - 1 : activeReview - 1);
        updateReviewAutomatically(); // Reset the interval after manual swipe
    }

    const swipeRight = () => {
        setActiveReview(activeReview => activeReview === siteInfo.yelp_reviews.length - 1 ? 0 : activeReview + 1);
        updateReviewAutomatically(); // Reset the interval after manual swipe
    }

    return (
        <section className={[reviewSectionStyles.sectionContainer, styles.arrowParent].join(' ')}>
            <h5>Fantastic Reviews</h5>
            <h2>What our clients are saying...</h2>
            <div className={styles.container}>
            <div className={reviewSectionStyles.iframeContainer}>
            <TransitionGroup component={null}>
                <CSSTransition
                    key={activeReview}
                    timeout={500} // Match the CSS transition duration
                    classNames={{
                        enter: styles.fadeEnter,
                        enterActive: styles.fadeEnterActive,
                        exit: styles.fadeExit,
                        exitActive: styles.fadeExitActive
                    }}>
                        <iframe src={`https://www.yelp.com/embed/review/${siteInfo.yelp_reviews[activeReview]}`} 
                            style={{width:'100%', height:'300px', border: 'none'}} 
                            scrolling="no"/>
                </CSSTransition>
            </TransitionGroup>
            </div>
                <div onClick={swipeLeft} className={[styles.leftArrow, styles.fa, styles.faAngleLeft].join(' ')}></div>
                <div onClick={swipeRight} className={[styles.rightArrow, styles.fa, styles.faAngleRight].join(' ')}></div>
            </div>
        </section>
    );
}
