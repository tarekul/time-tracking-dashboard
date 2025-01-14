fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        updateCards(data);
    })
    .catch(error => console.error('Error loading JSON:', error));

function updateCards(data) {
    const cards = document.querySelectorAll('.card');
    data.forEach((item, index) => {
        cards[index].querySelector('.card_title').textContent = item.title;
        cards[index].querySelector('.card_time').textContent =
            item.timeframes.daily.current + 'hrs';
        cards[index].querySelector('.card_last').textContent =
            'Last Week - ' + item.timeframes.daily.previous + 'hrs';
    });
}

document.querySelectorAll('.timeframe').forEach((button) => {
    button.addEventListener('click', () => {
        const activeButton = document.querySelector('.timeframe.active');
        if (activeButton) {
            activeButton.classList.remove('active');
        }
        button.classList.add('active');
        const timeframe = button.textContent.toLowerCase();
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const timeframes = card.querySelector('.card_time');
            timeframes.textContent = data[index].timeframes[timeframe].current + 'hrs';
            const last = card.querySelector('.card_last');
            last.textContent = 'Last Week - ' + data[index].timeframes[timeframe].previous + 'hrs';
        });
    });
});

