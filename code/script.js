document.getElementById('train-status-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const trainNumber = document.getElementById('train-number').value.trim();
    const statusDiv = document.getElementById('train-status-result');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (!trainNumber) {
        statusDiv.innerHTML = `<p>Please enter a train number.</p>`;
        return;
    }


    loadingSpinner.classList.remove('hidden');
    statusDiv.innerHTML = '';

    
    setTimeout(() => {
        const trainStatus = getTrainStatus(trainNumber);
        
        if (trainStatus) {
            statusDiv.innerHTML = `<p>Status of Train Number ${trainNumber}: <strong>${trainStatus}</strong></p>`;
        } else {
            statusDiv.innerHTML = `<p>No information available for Train Number ${trainNumber}.</p>`;
        }

        
        loadingSpinner.classList.add('hidden');
    }, 1000); 
});

function getTrainStatus(trainNumber) {
    const statusData = {
        '12345': 'On Time',
        '67890': 'Delayed by 30 minutes',
        '54321': 'Cancelled',
        '11111': 'Arriving in 10 mins',
        '22222': 'Reached at platform No.2'
    };

    return statusData[trainNumber] || null;
}

document.addEventListener('DOMContentLoaded', function() {
    const trains = [
        { name: "Wodeyar Express", departure: "10:00 AM", arrival: "12:00 PM", ticket: "80 RS", rating: 4 },
        { name: "Local Train", departure: "01:00 PM", arrival: "03:00 PM", ticket: "40 RS", rating: 3 },
        { name: "Vandhe Bharath Express", departure: "04:00 PM", arrival: "06:00 PM", ticket: "120 RS", rating: 5 },
    ];

    const trainList = document.getElementById('trains');
    if (!trainList) {
        console.error('Element with id "trains" not found.');
        return;
    }

    trains.forEach(train => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${train.name}</strong><br>
            Departure: ${train.departure}<br>
            Arrival: ${train.arrival}<br>
            Price: ${train.ticket}<br>
            Rating: ${'★'.repeat(train.rating)}${'☆'.repeat(5 - train.rating)}
        `;
        trainList.appendChild(li);
    });
});

