import express from "express";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.resolve();
const app = express();

// 🔹 1. Stelle sicher, dass der Daten-Ordner existiert
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("📁 Ordner 'data' wurde erstellt.");
}

// 🔹 2. Datenbankverbindung aufbauen
const dbPath = path.join(dataDir, "voice_agent.db");
const db = new Database(dbPath);
console.log("✅ Datenbank verbunden:", dbPath);

// 🔹 3. Express-Setup
app.use(express.json());

// 🔹 4. Beispiel-Endpoint: Render braucht eine Antwort auf "/"
app.get("/", (req, res) => {
  res.status(200).send({
    status: "Voice Agent läuft ✅",
    message: "Dein deutscher Restaurant-Voice-Agent ist online.",
  });
});

// 🔹 5. Beispiel-API-Endpunkt (optional)
app.post("/api/voice", (req, res) => {
  const { text } = req.body;
  // Hier könnte deine Sprachverarbeitung oder GPT-Antwort stehen
  res.json({ reply: `AI-Antwort zu: "${text}"` });
});

// 🔹 6. Starte Server mit Render-kompatiblem Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Voice Agent läuft auf Port ${PORT}`);
});
