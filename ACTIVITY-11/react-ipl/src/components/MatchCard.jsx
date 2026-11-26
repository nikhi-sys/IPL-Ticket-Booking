
function MatchCard({
  team1,
  team2,
  date,
  venue,
  availableSeats,
  onBook
}) {
  return (
    <div className="match-card">
      <h3>{team1} vs {team2}</h3>

      <p>Date: {date}</p>

      <p>Venue: {venue}</p>

      <p>Available Seats: {availableSeats}</p>

      <button onClick={onBook}>
        Book Ticket
      </button>
    </div>
  );
}

export default MatchCard;
