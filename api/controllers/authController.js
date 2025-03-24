import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;

    try {
     // Check for missing fields
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if gender and genderPreference are valid
        const validGenders = ['male', 'female', 'other'];
        const validPreferences = ['male', 'female', 'both'];

        if (!validGenders.includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender value",
            });
        }

        if (!validPreferences.includes(genderPreference)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender preference value",
            });
        }

        // Check age restriction
        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "You must be at least 18 years old",
            });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
            });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        });

        // Generate JWT token
        const token = signToken(newUser._id);

        // Set cookie with JWT token
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true, // Protects from XSS attacks
            sameSite: "strict", // Protects from CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully!",
            user: newUser,
        }); 
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




export const login = async(req,res)=>{

    const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = signToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log("Error in login controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,  // Use `true` if using HTTPS
            sameSite: "None",  // Adjust based on your frontend setup (can be `Lax` or `Strict` too)
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Logout failed", error: error.message });
    }
};

export const checkAuthentication = async (req,res) =>{
    res.send({
		success: true,
		user: req.user,
	});
}