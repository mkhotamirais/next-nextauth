"use server";

import { signIn } from "@/auth";

const githubLogin = async () => {
  await signIn("github");
};

const googleLogin = async () => {
  await signIn("google");
};

export { githubLogin, googleLogin };
