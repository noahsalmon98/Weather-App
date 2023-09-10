var APIKey = "d1b14c56b64aa0a44849c35f62969ee8"
const cityName = document.querySelector('searchCity')

//Making past searches appear on page
function init() {

    cities = getLocal();
    renderHistory();
    $('#searchButton').on('click', searchCity);
    $('#history').on('click', '.direct', function () {
        sendCity($(this).val());
    }
    );

}
//Show recently searched Cities
function renderHistory() {
    //clear everything
    $('#history').remove();
    //get local storage cities
    let stored = getLocal();
    //create and append the history
    const attachHistory = $('#attachHistory');
    const history = $('<div>')
    history.attr('id', 'history');
    attachHistory.append(history);

    for (let i = 0; i < stored.length; i++) {
        const cityHistory = $('<button>');
        cityHistory.text(stored[i].name).val(stored[i].name).addClass('direct customB');
        history.append(cityHistory);
    }
}

//Local Storage
function getLocal() {
    stored = localStorage.getItem('history');
    if (stored) {
        return JSON.parse(stored);
    } else {
        return [];
    }
}

function store(items) {
    localStorage.setItem('history', JSON.stringify(items));
}

fetch(`api.openweathermap.org/data/2.5/forecast?q={cityName}&appid={APIKey}`)
