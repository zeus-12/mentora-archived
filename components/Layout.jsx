// to define a general layout

const Layout = ({ children }) => {
  return (
    <div className=" bg-[#080d13] min-h-[92vh]">{children}</div>
    // <NotificationContext.Provider
    //   value={{ message, type, setMessage, setType }}
    // >
    //   {/* <Navbar  /> */}
    //   <Notification message={message} type={type} />
    // </NotificationContext.Provider>
  );
};
export default Layout;
