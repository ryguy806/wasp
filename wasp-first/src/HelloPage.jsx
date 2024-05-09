export const HelloPage = (props) => {
  return <div>Hello, {props.match.params.name}!</div>;
};
