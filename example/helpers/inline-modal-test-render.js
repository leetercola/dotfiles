import React, { Component } from 'react';

function InlineModal({ children, ...props }) {
  return (
    <div className="modal modal-inline" tabIndex="-1" role="dialog" {...props}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" role="document">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InlineModal;
