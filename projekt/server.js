const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path'); 
const cors = require('cors');  
const fs = require('fs');
const { MongoClient } = require('mongodb');

const app = express();
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
const dbName = "name";
const dbUrl = "mongodb://name:password@sth/dbname";
var refreshTokens = [];

let db;
let users = [];

app.use(express.static(path.join(__dirname, 'public')));

const connectToDatabase = async () => {
    try {
        const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to the database');

        users = await db.collection('users').find().toArray();
        console.log('Loaded users from the database:', users);
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

connectToDatabase();

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log('Błędny token');
                return res.sendStatus(403);
            }
            console.log('Poprawny token');
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

var refreshTokens = [];

app.use(cors()); 
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send('Username or password incorrect');
    }

    const accessToken = jwt.sign({
        username: user.username,
        role: user.role,
        favoritePlanet: user.favoritePlanet,
        animationSpeed: user.animationSpeed,   
        animationSize: user.animationSize   
    }, accessTokenSecret, { expiresIn: '3m' });

    const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

    refreshTokens.push(refreshToken);

    res.json({
        accessToken,
        refreshToken
    });
});

app.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token || !refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '3m' });

        res.json({
            accessToken
        });
    });
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});

app.get('/planety/:planetName', authenticateJWT, (req, res) => {
    const userRole = req.user.role;
    const planetName = req.params.planetName.toLowerCase();
    const filePath = path.join(__dirname, 'public', 'planety', `${planetName}.html`);

    if (userRole === 'admin' || userRole === 'member'){
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(404).send('Planet not found');
            } else {
                res.send(data);
            }
        });
    } else {
        res.sendStatus(403);
    }
});

app.post('/register', async (req, res) => {
  const { username, password, favoritePlanet, animationSpeed, animationSize } = req.body;

  if (!username || !password) {
    return res.status(400).send('Missing username or password');
  }

  try {
      const existingUser = await db.collection('users').findOne({ username });
      if (existingUser) {
          return res.status(400).send('Username already exists');
      }
      const newUser = { username, password, role: 'member', favoritePlanet, animationSpeed, animationSize };
      await db.collection('users').insertOne(newUser);
      users.push(newUser);
      res.status(200).send('Registration successful');
  } catch (error) {
      console.error('Registration error:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/user', authenticateJWT, (req, res) => {
    console.log('User Data:', req.user);  // Dodaj ten log
    const { username, favoritePlanet } = req.user;
    const animationSpeed = req.user.animationSpeed;
    const animationSize = req.user.animationSize;
  
    const userData = {
      username,
      favoritePlanet,
      animationSpeed,
      animationSize,
    };
  
    res.json(userData);
  });
  


app.post('/updatePreferences', authenticateJWT, async (req, res) => {
  const { animationSpeed, animationSize } = req.body;
  const username = req.user.username;

  try {
    await db.collection('users').updateOne(
      { username },
      {
        $set: {
          animationSpeed,
          animationSize
        }
      }

    );

    const updatedUserIndex = users.findIndex(user => user.username === username);
    if (updatedUserIndex !== -1) {
      users[updatedUserIndex].animationSpeed = animationSpeed;
      users[updatedUserIndex].animationSize = animationSize;
    }

    res.status(200).send('Preferences updated successfully');
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).send('Internal Server Error');
  }
});
  

app.listen(9006, () => {
    console.log('Server started on port 9006');
});

