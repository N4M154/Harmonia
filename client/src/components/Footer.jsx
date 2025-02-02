// import { Footer } from "flowbite-react";
// import { Link } from "react-router-dom";
// import { BsGithub } from "react-icons/bs";
// export default function FooterCom() {
//   return (
//     <Footer
//       container
//       className="py-[0.5mm] border border-t-[4px] border-violet-200 dark:border-violet-800 bg-gradient-to-b from-white to-violet-100 dark:from-[#18181b] dark:to-[#18181b]"
//     >
//       <div className="w-full max-w-7xl mx-auto ">
//         <div className="grid w-full justify-between sm:flex md:grid-cols-1">
//           <div className="mt-5">
//             <Link
//               to="/"
//               className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
//             >
//               <span className="px-2 py-1 rounded-lg text-violet-500">
//                 N4M154
//               </span>
//             </Link>
//           </div>
//           <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
//             <div>
//               <Footer.Title title="About" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="/about"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Harmonia
//                 </Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Follow us" />
//               <Footer.LinkGroup col>
//                 <Footer.Link
//                   href="https://www.github.com/N4M154"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Github
//                 </Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//             <div>
//               <Footer.Title title="Legal" />
//               <Footer.LinkGroup col>
//                 <Footer.Link href="#">Privacy Policy</Footer.Link>
//                 <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
//               </Footer.LinkGroup>
//             </div>
//           </div>
//         </div>
//         <Footer.Divider />
//         <div className="w-full sm:flex sm:items-center sm:justify-between">
//           <Footer.Copyright
//             href="#"
//             by="Harmonia"
//             year={new Date().getFullYear()}
//           />
//           <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
//             <Footer.Icon href="https://github.com/N4M154" icon={BsGithub} />
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// }

// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="w-full p-4 bg-violet-50 dark:bg-[#18181b] border-t-2 border-violet-200 dark:border-gray-800 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-black sm:text-center dark:text-violet-300">
        © 2025 Harmonia. All Rights Reserved.
      </span>

      <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li className="mr-4 flex item-center">
          <a
            href="https://github.com/N4M154"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:underline text-black dark:text-violet-600/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.477 0 10c0 4.419 2.865 8.166 6.839 9.49.5.092.682-.218.682-.482 0-.237-.008-.865-.012-1.698-2.782.604-3.37-1.341-3.37-1.341-.454-1.15-1.108-1.457-1.108-1.457-.905-.618.069-.605.069-.605 1.002.07 1.53 1.029 1.53 1.029.891 1.525 2.34 1.085 2.912.829.092-.646.349-1.085.635-1.334-2.225-.251-4.565-1.106-4.565-4.937 0-1.09.39-1.984 1.029-2.682-.103-.251-.446-1.266.097-2.638 0 0 .837-.267 2.742 1.021.797-.221 1.649-.331 2.497-.335.848.004 1.7.114 2.497.335 1.905-1.288 2.742-1.021 2.742-1.021.544 1.372.2 2.387.097 2.638.641.698 1.029 1.592 1.029 2.682 0 3.839-2.343 4.683-4.576 4.93.36.308.678.916.678 1.849 0 1.335-.012 2.414-.012 2.744 0 .268.18.579.688.481C17.138 18.162 20 14.409 20 10c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
          <div className="border-r pr-4 mr-4"></div>
        </li>
        <div className="mr-4 flex items-center">
          <div className="pr-4 mr-4">
            <p className="font-semibold text-black dark:text-violet-600/80">
              Contact Us:
            </p>
          </div>

          <div className="flex items-center text-black dark:text-violet-600/80">
            <a
              href="mailto:email2@namisa.najah.raisa@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 2V6L20 9L12 6L4 9L1 6V2M1 6L12 13L23 6M23 15V19L20 22H4L1 19V15" />
              </svg>
              Namisa Najah
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
