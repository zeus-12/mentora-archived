// to define a general layout

import Navbar from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
<<<<<<< HEAD
      <div className="pt-4 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13] ">
=======
      <div className="pt-4 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13]">
>>>>>>> eba42b2f2d62bfdeb7ead65ebd14f4ac686ee31d
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
