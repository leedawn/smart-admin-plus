import './index.scss';
import reactSrc from '@assets/react.svg';
import { ReactComponent as ReactSvg } from '@assets/react.svg';
import { version } from '../../../package.json';
import Worker from './webWorkerExample.js?worker';


export function Header() {
  const worker = new Worker();
  window.addEventListener('message', (e) => {
    console.log(e);
  });
  return (
    <div>
      <p className="header">header</p>
      <p className="bg-red-400 text-blue-600">hello</p>
      <p className="underline text-red-400">hi</p>
      <img src={reactSrc} />
      <ReactSvg />
      <p>package.json version is {version}</p>
    </div>
  );
}
