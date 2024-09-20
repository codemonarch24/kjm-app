document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
 
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    
  
    const trains = [
        { number: '12345', name: 'Express Train', source: 'Delhi', destination: 'Mumbai', date: '15-09-2024' },
        { number: '67890', name: 'Superfast Train', source: 'Delhi', destination: 'Mumbai', date: '15-09-2024' }
    ];
    

    const filteredTrains = trains.filter(train => 
        train.source === source && 
        train.destination === destination && 
        train.date === date
    );
    
    const trainList = document.getElementById('train-list');
    const trainsUl = document.getElementById('trains');
    trainsUl.innerHTML = '';
    
    if (filteredTrains.length > 0) {
        filteredTrains.forEach(train => {
            const li = document.createElement('li');
            li.textContent = `Train No: ${train.number}, Train Name: ${train.name}`;
            li.addEventListener('click', () => {
                document.getElementById('booking-confirmation').classList.remove('hidden');
                document.getElementById('confirmation-message').textContent = `You have selected Train No: ${train.number}, Train Name: ${train.name}`;
            });
            trainsUl.appendChild(li);
        });
        trainList.classList.remove('hidden');
    } else {
        trainsUl.innerHTML = '<li>No trains available for the selected route.</li>';
        trainList.classList.remove('hidden');
    }
});
