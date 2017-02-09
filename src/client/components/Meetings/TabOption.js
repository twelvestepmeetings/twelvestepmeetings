import React from 'react';
import style from 'lib/style';

const stylesheet = {

};


const TabOption = (props) => {
  return (
    <div>
      <a style={props.style} onClick={props.onClick}>
        {props.day}
      </a>
    </div>
  )
};

export default style(stylesheet)(TabOption);
