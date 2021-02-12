
const endpoint = 'https://gist.githubusercontent.com/jjdelc/1868136/raw/c9160b1e60bd8c10c03dbd1a61b704a8e977c46b/crayola.json';
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const colors = [];

fetch(endpoint).then(info => info.json()).then(data => colors.push(...data));

function findMatches(wordToMatch, colors) {
    return colors.filter(color => {
        const regex = new RegExp(wordToMatch, 'gi')
        return color.name.match(regex);
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, colors)
    const html = matchArray.map(color => {
        const regex = new RegExp(this.value, 'gi'); 
        const colorName = color.name.replace(regex,`<span style="background: ${color.hex};">${this.value}</span>`)
        return `
        <li>
            <span>${colorName}</span>
            <span style="background: ${color.hex};">${color.hex}</span>
            <span>rgb${color.rgb}</span>
        </li>
        `
    }).join('');
    suggestions.innerHTML = html;   
}

searchInput.addEventListener('keyup',displayMatches)
