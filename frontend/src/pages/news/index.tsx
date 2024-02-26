import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import News from "@/types/News";
import styles from "./index.module.css";

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
      <h1 className="text-center mt-5">News</h1>
      <div className="py-5 d-flex flex-column align-items-center align-items-md-start">
        {/* <NewsSearch onSearch={findNewsHandler} /> */}
        {allNews.map((news) => {
          return (
            <Link
              key={news._id}
              href={`/news/${news._id}`}
              className="nostyle-link"
            >
              <div className="d-flex flex-column align-items-center align-items-md-start mb-5 mx-5">
                <div
                  // className={styles.imageWrapper}
                  style={{
                    backgroundColor: "#151515",
                    backgroundImage: `url("${news.urlPhoto}")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    width: "250px",
                    height: "250px",
                  }}
                ></div>
                <h1 className="mt-3 mb-0 align-self-md-start">{news.title}</h1>
                <p className="align-self-end align-self-md-start">
                  <small>{new Date(news.createdAt).toLocaleDateString()}</small>
                </p>
                <p className="align-self-start fw-bold">
                  {news.descriptionShort}
                </p>
                <p
                  className={`${styles.description} align-self-start text-start`}
                >
                  {news.description}
                </p>
              </div>
            </Link>
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
