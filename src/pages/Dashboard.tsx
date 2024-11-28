import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const Dashboard = () => {
  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;