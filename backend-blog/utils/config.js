require('dotenv').config();

const PORT = 3003;
const MONGODB_URI='mongodb+srv://mateuszkuruc:defenestracja12@cluster0.xuvl4j3.mongodb.net/blogApp?retryWrites=true&w=majority';

module.exports = {
    MONGODB_URI,
    PORT
}
