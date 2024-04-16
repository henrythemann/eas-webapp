import Head from 'next/head';
import styles from '/styles/eas.module.css';
import homePageStyles from '/styles/homePage.module.css';
import { useState } from 'react';
 
export async function getStaticProps(context) {
  // Fetch data from Django API
  const response = await fetch(`http://localhost:8000/api/home`);
  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
  const [heroSectionIndex, setHeroSectionIndex] = useState(0);

  const onHeroSwipeLeft = () => {
    setHeroSectionIndex(heroSectionIndex === 0 ? data.hero_sections.length - 1 : heroSectionIndex - 1);
  }
  const onHeroSwipeRight = () => {
    setHeroSectionIndex(heroSectionIndex === data.hero_sections.length - 1 ? 0 : heroSectionIndex + 1);
  }

  return (
    <div>
      <section className={homePageStyles.homeHeroSection} style={{backgroundImage: 'url('+data.hero_sections[heroSectionIndex].bkgd_img+')'}}>
        <div className={[styles.container, homePageStyles.heroTextContainer].join(' ')}>
          <h6>
            {data.hero_sections[heroSectionIndex].heading}
          </h6>
          <h3>
            {data.hero_sections[heroSectionIndex].title}
          </h3>
          <p>
            {data.hero_sections[heroSectionIndex].subtitle}
          </p>
          <button className={homePageStyles.heroButton}>{data.hero_sections[heroSectionIndex].btn_text}</button>
        </div>
        <div onClick={onHeroSwipeLeft} className={homePageStyles.leftArrow}>&lt;</div>
        <div onClick={onHeroSwipeRight} className={homePageStyles.rightArrow}>&gt;</div>
      </section>
    </div>
  );
}
