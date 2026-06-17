export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-tertiary mt-12">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">About</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Community</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Community Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-accent mb-4">Legal</h3>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li><a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-tertiary pt-8 text-center text-text-secondary text-sm">
          <p>&copy; 2024 YouTube Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
