<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Moryak Papay ⚓</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #0b1d2a;
  color: #fff;
}
header {
  padding: 15px 20px;
  background: #081620;
  text-align: center;
}
.logo { font-size: 24px; font-weight: bold; }

.hero {
  background: url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e");
  background-size: cover;
  background-position: center;
  padding: 70px 20px;
  text-align: center;
}
.hero h1 {
  font-size: 40px;
  background: rgba(0,0,0,0.6);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 12px;
}

.container {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

.card {
  background: #132f44;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 25px;
}

input, textarea, select, button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
}

button {
  background: #f4c430;
  color: #000;
  cursor: pointer;
  font-weight: bold;
}

.profile {
  display: flex;
  gap: 20px;
  align-items: center;
}
.avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #555;
}

.big {
  font-size: 26px;
  font-weight: bold;
}
.green { color: #2ecc71; }
.yellow { color: #f1c40f; }
.red { color: #e74c3c; }

footer {
  font-size: 12px;
  opacity: 0.7;
  text-align: center;
  padding: 20px;
}
.hidden { display: none; }
</style>
</head>

<body>

<header>
  <div class="logo">🚩 Моряк Папай</div>
</header>

<div class="hero">
  <h1>Моряк Папай ⚓</h1>
</div>

<div class="container">

<h2>Create profile</h2>

<div class="card">

  <select id="type" onchange="toggleFields()">
    <option value="">Profile type</option>
    <option value="worker">Seafarer / Worker</option>
    <option value="company">Company</option>
  </select>

  <input type="email" placeholder="Email (required)" required>
  <input type="tel" placeholder="Phone number (required)" required>
  <input type="file" accept="image/*" capture="camera" required>

  <!-- Worker fields -->
  <div id="workerFields" class="hidden">
    <input type="text" placeholder="Rank (free text)">
    <input type="text" placeholder="Vessel type">
    <input type="number" placeholder="Age">
    <input type="number" placeholder="Number of contracts">
  </div>

  <!-- Company fields -->
  <div id="companyFields" class="hidden">
    <input type="text" placeholder="Company name">
    <input type="text" placeholder="Company activity / fleet type">
    <input type="text" placeholder="Country">
  </div>

  <textarea placeholder="Personal wishes / description"></textarea>

  <select>
    <option>Status</option>
    <option>🟢 Ready</option>
    <option>🟡 Will be ready</option>
    <option>🔴 Not ready</option>
  </select>

  <button>Create profile</button>
</div>

<h2>Example profiles</h2>

<div class="card profile">
  <div class="avatar"></div>
  <div>
    <div class="big">Chief Engineer</div>
    <div>Container Vessel</div>
    <div>📞 +380 67 123 45 67</div>
    <div>Contracts: 11</div>
    <div class="green">🟢 Ready</div>
    <div>⭐ 4.7 (128)</div>
  </div>
</div>

<div class="card profile">
  <div class="avatar"></div>
  <div>
    <div class="big">Ocean Shipping Ltd</div>
    <div>Bulk Fleet</div>
    <div>📞 +357 99 555 222</div>
    <div class="yellow">🟡 Hiring soon</div>
    <div>⭐ 4.3 (89)</div>
  </div>
</div>

</div>

<footer>
This website is a social networking platform. The website and its creator are not responsible for user content or employment results.
</footer>

<script>
function toggleFields() {
  const type = document.getElementById('type').value;
  document.getElementById('workerFields').style.display =
    type === 'worker' ? 'block' : 'none';
  document.getElementById('companyFields').style.display =
    type === 'company' ? 'block' : 'none';
}
</script>

</body>
</html>


