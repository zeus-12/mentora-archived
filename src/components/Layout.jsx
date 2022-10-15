// to define a general layout

import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-4 md:px-4 px-2 lg:px-6 xl:px-8 bg-[#080d13] min-h-[92vh]">
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
