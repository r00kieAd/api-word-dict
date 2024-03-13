const relatedWordsEndpoints = new Map([
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

const wordDefinationsEndpoints = new Map([
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
        const word = document.querySelector('#wordInput').value;
        const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '2fc7fe89abmsh68aeb886c1c625ep1b9607jsn4cece20a50db',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.text();
        document.querySelector('#output').innerText = result;
    } catch (error) {
        document.querySelector('#output').innerText = error;
    }
}