import React from 'react';
import reactCSS from 'reactcss';
import { Link } from 'react-router';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

const styles = reactCSS({
  'default': {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 10px'
    },
    logo: {
      height: '40px'
    },
    links: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px'
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 15px'
    },
    activeLink: {

    }
  }
});

const Header = () => (
  <div style={styles.container}>
    <div style={styles.logo}>
      <Logo style={styles.logo} />
    </div>
    <div style={styles.links}>
      <Link
        to="/meetings"
        style={styles.link}
        activeStyle={styles.activeLink}
      >Online Meetings</Link>
      <Link
        to="/tapes"
        style={styles.link}
        activeStyle={styles.activeLink}
      >Speakertapes</Link>
      <Link
        to="service-opportunities"
        style={styles.link}
        activeStyle={styles.activeLink}
      >Service Opportunities</Link>
      <LanguageSelector />
    </div>
  </div>
);

export default Header;
