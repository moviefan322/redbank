import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps } from "next";
import News from "@/types/News";

type Props = {
  news: News[];
};

function NewsPage(props: Props): JSX.Element {
  const router = useRouter();
  const allNews: News[] = props.news;

  function findNewsHandler(year: string, month: string) {
    const fullPath: string = `/news/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All News</title>
        <meta
          name="description"
          content="Find a lot of great news that allow you to evolve..."
        />
      </Head>
      <div>
        {/* <NewsSearch onSearch={findNewsHandler} /> */}
        {allNews.map((news) => {
          return (
            <div key={news._id}>
              <h1>{news.title}</h1>
              <p>{news.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`
  );
  const allNews: News[] = await response.json();

  return {
    props: {
      news: allNews,
    },
    revalidate: 60,
  };
};

export default NewsPage;
