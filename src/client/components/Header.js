import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import style from 'lib/style';
import classnames from 'classnames';
import Measure from 'react-measure';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import HeaderLink from './HeaderLink';

type Props = {
  match: {
    path: string
  }
}

@withRouter
class Header extends React.Component {

  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dimensions: {
        width: -1,
        height: -1
      }
    };
  }

  render() {
    const MAX_MOBILE_WIDTH = 800;
    const { width } = this.state.dimensions;
    const { match: { path }, classes } = this.props;
    const isMobile = width < MAX_MOBILE_WIDTH;
    const btnClose = (
      <i
        className={classnames('material-icons', classes.close)}
        onClick={() => this.setState({ open: false })}
      >close</i>
    );
    const links = [
      { to: '/meetings', title: 'Online Meetings' },
      { to: '/tapes', title: 'Speakertapes' },
      { to: '/service-opportunities', title: 'Service Opportunities' }
    ];
    const nav = (
      <div
        className={classnames(classes.links, isMobile && classes.mobileLinks)}
      >
        {links.map(link =>
          <HeaderLink
            key={link.to}
            to={link.to}
            active={path === link.to}
            mobile={isMobile}
          >
            {link.title}
          </HeaderLink>
        )}
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
      <Measure
        onMeasure={dimensions => this.setState({ dimensions })}
      >
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
      </Measure>
    );
  }
}

export default style({
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
})(Header);
