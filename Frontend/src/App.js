import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HeroList from './components/HeroList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <HeroList></HeroList>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
