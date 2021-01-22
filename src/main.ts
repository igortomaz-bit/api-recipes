import dotenv from 'dotenv';
dotenv.config();
import app from './app';
const PORT = process.env.PORT || 8081;
app.server.listen(PORT, () => { console.log(`Server running on port ${PORT}.`)});