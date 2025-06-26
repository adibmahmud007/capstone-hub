 
// import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="relative pl-[500px] z-10 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white pb-8 pt-12 lg:pb-12 lg:pt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {/* Company Info Section */}
            <div className="w-full px-4 sm:w-2/3 lg:w-4/12">
              <div className="mb-8 w-full">
                <a href="/" className="mb-6 inline-block">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Openspace
                  </h2>
                  <p className="text-blue-300 text-sm font-medium">
                    Capstone Repository System
                  </p>
                </a>
                <p className="mb-5 text-base text-gray-300 leading-relaxed">
                  A comprehensive platform for managing and showcasing academic capstone projects, 
                  fostering collaboration between students, faculty, and industry partners.
                </p>
                <div className="flex items-center text-sm font-medium text-white">
                  <span className="mr-3 text-blue-400">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        fill="currentColor"
                      />
                      <path
                        d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span>support@openspace.edu</span>
                </div>
              </div>
            </div>

            {/* Academic Links */}
            

            {/* Connect Section */}
            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="mb-8 w-full">
                <h4 className="mb-6 text-lg font-semibold text-white">
                  Connect With Us
                </h4>
                <div className="mb-6 flex items-center">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300 sm:mr-4 lg:mr-3 xl:mr-4"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
                <div className="text-sm text-gray-400">
                  <p className="mb-2">© 2025 Openspace Repository System</p>
                  <div className="flex flex-wrap gap-4">
                    <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div>
          <span className="absolute bottom-0 left-0 z-[-1] opacity-30">
            <svg
              width={217}
              height={229}
              viewBox="0 0 217 229"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-64 140.5C-64 62.904 -1.096 1.90666e-05 76.5 1.22829e-05C154.096 5.49924e-06 217 62.904 217 140.5C217 218.096 154.096 281 76.5 281C-1.09598 281 -64 218.096 -64 140.5Z"
                fill="url(#paint0_linear_footer)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_footer"
                  x1="76.5"
                  y1={281}
                  x2="76.5"
                  y2="1.22829e-05"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#1e40af" stopOpacity="0.1" />
                  <stop offset={1} stopColor="#1e293b" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-10 top-10 z-[-1] opacity-20">
            <svg
              width={75}
              height={75}
              viewBox="0 0 75 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 -1.63918e-06C58.2107 -2.54447e-06 75 16.7893 75 37.5C75 58.2107 58.2107 75 37.5 75C16.7893 75 -7.33885e-07 58.2107 -1.63918e-06 37.5C-2.54447e-06 16.7893 16.7893 -7.33885e-07 37.5 -1.63918e-06Z"
                fill="url(#paint0_linear_footer_circle)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_footer_circle"
                  x1="-1.63917e-06"
                  y1="37.5"
                  x2={75}
                  y2="37.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset={1} stopColor="#1e293b" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </footer>
    </>
  );
};

// const LinkGroup = ({ children, header }) => {
//   return (
//     <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
//       <div className="mb-8 w-full">
//         <h4 className="mb-6 text-lg font-semibold text-white">
//           {header}
//         </h4>
//         <ul className="space-y-3">{children}</ul>
//       </div>
//     </div>
//   );
// };

// const NavLink = ({ link, label }) => {
//   return (
//     <li>
//       <a
//         href={link}
//         className="inline-block text-base leading-loose text-gray-300 hover:text-blue-400 transition-colors duration-200"
//       >
//         {label}
//       </a>
//     </li>
//   );
// };

export default Footer;