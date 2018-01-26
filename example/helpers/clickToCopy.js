import React from 'react';
const ClickToCopy = ({children}) => {
  function doCopy (e) {
    e.currentTarget.focus();
    document.execCommand('copy');
  }

  return (
    <span style={{ cursor: 'pointer' }} onClick={doCopy}>{children}</span>
  )
}
export default ClickToCopy;
