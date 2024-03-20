import '/styles/global.css';
import Head from 'next/head';
import useScrollRestoration from "/hooks/useScrollRestoration";
import Footer from '/components/Footer';
import Header from '/components/Header';
import TopMenu from '/components/TopMenu';

function EASApp({ Component, pageProps, router }) {
    useScrollRestoration(router);
    return (<>
        <Head>
            <title>European Auto Service</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header></Header>
        <TopMenu></TopMenu>
        <Component {...pageProps} />
        <Footer></Footer>
    </>);
}

export default EASApp;