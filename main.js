const periods = {
    'daily': 'Yesterday',
    'weekly': 'Last Week',
    'monthly': 'Last Month'
}

fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        updateCards(data);
        addEventListeners(data);
    })
    .catch(error => console.error('Error loading JSON:', error));

function updateCards(data, period = 'daily') {
    const activeButton = document.querySelector('.timeframe.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    document.getElementById(period).classList.add('active');
    const cards = document.querySelectorAll('.card');
    data.forEach((item, index) => {
        cards[index].querySelector('.card_title').textContent = item.title;
        cards[index].querySelector('.current').textContent =
            item.timeframes[period].current + 'hrs';
        cards[index].querySelector('.previous').textContent =
            `${periods[period]} - ` + item.timeframes[period].previous + 'hrs';
    });
}

function addEventListeners(data) {
    document.querySelectorAll('.timeframe').forEach((button) => {
        button.addEventListener('click', () => {
            const period = button.getAttribute('id');
            updateCards(data, period);
        });
    });
}

