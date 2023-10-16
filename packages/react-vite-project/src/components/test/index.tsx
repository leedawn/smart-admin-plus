import { useLocation, useNavigate } from 'react-router-dom';

export default function Test() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/event-listener')}>go home</button>
    </>
  );
}
