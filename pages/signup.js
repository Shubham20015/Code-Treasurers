import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      localStorage.setItem("idToken", cred._tokenResponse.idToken);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/loginWithEmail', {
        method: 'POST',
        body: JSON.stringify({
          email:email,
          password:password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem("idToken", data.user._tokenResponse.idToken);
      if(data.success) { router.push("/dashboard") }
    } catch (error) {
      console.error(error.message);
    }
  }



  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Admin Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            <div className="text-gray-500 flex justify-end mb-3">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="../login/"
              >
                Log in
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              onClick={handleSubmit}
            >
              Create Account
            </button>
            <div className="flex justify-between items-center mt-3">
              <hr className="w-full" />
              <span className="p-2 text-gray-400 mb-1">OR</span>
              <hr className="w-full" />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="flex gap-3 shadow-md py-3 px-2 rounded-lg items-center font-bold pr-3 cursor-pointer text-black"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="text-3xl" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
