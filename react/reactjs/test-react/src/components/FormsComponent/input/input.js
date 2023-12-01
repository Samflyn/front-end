import React from 'react';

import classes from './input.module.css';

const input = (props) => {
  let inputEl = null;
  switch (props.elementtype) {
    case 'input':
      inputEl = (
        <input
          className={classes['InputElement']}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputEl = (
        <textarea
          className={classes['InputElement']}
          {...props.elementconfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputEl = (
        <select
          className={classes['InputElement']}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementconfig.options.map((option) => {
            return (
              <option value={option.value} key={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes['InputElement']}
          {...props.elementconfig}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={classes['Input']}>
      <label className={classes['Label']}>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default input;
