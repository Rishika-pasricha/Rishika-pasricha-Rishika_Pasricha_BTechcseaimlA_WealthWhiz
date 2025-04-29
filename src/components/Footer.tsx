
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-finance-primary text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">WealthWhiz</h3>
            <p className="text-sm">
              Empowering you to achieve financial independence through smart planning, 
              data-driven insights, and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm hover:text-finance-accent">Home</a></li>
              <li><a href="/calculator" className="text-sm hover:text-finance-accent">Calculator</a></li>
              <li><a href="/education" className="text-sm hover:text-finance-accent">Resources</a></li>
              <li><a href="#" className="text-sm hover:text-finance-accent">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-finance-accent">Blog</a></li>
              <li><a href="#" className="text-sm hover:text-finance-accent">Investment Guides</a></li>
              <li><a href="#" className="text-sm hover:text-finance-accent">Retirement Planning</a></li>
              <li><a href="#" className="text-sm hover:text-finance-accent">Tax Strategies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white hover:text-finance-accent">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-finance-accent">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-finance-accent">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-finance-accent">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-sm">
              Subscribe to our newsletter for the latest financial tips and insights.
            </p>
          </div>
        </div>
        
        <div className="border-t border-finance-tertiary mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} WealthWhiz. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-finance-accent mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-finance-accent mr-4">Terms of Service</a>
            <a href="#" className="hover:text-finance-accent">Contact Us</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
