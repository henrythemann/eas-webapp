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
    return (<>
        <section className={styles.heroSection} style={{backgroundImage: `url(${data.hero_bkgd_img})`}}>
            <div className={styles.container}>
                <h1>{data.page_title}</h1>
            </div>
        </section>
        <section>
            <div className={styles.container}>
                <h2>{data.page_title} Repair Specialists</h2>
                <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            </div>
        </section>
        </>
  );
}