interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

function Content(props: CoursePart) {
  return (
    <>
      {props.courses.map((c) => (
        <div key={c.name}>
          <div>{'Name: ' + c.name}</div>
          <div>
            <h4>{'Exercise Count: ' + c.exerciseCount}</h4>
          </div>
          <div>{'Description: ' + c.description}</div>
          {c.groupProjectCount ? (
            <div>{'Group: ' + c.groupProjectCount}</div>
          ) : (
            <></>
          )}
          {c.backgroundMaterial ? (
            <div>{'Link: ' + c.backgroundMaterial}</div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
}

export default Content;
