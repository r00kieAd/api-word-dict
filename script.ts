const relatedWordsEndpoints = new Map<String, String>([
    ["Is a Type Of", "typeOf"],
    ["Has Types", "hasTypes"],
    ["Part Of", "partOf"],
    ["Has Parts", "hasParts"],
    ["Is an Instance Of", "instanceOf"],
    ["Has Instances", "hasInstances"],
    ["Similar To", "similarTo"],
    ["Also", "also"],
    ["Entails", "entails"],
    ["Member Of", "memberOf"],
    ["Has Members", "hasMembers"],
    ["Substance Of", "substanceOf"]
    ["Has Substances", "hasSubstances"],
    ["In Category", "inCategory"],
    ["Has Categories", "hasCategories"],
    ["Usage Of", "usageOf"],
    ["Has Usages", "hasUsages"],
    ["In Region", "inRegion"],
    ["Region Of", "regionOf"],
    ["Pertains To", "pertainsTo"]
]);


const wordDefinationsEndpoints = new Map<String, String>([
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
        const word = ($('#wordInput').val() == '') ? alert('no value entered') : $('#wordInput').val();
        const endpoint = wordDefinationsEndpoints.get('input');
        console.log(word)
        const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/${endpoint}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.text();
        $('#output').text() = result;
    } catch (error) {
        $('#output').text() = error;
    }
}

// DOM
$(".endpoints .dropdown-menu .dropdown-item").click(
    function() {
        $('#setValue').text($(this).text());
    }
)


$('#getValue').click(
    function() {
        triggerWordsAPI();
    }
)