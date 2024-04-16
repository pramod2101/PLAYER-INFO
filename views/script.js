// Function to fetch and display player details
function fetchAndDisplayDetails() {
    axios.get('http://localhost:3000/players') // Assuming this endpoint retrieves player details from the server
        .then(result => {
            const detailsList = document.getElementById('details');
            detailsList.innerHTML = ''; // Clear existing list items
            
            result.data.forEach(player => {
                const newLi = document.createElement('li');
                newLi.textContent = `${player.name}, ${player.dateOfBirth}, ${player.birthPlace}, ${player.career}, ${player.matches}, ${player.score}, ${player.fifties}, ${player.centuries}, ${player.wickets}, ${player.average}`;
                
                const editBtn = document.createElement('button');
                editBtn.setAttribute('class', 'edit-btn');
                editBtn.textContent = 'Edit info';
                editBtn.setAttribute('data-id', player.id); // Set data-id attribute for identifying the player to edit
                
                newLi.appendChild(editBtn);
                detailsList.appendChild(newLi);
            });
        })
        .catch(err => console.error('Error fetching player details:', err));
}

// Event listener for page load
window.addEventListener('load', function () {
    fetchAndDisplayDetails(); // Fetch and display player details when the page loads
});

// Event listener for form submission
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
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
        average: event.target.average.value,
    };

    axios.post('http://localhost:3000/players', playerDetails)
    .then(result => {
        console.log('Player added:', result.data);
        fetchAndDisplayDetails(); // Fetch and display updated player details after adding
        document.getElementById('form').reset(); // Reset the form
    })
    .catch(err => console.error('Error adding player:', err));
});

// Event listener for edit buttons
document.getElementById('details').addEventListener('click', function (event) {
     if (event.target.classList.contains('edit-btn')) {
        event.preventDefault(); // Prevent default button behavior
        
        const playerId = event.target.getAttribute('data-id');
        const parentLi = event.target.parentElement;
        
        // Create input fields for editing
        const editForm = document.createElement('form');
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.value = parentLi.textContent.split(',')[0].trim(); // Extracting and trimming name from the list item
        
        // Create input fields for other player details (dateOfBirth, birthPlace, career, matches, score, fifties, centuries, wickets, average)
        // Add these input fields to the editForm
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Save Changes';
        
        editForm.appendChild(nameInput);
        // Append other input fields to the editForm
        
        editForm.appendChild(submitBtn);
        
        // Replace the list item with the edit form
        parentLi.innerHTML = '';
        parentLi.appendChild(editForm);
        
        // Event listener for form submission (edit)
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const updatedPlayerDetails = {
                name: nameInput.value,
                // Add other updated player details here
            };
            
            axios.put(`http://localhost:3000/players/${playerId}`, updatedPlayerDetails)
                .then(result => {
                    console.log('Player updated:', result.data);
                    fetchAndDisplayDetails(); // Fetch and display updated player details after edit
                })
                .catch(err => console.error('Error updating player:', err));
        });
    }
});
