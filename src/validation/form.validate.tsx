import * as yup from 'yup';
import {
  isSwishPhoneNumberValid,
  validatePrivateSsn,
  validateCorpSsn
} from '../helpers/customValidation';

export const privateValidationSchema = {
  email: yup.string().required('Required').email('Invalid email'),
  postcode: yup
    .string()
    .required('Required')
    .min(5, 'Minimum of 5 digits')
    .max(5, 'Maximum of 5 digits')
    .matches(/[0-9]{3,3}\s*[0-9]{2,2}/, 'Invalid zip code'),
  firstname: yup
    .string()
    .required('Required')
    .max(49, 'Must be less than 50 characters'),
  lastname: yup
    .string()
    .required('Required')
    .max(49, 'Must be less than 50 characters'),
  address: yup
    .string()
    .required('Required')
    .max(99, 'Must be less than 100 characters'),
  city: yup
    .string()
    .required('Required')
    .max(29, 'Must be less than 30 characters'),
  tel: yup
    .string()
    .required('Required')
    .test('check-phone-number', 'invalid phone number', isSwishPhoneNumberValid)
};

export const businessValidationSchema = {
  orgNum: yup
    .string()
    .required('Required')
    .min(0)
    .max(12)
    .matches(/^\d+$/, 'must contain only numbers')
    .test(
      'check-organization-number',
      'invalid organization number',
      validateCorpSsn
    ),
  companyName: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid email'),
  postcode: yup
    .string()
    .required('Required')
    .min(5, 'Minimum of 5 digits')
    .max(5, 'Maximum of 5 digits')
    .matches(/[0-9]{3,3}\s*[0-9]{2,2}/, 'Invalid zip code'),
  address: yup
    .string()
    .required('Required')
    .max(99, 'Must be less than 100 characters'),
  city: yup
    .string()
    .required('Required')
    .max(29, 'Must be less than 30 characters'),
  tel: yup
    .string()
    .required('Required')
    .test('check-phone-number', 'invalid phone number', isSwishPhoneNumberValid)
  // reference: yup.string().required('Required')
};

export const validationSchema = {
  customerType: yup.string().required('Required'),
  ssn: yup
    .string()
    .required('Required')
    .min(0)
    .max(12)
    .matches(/^\d+$/, 'must contain only numbers')
    .test('check-ssn', 'invalid ssn', validatePrivateSsn),
  orgNum: yup
    .string()
    .required('Required')
    .min(0)
    .max(12)
    .matches(/^\d+$/, 'must contain only numbers')
    .test(
      'check-organization-number',
      'invalid organization number',
      validateCorpSsn
    ),
  address: yup
    .string()
    .required('Required')
    .max(99, 'Must be less than 100 characters'),
  city: yup
    .string()
    .required('Required')
    .max(29, 'Must be less than 30 characters'),
  email: yup.string().required('Required').email('Invalid email'),
  firstName: yup
    .string()
    .required('Required')
    .max(49, 'Must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Required')
    .max(49, 'Must be less than 50 characters'),
  mobileNumber: yup
    .string()
    .required('Required')
    .test(
      'check-phone-number',
      'invalid phone number',
      isSwishPhoneNumberValid
    ),
  postcode: yup
    .string()
    .required('Required')
    .min(5, 'Minimum of 5 digits')
    .max(5, 'Maximum of 5 digits')
    .matches(/[0-9]{3,3}\s*[0-9]{2,2}/, 'Invalid zip code'),
  companyName: yup.string().required('Required')
  // organizationNumber: yup
  //   .string()
  //   .required('Required')
  //   .test('check-org-number', 'Invalid organization number', validatePrivateSsn)
};
