import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Only render the button if the user is on the "/home" route
  if (location.pathname !== "/home") return null;

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 p-3 bg-violet-500/50 text-white rounded-full shadow-xl dark:shadow-violet-700/60 shadow-black/60 hover:bg-violet-500 transition-all duration-300 z-50"
          style={{ zIndex: 9999 }}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
