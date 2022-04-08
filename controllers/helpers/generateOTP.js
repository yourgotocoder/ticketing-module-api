const generateOTP = (numberOfDigits) => {
    let add = 1,
        max = 12 - add;
    if (numberOfDigits > max) {
        return generateOTP(max) + generateOTP(numberOfDigits - max);
    }
    max = Math.pow(10, numberOfDigits + add);
    let min = max / 10;
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
};

module.exports = generateOTP;
