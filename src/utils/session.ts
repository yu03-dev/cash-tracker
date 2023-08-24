import { auth } from "@/firebase/admin";

export const getUserId = async (sessionCookie: string) => {
  const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
  return decodedIdToken.uid;
};

export const getUserInfo = async (sesionCookie: string) => {
  const decodedIdToken = await auth.verifySessionCookie(sesionCookie, true);
  const { uid, email, picture } = { ...decodedIdToken };
  const name = decodedIdToken.name as string;
  return { uid, name, email, picture };
};
