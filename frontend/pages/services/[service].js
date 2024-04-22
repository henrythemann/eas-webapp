import styles from '/styles/eas.module.css';
import siteInfo from '/data/siteInfo';
import ManufacturerLogos from '/components/ManufacturerLogos';
import { pageTitleToUrl } from '/utils/urlUtils';
import Image from 'next/image';

export async function getStaticPaths() {
    let pathsArray = siteInfo.pages.find(x => x.group && x.group == 'services').pages.map(x => ({ params: { service: pageTitleToUrl(x.title) } }));
    return {
        paths: pathsArray,
        fallback: false
    }
}

export async function getStaticProps(context) {
    // Extract the manufacturer slug from the URL
    let { service } = context.params;

    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/services/${service}/`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function Service({ data, setTitle }) {
    console.log(data.article_img)
    return (<>
        <section className={styles.heroSection} style={{backgroundImage: `url(${data.hero_bkgd_img})`}}>
            <div className={styles.container}>
                <h1>{data.page_title}</h1>
                <div className={styles.subheading}>European Auto Service | Reseda</div>
            </div>
        </section>
        <section className={styles.mainArticleSection}>
            <div className={[styles.container, styles.articleContainer].join(' ')}>
                <div>
                    <h2 className={styles.articleTitle}><span>{data.page_title}</span> Specialists</h2>
                    <h3 className={styles.articleSubtitle}>{data.article_subtitle}</h3>
                    <div dangerouslySetInnerHTML={{__html: data.content || 'Loading...' }}></div>
                </div>
                <Image src={data.article_img} alt={data.page_title} width={600} height={600}></Image>
            </div>
        </section>
        <ManufacturerLogos></ManufacturerLogos>
    </>)
}
