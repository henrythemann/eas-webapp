import React, { useRef } from 'react';
import siteInfo from '/data/siteInfo';
import '/styles/global.css';
import Head from 'next/head';
import useScrollRestoration from "/hooks/useScrollRestoration";
import Footer from '/components/Footer';
import Header from '/components/Header';
import TopMenu from '/components/TopMenu';
import ManufacturerLogos from '/components/ManufacturerLogos';
import MapSection from '/components/MapSection';
import ReviewSection from '/components/ReviewSection';

function EASApp({ Component, pageProps, router }) {
    const headerRef = React.createRef();
    const [htmlTitle, setHtmlTitle] = React.useState('European Auto Service');

    useScrollRestoration(router);
    return (<>
        <Head>
            <title>{htmlTitle}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content={siteInfo.site_description} />
            <meta name="og:title" content={htmlTitle} />
            <meta name="og:description" content={siteInfo.site_description} />
            <link rel="icon" href="/favicon.svg" />
        </Head>
        <Header ref={headerRef}></Header>
        <TopMenu headerRef={headerRef}></TopMenu>
        <Component {...pageProps} setTitle={setHtmlTitle}/>
        <ReviewSection></ReviewSection>
        <MapSection></MapSection>
        <ManufacturerLogos></ManufacturerLogos>
        <Footer></Footer>
    </>);
}

export default EASApp;