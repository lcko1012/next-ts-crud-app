import router from "next/router";
import { PostForm } from "../../components/PostForm";

export type FormData = {
    title: string
    body: string
}

async function sendData(data: FormData) {
  const res = await fetch("/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const body = await res.json()
  
  if(!res.ok) {
    throw new Error(body.data.error.message)
  }
}

function AddNewPage() {
    
    function onFormSubmit(data: FormData) {
        try {
          sendData(data)
          alert("Post created successfully!")
        } catch (error) {
          alert("Something went wrong :/")
        }
    }

    return (
      <section className="m-4">
        <PostForm onSubmit={onFormSubmit}/> 
      </section>
    )
}

export default AddNewPage