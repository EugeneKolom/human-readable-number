module.exports = function toReadable (number) {
  
  const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function checkLength(number) {
    if (number < 100 && number > 0) {
      return convertTens(number)
    } else if (number > 99 && number < 1000) {
      return convertHundreds(number)
    } else if (number > 999 && number < 1000000) {
      return convertThousands(number)
    } else if (number > 999999 && number < 1000000000) {
      return convertBillions(number)
    } else if (number > 999999999 && number < 1000000000000) {
      return convertMilliards(number)
    } else {
      return "zero";
    }
  }

  function convertMilliards(number) {
    return (number.toString().length === 4 ? units[Math.floor(number / 1000000000)] 
    : number.toString().length === 5 ? convertTens(Math.floor(number / 1000000000)) 
    : convertHundreds(Math.floor(number / 1000000000))) + " milliards" + (number % 1000000000 === 0 ? "" : " " + convertBillions(Math.floor(number / 1000))); 
  }

  function convertBillions(number) {
    return (number.toString().length === 4 ? units[Math.floor(number / 1000000)] 
    : number.toString().length === 5 ? convertTens(Math.floor(number / 1000000)) 
    : convertHundreds(Math.floor(number / 1000000))) + " billions" + (number % 1000000 === 0 ? "" : " " + convertThousands(Math.floor(number / 1000))); 
  }

  function convertThousands(number) {
    return (number.toString().length === 4 ? units[Math.floor(number / 1000)] 
    : number.toString().length === 5 ? convertTens(Math.floor(number / 1000)) 
    : convertHundreds(Math.floor(number / 1000))) + " thousand" + (number % 1000 === 0 ? "" : " " + convertHundreds(number % 1000)); 
  }

  function convertHundreds(number) {
    return units[Math.floor(number / 100)] + " hundred" + (number % 100 === 0 ? "" : " " + convertTens(number % 100));
  }

  function convertTens(number) {
    if (number < 10) return units[number];
    if (number >= 11 && number <= 19) return teens[number - 10];
    return tens[Math.floor(number / 10)] + (number % 10 === 0 ? "" : " " + units[number % 10]);
  }

  return checkLength(number);
}
