// to define a general layout

import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-4 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13] ">
        {children}
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
