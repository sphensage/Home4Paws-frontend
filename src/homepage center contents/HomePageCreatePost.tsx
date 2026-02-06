import React from 'react'
import CreatePostForm from '../forms/new/CreatePostForm';
import "/src/stylesheets/new/homepage_new.css";

const HomePageCreatePost = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="txt-main-label fw-bold fs-4">Create a post</div>
      </div>
      <CreatePostForm/>
    </div>
  )
}

export default HomePageCreatePost