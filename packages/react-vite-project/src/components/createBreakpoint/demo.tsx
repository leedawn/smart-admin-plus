import CreateBreakpoint from '.';

const CreateBreakpointDemo = () => {
  const options = { large: 1200, big: 700, small: 300 };
  const GetBreakpoint = CreateBreakpoint(options);
  return <div>{GetBreakpoint()}</div>;
};

export default CreateBreakpointDemo;
