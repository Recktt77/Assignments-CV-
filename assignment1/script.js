function processFile(url, words) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const elements = doc.body.querySelectorAll('*:not(label):not(p):not(div)');
            elements.forEach(element => element.remove());
            const texts = doc.body.querySelectorAll('label, p');
            texts.forEach(element => {
                const text = element.textContent.toLowerCase();
                for (const word of words) {
                    if (text.includes(word.toLowerCase())) {
                        const replacing = new RegExp(`\\b${word}\\b`, 'gi');
                        element.textContent = element.textContent.replace(replacing, '');
                        break;
                    }
                }
            });
            let contentDiv=document.querySelector('#content');
            if (!contentDiv) {
                contentDiv = document.createElement('div');
                contentDiv.id = 'content';
                document.body.appendChild(contentDiv);
            }
            contentDiv.innerHTML = doc.body.innerHTML;

            console.log(doc.body.innerHTML);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('processButton').addEventListener('click', function() {
    const url = 'filename.html';
    const words = ['Second', 'First', 'Third' ,'Fifth', 'Sixth'];
    processFile(url, words);
});