import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';

/* Call horizontal Select */

/*
   - hasBorder
   - options
   - onClick

change existing header instance

 */

export default function HorizontalSelect(props) {
  const options = _.map(props.options, function (option, ind) {
    let content;
    const headerClick = function () {
      props.onClick(option.value);
    };

    if (option.faClass) {
      content = <i className={classnames('icon', 'fa', option.faClass)} aria-hidden="true" />;
    } else if (option.src) {
      content = <img src={option.src} className="img" />;
    } else {
      content = (
        <span
            className="f6">
          {option.text}
        </span>
      );
    }

    return (
      <div
          className={classnames('tc pv2 ph2 h-100 c-pointer fl', {
              highlighted: option.value === props.activePanel,
            })}
          style={{ width: (100 / props.options.length) + '%' }}
          onMouseUp={headerClick}
          key={ind}
      >
        {content}
      </div>
    );
  });

  return (
    <div
      className={classnames('cf horizontal-select', {
        border: props.hasBorder,
      }, props.className)}
    >
      {options}
    </div>
  );
}
