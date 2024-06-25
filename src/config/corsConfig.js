const app = require("..");
const cors = require('cors');

module.exports = cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://sway-react.vercel.app",
    ],
})