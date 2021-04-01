import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'
import Following from './components/Following'
import AddFollowing from './components/AddFollowing'
import TasksList from './components/TasksList'
import Register from './components/Register'


const App = () => {
  const [auth, setAuth] = useState(false)
  const [tasksList, setTasksList] = useState([
  ])
  const [loginPage, setLoginPage] = useState(true)


  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasksList([tasksFromServer])
  }


  useEffect(() => {
    getTasks()
    // securebrowse()
  }, []);


  // const securebrowse = async () => {
  //   await fetch("https://taskinit-backendmangodb.herokuapp.com", {
  //     method: 'GET'
  //   })
  // }
  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("https://taskinit-backendmangodb.herokuapp.com/tasks", {
      credentials: 'include'
    })
    const data = await res.json()

    if (Array.isArray(data)) {
      setAuth(true)
    }
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`)
    const data = await res.json()

    return data
  }



  // Add Task
  const addTask = async (task) => {
    task.Difficulty = 1;
    task.Completion = false;
    const res = await fetch("https://taskinit-backendmangodb.herokuapp.com/tasks", {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const body = await res.json()
    await getTasks()
    alert(body.msg.errors.day.message)

  }

  //Add Following




  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'DELETE'
    })

    getTasks()

  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    getTasks()
  }

  // taskDiffup
  const taskDiffup = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 9 ? (taskAdjusted.Difficulty + 1) : 9
    }

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    getTasks()
  }


  // taskDiffdown
  const taskDiffdown = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 1 ? (taskAdjusted.Difficulty - 1) : 1
    }

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    getTasks()
  }


  //completes a task
  const taskCompletion = async (id) => {
    const taskToComplete = await fetchTask(id)
    const updTaskComp = {
      ...taskToComplete,
      Completion: true
    }

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskComp)
    })

    const data = await res.json()

    getTasks()

  }

  const login = async (user) => {
    const res = await fetch('https://taskinit-backendmangodb.herokuapp.com/api/user/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const body = await res.json()
    if (res.ok) {
      getTasks()
      setAuth(true)
    } else {
      alert(body.msg)
    }
  }

  const register = async (regUser) => {
    const res = await fetch('https://taskinit-backendmangodb.herokuapp.com/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regUser)

    })
    const body = await res.json()
    alert(body.msg)

  }

  const logout = async () => {
    const res = await fetch('https://taskinit-backendmangodb.herokuapp.com/api/user/logout', {
      credentials: 'include'
    })
    const data = await res.json()
    alert(data.msg)
    setAuth(false)
  }
  return (

    <Router>
      {auth ? (
        <div className="grid-container">
          <div className="title">
            <Header onClick={logout} auth={auth} />
          </div>
          <Redirect to="/" />
          <Route path='/' exact render={(props) => (
            <>
              <div className="body">
                <TasksList tasksList={tasksList} onDelete={deleteTask} onToggle={toggleReminder} onUp={taskDiffup} onDown={taskDiffdown} onComplete={taskCompletion} onAdd={addTask}></TasksList>
              </div>
              <div className="sidebar">
                {/* <AddFollowing onFollow={addFollowing} ></AddFollowing> */}
                {/* <Following following={following} tarUsername={fetchSpecificTasks} ></Following> */}
              </div>
            </>
          )} />
          <Route path='/about' component={About} />
          <div className="footer">
            <Footer />
          </div>
        </div>
      ) : (
        <>
          <div className="title">
            <Header />
          </div>
          <Switch>
            {loginPage &&
              <Route path='/'>
                <Login onLogin={login} onClick={() => { setLoginPage(false) }} />
              </Route>
            }
            <Route path='/register'>
              <Register onRegister={register} onSubmitz={() => { setLoginPage(true) }} onClick={() => { setLoginPage(true) }}></Register>
            </Route>
          </Switch>
        </>
      )
      }
    </Router>
  );
}

export default App;
