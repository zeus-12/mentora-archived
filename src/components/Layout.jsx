// to define a general layout

import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <>
      {/* px-1 sm:px-2 md:px-4 lg:px-6 xl:px-32 */}
      <Navbar />
      <div className="pt-4 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13] min-h-[92vh]">
        {children}
      </div>
    </>
    // <NotificationContext.Provider
    //   value={{ message, type, setMessage, setType }}
    // >
    //   {/* <Navbar  /> */}
    //   <Notification message={message} type={type} />
    // </NotificationContext.Provider>
  );
};
export default Layout;
