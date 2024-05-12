import { useEffect } from 'react';
import HeroSection from '/components/HeroSection';
import Link from 'next/link';
import styles from '/styles/eas.module.css';
import siteInfo from '/data/siteInfo';
import { formatPhoneNumber } from '/utils/textUtils';

export default function PrivacyPolicy({ setTitle }) {
    useEffect(() => {
        setTitle('Privacy Policy | European Auto Service');
    }, []);
    return (<>
        <HeroSection style={{background: '#bebcf2'}} page_title={"Privacy Policy"}></HeroSection>
        <div className={styles.container}>
        <p>
        <b>WE ARE COMMITTED TO PROTECTING YOUR PERSONAL INFORMATION</b>
        <br/><br/>
        <b>European Auto Service&nbsp;</b>is committed to protecting your personal information. The following outlines our policies and how we treat the information that you provide us.</p><p><b>In general, you can visit this website without telling us who you are or revealing any information about yourself.</b></p><p><b>Information Collected</b></p><p>Our web servers collect the domain names, not the email addresses of visitors. There are portions of this website where we may need to collect personal information from you for a specific purpose, such as to provide you with information that you request. Such information collected from you may include your name, address, telephone, fax number or email address.</p>
        <p><b>Google Analytics</b></p><p>We use Google Analytics to collect information and it is not used to personally identify who you are. It is aggregated to measure the number of visits, average time spent onsite, pages viewed, etc. We analyze this information to measure how our website is being used and to improve its content.</p><p><b>Google Ads</b></p><p><b>European Auto Service </b>may take part in pay per click Google Ads campaigns, which is a service provided by Google. It connects the activity of <b>European Auto Service</b> visitors with the Ads advertising network and the Doubleclick Cookie.&nbsp;<b>Again, it is not used to personally identify who you are.</b></p><p><b>Use of Collected Information:</b></p>
        <p>Your domain name information is not used to personally identify who you are and instead is aggregated to measure the number of visits, average time spent on the site, pages viewed, etc. We analyze this information to measure how our website is being used and to improve its content.</p><p>When supplied by you, we use your name and email address to respond to your inquiries, or to process requests.<br/>We do not share, sell, or lease personal information about you to any third-parties for their marketing use. We will release information about you if you direct us to do so, if we are required by law to do so, or in other legally limited circumstances (for example, to protect your account from fraud).</p><p><b>Links to Other Sites:<br/></b><br/><b>European Auto Service</b> website may contain links to other sites such as helpful website related resources. While we try to link only to sites that share our high standards and respect for privacy, we are not responsible for the content, security, or privacy practices employed by other sites.</p><p><b>Cookies:<br/></b><br/>We do not use Cookies at the <b>European Auto Service</b><b> website.</b></p><p><b>Security of Collected Information:</b></p><p>We maintain strict physical, electronic, and administrative safeguards to protect your personal information from unauthorized or inappropriate access.</p><p>We restrict access to information about you to those <b>European Auto Service&nbsp;</b>workers who need to know the information in order to respond to your inquiry or request. Workers who misuse personal information are subject to disciplinary action.</p><p><b>Accessing and Updating Personal Information:<br/></b><br/>We need your help in making sure your personal information is correct in our systems. Please notify us of changes to your name, address, title, phone number or email address. Our websites do not currently offer users the ability to update their own personal data, please contact us directly at {formatPhoneNumber(siteInfo.phone)} or email to update your personal data.</p><p><b>Contacting Us:<br/></b><br/>If you have any questions about this privacy policy, please use the <Link href="/contact/">Contact Us</Link> page. We welcome your questions and suggestions about our privacy policy.</p><p><b>Changes to this Policy:<br/></b><br/>Please check this privacy policy periodically to inform yourself of any changes. Updated April 9, 2021</p>
        </div>
    </>)
}