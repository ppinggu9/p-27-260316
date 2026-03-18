"use client"

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Editor(){
    const [post, setPost] = useState<PostDto | null>(null);
    const router = useRouter();
    const {id} = useParams();

    useEffect(() => {
        fetchApi(`/api/v1/posts/${id}`)
        .then(setPost);
    }, []);

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title;
    const content = form.content;

    if (title.value.length === 0) {
      alert("제목을 입력해주세요.");
      title.focus();
      return;
    }

    if (content.value.length === 0) {
      alert("내용을 입력해주세요.");
      content.focus();
      return;
    }
    //db에 저장
    fetchApi(`/api/v1/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }),
    })
      .then((data) => {
           alert("글이 정상적으로 수정되었습니다.");
           router.replace(`/posts/${id}`); //현재 파라미터 id, data.data.postDto.id 
      })
  };

  if(post == null) return <div>로딩중 ...</div>

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <h1>글 수정</h1>

        <form action="" onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            className="border-1 rounded p-2"
            placeholder="제목을 입력해주세요"
            defaultValue={post.title}/>
          <textarea
            rows={10}
            name="content"
            className="border-1 rounded p-2"
            placeholder="내용을 입력해주세요"
            defaultValue={post.content}></textarea>
          <input type="submit" value="수정" className="border-1 rounded p-2 bg-blue-500" />
        </form>
      </div>
    </>
  );
}