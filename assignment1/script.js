function cleanForElement(element, words) {
    element.querySelectorAll('*').forEach(child => {
        if (child.tagName !== 'P' && child.tagName !== 'LABEL' && child.tagName !== 'DIV') {
            child.remove();
        } else {
            if (child.tagName === 'P' || child.tagName === 'LABEL') {
                words.forEach(word => {
                    const replacing = new RegExp(`\\b${word}\\b`, 'gi');
                    child.textContent = child.textContent.replace(replacing, '');
                });
            }
            cleanForElement(child, words);
        }
    });
}
const words = ['First', 'Second', 'Third', 'Name'];
cleanForElement(document.body, words);
