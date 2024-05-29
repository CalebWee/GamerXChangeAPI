const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.js');
const swaggerFile = require('./swagger-output.json');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
mongoose.connect('mongodb://localhost:27017/GamerXChange', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));