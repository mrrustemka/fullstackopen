interface ContentProps {
  name: string;
  exerciseCount: number;
}

function Content(props: ContentProps[]) {
  return (
    <>
      {props.courses.map((c) => (
        <p key={c.name}>
          {c.name} {c.exerciseCount}
        </p>
      ))}
    </>
  );
}

export default Content;
