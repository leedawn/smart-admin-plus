// import VirtualList from './test';

// const App = () => {
//   const items = Array.from({ length: 1000 }, (_, index) => `Item ${index}`);

//   return (
//     <div style={{ width: '200px', height: '400px', background: 'red' }}>
//       <h1 style={{ height: '100px', margin: 0 }}>Virtual List Example</h1>
//       <VirtualList items={items} itemHeight={30} visibleItems={10} />
//     </div>
//   );
// };

// export default App;

function VirtualList({}) {}

export default function App() {
  const items = new Array(3000).fill(0).map((_, index) => index);
  return (
    <>
      <div>title</div>
      <div style={{ height: '300px', overflowY: 'auto' }}>
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
}
