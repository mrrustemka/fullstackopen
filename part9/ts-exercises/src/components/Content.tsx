import type { CoursePart } from '../types';

function Content(props: { courses: CoursePart[] }) {
  return (
    <>
      {props.courses.map((c) => (
        <div key={c.name}>
          <div>{'Name: ' + c.name}</div>
          <div>
            <h4>{'Exercise Count: ' + c.exerciseCount}</h4>
          </div>
          {(() => {
            switch (c.kind) {
              case 'basic':
                return <>{'Description: ' + c.description}</>;

              case 'group':
                return <>{'Group: ' + c.groupProjectCount}</>;

              case 'background':
                return (
                  <>
                    <div>{'Description: ' + c.description}</div>
                    <div>{'Links: ' + c.backgroundMaterial}</div>
                  </>
                );

              case 'special':
                return (
                  <>
                    <div>{'Description: ' + c.description}</div>
                    <div>{'Requirments: ' + c.requirements.join(', ')}</div>
                  </>
                );

              default:
                return null;
            }
          })()}
        </div>
      ))}
    </>
  );
}

export default Content;

{
  /* 
          {c.groupProjectCount ? (
            <div>{'Group: ' + c.groupProjectCount}</div>
          ) : (
            <></>
          )}
          {c.backgroundMaterial ? (
            <div>{'Link: ' + c.backgroundMaterial}</div>
          ) : (
            <></>
          )} */
}
