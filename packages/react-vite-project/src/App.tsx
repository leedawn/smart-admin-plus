import { Header } from './components/header';
import { Qrcode } from './components/qrcode';
import Task from './components/task';
import Page from './components/page';
import { NavigationBar } from './router';
import { Outlet } from 'react-router-dom';

function App() {
  console.log();

  return (
    <div>
      <nav className="bar">
        <NavigationBar />
      </nav>
      {
        location.pathname.includes('task') && (
          <>
            <Task />
            <Page />
          </>
        )

        // <div>
        //   <Header></Header>
        //   <Qrcode />
        // </div>
      }
      <Outlet />
    </div>
  );
}

export default App;
