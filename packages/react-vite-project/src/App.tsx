import { Header } from './components/header';
import { Qrcode } from './components/qrcode';
import Task from './components/task';
import Page from './components/page';

function App() {
  console.log();

  return (
    <div>
      {location.pathname.includes('task') ? (
        <>
          <Task />
          <Page />
        </>
      ) : (
        <div>
          <Header></Header>
          <Qrcode />
        </div>
      )}
    </div>
  );
}

export default App;
