# blooddonation1
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blood Donation Locator</title>

<!-- Leaflet (OpenStreetMap) -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>

<style>
  * {margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif;}
  body {background-color: #fff; color: #333;}
  header {background-color: #d32f2f; color: white; padding: 15px; text-align: center; font-size: 1.5em;}
  nav {background: #fff; display: flex; justify-content: center; gap: 20px; padding: 10px;}
  nav button {background: #d32f2f; color: white; border: none; padding: 8px 18px; border-radius: 5px; cursor: pointer;}
  nav button:hover {background: #b71c1c;}

  section {display: none; padding: 30px; text-align: center;}
  #homeSection {display: block;}
  h1 {color: #d32f2f;}
  .btn {background: #d32f2f; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;}
  .btn:hover {background: #b71c1c;}

  /* Login/Register Forms */
  .form-container {max-width: 350px; margin: 30px auto; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;}
  input {width: 90%; padding: 10px; margin: 10px; border: 1px solid #ccc; border-radius: 5px;}
  #toggleForm {color: #d32f2f; cursor: pointer; text-decoration: underline;}
  #map {height: 400px; width: 100%; border-radius: 10px; margin-top: 15px;}

  footer {background: #d32f2f; color: white; text-align: center; padding: 10px; margin-top: 20px;}
</style>
</head>

<body>
  <header>🩸 Blood Donation & Emergency Locator</header>

  <nav>
    <button onclick="showSection('homeSection')">Home</button>
    <button onclick="showSection('loginSection')">Login</button>
    <button onclick="showSection('dashboardSection')">Dashboard</button>
  </nav>

  <!-- Home -->
  <section id="homeSection">
    <h1>Welcome to the Blood Donation Locator</h1>
    <p>Find and connect with nearby blood donors instantly. Save lives by joining our community today.</p>
    <button class="btn" onclick="showSection('loginSection')">Get Started</button>
    <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" width="180" style="margin-top:20px;">
  </section>

  <!-- Login/Register -->
  <section id="loginSection">
    <div class="form-container">
      <h2 id="formTitle">Login</h2>
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
      <button class="btn" onclick="login()">Login</button>
      <p id="toggleText">Don’t have an account? <span id="toggleForm" onclick="toggleForm()">Register</span></p>
    </div>
  </section>

  <!-- Dashboard -->
  <section id="dashboardSection">
    <h2>Welcome to Your Dashboard</h2>
    <p>Use the map below to find nearby donors or mark your location as available.</p>
    <button class="btn" onclick="loadMap()">Find Donors</button>
    <div id="map"></div>
  </section>

  <footer>© 2025 Blood Donation Locator | Made with ❤️ for Humanity</footer>

  <script>
    function showSection(id) {
      document.querySelectorAll("section").forEach(sec => sec.style.display = "none");
      document.getElementById(id).style.display = "block";
    }

    // Toggle Login/Register
    let isLogin = true;
    function toggleForm() {
      const title = document.getElementById("formTitle");
      const toggleText = document.getElementById("toggleText");
      isLogin = !isLogin;
      if (isLogin) {
        title.textContent = "Login";
        toggleText.innerHTML = "Don’t have an account? <span id='toggleForm' onclick='toggleForm()'>Register</span>";
      } else {
        title.textContent = "Register";
        toggleText.innerHTML = "Already have an account? <span id='toggleForm' onclick='toggleForm()'>Login</span>";
      }
    }

    // Dummy login (just for UI)
    function login() {
      alert("Login successful (demo only)");
      showSection('dashboardSection');
    }

    // Initialize OpenStreetMap
    function loadMap() {
      var mapDiv = document.getElementById("map");
      if (mapDiv.innerHTML.trim() !== "") return; // prevent reloading map
      var map = L.map('map').setView([26.8467, 80.9462], 12); // Lucknow
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Example donors
      var donors = [
        { name: "Ravi (A+)", lat: 26.8467, lng: 80.9462 },
        { name: "Ananya (O-)", lat: 26.85, lng: 80.95 },
        { name: "Priya (B+)", lat: 26.84, lng: 80.93 },
        { name: "Rahul (AB+)", lat: 26.83, lng: 80.91 }
      ];
      donors.forEach(d => {
        L.marker([d.lat, d.lng])
          .addTo(map)
          .bindPopup(`<b>${d.name}</b><br>Available for donation`);
      });
    }
  </script>
</body>
</html>
