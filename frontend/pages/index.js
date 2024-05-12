import Head from 'next/head';
import styles from '/styles/eas.module.css';
import homePageStyles from '/styles/homePage.module.css';
import { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { kebabToCamelCase } from '/utils/textUtils';
 
export async function getStaticProps(context) {
  // Fetch data from Django API
  const response = await fetch(`http://localhost:8000/api/home`);
  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data, setTitle}) {
  const [heroSectionIndex, setHeroSectionIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
    
  const updateReviewAutomatically = () => {
      clearInterval(intervalId); // Clear any existing interval
      const newIntervalId = setInterval(() => {
        setHeroSectionIndex(heroSectionIndex => (heroSectionIndex + 1) % data.hero_sections.length);
      }, 2000/*10000*/);
      setIntervalId(newIntervalId);
  };

  useEffect(() => {
    setTitle('European Auto Service | Luxury Exotic Car Repair Shop Los Angeles');
    updateReviewAutomatically(); // Initialize the interval on mount
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const onHeroSwipeLeft = () => {
    setHeroSectionIndex(heroSectionIndex === 0 ? data.hero_sections.length - 1 : heroSectionIndex - 1);
    updateReviewAutomatically();
  }
  const onHeroSwipeRight = () => {
    setHeroSectionIndex(heroSectionIndex === data.hero_sections.length - 1 ? 0 : heroSectionIndex + 1);
    updateReviewAutomatically();
  }

  return (
    <div>
      <section className={[homePageStyles.homeHeroSection, styles.arrowParent].join(' ')} style={{backgroundImage: 'url('+data.hero_sections[heroSectionIndex].bkgd_img+')'}}>
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
        <div onClick={onHeroSwipeLeft} className={[styles.leftArrow, styles.fa, styles.faAngleLeft].join(' ')}></div>
        <div onClick={onHeroSwipeRight} className={[styles.rightArrow, styles.fa, styles.faAngleRight].join(' ')}></div>
      </section>

      <section>
        <div className={[styles.container, homePageStyles.expertArea].join(' ')}>
          <div className="expert_inner">
            <div className={[styles.row, styles.justifyContentCenter].join(' ')}>
              {data.expert_sections.map((item, index) => {
                return (
                  <div key={index} className={[styles.colLg4, styles.colSm6].join(' ')}>
                    <div className={homePageStyles.expertItem}>
                      <i aria-hidden="true" className={[styles.fa, styles[kebabToCamelCase('fa-' + item.icon)]].join(' ')}></i>
                      <h4>{item.title}</h4>
                      <p>{item.caption}</p>
                      <a className="main_btn red" href={item.btn_link}>
                        {item.btn_text}
                      </a>
                      <div className="shadow_icon">
                        <i aria-hidden="true" className={[styles.fa, item.icon].join(' ')}></i>
                      </div>
                    </div>
                  </div>
                );
              })}
                {/* <div className={homePageStyles.expertItem}> <i aria-hidden="true" className={[styles.fa, styles.faWrench].join(' ')}></i><h4>Expert Technicians</h4><p>Trust the Experts. We Specialize in Repairing &amp; Restoring European Vehicles. <br></br> <a href="https://www.europeanautoreseda.com/car-repair-shop-reseda/" title="Learn more">Learn more</a></p> <a class="main_btn red" href=""><i class="lnr lnr-arrow-right"></i></a><div class="shadow_icon"> <i aria-hidden="true" class=" icon-setting"></i></div></div></div><div className={[styles.colLg4, styles.colSm6].join(' ')}><div className={homePageStyles.expertItem}> <i aria-hidden="true" className={[styles.fa, styles.faThumbsUp].join(' ')}></i><h4>Great Reviews</h4><p>"Best Euro Guys in LA! Always Treated With Impeccable Service, Utmost Respect..." <br></br> <a href="https://www.europeanautoreseda.com/reviews/" title="More reviews">Read more reviews</a></p> <a class="main_btn red" href=""><i class="lnr lnr-arrow-right"></i></a><div class="shadow_icon"> <i aria-hidden="true" class=" icon-worker"></i></div></div></div><div className={[styles.colLg4, styles.colSm6].join(' ')}><div className={homePageStyles.expertItem}> <i aria-hidden="true" className={[styles.fa, styles.faHandsHelping].join(' ')}></i><h4>Our Guarantee</h4><p>With 45+ Years Experience,  All Our Work is Backed By a Two Year,  24,000 Mile Guarantee. <br></br> <a href="https://www.europeanautoreseda.com/car-repair-shop-reseda/" title="Learn more">Learn more</a></p> <a class="main_btn red" href=""><i class="lnr lnr-arrow-right"></i></a><div class="shadow_icon"> <i aria-hidden="true" className={[styles.fa, styles.faHandsHelping].join(' ')}></i>
              </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section style={{textAlign: 'center'}}>
        <iframe width="448" height="796" src="https://www.youtube.com/embed/JrJm9gxyW3U?autoplay=1&mute=1&loop=1&playlist=JrJm9gxyW3U" title="European Auto Service in Reseda, CA" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </section>
    </div>
  );
}
