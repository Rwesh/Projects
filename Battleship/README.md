🛳️ Battleship Web Game

This is a web-based implementation of the classic Battleship game, built for two players. The game includes core mechanics for ship placement, turn-based attacks, win condition detection, and score computation.

🚀 Getting Started

To run the game locally using Vite:

npm install
npm run dev
📜 Game Rules

🎯 Ship Placement
Each player begins by placing three ships:

Aircraft Carrier (A) – 5 tiles
Battleship (B) – 4 tiles
Submarine (S) – 3 tiles
Ships are placed using a string format that specifies the ship type and the range of cells it occupies.

Example Input:

A(A1-A5);B(B6-E6);S(H3-J3);
This results in:

Aircraft Carrier on A1 through A5
Battleship on B6 through E6
Submarine on H3 through J3
Valid placements must be horizontal or vertical and cannot overlap.
🔁 Game Flow
Players take turns firing at grid locations (e.g., C5, J3).
The game continues until all ships of one player have been sunk.
The opposing player is then declared the winner.
🧮 Score Calculation
Once a winner is determined, their score is computed as follows:

Score = 24 - (2 × hits received)
        - 10 points if their Aircraft Carrier was sunk
        - 8 points if their Battleship was sunk
        - 6 points if their Submarine was sunk
Example:

If Alice wins, and Bob managed to:

Sink her Submarine (3 hits)
Hit her Battleship once
Not touch her Aircraft Carrier
Alice's score:

Hits received: 3 (Submarine) + 1 (Battleship) = 4
Score = 24 - (2 × 4) - 6 (submarine sunk)
Score = 24 - 8 - 6 = 10
🛠️ Technologies Used

Vite (development server)
JavaScript/TypeScript (game logic)
HTML & CSS (UI)
✅ Run Instructions for TA

To run the game, use the following in the root directory:

npm install
npm run dev
The game should now be available at http://localhost:5173 (or the port Vite provides).

