let accessToken = null;
let refreshToken = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        console.error('Username and password are required.');
        return;
    }

    fetch('http://localhost:9006/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        accessToken = data.accessToken;
        refreshToken = data.refreshToken;
        showAuthenticatedContent();
    })
    .catch(error => console.error('Login error:', error));
}

function logout() {
    fetch('http://localhost:9006/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
    })
    .then(response => response.text())
    .then(data => {
        accessToken = null;
        refreshToken = null;
        hideAuthenticatedContent();
        console.log('Logout:', data);
    })
    .catch(error => console.error('Logout error:', error));
}

function showAuthenticatedContent() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('info').style.display = 'none';
    document.getElementById('authenticated-container').style.display = 'block';
    document.getElementById('usrLogged').style.display = 'block';
}

function hideAuthenticatedContent() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('register-container').style.display = 'block';
    document.getElementById('info').style.display = 'block';
    document.getElementById('usrLogged').style.display = 'none';
    document.getElementById('authenticated-container').style.display = 'none'; 
}

function loadPlanetPage(planetName) {
    document.getElementById('user-profile').style.display = 'none'; 
    document.getElementById('planet-info-container').style.display = 'block';
    if (planetName) {
        planetName = planetName.toLowerCase();
        fetch(`http://localhost:9006/planety/${planetName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.text(); 
            } else if (response.status === 403) {
                console.log('Access forbidden. User does not have permission to view this planet.');
            } else if (response.status === 404) {
                console.log('Planet not found.');
            } else {
                console.error('Error fetching planet info:', response.status);
            }
        })
        .then(data => {
            if (data) {
                document.getElementById('planet-info-container').innerHTML = data;
            }
        })
        .catch(error => console.error('Error fetching planet info:', error));
    } else {
        console.error('Planet name is undefined.');
    }
}

function fetchPlanetInfo(planetName) {
    const planetInfoContainer = document.getElementById('planet-info-container');
    if (!planetInfoContainer) {
        console.error('Planet info container not found.');
        return;
    }

    loadPlanetPage(planetName);
}

const planetButtons = document.querySelectorAll('#authenticated-container nav button');
planetButtons.forEach(button => {
    button.addEventListener('click', () => {
        const planetName = button.dataset.planet;
        fetchPlanetInfo(planetName);
    });
});

function register() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const favoritePlanet = document.getElementById('favorite-planet').value;
  
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const animationSpeed = 1;
    const animationSize = 1;
  
    fetch('http://localhost:9006/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        password: newPassword,
        favoritePlanet,
        animationSpeed,
        animationSize,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        alert('Registration successful');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Registration failed');
      });
  }
  
  
  function userInfo() {
    fetch('http://localhost:9006/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            throw new Error('Invalid response content type. Expected JSON.');
        }
    })
    .then(data => {
        document.getElementById('usernameSpan').textContent = data.username;
        document.getElementById('favoritePlanetSpan').textContent = data.favoritePlanet;
        document.getElementById('animationSpeedSpan').textContent = data.animationSpeed;
        document.getElementById('animationSizeSpan').textContent = data.animationSize;

        document.getElementById('user-profile').style.display = 'block';
        document.getElementById('planet-info-container').style.display = 'none';

        console.log('User Info:', data);
    })
    .catch(error => {
        console.error('Error fetching user info:', error);

        if (error.response) {
            console.log('Response status:', error.response.status);
            return error.response.text();
        }
    })
    .then(htmlResponse => {
        if (htmlResponse) {
            console.log('HTML Response:', htmlResponse);
        }
    });
}



