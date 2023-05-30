import argon2 from 'argon2';

export default async function generateHash(password: string) {
  try {
    return await argon2.hash(password);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}
