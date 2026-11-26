
function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <h2>IPL 2026</h2>

      <ul>
        <li>
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}>
            Home
          </a>
        </li>

        <li>
          <a href="#matches" onClick={(e) => {
            e.preventDefault();
            onNavigate("matches");
          }}>
            Matches
          </a>
        </li>

        <li>
          <a href="#booking" onClick={(e) => {
            e.preventDefault();
            onNavigate("booking");
          }}>
            Book Ticket
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
