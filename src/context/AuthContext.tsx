import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../../supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

interface AuthParams {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  success: boolean;
  data?: any;
  error?: any;
}

interface AuthContextType {
  session: Session | null;
  signUp: (params: AuthParams) => Promise<AuthResponse>;
  signIn: (params: AuthParams) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] =
    useState<
      Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]
    >(null);

  const signUp = async ({
    email,
    password,
    name,
  }: AuthParams): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name } },
    });
    return { success: !error, data, error };
  };

  const signIn = async ({
    email,
    password,
  }: AuthParams): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    return { success: !error, data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  useEffect(() => {
    // Ask if session already exists, previous log in saved in localStorage
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    //Check when auth status changes on sign-in, sign-up, sign-out, token refresh
    // If not, status only on first render
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session) => setSession(session)
    );
    return () => subscription.subscription.unsubscribe();
  }, []);

  const value: AuthContextType = { session, signUp, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("UseAuth must be used within <AuthContextProvider>");
  return ctx;
};
