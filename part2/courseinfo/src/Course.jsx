import Header from './Header';
import Content from './Content';

function Course({ course }) {
  return (
    <>
      <Header course={course} />
      <Content course={course.parts} />
    </>
  );
}

export default Course;
