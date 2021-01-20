import dotenv from 'dotenv';
dotenv.config();
import app from './app';
const PORT = process.env.PORT;
app.server.listen(PORT, () => { console.log(`Server running on port ${PORT}.`)});