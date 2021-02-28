import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        setOkMessage(
          `a new blog '${newBlogTitle}' by '${newBlogAuthor}' added`
        )
        setTimeout(() => {
          setOkMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `${JSON.stringify(error.response.data)}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }) 
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleBlogChangeTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogChangeAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogChangeUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleClickLockout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload()
  }

  const loginForm = () => (
    <div><h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>      
  )

  const blogForm = () => (
    <div><h2>blogs</h2>
      <p>{user.name} logged-in
        <button onClick={handleClickLockout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          value={newBlogTitle}
          onChange={handleBlogChangeTitle}
        /><br />
        Author:
        <input
          value={newBlogAuthor}
          onChange={handleBlogChangeAuthor}
        /><br />
        Url:
        <input
          value={newBlogUrl}
          onChange={handleBlogChangeUrl}
        /><br />
        <button type="submit">save</button>
      </form><br />
      {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>  
  )

  return (
    <div>    
      <Notification messageErr={errorMessage} messageOk={okMessage} />
      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App