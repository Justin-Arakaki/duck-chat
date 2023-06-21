import { hashPassword } from '../passwordUtils';
import { SaveOptions } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { models } from '../../models';

export async function createSampleUserAttributes() {
  const name = `JohnDoe_${uuidv4()}`;
  const hashedPassword = await hashPassword('password123');

  return { name, hashedPassword };
}

export async function createSampleUser(options?: SaveOptions) {
  try {
    const defaultAttributes = await createSampleUserAttributes();

    const user = models.User.create(defaultAttributes, options);

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
