import "./App.css";
import { Additem } from "./components/Additem.jsx";
import Copylist from "./components/Copylist.jsx";
import { UserProvider } from "./UserContext.jsx";

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
