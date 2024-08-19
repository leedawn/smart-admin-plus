import UseUpdate from '.';

const UseUpdateDemo = () => {
  const update = UseUpdate();
  return (
    <>
      <div>{Date.now()}</div>
      <button onClick={update}>update</button>
    </>
  );
};

export default UseUpdateDemo;
