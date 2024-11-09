import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KanbanBoard } from './pages/KanbanBoard';
import { TaskPage } from './pages/TaskPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
// import { deleteTasks } from './store/taskSlice';
// import { useAppDispatch } from './store/hooks';

function App() {
//  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
    <div className='bodyWrapper'>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<KanbanBoard />} /> 
          <Route path="/tasks/:id" element={<TaskPage />} /> 
        </Routes>
      </main>
        {/* <button onClick={() => {
          console.log("Clearing localStorage...");
          dispatch(deleteTasks());
        }}>Clear</button> */}
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
