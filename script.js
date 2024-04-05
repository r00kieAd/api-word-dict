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
        $('#dropicon').hide();
        $('#droploader').show();
        const response = await fetch(url, options);
        const result = await response.text();
        // alert(result)
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
    const resHeight = parseInt(($('#result').css('height')).slice(0, -2)) + 200;
    $('#main').animate({
        height: resHeight
    }, 400);
    $('#result').fadeIn();
    $('#dropicon').show();
    $('#droploader').hide();
}

function getDefinitions(wordObj) {
    alert((wordObj.definitions).length);
    var def = "";
    if ((wordObj.definitions).length > 1) {
        wordObj.definitions.forEach(w => {
            def += w.definition + ', ';
        });
        def = def.replace(/[,]/, ''); 
    } else {
        def = wordObj.definitions[0].definition;
        alert(wordObj.definitions[0].definition);
        // alert(def);
    }
    $('#output').text(def);
    showResult();
}

function getSynonyms(wordObj) {
    if ((wordObj.synonyms).length == 0) {
        $('#output').text('no synonyms found');
    } else {
        $('#output').text(wordObj.synonyms);
    }
    showResult();
}

function getAntonyms(wordObj) {
    if ((wordObj.antonyms).length == 0) {
        $('#output').text('no antonyms found');
    } else {
        $('#output').text(wordObj.antonyms);
    }
    showResult();
}

function getExamples(wordObj) {
    if ((wordObj.examples).length == 0) {
        $('#output').text('no examples found');
    } else {
        $('#output').text(wordObj.examples);
    }
    showResult();
}

function setDropArrowDirection() {
    let clsList = ($('#dropicon').attr('class')).split(' ');
    if (clsList.includes('up')) {
        $('#dropicon').css('transform', 'rotate(180deg)');
        $('#dropicon').removeClass('up');
        return;
    }
    $('#dropicon').addClass('up');
    $('#dropicon').css('transform', 'rotate(360deg)');
}

// DOM
$(".endpoints .dropdown-menu .dropdown-item").click(
    function () {
        const newText = $(this).text();
        const oldText = $('#setValue').text();
        $('#setValue').text(newText);
        $(this).text(oldText);
        setDropArrowDirection();
    }
)

$('#setValue').click(
    function () {
        setDropArrowDirection();
    }
)

$('#getValue').click(
    function () {
        triggerWordsAPI();
    }
)