import Server from "react-dom/server";

const res = () => <h1>hello,jsx</h1>;
console.log(Server.renderToString(<res />));
