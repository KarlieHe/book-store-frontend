import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-auto px-4 py-8 bg-secondary text-white">
      <div className="flex flex-col md:flex-row items-start justify-between max-w-screen-2xl mx-auto gap-y-12 gap-x-8">
        
        <div className="md:w-1/3">
          <h2 className="text-xl md:text-3xl font-primary font-regular">Bookstore</h2>
          <p className="text-sm md:text-lg font-primary font-regular mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </p>
        </div>

        <div className="text-sm md:text-lg font-secondary">
          <h3 className="whitespace-nowrap">Book categories</h3>
          <ul className="space-y-4 mt-6">
            <li className="underline whitespace-nowrap"><Link to="/books/fiction">Fiction</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/books/business">Business</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/books/horror">Horror</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/books/adventure">Adventure</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/books">All</Link></li>
          </ul>
        </div>

        <div className="text-sm md:text-lg font-secondary">
          <h3 className="whitespace-nowrap">Customer Service</h3>
          <ul className="space-y-4 mt-6">
            <li className="underline whitespace-nowrap"><Link to="/">FAQs</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/">Contact Us</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/">Delivery and Click & Collect</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/">Returns & Exchanges</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/">Track My Order</Link></li>
            <li className="underline whitespace-nowrap"><Link to="/">About Us</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-screen-2xl mx-auto pt-6 text-start md:text-center text-xs font-secondary">
          <p>&copy; 2025 Kir’s Bookstore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
