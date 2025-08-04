import Part from './Part';

function Content({ course }) {
  return (
    <>
      {course.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
}

export default Content;
