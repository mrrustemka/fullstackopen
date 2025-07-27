import React from 'react';

function Header({ course }) {
  const head = course.name;
  return (
    <>
      <h1>{head}</h1>
    </>
  );
}

export default Header;
