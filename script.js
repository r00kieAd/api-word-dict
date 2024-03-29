const wordDefinationsEndpoints = new Map < String > ([
    ["input", "input"],
    ["Definition", "definitions"],
    ["Synonyms", "synonyms"],
    ["Antonyms", "antonyms"],
    ["Examples", "examples"],
    ["Rhymes", "rhymes"],
    ["Pronunciation", "pronunciation"],
    ["Syllables", "syllables"]
])

async function triggerWordsAPI() {
    try {
        const word = ($('#wordInput').val() == '') ? 'empty' : $('#wordInput').val();
        const endpoint = (($('#setValue').text()).toLowerCase()).trim();
        const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/${endpoint}`;
        console.log(`GET url: ${url}`);
        const options = {
            method: 'GET',
            headers: {
                // 2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db
                'X-RapidAPI-Key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.text();
        switch (endpoint) {
            case 'definitions':
                getDefinitions(JSON.parse(result));
                break;
            case 'synonyms':
                getSynonyms(JSON.parse(result));
                break;
            case 'antonyms':
                getAntonyms(JSON.parse(result));
                break;
            case 'examples':
                getExamples(JSON.parse(result));
                break;
            default:
                break;
        }
    } catch (error) {
        $('#output').text(error);
        showResult();
    }
}

function showResult() {
    const resHeight = parseInt(($('#result').css('height')).slice(0, -2)) + 150;
    // alert(($('#result').css('height')).slice(0, -2));
    $('#main').animate({
        height: resHeight
    }, 400);
    $('#result').fadeIn();
}

function getDefinitions(wordObj) {
    if ((wordObj.definitions).length > 1) {
        // enable user to download the definitions in a text file
    }
    $('#output').text(wordObj.definitions[0].definition);
    showResult();
}

function getSynonyms(wordObj) {
    if ((wordObj.synonyms).length == 0) {
        $('#output').text('no synonyms found');
        return
    }
    $('#output').text(wordObj.synonyms);
    showResult();
}

function getAntonyms(wordObj) {
    if ((wordObj.antonyms).length == 0) {
        $('#output').text('no antonyms found');
        return
    }
    $('#output').text(wordObj.antonyms);
    showResult();
}

function getExamples(wordObj) {
    if ((wordObj.examples).length == 0) {
        $('#output').text('no examples found');
        return
    }
    $('#output').text(wordObj.examples);
    showResult();
}

// DOM
$(".endpoints .dropdown-menu .dropdown-item").click(
    function () {
        const newText = $(this).text();
        const oldText = $('#setValue').text();
        $('#setValue').text(newText);
        $(this).text(oldText);
        $('#dropicon').css('transform', 'rotate(360deg)');
    }
)

$('#setValue').click(
    function () {
        $('#dropicon').css('transform', 'rotate(180deg)');
    }
)

$('#getValue').click(
    function () {
        triggerWordsAPI();
    }
)