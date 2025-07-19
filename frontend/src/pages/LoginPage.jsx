import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#0f172a] to-[#1e293b] p-6">
      <div className="w-full max-w-6xl rounded-3xl shadow-2xl flex flex-col lg:flex-row border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 text-white">
        {/* LEFT - LOGIN FORM */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center space-y-6">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-2">
            <ShipWheelIcon className="text-cyan-400 size-9 drop-shadow-md" />
            <span className="text-4xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-sky-500 drop-shadow-md">
              CrossChat
            </span>
          </div>

          {/* WELCOME MESSAGE */}
          <div>
            <h2 className="text-3xl font-bold">Welcome Back 👋</h2>
            <p className="text-sm text-white/70">
              Sign in to continue your language journey!
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-600/80 rounded-md px-4 py-2 text-sm font-medium shadow-md">
              {error.response?.data?.message || "Something went wrong"}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}
            <div className="form-control w-full">
              <label className="label text-white">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="input w-full bg-white/10 border border-white/20 placeholder-white/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="form-control w-full">
              <label className="label text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input w-full bg-white/10 border border-white/20 placeholder-white/70 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-bold w-full hover:scale-105 transition-transform duration-300"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  &nbsp; Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* SIGNUP LINK */}
            <p className="text-sm text-center text-white/90">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-cyan-300 hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT - ILLUSTRATION */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-white/5 p-10">
          <div className="max-w-md text-center space-y-4">
            <img
              src="/manipulation-bro.png"
              alt="Language connection illustration"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
            />
            <h2 className="text-2xl font-semibold text-white">
              Connect globally with language partners
            </h2>
            <p className="text-white/70 text-sm">
              Practice conversations, make friends, and enhance your communication skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;