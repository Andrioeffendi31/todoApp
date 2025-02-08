"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "@/state/api";

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const [login, { isLoading: isLoginLoading, isError: isLoginError }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading, isError: isRegisterError }] = useRegisterMutation();

  const handleLogin = () => {
    login({ email, password })
      .unwrap()
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      });
  };

  const handleSignUp = () => {
    register({ email, password, username, role })
      .unwrap()
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border px-3 py-2"
              >
                <option value="">Select Role</option>
                <option value="Lead">Lead</option>
                <option value="Team Member">Team Member</option>
              </select>
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
        <button
          onClick={isLogin ? handleLogin : handleSignUp}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white"
          disabled={isLogin ? isLoginLoading : isRegisterLoading}
        >
          {isLogin ? (isLoginLoading ? "Logging In..." : "Login") : (isRegisterLoading ? "Signing Up..." : "Sign Up")}
        </button>
        {(isLogin && isLoginError) && (
          <div className="mt-4 text-center text-red-500">
            Failed to login. Please try again.
          </div>
        )}
        {(!isLogin && isRegisterError) && (
          <div className="mt-4 text-center text-red-500">
            Failed to sign up. Please try again.
          </div>
        )}
        <div className="mt-4 text-center">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"} </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;