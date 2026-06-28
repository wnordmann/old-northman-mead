import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-[#161412] text-[#c69f69] border-r border-[#c69f69]/30 flex flex-col justify-between py-10 px-6 font-['Oswald'] tracking-wider z-50">
      <div>
        <div className="flex flex-col items-center mb-12">
          {/* Using the extracted logo slice */}
          <Link to="/">
             <img src="/assets/home_logo.png" alt="Old Northmen's Mead Logo" className="w-24 mb-4 object-contain brightness-150 contrast-125" />
          </Link>
          <h1 className="text-center text-xl font-bold leading-tight">OLD<br/>NORTHMEN'S<br/>MEAD</h1>
        </div>

        <nav className="flex flex-col space-y-4">
          <Link to="/" className="hover:text-white transition-colors duration-300">THE HALL</Link>
          <div className="group relative">
            <span className="cursor-pointer hover:text-white transition-colors duration-300">THE FIVE PROFILES</span>
            <div className="pl-4 mt-2 space-y-2 text-sm text-[#d8cfaa] hidden group-hover:block">
              <Link to="/profile/apple-spiced" className="block hover:text-[#c69f69]">Apple Spiced</Link>
              <Link to="/profile/herbal" className="block hover:text-[#c69f69]">Herbal</Link>
              <Link to="/profile/holiday-spiced" className="block hover:text-[#c69f69]">Holiday Spiced</Link>
              <Link to="/profile/oak-n-orange" className="block hover:text-[#c69f69]">Oak-N-Orange</Link>
              <Link to="/profile/odrerir" className="block hover:text-[#c69f69]">Odrerir</Link>
            </div>
          </div>
          <Link to="/craft" className="hover:text-white transition-colors duration-300">THE CRAFT</Link>
          <Link to="#" className="hover:text-white transition-colors duration-300">THE CHRONICLE</Link>
          <Link to="#" className="hover:text-white transition-colors duration-300">FELLOWSHIP</Link>
          <Link to="#" className="hover:text-white transition-colors duration-300">TRADE & DISTRIBUTION</Link>
          <Link to="#" className="hover:text-white transition-colors duration-300">THE FOUNDER'S CREDO</Link>
        </nav>
      </div>

      <div>
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
            <span className="text-sm">ig</span>
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
            <span className="text-sm">fb</span>
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-[#c69f69] flex items-center justify-center hover:bg-[#c69f69] hover:text-[#161412] transition-colors duration-300">
            <span className="text-sm">yt</span>
          </a>
        </div>
        <div className="text-center text-xs text-[#c69f69]/60 font-['Inter']">
          <p>© OLD NORTHMEN'S MEAD</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
