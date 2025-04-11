/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

export default function ForgotPassword({ onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setMessage("OTP sent to your email");
      setStep(2);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://capstone-repo-2933d2307df0.herokuapp.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp,  newPassword }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Reset failed");

      setMessage("Password reset successful");
      setTimeout(() => {
        onClose(); // close modal
      }, 1500);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

        {step === 1 && (
          <>
            <label className="block mb-2 text-sm font-medium">Enter your email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <button
              onClick={sendOtp}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-sm font-medium">OTP</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <label className="block mb-2 text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <label className="block mb-2 text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <button
              onClick={resetPassword}
              disabled={loading}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="text-gray-500 mt-4 text-sm underline w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
