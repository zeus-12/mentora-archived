// to define a general layout

import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="px-16 pt-4 bg-[#080d13] min-h-[92vh]">{children}</div>
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
