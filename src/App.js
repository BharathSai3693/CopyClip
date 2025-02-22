import "./App.css";
import { Additem } from "./components/Additem.js";
import Copylist from "./components/Copylist.js";
import { UserProvider } from "./UserContext.js";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <h1 className="text-4xl font-bold text-blue-600 p-3">CopyCLIP</h1>
        <div className="flex flex-col  min-h-screen min-v-screen">
          <Additem />
          
          <hr className="my-2"></hr>
          <Copylist />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
