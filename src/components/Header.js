import React from 'react';
import reactCSS from 'reactcss';
import bounds from 'react-bounds';
import { Link } from 'react-router';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

const stylesheet = {
  'default': {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 15px'
    },
    logo: {
      height: '30px',
      display: 'flex',
      alignItems: 'center'
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

    },
    hamburger: {
      color: 'white',
      fontSize: '28px',
      cursor: 'pointer'
    },
    close: {
      position: 'absolute',
      right: '10px',
      top: '10px',
      cursor: 'pointer'
    }
  },
  'mobile': {
    logo: {
      height: '40px'
    },
    links: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      background: 'hsl(0, 0%, 15%)',
      color: 'hsl(0, 0%, 100%)',
      height: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      alignItems: 'flex-start'
    },
    link: {
      fontSize: '20px',
      margin: '20px 0'
    }
  }
};

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  static bounds() {
    return {
      'mobile': {
        maxWidth: 800
      }
    };
  }

  render() {
    const isMobile = this.props.isBound('mobile');
    const styles = reactCSS(stylesheet, {
      'mobile': isMobile
    });
    const btnClose = (
      <i
        className="material-icons"
        style={styles.close}
        onClick={() => this.setState({ open: false })}
      >close</i>
    );
    const nav = (
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
        {isMobile && btnClose}
      </div>
    );
    const hamburger = (
      <i
        style={styles.hamburger}
        className="material-icons"
        onClick={() => this.setState({ open: true })}
      >menu</i>
    );

    return (
      <div style={styles.container}>
        <div style={styles.logo}>
          <Logo style={styles.logo} />
        </div>
        {!isMobile && nav}
        {isMobile && hamburger}
        {isMobile && this.state.open && nav}
      </div>
    );
  }
}

export default bounds.wrap(Header, { height: 'auto' });
