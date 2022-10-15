import { Drawer } from "@mantine/core";
import Link from "next/link";
// import { NotificationContext } from "../utils/context";

export const LinkComponent = ({ link, name }) => (
  <Link href={link} passHref>
    <p className="px-2 py-1 text-gray-300 rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900">
      {name}
    </p>
  </Link>
);

export const LinkElements = ({ session }) => {
  //   const { setMessage, setType } = useContext(NotificationContext);
  console.log(session);
  return (
    <>
      {/* Logout & SignIn*/}
      {session && (
        <div className="flex justify-center items-center">
          <img
            alt="user"
            src={session.user.image}
            className="w-9 h-9 rounded-full"
          />
          <LinkComponent link="/" name={session.user.name} />
        </div>
      )}

      {!session && <LinkComponent link="/api/auth/signin" name="Login" />}
    </>
  );
};

export const Logo = ({ setOpened = () => {}, textSize = "text-2xl" }) => (
  <Link href="/" passHref>
    <div
      onClick={() => setOpened(false)}
      className="flex items-center hover:cursor-pointer"
    >
      <p className={textSize}>Mentora</p>
    </div>
  </Link>
);

export const NavbarDrawer = ({ opened, setOpened, session }) => (
  <Drawer
    className="pt-4 px-2 bg-black"
    onClick={() => setOpened(false)}
    opened={opened}
    position="right"
    size="100vh"
    onClose={() => setOpened(false)}
    overlayOpacity={0.55}
    overlayBlur={3}
    withCloseButton={false}
    zIndex={20}
  >
    <div className="text-2xl pt-16 space-y-4">
      <LinkElements session={session} />
    </div>
  </Drawer>
);
