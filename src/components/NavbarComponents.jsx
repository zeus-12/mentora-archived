import {
  Avatar,
  Burger,
  Drawer,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
// import { NotificationContext } from "../utils/context";
import { useRouter } from "next/router";
import { generateAvatarText } from "../utils/helper";

const MiddleSectionElements = [
  { name: "Q&A", link: "/doubts" },
  { name: "Resources", link: "/course" },
  { name: "Buddy", link: "/buddy" },
  { name: "Quiz", link: "/quiz" },
];

export const BurgerComponent = ({ opened, setOpened }) => {
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <Burger
      color="#22c55e"
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
    <div className={`flex lg:gap-4 xl:gap-8 ${className}`}>
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
        <UnstyledButton>
          <Group>
            <Avatar size={40} color="blue">
              {generateAvatarText(session.user.name)}
            </Avatar>
            <div>
              <Text>{session.user.name}</Text>
              <Text size="xs" color="dimmed">
                {session.user.email}
              </Text>
            </div>
          </Group>
        </UnstyledButton>

        // <div className="flex justify-center items-center">
        //   <img
        //     alt="user"
        //     src={session.user.image}
        //     className="w-9 h-9 rounded-full"
        //   />
        //   <LinkComponent link="/user" name={session.user.name} />
        // </div>
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
