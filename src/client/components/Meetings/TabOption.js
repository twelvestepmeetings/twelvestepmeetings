import React from 'react';
import reactCSS from 'reactcss';

const stylesheet = {
  'default': {
    container: {

    }
  }
};
const styles = reactCSS(stylesheet);

export const TabOption = (props) => {
  return (
    <div style={styles.container}>
      <a style={props.style} onClick={props.onClick}>
        {props.day}
      </a>
    </div>
  )
};
