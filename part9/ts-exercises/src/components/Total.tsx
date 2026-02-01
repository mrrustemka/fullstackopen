interface TotalProps {
  num: number;
}

function Total(props: TotalProps) {
  return <p>Number of exercises {props.num}</p>;
}

export default Total;
