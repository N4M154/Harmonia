import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Header */}
      <header
        className="fixed w-full border-b-2 border-violet-200 dark:border-none bg-violet-100/40 dark:bg-[#18181b]/40 backdrop-blur-sm py-4 z-50 transition-all duration-300 shadow-[0_1px_50px_rgb(124,58,237)] dark:shadow-[0_10px_50px_rgb(0,0,0)]"
        style={{
          borderBottomLeftRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem",
        }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-light text-violet-500 ml-5">N4M154</h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-violet-50 dark:bg-[#18181b] pt-28">
        <div className="flex flex-col items-center p-3 max-w-3xl mx-auto gap-5">
          {/* top */}
          <div className="w-full text-center mb-7 mt-2">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 rounded-lg font-thin text-black dark:text-gray-300">
                Welcome to{" "}
                <span className="font-bold text-violet-500">Harmonia</span>
              </span>
            </Link>
          </div>
          {/* form */}

          <div className="w-1/2 flex dark:bg-gradient-to-b dark:from-[#18181b] dark:to-black justify-center rounded-3xl shadow-xl p-6 dark:shadow-violet-950/50 shadow-black">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <div>
                <Label
                  value="Your username"
                  className="text-black dark:text-violet-300"
                />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label
                  value="Your email"
                  className="text-black dark:text-violet-300"
                />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label
                  value="Your password"
                  className="text-black dark:text-violet-300"
                />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                className="bg-violet-500 dark:bg-violet-600 hover:!bg-violet-700 text-black"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <span className="text-center text-sm dark:text-gray-400">
                or continue with
              </span>
              <OAuth />
            </form>
          </div>
          <div className="flex gap-2 text-sm mb-2 dark:text-white">
            <span>Have an account?</span>
            <Link
              to="/sign-in"
              className="text-violet-500 font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
