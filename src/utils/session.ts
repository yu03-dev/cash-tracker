import { auth } from "@/firebase/admin";

export const getUserInformation = async (sessionCookie: string) => {
  const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
  const { uid, email, picture } = decodedIdToken;
  const name = decodedIdToken.name as string;

  return { uid, name, email, picture };
};
