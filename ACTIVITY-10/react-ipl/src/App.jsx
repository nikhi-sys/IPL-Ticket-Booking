
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {
  const [showMatches, setShowMatches] = useState(true);

  const matches = [
    {
      id: 1,
      team1: "RCB",
      team2: "CSK",
      date: "25 November 2026",
      venue: "Bengaluru"
    },
    {
      id: 2,
      team1: "MI",
      team2: "KKR",
      date: "27 November 2026",
      venue: "Mumbai"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "RR",
      date: "29 November 2026",
      venue: "Hyderabad"
    }
  ];

  return (
    <div>
      <Navbar />
      <Hero />

      <section>
        <h2>Upcoming Matches</h2>

        <button onClick={() => setShowMatches(!showMatches)}>
          {showMatches ? "Hide Matches" : "Show Matches"}
        </button>

        {showMatches && (
          <div className="matches">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                date={match.date}
                venue={match.venue}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
