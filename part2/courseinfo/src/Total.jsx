import React from 'react';

function Total({ course }) {
  const total = course.parts.reduce((acc, cur) => {
    return acc + cur.exercises;
  }, 0);
  return (
    <>
      <h4>total of {total} exercises</h4>
    </>
  );
}

export default Total;
