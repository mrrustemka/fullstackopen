import React from 'react';

function Button({ name, func }) {
  function handleClick() {
    func();
  }
  return (
    <>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        {name}
      </button>
    </>
  );
}

export default Button;
