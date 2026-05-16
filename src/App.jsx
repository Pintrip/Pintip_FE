import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Landing from './pages/Landing';
import Place_QuestSelect from './pages/Place_QuestSelect';
import SectionCreate from './pages/SectionCreate';
import Record from './pages/Progress_Record';
import Review from './pages/Review';
import Mission from './pages/Mission';

const router = createBrowserRouter([
    {
        path: '/',
        Component: Landing,
    },
    {
        path: '/place-quest-select',
        Component: Place_QuestSelect,
    },
    {
        path: '/sectioncreate',
        Component: SectionCreate,
    },
    {
        path: '/record',
        Component: Record,
    },
    {
        path: '/review',
        Component: Review,
    },
    {
        path: '/finish',
        Component: () => <div>Finish 페이지 준비 중</div>,
    },
    {
        path: '/mission',
        Component: Mission,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
