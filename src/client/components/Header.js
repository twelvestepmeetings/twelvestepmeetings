import React, { PropTypes } from 'react';
import bounds from 'react-bounds';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import style from 'lib/style';
import classnames from 'classnames';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';

const stylesheet = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px'
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
    color: 'hsl(0, 0%, 80%)',
    textDecoration: 'none',
    margin: '0 15px'
  },
  activeLink: {
    color: 'hsl(92, 47%, 59%)',
    textDecoration: 'none',
    margin: '0 15px',
    textShadow: '0px -1px hsl(0, 0%, 6%), 0px 1px hsl(0, 0%, 27%)'
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
  },
  mobileLogo: {
    height: '40px'
  },
  mobileLinks: {
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
  mobileLink: {
    fontSize: '20px',
    margin: '20px 0'
  }
};

@withRouter
@style(stylesheet)
@bounds.wrap
class Header extends React.Component {

  static propTypes = {
    match: PropTypes.shape({
      pathname: PropTypes.string
    })
  };

  static bounds() {
    return {
      mobile: {
        maxWidth: 800
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const { match: { path }, classes} = this.props;
    const isMobile = this.props.isBound('mobile');
    const btnClose = (
      <i
        className={classnames('material-icons', classes.close)}
        onClick={() => this.setState({ open: false })}
      >close</i>
    );

    const nav = (
      <div
        className={classnames(classes.links, {
          [classes.mobileLinks]: isMobile
        })}
      >
        <Link
          to="/meetings"
          className={classnames(
            classes.link,
            path === '/meetings' && classes.activeLink,
            { [classes.mobileLink]: isMobile }
            )}
        >Online Meetings</Link>
        <Link
          to="/tapes"
          className={classnames(
            classes.link,
            path === '/tapes' && classes.activeLink,
            { [classes.mobileLink]: isMobile }
          )}
        >Speakertapes</Link>
        <Link
          to="/service-opportunities"
          className={classnames(
            classes.link,
            path === '/service-opportunities' && classes.activeLink,
            { [classes.mobileLink]: isMobile }
          )}
        >Service Opportunities</Link>
        <LanguageSelector />
        {isMobile && btnClose}
      </div>
    );
    const hamburger = (
      <i
        className={classnames('material-icons', classes.hamburger)}
        onClick={() => this.setState({ open: true })}
      >menu</i>
    );

    return (
      <div
        className={classnames(classes.container, this.props.className)}
      >
        <Link to="/">
          <Logo
            className={classnames(classes.logo, {
              [classes.mobileLogo]: isMobile
            })}
          />
        </Link>
        {!isMobile && nav}
        {isMobile && hamburger}
        {isMobile && this.state.open && nav}
      </div>
    );
  }
}

export default Header;
