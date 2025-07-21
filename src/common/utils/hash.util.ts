import * as bcrypt from 'bcrypt';

export async function hashUtil(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function compare(
  password: string,
  hashValue: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashValue);
}
