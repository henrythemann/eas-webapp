import React, { useRef } from 'react';
import '/styles/global.css';
import Head from 'next/head';
import useScrollRestoration from "/hooks/useScrollRestoration";
import Footer from '/components/Footer';
import Header from '/components/Header';
import TopMenu from '/components/TopMenu';

function EASApp({ Component, pageProps, router }) {
    const headerRef = React.createRef();

    useScrollRestoration(router);
    return (<>
        <Head>
            <title>European Auto Service</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
        <Header ref={headerRef}></Header>
        <TopMenu headerRef={headerRef}></TopMenu>
        <Component {...pageProps} />
        <Footer></Footer>
    </>);
}

export default EASApp;