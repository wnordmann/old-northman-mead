import { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-[#1c1a17]">
      {/* Sidebar with state controls */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area (Expands to 100% width when sidebar is collapsed) */}
      <div className={`w-full relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-0 lg:ml-64' : 'ml-0'}`}>
        
        {/* Floating Toggle Button when Sidebar is Collapsed / Hidden */}
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-6 left-6 z-40 bg-[#161412] text-[#c69f69] border-2 border-[#c69f69] px-4 py-2 rounded-xl shadow-2xl font-['Oswald'] tracking-widest text-sm uppercase flex items-center gap-2 hover:bg-[#c69f69] hover:text-[#161412] transition-all"
            title="Open Navigation Menu"
          >
            <span>▶</span>
            <span>MENU</span>
          </button>
        )}

        {/* Top Right Menu Icon */}
        <div 
          onClick={toggleSidebar}
          className="absolute top-6 right-8 z-40 flex items-center gap-3 cursor-pointer font-['Oswald'] tracking-widest text-[#c69f69] hover:text-white transition-colors bg-[#161412]/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#c69f69]/30"
        >
          <span>{isSidebarOpen ? 'CLOSE MENU' : 'MENU'}</span>
          <div className="w-6 h-4 flex flex-col justify-between">
            <div className="w-full h-0.5 bg-current"></div>
            <div className="w-full h-0.5 bg-current"></div>
            <div className="w-full h-0.5 bg-current"></div>
          </div>
        </div>
        
        <main className="w-full">
          {children}
        </main>
        
        {/* Footer Area */}
        <footer className="h-16 border-t border-[#c69f69]/30 flex items-center justify-between px-12 text-[#c69f69] text-sm font-['Oswald'] bg-[#d8cfaa]">
           <div className="flex items-center space-x-12 mx-auto max-w-7xl w-full justify-end">
              <a href="#" className="hover:text-black">CONTACT</a>
              <a href="#" className="hover:text-black">PRIVACY</a>
              <a href="#" className="hover:text-black">TERMS</a>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
