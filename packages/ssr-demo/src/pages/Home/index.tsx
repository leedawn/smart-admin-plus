import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import {Helmet} from 'react-helmet'

const Home = () => {
  const navigator = useNavigate();
  return (
    <Fragment>
        <Helmet>
            <title>服务端渲染</title>
            <meta name="description" content="服务端渲染" />
        </Helmet>
      <div>
        <button onClick={() => alert("hello ssr")}>test</button>
        <a href="http://127.0.0.1:3000/demo">链接跳转</a>
        <span onClick={() => navigator("/demo")}>路由跳转</span>
      </div>
    </Fragment>
  );
};

export default Home;
