import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#1c1a17]">
      <Sidebar />
      <div className="ml-64 w-full relative">
        {/* Top right menu icon placeholder */}
        <div className="absolute top-6 right-8 z-50 flex items-center gap-2 cursor-pointer font-['Oswald'] tracking-widest text-[#c69f69] hover:text-white transition-colors">
          <span>MENU</span>
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
