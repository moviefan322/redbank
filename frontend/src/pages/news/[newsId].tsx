import React, { Fragment } from "react";
import Head from "next/head";
import News from "../../types/News";

type Props = {
  news: News;
};

function NewsDetail(props: Props) {
  const news: News | undefined = props.news;

  if (!news) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
  }

  console.log(news);

  return (
    <Fragment>
      <Head>
        <title>{news.title}</title>
        <meta name="description" content={news.description} />
      </Head>
      <h2>{news.title}</h2>
      {news.createdAt}
      <h4>{news.descriptionShort}</h4>
      <p>{news.description}</p>

      {news._id}
    </Fragment>
  );
}

export async function getStaticProps(context: any) {
  const newsId: string = context.params.newsId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${newsId}`
  );
  const news: News | undefined = await response.json();

  return {
    props: {
      news,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news`
  );
  const news = await response.json();

  const paths = news.map((news: News) => ({
    params: { newsId: news._id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export default NewsDetail;
