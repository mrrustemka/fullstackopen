import React from 'react';

function Total({ course }) {
  const total = course.parts.reduce((acc, cur) => {
    return acc + cur.exercises;
  }, 0);
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
}

export default Total;
