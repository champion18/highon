import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import SelectSource from './pages/SelectSource/SelectSource';
import Description from './pages/Description/Description';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/selectSource" element={<SelectSource/>}/>
        <Route path="/addDescription" element={<Description/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
