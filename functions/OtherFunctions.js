// funções mais basicas que completa algo de outra

export function StylizeNumbers(number) {
    number = Number(number)
    if (number >= 1000 && number <= 9999) {
        number = number.toString();
        
        if (number[1] === '0') {
            return `${number[0]}k`
        } else return `${number[0]}.${number[1]}k`
    } else if (number >= 10000 && number <= 99999) {
        number = number.toString();
        
        if (number[2] === '0') {
            return `${number[0]}${number[1]}k`
        } else return `${number[0]}${number[1]}.${number[2]}k`
    } else if (number >= 100_000 && number <= 999_999) {
        number = number.toString();
        
        if (number[3] === '0') {
            return `${number[0]}${number[1]}${number[2]}k`
        } else return `${number[0]}${number[1]}${number[2]}.${number[3]}k`
    } else return number
}