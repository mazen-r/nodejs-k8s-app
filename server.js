const app = require('./app')
const { PORT } = require('./config');

const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);        
    })
};

startServer();