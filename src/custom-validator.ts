/** Use only with Antd Form */
/** Currently validator will no longer working if using regex from outside 'validator' object */
import { RuleObject, StoreValue } from 'rc-field-form/lib/interface';

declare type Validator = (
  rule: RuleObject,
  value: StoreValue,
  callback: (error?: string) => void,
) => Promise<void | any> | void;

type CustomValidator = Record<string, Validator>

export const customValidator: CustomValidator = {

  validateWebsite: async (rule, value, callback) => {
    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (value && !regex.test(value)) {
      callback('Incorrect website format!');
    } else {
      callback();
    }
  },

  validateEmail: async (rule, value, callback) => {
    const regex = /^[A-Za-z][A-Za-z0-9-_\.]{1,32}(\+?[0-9]){0,5}@[A-Za-z0-9_-]{2,}(\.[A-Za-z0-9]{2,4}){1,2}$/gm;
    if (value && !regex.test(value)) {
      callback('Incorrect email format!');
    } else {
      callback();
    }
  },
};