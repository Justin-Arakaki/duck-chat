export default function isErrorType(err: unknown, errorName: string) {
  return err instanceof Error && err.name.includes(errorName);
}
