import React from 'react'

function Header({ course }) {
  const head = course.name
  return (
    <>
      <h2>{head}</h2>
    </>
  )
}

export default Header
