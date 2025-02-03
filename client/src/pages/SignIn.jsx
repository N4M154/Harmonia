// import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import OAuth from "../components/OAuth";

// export default function SignIn() {
//   const [formData, setFormData] = useState({});
//   const { loading, error: errorMessage } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       return dispatch(signInFailure("Please fill all the fields"));
//     }
//     try {
//       dispatch(signInStart());
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(signInFailure(data.message));
//       }

//       if (res.ok) {
//         dispatch(signInSuccess(data));
//         navigate("/");
//       }
//     } catch (error) {
//       dispatch(signInFailure(error.message));
//     }
//   };
//   return (
//     <div className="min-h-screen bg-violet-50 dark:bg-[#18181b] pt-28">
//       <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
//         {/* left */}
//         <div className="flex-1">
//           <Link to="/" className="font-bold dark:text-white text-4xl">
//             <span className="px-2 py-1 rounded-lg text-black dark:text-gray-300 ">
//               Welcome to Harmonia
//             </span>
//           </Link>
//         </div>
//         {/* right */}

//         <div className="flex-1 rounded-3xl shadow-lg p-6 dark:shadow-violet-950/50">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <Label
//                 value="Your email"
//                 className="text-black dark:text-violet-300"
//               />
//               <TextInput
//                 type="email"
//                 placeholder="name@company.com"
//                 id="email"
//                 onChange={handleChange}
//                 className="!placeholder-black !text-white"
//               />
//             </div>
//             <div>
//               <Label
//                 value="Your password"
//                 className="text-black dark:text-violet-300"
//               />
//               <TextInput
//                 type="password"
//                 placeholder="**********"
//                 id="password"
//                 onChange={handleChange}
//               />
//             </div>
//             <Button
//               className="bg-violet-500 dark:bg-violet-600 hover:!bg-violet-700 text-black"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner size="sm" />
//                   <span className="pl-3">Loading...</span>
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </Button>
//             <span className="text-center text-sm">or continue with</span>
//             <OAuth />
//           </form>
//           <div className="flex gap-2 text-sm mt-5 dark:text-white">
//             <span>Dont Have an account?</span>
//             <Link
//               to="/sign-up"
//               className="text-violet-500 font-bold hover:underline"
//             >
//               Sign Up
//             </Link>
//           </div>
//           {errorMessage && (
//             <Alert className="mt-5" color="failure">
//               {errorMessage}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import ThemeToggle from "../components/ThemeToggle";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
          <h1 className="text-2xl font-light text-violet-500 ml-5">N4M154</h1>
          <nav className="hidden md:flex space-x-6"></nav>
          <div className="mr-5">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-violet-50 dark:bg-[#18181b] pt-28">
        <div className="flex flex-col items-center p-3 max-w-3xl mx-auto gap-5">
          {/* Top */}
          <div className="w-full text-center mb-7 mt-2">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-1 rounded-lg text-black dark:text-gray-300">
                Welcome back to{" "}
                <span className="text-violet-500">Harmonia</span>
              </span>
            </Link>
          </div>

          {/* Form */}
          <div className="w-1/2 flex dark:bg-gradient-to-b dark:from-[#18181b] dark:to-black justify-center rounded-3xl shadow-xl p-6 dark:shadow-violet-950/50 shadow-black">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
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
                  className="!placeholder-black !text-white"
                />
              </div>
              <div>
                <Label
                  value="Your password"
                  className="text-black dark:text-violet-300"
                />
                <TextInput
                  type="password"
                  placeholder="**********"
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
                  "Sign In"
                )}
              </Button>
              <span className="text-center text-sm dark:text-gray-400">
                or continue with
              </span>
              <OAuth />
            </form>
          </div>

          <div className="flex gap-2 text-sm mt-5 dark:text-white">
            <span>Don&apos;t Have an account?</span>
            <Link
              to="/sign-up"
              className="text-violet-500 font-bold hover:underline"
            >
              Sign Up
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
