import styles from '/styles/eas.module.css';
import { useEffect } from 'react';
import siteInfo from '/data/siteInfo';
import ManufacturerLogos from '/components/ManufacturerLogos';
import { pageTitleToUrl } from '/utils/urlUtils';

export async function getStaticPaths() {
    let pathsArray = siteInfo.pages.find(x => x.group && x.group == 'services').pages.map(x => ({ params: { service: pageTitleToUrl(x.title) } }));
    console.log(pathsArray);
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
}
