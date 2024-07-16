"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";

const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) throw new Error("Please fill all fields");
  await db();

  // existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  await User.create({ name, email, password: hash });
  redirect("/login");
};

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};

const fetchAllUsers = async () => {
  await db();
  const users = await User.find({});
  return users;
};

const logout = async () => {
  await signOut();
};

export { register, login, fetchAllUsers, logout };
