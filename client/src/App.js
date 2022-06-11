import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import RecipeDetail from './components/RecipeDetail/RecipeDetail'


function App() {
  return (
    <div className="App">
   <Routes>
   <Route exact path='/' element={<LandingPage/>}/>
   <Route path='/home' element={<Home/>}/> 
   <Route path='/recipe/create' element={<RecipeCreate/>}/> 
   <Route path='/recipe/detail/:id' element={<RecipeDetail/>}/> 
  </Routes>
    </div>
  );
}

export default App;


