import styles from '/styles/eas.module.css';
import Footer from '/components/Footer';

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
    const { manufacturer } = context.params;
  
    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/manufacturers/${manufacturer}`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function Manufacturer({ data }) {
    let pageTitle = data.url_slug.replace(/[-_]/g, ' ');
    return (<>
        <section className={styles.heroSection} style={{backgroundImage: `url(${data.hero_bkgd_img})`}}>
            <div className={styles.container}>
                <h1>{pageTitle}</h1>
            </div>
        </section>
        <section>
            <div className={styles.container}>
                <h1>{pageTitle} Repair Specialists</h1>
                <p dangerouslySetInnerHTML={{__html: data.content}}></p>
            </div>
        </section>
        <Footer></Footer>
        </>
  );
}