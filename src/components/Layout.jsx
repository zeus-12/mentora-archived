// to define a general layout

import Link from "next/link";
import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-4 flex-1 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13]">
        {children}
      </div>
      <div className="flex items-center justify-between py-2 px-8 bg-[#080d13] text-gray-400">
        <p className="mx-auto">Made with ❤️ as part of TechSoc IITM.</p>
        <Link passHref href="/feedback">
          <p className="text-green-300 hover:cursor-pointer hover:underline underline-offset-4 ">
            Feedback
          </p>
        </Link>
      </div>
    </div>
    // <NotificationContext.Provider
    //   value={{ message, type, setMessage, setType }}
    // >
    //   {/* <Navbar  /> */}
    //   <Notification message={message} type={type} />
    // </NotificationContext.Provider>
  );
};
export default Layout;
