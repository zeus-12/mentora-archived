import { Avatar, Burger, Drawer, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { generateAvatarText } from "../../utils/helper";
import { GREEN_400 } from "../../lib/constants";

const MiddleSectionElements = [
  { name: "Q&A", link: "/doubt" },
  { name: "Resources", link: "/course" },
  { name: "Buddy", link: "/buddy" },
];

export const BurgerComponent = ({ opened, setOpened }) => {
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <Burger
      color={GREEN_400}
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
  );
};

export const LinkComponent = ({ link, name }) => {
  const router = useRouter();
  const cur = router.pathname;

  return (
    <Link href={link} passHref>
      <p
        className={`${
          cur.startsWith(link)
            ? "text-green-500"
            : "text-gray-400 opacity-60 hover:opacity-90"
        } px-2 py-1 text-xl font-semibold rounded-md cursor-pointer text-center hover:bg-gray-900`}
      >
        {name}
      </p>
    </Link>
  );
};

export const NavbarMiddleSection = ({ className }) => {
  return (
    <div className={`flex gap-4 xl:gap-8 ${className}`}>
      {MiddleSectionElements.map((item) => (
        <LinkComponent key={item.name} link={item.link} name={item.name} />
      ))}
    </div>
  );
};

export const LoginUserComponent = ({ session }) => {
  return (
    <div className="flex justify-center">
      {/* Logout & SignIn*/}
      {session && (
        <Link href="/user" passHref>
          <UnstyledButton>
            <div className="flex gap-2 sm:gap-3 lg:gap-4 items-center">
              <Avatar size={40} color="blue">
                {generateAvatarText(session.user.name)}
              </Avatar>
              <div>
                <Text>{session.user.name}</Text>
                <Text size="xs" color="dimmed">
                  {session.user.email}
                </Text>
              </div>
            </div>
          </UnstyledButton>
        </Link>
      )}

      {!session && <LinkComponent link="/api/auth/signin" name="Login" />}
    </div>
  );
};

export const Logo = ({ setOpened = () => {}, textSize = "text-2xl" }) => (
  <Link href="/" passHref>
    <div
      onClick={() => setOpened(false)}
      className="flex items-center hover:cursor-pointer"
    >
      <p className={textSize + " tracking-tighter font-bold"}>
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
