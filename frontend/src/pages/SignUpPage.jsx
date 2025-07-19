import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/UseSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-tr from-[#0f172a] to-[#1e293b]">
      <div className="border border-white/10 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon className="size-9 text-cyan-400 drop-shadow-md" />
            <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-sky-500 drop-shadow-md">
              CrossChat
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-600/80 rounded-md px-4 py-2 text-sm font-medium shadow-md mb-4">
              {error.response?.data?.message || "Something went wrong"}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="space-y-5">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold">Create an Account</h2>
                <p className="text-sm text-white/70">
                  Join CrossChat and start your language learning adventure!
                </p>
              </div>

              {/* FULL NAME */}
              <div className="form-control w-full">
                <label className="label text-white">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input w-full bg-white/10 border border-white/20 placeholder-white/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="form-control w-full">
                <label className="label text-white">Email</label>
                <input
                  type="email"
                  placeholder="john@gmail.com"
                  className="input w-full bg-white/10 border border-white/20 placeholder-white/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="form-control w-full">
                <label className="label text-white">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="input w-full bg-white/10 border border-white/20 placeholder-white/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <p className="text-xs text-white/60 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* TERMS CHECKBOX */}
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" required />
                  <span className="text-xs text-white/80 leading-tight">
                    I agree to the{" "}
                    <span className="text-cyan-300 hover:underline">terms of service</span> and{" "}
                    <span className="text-cyan-300 hover:underline">privacy policy</span>
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button className="btn bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-bold w-full hover:scale-105 transition-transform duration-300" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    &nbsp; Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* SIGN IN LINK */}
              <div className="text-center mt-4">
                <p className="text-sm text-white/90">
                  Already have an account?{" "}
                  <Link to="/login" className="text-cyan-300 hover:underline font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-white/10 items-center justify-center">
          <div className="max-w-md p-10 text-center">
            <img
              src="/manipulation-bro.png"
              alt="Language connection illustration"
              className="w-full max-w-sm mx-auto rounded-xl shadow-lg"
            />
            <h2 className="text-2xl font-semibold text-white mt-6">
              Connect with language partners worldwide
            </h2>
            <p className="text-sm text-white/70 mt-2">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;