import styles from '/styles/eas.module.css';
import { useEffect } from 'react';
import siteInfo from '/data/siteInfo';
import ManufacturerLogos from '/components/ManufacturerLogos';
import HeroSection from '/components/HeroSection';
import { pageTitleToUrl } from '/utils/textUtils';

export async function getStaticPaths() {
    let pathsArray = siteInfo.pages.find(x => x.group && x.group == 'manufacturers').pages.map(x => ({ params: { manufacturer: pageTitleToUrl(x.title) } }));

    return {
        paths: pathsArray,
        fallback: false
    }
}

export async function getStaticProps(context) {
    // Extract the manufacturer slug from the URL
    let { manufacturer } = context.params;

    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/manufacturers/${manufacturer}/`);
    const data = await response.json();
    // Pass data to the page via props
    return { props: { data } };
}

export default function Manufacturer({ data, setTitle }) {
    let servicesHalves = [];
    useEffect(() => {
        if (data.services) {
            const servicesMidpoint = Math.ceil(data.services.length / 2);
            servicesHalves = [data.services.slice(0, servicesMidpoint), data.services.slice(servicesMidpoint)];
        }
    }, [data]);

    useEffect(() => {
        if (data.page_title) {
            setTitle(`Independent ${data.page_title} Repair Shop Los Angeles | European Auto Service`);
        }
    }, [data.page_title]);

    return (<>
        <HeroSection bkgd_img={data.hero_bkgd_img} page_title={data.page_title}></HeroSection>
        <section className={styles.mainArticleSection}>
            <div className={styles.container}>
                <h2 className={styles.articleTitle}><span>{data.page_title}</span> Repair Specialists</h2>
                <h3 className={styles.articleSubtitle}>{data.article_subtitle}</h3>
                <div dangerouslySetInnerHTML={{__html: data.content || 'Loading...' }}></div>
            </div>
        </section>
        {data.services && (
        <section className={styles.servicesSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>{data.page_title} Repair Services / Common Problems</h2>
                <div className={styles.row}>
                    {servicesHalves.map((serviceHalf, index) => {
                        return ( 
                        <div key={index} className={[styles.servicesContainer, styles.colLg6, styles.colMd6].join(' ')}>
                            <ul>
                            {serviceHalf.map((service, index) => {
                                return(
                                <li key={index} className={styles.serviceItemContainer}>
                                    <span aria-hidden="true" className={[styles.fas, styles.faCheck].join(' ')}></span>
                                    <span className={styles.serviceName}>{service}</span>
                                </li>
                            )})}
                            </ul>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
        )}
        <ManufacturerLogos></ManufacturerLogos>
        </>
  );
}