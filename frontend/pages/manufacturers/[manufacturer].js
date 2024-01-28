import styles from '/styles/eas.module.css';

export async function getStaticPaths() {
    return {
        paths: [
            { params: { manufacturer: 'ferrari' } },
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    // Extract the manufacturer slug from the URL
    let { manufacturer } = context.params;
    manufacturer = manufacturer.replace(/ /g, '-').toLowerCase();

    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/manufacturers/${manufacturer}`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function Manufacturer({ data }) {
    const servicesMidpoint = Math.ceil(data.services.length / 2);
    let servicesHalves = [data.services.slice(0, servicesMidpoint), data.services.slice(servicesMidpoint)];

    return (<>
        <section className={styles.heroSection} style={{backgroundImage: `url(${data.hero_bkgd_img})`}}>
            <div className={styles.container}>
                <h1>{data.page_title}</h1>
            </div>
        </section>
        <section className={styles.mainArticleSection}>
            <div className={styles.container}>
                <h2 className={styles.articleTitle}><span>{data.page_title}</span> Repair Specialists</h2>
                <h3 className={styles.articleSubtitle}>{data.article_subtitle}</h3>
                <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            </div>
        </section>
        <section className={styles.servicesSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>{data.page_title} Repair Services / Common Problems</h2>
                <div className={styles.row}>
                    {servicesHalves.map((serviceHalf, index) => {
                        return ( 
                            <div className={[styles.servicesContainer, styles.colLg6, styles.colMd6].join(' ')}>
                                {serviceHalf.map((service, index) => {
                                    return(
                                        <div key={index} className={styles.serviceItemContainer}>
                                            <span aria-hidden="true" className={[styles.fas, styles.faCheck].join(' ')}></span>
                                            <span className={styles.serviceName}>{service}</span>
                                        </div>
                                )})}
                            </div>
                            );
                    })}
                </div>
            </div>
        </section>
        </>
  );
}