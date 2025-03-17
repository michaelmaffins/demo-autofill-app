/*
 * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
 */

/* luhnChecksum
 * Implement the Luhn algorithm to calculate the Luhn check digit.
 * Return the check digit.
 */
function luhnChecksum(code: string) {
  var len = code.length;
  var parity = len % 2;
  var sum = 0;
  for (var i = len - 1; i >= 0; i--) {
    var d = parseInt(code.charAt(i));
    if (i % 2 == parity) {
      d *= 2;
    }
    if (d > 9) {
      d -= 9;
    }
    sum += d;
  }
  return sum % 10;
}

/* luhnValidate
 * Return true if specified code (with check digit) is valid.
 */
export function luhnValidate(fullcode: string) {
  return luhnChecksum(fullcode) == 0;
}
