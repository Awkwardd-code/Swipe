import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [genderPreference, setGenderPreference] = useState("");
    const { signup, loading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim input values
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Validate required fields
        if (!trimmedName || !trimmedEmail || !trimmedPassword || !age || !gender || !genderPreference) {
            toast.error("All fields are required!");
            return;
        }

        // Age must be a valid number
        if (isNaN(age) || age < 18) {
            toast.error("You must be at least 18 years old.");
            return;
        }

        // Ensure password meets security standards
        if (trimmedPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        signup({ 
            name: trimmedName, 
            email: trimmedEmail, 
            password: trimmedPassword, 
            gender, 
            age, 
            genderPreference 
        });
    };

    return (
        <form className="space-y-6 max-w-md mx-auto" onSubmit={handleSubmit}>
            {/* NAME */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
            </div>

            {/* EMAIL */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
            </div>

            {/* PASSWORD */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
            </div>

            {/* AGE */}
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 text-left">
                    Age
                </label>
                <input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
            </div>

            {/* GENDER */}
            <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Your Gender</label>
                <div className="mt-2 flex gap-4">
                    {["male", "female"].map((g) => (
                        <label key={g} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={gender === g}
                                onChange={() => setGender(g)}
                                className="text-pink-600 focus:ring-pink-500 border-gray-300"
                            />
                            <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* GENDER PREFERENCE */}
            <div>
                <label className="block text-sm font-medium text-gray-700 text-left">Preference</label>
                <div className="mt-2 space-y-2">
                    {["male", "female", "both"].map((gp) => (
                        <label key={gp} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender-preference"
                                value={gp}
                                checked={genderPreference === gp}
                                onChange={(e) => setGenderPreference(e.target.value)}
                                className="text-pink-600 focus:ring-pink-500 border-gray-300"
                            />
                            <span>{gp.charAt(0).toUpperCase() + gp.slice(1)}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        loading
                            ? "bg-pink-400 cursor-not-allowed"
                            : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </div>
        </form>
    );
}

export default SignUpForm;
