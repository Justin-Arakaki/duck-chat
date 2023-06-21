export default function getEnv<T = string>(name: string): T {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value as T;
}
