import { Button } from "flowbite-react";
import { FaXTwitter, FaGoogle } from "react-icons/fa6";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  TwitterAuthProvider,
} from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTwitterClick = async () => {
    try {
      const provider = new TwitterAuthProvider();
      // const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/twitter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      console.log("could not login with twitter", error);
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <Button
        type="button"
        className="bg-black dark:bg-black dark:border dark:border-violet-700 hover:!bg-gray-800"
        onClick={handleGoogleClick}
      >
        <FaGoogle className="w-6 h-6 mr-2 text-pink-700" />
      </Button>
      <Button
        type="button"
        className="bg-black dark:bg-black dark:border dark:border-violet-700 hover:!bg-gray-800"
        onClick={handleTwitterClick}
      >
        <FaXTwitter className="w-6 h-6 mr-2 text-blue-700" />
      </Button>
    </div>
  );
}
