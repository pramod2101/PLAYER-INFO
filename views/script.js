// Function to fetch and display player details
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    const formData = new FormData(this);

    const playerDetails = {
      name: event.target.name.value,
      dateOfBirth: event.target.dateOfBirth.value,
      photoUrl: event.target.photoUrl.value,
      birthPlace: event.target.birthPlace.value,
      career: event.target.career.value,
      matches: event.target.matches.value,
      score: event.target.score.value,
      fifties: event.target.fifties.value,
      centuries: event.target.centuries.value,
      wickets: event.target.wickets.value,
      average: event.target.average.value
  };

  
    // axios.post('http://localhost:3000/', Object.fromEntries(formData))
    axios.post('http://localhost:3000/',playerDetails)
      .then(response => {
        const player = response.data.player;
        if (!player) {
          console.log('Player not created');
        } else {
            this.reset()
          console.log('Player created:', player);
          fetchAndDisplayDetails(); // Refresh player list after adding new player
        }
      })
      .catch(error => {
        console.error('Error creating player:', error);
      });
  });
  
  function fetchAndDisplayDetails() {
    axios.get('http://localhost:3000/')
      .then(result => {
        const detailsList = document.getElementById('details');
        detailsList.innerHTML = ''; // Clear existing list items
  
        result.data.players.forEach(player => {
          const newLi = document.createElement('li');
          newLi.innerHTML = `
    <div>Name: ${player.name}</div>
    <div>Date Of Birth: ${player.dateOfBirth}</div>
    <div>Birth Place: ${player.birthPlace}</div>
    <div>Career: ${player.career}</div>
    <div>Matches: ${player.matches}</div>
    <div>Score: ${player.score}</div>
    <div>Fifties: ${player.fifties}</div>
    <div>Centuries: ${player.centuries}</div>
    <div>Wickets: ${player.wickets}</div>
    <div>Average: ${player.average}</div>
`;
          // Create an image element and set its source to the photoUrl
          const playerImage = document.createElement('img');
          playerImage.src = player.photoUrl;
          playerImage.alt = player.name; // Optional, set alt text for accessibility
          
          newLi.appendChild(playerImage);

          detailsList.appendChild(newLi);
        });
      })
      .catch(err => console.log('Error fetching player details:', err));
  }

  
document.getElementById('searchButton').addEventListener('click', function () {
    const searchTerm = document.getElementById('searchPlayer').value.trim();
  
    axios.get(`http://localhost:3000/${searchTerm}`)
      .then(response => {
        const player = response.data.player;
        if (!player) {
          // Handle player not found
          console.log('Player not found');
        } else {
          // Display player details
          displayPlayer(player);
        }
      })
      .catch(error => {
        console.error('Error searching player:', error);
      });
  });
  
  function displayPlayer(player) {
    const detailsList = document.getElementById('details');
    detailsList.innerHTML = ''; // Clear previous results
  
    const listItem = document.createElement('li');
    // listItem.textContent 
   listItem.innerHTML = `
    <div>Name: ${player.name}</div>
    <div>Date Of Birth: ${player.dateOfBirth}</div>
    <div>Birth Place: ${player.birthPlace}</div>
    <div>Career: ${player.career}</div>
    <div>Matches: ${player.matches}</div>
    <div>Score: ${player.score}</div>
    <div>Fifties: ${player.fifties}</div>
    <div>Centuries: ${player.centuries}</div>
    <div>Wickets: ${player.wickets}</div>
    <div>Average: ${player.average}</div>
`;
          const playerImage = document.createElement('img');
          playerImage.src = player.photoUrl;
          playerImage.alt = player.name; // Optional, set alt text for accessibility
          
          listItem.appendChild(playerImage);
  
    detailsList.appendChild(listItem);
  }

// Event listener for page load
window.addEventListener('load', function () {
    fetchAndDisplayDetails();
});
