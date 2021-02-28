import React from 'react'

const BlogForm = ({ onSubmit, handleChangeTitle, valueTitle, handleChangeAuthor, valueAuthor, handleChangeUrl, valueUrl/*, hideWhenVisibleCreate*/ }) => (
    <div /*style={hideWhenVisibleCreate}*/>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        Title:
        <input
          value={valueTitle}
          onChange={handleChangeTitle}
        /><br />
        Author:
        <input
          value={valueAuthor}
          onChange={handleChangeAuthor}
        /><br />
        Url:
        <input
          value={valueUrl}
          onChange={handleChangeUrl}
        /><br />
        <button type="submit">create</button>
      </form><br />
    </div>  
  )
 
export default BlogForm