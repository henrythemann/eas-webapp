import HeroSection from '/components/HeroSection';
import siteInfo from '/data/siteInfo';
import styles from '/styles/eas.module.css';

export async function getStaticProps() {
    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/about/`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function About({data}) {
    return (<>
        <HeroSection bkgd_img={data.hero_bkgd_img} page_title={data.page_title}></HeroSection>
        <section className={styles.mainArticleSection}>
            <div className={styles.container}>
                <h2 className={styles.articleTitle}>European Auto <span>Experts</span></h2>
                <h3 className={styles.articleSubtitle}>{data.article_subtitle}</h3>
                <div dangerouslySetInnerHTML={{__html: data.content || 'Loading...' }}></div>
            </div>
        </section>
    </>)
}