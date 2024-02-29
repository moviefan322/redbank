import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import News from "../../types/News";
import styles from "./NewsDetail.module.css";

type Props = {
  news: News;
};

function NewsDetail(props: Props) {
  const news: News | undefined = props.news;
  const fullDescriptionHTML = news!.description.replace(/\n/g, "<br />");

  if (!news) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
  }

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
          <small className="align-self-start align-self-md-center ms-3 ms-md-0">
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
              border: "2px solid black",
            }}
          ></div>
          <h6>{news.descriptionShort}</h6>
          <div dangerouslySetInnerHTML={{ __html: fullDescriptionHTML }} />
          {news.videoLink && (
            <div
              className={`d-flex flex-row justify-content-center mt-5 ${styles.videoResponsive}`}
            >
              <iframe
                src={`${news.videoLink}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          {news.link && (
            <Link
              className="noStyleLink mt-5 btn btn-sm btn-secondary"
              href={news.link}
            >
              <button className="noStyleButt">
                {news.linkText ? news.linkText : "Read More"}
              </button>
            </Link>
          )}
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
