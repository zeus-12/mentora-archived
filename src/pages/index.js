import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

const features = [
  {
    title: "Resources",
    body: "Mentora is a platform that let you share resources with others. Providing you and your friends with the best resources to ace the exams. It contains previous year QP's, Textbooks, etc.",
  },
  {
    title: "Q&A",
    body: "The Q&A section is the one-step solution to get all yours and your friends doubts cleared. After all we learning by helping others.",
  },
  {
    title: "Buddy",
    body: "The student-buddy feature let you find a buddy to study with. Or if you need more help, you could get a senior to tutor you (for a price ofcourse XD).",
  },
  {
    title: "Quiz",
    body: "It provides you with a platform to create and take quizzes. You can create quizzes and share it with your friends. This is the perfect method for your final revision.",
  },
];

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="md:p-4 p-2 lg:p-6 xl:p-8">
      <Head>
        <title>Mentora</title>
        <meta name="description" content="All-In-One App for Acads!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p className="text-4xl font-bold md:text-5xl text-gray-100 tracking-tight lg:text-7xl block">
        👋 Hello there,
      </p>

      <p className="xl:ml-24 md:text-4xl md:max-w-[55rem] text-2xl font-semibold text-gray-400 mt-4">
        Here&apos;s the Perfect solution to achieve your dream{" "}
        <span className="text-green-400">CG</span>, &{" "}
        <span className="text-green-600">Here&apos;s Why</span>
      </p>

      {features.map((item, index) => (
        <div
          key={index}
          className={`flex-col-reverse gap-2 sm:gap-6 sm:flex-row flex justify-evenly items-center ${
            index % 2 == 0 ? "sm:flex-row-reverse" : ""
          } mt-8`}
        >
          <div className="w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw]">
            <Image
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
              src={`/${item.title}.png`}
              alt={item.title}
            />
          </div>
          <div className="w-full sm:w-3/4 md:w-1/2">
            <p className="sm:text-4xl text-3xl font-semibold text-green-400">
              {item.title}
            </p>
            <p className="font-medium text-gray-400 mt-2 text-xl">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
