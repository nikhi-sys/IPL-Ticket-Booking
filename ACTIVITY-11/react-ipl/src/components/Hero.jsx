
function Hero({ onBookTickets }) {
  return (
    <section className="hero">
      <h1>Experience The Stadium Energy Live!</h1>

      <p>Book your tickets and enjoy IPL 2026.</p>

      <button onClick={onBookTickets}>
        Book Tickets
      </button>
    </section>
  );
}

export default Hero;
