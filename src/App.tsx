// 一次性添加所有图标
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import Upload from "./components/Upload/upload";
import Progress from "./components/Progress/progress";
library.add(fas);

function App() {
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts/1").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Upload action="1"></Upload>
      <Progress percent={30}></Progress>
    </div>
  );
}

export default App;
