import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getAllNews } from "@/features/news/newsActions";

const ManageNews = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  return (
    <div>
      <h1>NEWS</h1>
      {news.map((news) => (
        <div key={news._id}>
          <h2>{news.title}</h2>
          <p>{news.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageNews;
