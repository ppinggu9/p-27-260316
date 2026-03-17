"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "../page";

export default function Home() {
  const [post, setPosts] = useState<Post | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  if(post === null )return (<div>로딩중...</div>) // 가드 클로즈라고도 한다
  return (
    <>
      {post == null ? (
        <div>로딩중...</div>
      ) : (
        <div className="flex flex-col gap-8 items-center">
          <div>{id}번 상세페이지</div>
          <div>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
          </div>
        </div>
      )}
    </>
  );
}
