import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import DOMPurify from "dompurify";
import News from "../../types/News";
import styles from "./NewsDetail.module.css";

type Props = {
  news: News;
};

function NewsDetail(props: Props) {
  const news: News | undefined = props.news;

  const sanitizeData = (data: string) => {
    const withLineBreaks = data.replace(/\n/g, "<br />");
    // Sanitize the modified string
    const sanitizedData = DOMPurify.sanitize(withLineBreaks, {
      ADD_TAGS: ["br"],
    });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedData }} />;
  };

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
      <div className="py-5">
        <div
          className={`${styles.eventDetail} d-flex flex-column justify-content-center align-items-center mb-5 mx-3`}
        >
          <Link
            className="nostyle-link align-self-start mb-5 fw-bold"
            href="/news"
          >{`<< All News`}</Link>
          <h1 className="align-self-center">{news.title}</h1>
          <small className="align-self-start ms-3">
            {new Date(news.createdAt).toLocaleDateString()}
          </small>
          <div
            className="m-3"
            style={{
              backgroundColor: "#151515",
              backgroundImage: `url("${news.urlPhoto}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              width: "300px",
              height: "300px",
            }}
          ></div>
          <h6>{news.descriptionShort}</h6>
          {sanitizeData(news.description)}
        </div>
      </div>
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
