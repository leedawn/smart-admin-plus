import axios from "axios";
import { FC, useEffect, useState } from "react";
const demo: FC = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .post("/api/getDemoData", {
        content: "这是一个DOMO页面",
      })
      .then((res) => setContent(res.data.data.content));
  }, []);
  return <div>{content}</div>;
};
export default demo;
