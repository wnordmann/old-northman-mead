import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* 1. Backdrop Overlay for Mobile / Focus mode */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
        />
      )}

      {/* 2. Main Collapsible Sidebar Panel */}
      <div 
        className={`w-64 h-screen fixed left-0 top-0 bg-[#161412] text-[#c69f69] border-r border-[#c69f69]/30 flex flex-col justify-between py-8 px-6 font-['Oswald'] tracking-wider z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header area with Logo and Explicit Close (X / Left Arrow) button */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c69f69]/20">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={`${import.meta.env.BASE_URL}assets/home_logo.png`} 
                alt="Old Northmen's Mead Logo" 
                className="w-12 object-contain brightness-150 contrast-125" 
              />
              <h1 className="text-sm font-bold leading-tight text-[#e6dfcc]">OLD<br/>NORTHMEN'S<br/>MEAD</h1>
            </Link>

            {/* Close X / Arrow Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 rounded-full border border-[#c69f69]/50 flex items-center justify-center text-[#c69f69] hover:bg-[#c69f69] hover:text-[#161412] transition-all"
              title="Close Navigation Menu"
            >
              <span className="text-lg font-bold">✕</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>🏰</span> THE HALL
            </Link>
            
            <div className="group relative">
              <span className="cursor-pointer hover:text-white transition-colors duration-300 flex items-center gap-2">
                <span>🍷</span> THE FIVE PROFILES
              </span>
              <div className="pl-6 mt-2 space-y-2 text-sm text-[#d8cfaa]">
                <Link to="/profile/apple-spiced" className="block hover:text-[#c69f69] transition-colors">Apple Spiced</Link>
                <Link to="/profile/herbal" className="block hover:text-[#c69f69] transition-colors">Herbal</Link>
                <Link to="/profile/holiday-spiced" className="block hover:text-[#c69f69] transition-colors">Holiday Spiced</Link>
                <Link to="/profile/oak-n-orange" className="block hover:text-[#c69f69] transition-colors">Oak-N-Orange</Link>
                <Link to="/profile/odrerir" className="block hover:text-[#c69f69] transition-colors">Óðrerir</Link>
              </div>
            </div>

            <Link to="/craft" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>⚒️</span> THE CRAFT
            </Link>
            <Link to="/#fellowship" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>⚔️</span> FELLOWSHIP
            </Link>
            <Link to="/#credo" className="hover:text-white transition-colors duration-300 flex items-center gap-2">
              <span>🛡️</span> THE FOUNDER'S CREDO
            </Link>
          </nav>
        </div>

        {/* Footer Area */}
        <div>
          <div className="flex justify-center space-x-3 mb-4">
            <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
              <span className="text-xs">ig</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
              <span className="text-xs">fb</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
              <span className="text-xs">yt</span>
            </a>
          </div>
          <div className="text-center text-[10px] text-[#c69f69]/60 font-['Inter'] tracking-wider uppercase">
            <p>© OLD NORTHMEN'S MEAD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
