import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };

    const colors = {
        paleGreen: "#D3F6DB",
        green: "#5B8260",
        darkGreen: "#182825",
        navy: "#1F2937",
        lightBlue: "#D6EBFF"
    };

    return (
        <div className="flex items-center justify-between min-h-screen p-5 bg-gray-100" style={{ backgroundColor: colors.paleGreen }}>

            <div className="flex-1 flex flex-col items-start justify-center p-5 space-y-6">
                <h1 className="text-4xl font-bold" style={{ color: colors.navy }}>Personal Expense Tracker</h1>

                <p className="text-left mb-5" style={{ color: colors.darkGreen }}>
                    Embark on a journey toward robust financial health with our Personal Expense Tracker - your smart ally in mastering the art of budgeting, expense tracking, and reaching financial goals. Developed with the unique challenges of college students in mind, our app simplifies financial management, turning it from a source of stress into a stepping stone towards a secure, financially stable future. Let's redefine your spending, together - because your financial well-being matters!
                </p>

                {currentUser ? (
                    <button
                        onClick={handleLogout}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
                        style={{ backgroundColor: colors.green, color: colors.lightBlue }}
                    >
                        Sign Out
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-300 ease-in-out"
                        style={{ backgroundColor: colors.green, color: colors.lightBlue }}
                    >
                        Join Now
                    </button>
                )}
            </div>

            <div className="flex-1">
            <img
                  src="/symbol.svg.png"
                  className="image"
                />
            </div>

        </div>
    );
}

export default Home;

