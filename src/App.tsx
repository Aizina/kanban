import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KanbanBoard } from './pages/KanbanBoard';
import { TaskPage } from './pages/TaskPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<KanbanBoard />} /> 
        <Route path="/tasks/:id" element={<TaskPage />} />  {/* Маршрут для страницы задачи */}
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;