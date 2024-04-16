async function triggerWordsAPI() {
    $('#dropicon').hide();
    $('#droploader').show();
    const word = ($('#wordInput').val() == '') ? 'empty' : $('#wordInput').val();
    if (word == 'empty') {
        showResult('Enter a word to continue...');
        return;
    }
    const endpoint = (($('#setValue').text()).toLowerCase()).trim();
    const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/${endpoint}`;
    console.log(`GET url: ${url}`);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const statusCode = response.status;
    const finalResult = JSON.parse(result);
    if (statusCode == 404) {
        showResult(finalResult.message);
        return;
    } else if (statusCode != 200) {
        alert(finalResult);
    } else {
        try {
            switch (endpoint) {
                case 'definitions':
                    getDefinitions(finalResult);
                    break;
                case 'synonyms':
                    getSynonyms(finalResult);
                    break;
                case 'antonyms':
                    getAntonyms(finalResult);
                    break;
                case 'examples':
                    getExamples(finalResult);
                    break;
                default:
                    break;
            }
        } catch (error) {
            showResult('Error occured, try again!')
        }
    }

}

function showResult(res) {
    $('#output').text(res);
    const resHeight = parseInt(($('#result').css('height')).slice(0, -2)) + 220;
    $('#main').animate({
        height: resHeight
    }, 400);
    $('#result').fadeIn();
    $('#dropicon').show();
    $('#droploader').hide();
}

function getDefinitions(wordObj) {
    let def = "";
    if ((wordObj.definitions).length > 1) {
        wordObj.definitions.forEach(w => {
            def += w.definition + ' | ';
        });
        def = (def.trim()).slice(0, -1);
    } else {
        def = wordObj.definitions[0].definition;
    }
    showResult(def);
}

function getSynonyms(wordObj) {
    let syn = "";
    if ((wordObj.synonyms).length == 0) {
        syn = "no synonyms found";
    } else if ((wordObj.synonyms).length > 1) {
        wordObj.synonyms.forEach(s => {
            syn += s + ' | ';
        });
        syn = (syn.trim()).slice(0, -1);
    } else {
        syn = wordObj.synonyms;
    }
    showResult(syn);
}

function getAntonyms(wordObj) {
    let ant = "";
    if ((wordObj.antonyms).length == 0) {
        ant = "no antonyms found";
    } else if ((wordObj.antonyms).length > 1) {
        wordObj.antonyms.forEach(a => {
            ant += a + ' | ';
        });
        ant = (ant.trim()).slice(0, -1);
    } else {
        ant = wordObj.antonyms;
    }
    showResult(ant);
}

function getExamples(wordObj) {
    let exp = "";
    // alert(wordObj.examples);
    if ((wordObj.examples).length == 0) {
        exp = "no examples found";
    } else if ((wordObj.examples).length > 1) {
        wordObj.examples.forEach(e => {
            exp += e + ' | ';
        });
        exp = (exp.trim()).slice(0, -1);
    } else {
        exp = wordObj.examples;
    }
    showResult(exp);
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

$('#setValue').on({
    click: function () {
        setDropArrowDirection();
    },

    blur: function () {
        setDropArrowDirection();
    }
})

$('.endpoints').blur(
    function () {
        setDropArrowDirection();
    }
)

$('#getValue').click(
    function () {
        triggerWordsAPI();
    }
)