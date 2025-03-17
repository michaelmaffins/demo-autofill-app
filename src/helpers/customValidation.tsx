import Personnummer from 'personnummer';
import OrganizationNumber from 'organisationsnummer';
import { luhnValidate } from './luhnAlgo';

// CORP CHECKOUT
export const validateCorpSsn = (orgNum: string) => validateSSN(orgNum, true);

// PRIVATE CHECKOUT
export const validatePrivateSsn = (input: string) => validateSSN(input, false);

const validateSSN = (ssn: string, isCorporate: boolean): boolean => {
  const isValid = OrganizationNumber.valid(ssn);
  if (isValid) {
    if (isCorporate) return true; //no need to check if ssn is isMinor

    const parsedSsn = OrganizationNumber.parse(ssn);
    if (parsedSsn.isPersonnummer()) return !isMinor(ssn);
  }
  return isCorporate && luhnValidate(ssn);
};

const isMinor = (ssn: string) => Personnummer.parse(ssn).getAge() < 18;

export const isSwishPhoneNumberValid = (value: string) => {
  let isValid = false;
  value = value.toLowerCase();
  const phoneRegex = /^(\+46|0|0046)[7]([0-9][ -]*){7}[0-9]$/;
  isValid = phoneRegex.test(value);
  return isValid;
};

// for reference
// if length === 10
// YYMMDD-XXXX
// else if length === 12
// YYYYMMDD-XXXX
