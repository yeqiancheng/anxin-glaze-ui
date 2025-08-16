import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { children: [_jsx(Upload, { action: "1" }), _jsx(Progress, { percent: 30 })] }));
}
export default App;
