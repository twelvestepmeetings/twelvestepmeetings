// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import atyle from 'lib/style';
import classnames from 'classnames';

type Props = {
  active: boolean,
  mobile: boolean,
  children: any,
  classes: Object,
  to: string
};

function HeaderLink({
  active,
  mobile,
  children,
  classes,
  to
}: Props) {

  return (
    <Link
      className={classnames(
        classes.link,
        active && classes.activeLink,
        mobile && classes.mobileLink
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

export default atyle({
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
  mobileLink: {
    fontSize: '20px',
    margin: '20px 0'
  }
})(HeaderLink);
