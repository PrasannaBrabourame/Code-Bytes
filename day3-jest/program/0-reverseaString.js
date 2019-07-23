/* # Exercice: Reverse String
 *
 * ## Explanation:
 * You must code a function that reverses a string.
 *
 * ## Example:
 *```
 *reverseString('my-string') === 'gnirts-ym'
 *```
 *
 * ## Expected Time
 * You should spend around 3 minutes on this exercice
 *
 * ## Further Notice
 * You have more examples in <root>/validations/0-reverseString.validation.js
 */
//npm run validate 0-reverseaString

function reverseString(str) {
    return str.split('').reverse().join('')
  }
  
  module.exports = reverseString