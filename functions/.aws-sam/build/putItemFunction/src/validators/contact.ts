import Ajv from 'ajv';
import isEmail from 'validator/lib/isEmail';

export interface Contact {
  token: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
}

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    message: { type: 'string' },
    phone: { type: 'string' },
  },
  required: ['token', 'name', 'email', 'message'],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export default function (data: unknown): boolean {
  return validate(data) && isEmail((data as any as Contact)?.email || '');
}