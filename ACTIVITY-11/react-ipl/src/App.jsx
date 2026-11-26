
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";

function App() {
  const [showMatches, setShowMatches] = useState(true);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("General");
  const [tickets, setTickets] = useState(1);

  // Smoothly scroll to a section
  function scrollToSection(sectionId) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Fetch matches when the page loads
  useEffect(() => {
    fetchMatches();
  }, []);

  // Scroll to booking form when a match is selected
  useEffect(() => {
    if (selectedMatch) {
      scrollToSection("booking");
    }
  }, [selectedMatch]);

  // Supabase Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("matches-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "matches"
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch matches from Supabase
  async function fetchMatches() {
    const { data, error } = await supabase
      .from("matches")
      .select("*");

    if (error) {
      console.error("Error fetching matches:", error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
  }

  // Handle ticket booking
  async function handleBooking() {
    if (!customerName || !email || !phone || !selectedMatch) {
      alert("Please fill all booking details.");
      return;
    }

    const numberOfTickets = Number(tickets);

    if (
      !Number.isInteger(numberOfTickets) ||
      numberOfTickets < 1 ||
      numberOfTickets > selectedMatch.available_seats
    ) {
      alert("Invalid number of tickets.");
      return;
    }

    // Insert booking into Supabase
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: customerName,
          email: email,
          phone: phone,
          match_id: selectedMatch.id,
          ticket_category: category,
          number_of_tickets: numberOfTickets
        }
      ]);

    if (error) {
      alert("Booking failed: " + error.message);
      return;
    }

    // Update available seats
    const { data: updatedMatch, error: updateError } = await supabase
      .from("matches")
      .update({
        available_seats:
          selectedMatch.available_seats - numberOfTickets
      })
      .eq("id", selectedMatch.id)
      .select();

    if (updateError) {
      alert("Seat update failed: " + updateError.message);
      console.error(updateError);
      return;
    }

    if (!updatedMatch || updatedMatch.length === 0) {
      alert("Booking saved, but no match row was updated.");
      return;
    }

    alert("Ticket booked successfully!");

    setSelectedMatch(null);
    setCustomerName("");
    setEmail("");
    setPhone("");
    setCategory("General");
    setTickets(1);

    await fetchMatches();
  }

  return (
    <div id="home">
      <Navbar onNavigate={scrollToSection} />

      <Hero onBookTickets={() => scrollToSection("matches")} />

      <section id="matches">
        <h2>Upcoming Matches</h2>

        <button onClick={() => setShowMatches(!showMatches)}>
          {showMatches ? "Hide Matches" : "Show Matches"}
        </button>

        {showMatches && (
          <div className="matches">
            {loading ? (
              <p>Loading matches...</p>
            ) : matches.length === 0 ? (
              <p>No matches available.</p>
            ) : (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  team1={match.team1}
                  team2={match.team2}
                  date={match.match_date}
                  venue={match.venue}
                  availableSeats={match.available_seats}
                  onBook={() => setSelectedMatch(match)}
                />
              ))
            )}
          </div>
        )}
      </section>

      <section id="booking" className="booking-form">
        {selectedMatch ? (
          <>
            <h2>Book Your Tickets</h2>

            <h3>
              {selectedMatch.team1} vs {selectedMatch.team2}
            </h3>

            <p>Match ID: {selectedMatch.id}</p>

            <p>
              Available Seats: {selectedMatch.available_seats}
            </p>

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="General">General</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>

            <input
              type="number"
              min="1"
              max={selectedMatch.available_seats}
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              placeholder="Number of Tickets"
            />

            <button onClick={handleBooking}>
              Confirm Booking
            </button>

            <button onClick={() => setSelectedMatch(null)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2>Book Your Tickets</h2>
            <p>Select a match above to start your booking.</p>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
