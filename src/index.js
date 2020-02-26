let prepareDictionary = () => {
    let prefix = ['twen', 'thir', 'four', 'fif', 'six', 'seven', 'eigh', 'nine']
    let dict = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    for (let i = 1; i < prefix.length; i++) {
        dict.push(prefix[i] + 'teen');
    }

    prefix[2] = 'for';
    for (let i = 0; i < prefix.length; i++) {
        dict.push(...new Array(10).fill(prefix[i] + 'ty'));
    }

    dict[1000] = 'thousand';
    dict[100] = 'hundred';

    return dict;
};

const dictionary = prepareDictionary();
module.exports = function toReadable(number) {
    let div = 1000;
    let s = '';

    while (div > 1 && number > 99) {
        let digit = Math.floor(number / div);
        number %= div;

        if (digit > 0) {
            s += `${dictionary[digit]} ${div >= 100 ? dictionary[div] : ''} `;
        } else if (div > 100) {
            s += digit > 0 ? `${dictionary[digit]} ${dictionary[div]}` : '';
        }

        div /= 10;
    }

    if (number < 20 && number > 0) {
        s += `${dictionary[number]}`;
    } else if (number > 0) {
        let lastDigit = number % 10 > 0 ? dictionary[number % 10] : '';
        s += `${dictionary[number]} ${lastDigit}`;
    }

    return s === '' && number === 0 ? 'zero' : s.trimEnd();
}
