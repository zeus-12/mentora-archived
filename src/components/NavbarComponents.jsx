import { Burger, Drawer } from "@mantine/core";
import Link from "next/link";
// import { NotificationContext } from "../utils/context";
import { useRouter } from "next/router";

const MiddleSectionElements = [
  { name: "Doubts", link: "/doubts" },
  { name: "Materials", link: "/course" },
  { name: "Buddy", link: "/buddy" },
];

export const BurgerComponent = ({ opened, setOpened }) => {
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <Burger
      color="#"
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
  );
};

export const LinkComponent = ({ link, name }) => {
  const router = useRouter();
  const cur = router.pathname;

  console.log(cur);
  return (
    <Link href={link} passHref>
      <p
        className={`${
          cur === link ? "text-green-500" : "text-gray-400"
        } px-2 py-1 text-xl font-semibold rounded-md hover:text-white cursor-pointer text-center hover:bg-gray-900`}
      >
        {name}
      </p>
    </Link>
  );
};

export const NavbarMiddleSection = ({ className }) => {
  return (
    <div className={`flex gap-6 ${className}`}>
      {MiddleSectionElements.map((item) => (
        <LinkComponent key={item.name} link={item.link} name={item.name} />
      ))}
    </div>
  );
};

export const LoginUserComponent = ({ session }) => {
  //   const { setMessage, setType } = useContext(NotificationContext);
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
          <LinkComponent link="/user" name={session.user.name} />
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
      <p className={textSize + " font-bold"}>
        <span className="text-green-500">Mentor</span>a
      </p>
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
      <NavbarMiddleSection className="flex-col" />
      <LoginUserComponent session={session} />
    </div>
  </Drawer>
);
