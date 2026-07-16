"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AuthForm({
  mode
}:{
  mode: "signin" | "signup"
}) {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [message, setMessage]=useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password
      })

      setMessage(error ? error.message : "Check your email")
    } 
    else {
      const { error } = await supabase.auth.signInWithPassword({
        email, password
      });

      if (error) {
        setMessage(error.message)
      } else {
        setMessage("Logged in!")

        router.push("/dashboard")
        router.refresh()
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-xl w-96 space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          { mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>

        <p>
          {mode === "signin" ? (
            <>
              If you don't have an account:{" "}
              <button
                type="button"
                className="text-blue-600 underline cursor-pointer"
                onClick={() => router.push("/sign-up")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-600 underline cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Sign In
              </button>
            </>
          )}
        </p>

        <input
          className="border p-3 w-full rounded"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded cursor-pointer hover:bg-blue-800">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>

        <p className="text-center text-sm">
          {message}
        </p>

      </form>
    </main>
  );
}