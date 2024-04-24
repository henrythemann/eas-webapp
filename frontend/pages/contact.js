import HeroSection from '/components/HeroSection';
import siteInfo from '/data/siteInfo';
import styles from '/styles/eas.module.css';

export async function getStaticProps() {
    // Fetch data from Django API
    const response = await fetch(`http://localhost:8000/api/contact/`);
    const data = await response.json();
  
    // Pass data to the page via props
    return { props: { data } };
}

export default function Contact({data}) {
    return (<>
        <HeroSection bkgd_img={data.hero_bkgd_img} page_title={data.page_title}></HeroSection>
        <section>
            <div className={styles.dFlex}>
                <div>Location: {siteInfo.address}</div>
                <div>Phone Number: {siteInfo.phone}</div>
                <div>Email Us: {siteInfo.email}</div>
                <div>Hours of Operation: {siteInfo.hours}</div>
            </div>
        </section>
        <iframe loading="lazy" src="https://maps.google.com/maps?q=European%20Auto%20Service%2C%20Reseda%20CA%2C%20United%20States&amp;t=m&amp;z=10&amp;output=embed&amp;iwloc=near" title="European Auto Service, Reseda CA, United States" aria-label="European Auto Service, Reseda CA, United States"></iframe>
    </>)
}