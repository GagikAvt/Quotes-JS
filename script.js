async function readQuotesFromFile(quotes) {
    const filePath = `/${quotes}.txt`;

    try {
        const response = await fetch(filePath);
        const quotesText = await response.text();
        const quotesArray = quotesText.split('\n').map(quote => quote.trim());
        return quotesArray;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
}

async function getRandomQuoteFromFile() {
    const quotesFromFile = await readQuotesFromFile('quotes'); 

    if (quotesFromFile.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotesFromFile.length);
        return quotesFromFile[randomIndex];
    } else {
        console.error('Файл с цитатами пуст или не удалось прочитать цитаты.');
        return 'Цитата не найдена';
    }
}

function getCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('ru-RU', options);
    return currentDate;
}

async function updateQuote() {
    const currentQuote = await getRandomQuoteFromFile();
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = currentQuote;

    const currentDate = getCurrentDate();
    const dateElement = document.getElementById('date');
    dateElement.textContent = currentDate;

    const currentTimestamp = new Date().getTime();
    localStorage.setItem('savedQuote', currentQuote);
    localStorage.setItem('savedDate', currentDate);
    localStorage.setItem('lastUpdateTimestamp', currentTimestamp.toString());
}

const savedQuote = localStorage.getItem('savedQuote');
const savedDate = localStorage.getItem('savedDate');

if (savedQuote !== null && savedDate !== null) {
    document.getElementById('quote').textContent = savedQuote;
    document.getElementById('date').textContent = savedDate;
} else {
    window.addEventListener('load', () => {
        updateQuote();
        setInterval(updateQuote, 60 * 60 * 1000);
    });
}