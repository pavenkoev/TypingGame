class MarkovChain {
    constructor() {
        this.chain = {};
    }

    cleanText(text) {
        return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    }

    buildChain(text) {
        text = this.cleanText(text);
        console.log(text);
        const words = text.split(/\s+/);
        this.chain = {};

        for (let i = 0; i < words.length - 1; i++) {
            const word = words[i];
            const nextWord = words[i + 1];

            if (!this.chain[word]) {
                this.chain[word] = {};
            }

            this.chain[word][nextWord] = (this.chain[word][nextWord] || 0) + 1;
        }
    }

    getNextWord(options) {
        const words = Object.keys(options);
        const total = words.reduce((sum, word) => sum + options[word], 0);
        let random = Math.random() * total;

        for (let word of words) {
            random -= options[word];
            if (random <= 0) {
                return word;
            }
        }

        return words[words.length - 1];
    }

    generateText(startWord, length) {
        var word = startWord;
        if (!word) {
            word = Object.keys(this.chain)[Math.floor(Math.random() * Object.keys(this.chain).length)];
        }

        const result = [word];

        for (let i = 0; i < length; i++) {
            const options = this.chain[word];
            if (!options)
                break;

            word = this.getNextWord(options);
            result.push(word);
        }

        return result;
    }
}