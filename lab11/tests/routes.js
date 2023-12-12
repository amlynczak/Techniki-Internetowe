module.exports = function(app) {
    app.get('/', function(req, res) {
            // Send a plain text response
            res.send('First Express Application!');
    });
    app.get('/hello', function(req, res) {
            // Send a plain text response
            res.send('Hello World!');
    });
};