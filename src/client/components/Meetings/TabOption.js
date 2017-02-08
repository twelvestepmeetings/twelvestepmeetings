/**
 * Created by colinjohnson on 1/31/17.
 */
import React from 'react';
import reactCSS from 'reactcss';

export const TabOption = (props) => {
 return(
  <div>
    <a style={props.style} onClick={props.onClick}>
      {props.day}
    </a>
  </div>
 )
};