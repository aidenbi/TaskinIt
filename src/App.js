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
import update from 'react-addons-update';


const App = () => {
  const [tasksList, setTasksList] = useState({})
  const [followingx, setFollowingx] = useState()
  const [username, setUsername] = useState(null)
  const [loginPage, setLoginPage] = useState(true)
  const fetchURL = 'https://taskinit-backendmangodb.herokuapp.com'

  useEffect(() => {
    login()
  }, []);

  useEffect(() => {
    getFollowing()
    getTasks()
  }, [username])

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    if (username) {
      var data = { ...tasksList, [username]: tasksFromServer }
    }
    setTasksList(data)
  }

  console.log(1, username)
  console.log(2, tasksList)
  const getFollowing = async () => {
    const followingsFromServer = await fetchFollowings()
    setFollowingx(followingsFromServer)
  }

  const getfollowingTasks = async (user) => {
    const followingTasks = await fetchTarTasks(user)
    var data = { ...tasksList, [user]: followingTasks }
    setTasksList(data)
  }

  const removefollowingTasks = async (user) => {
    var data = { ...tasksList }
    delete data[user];
    setTasksList(data)
  }

  const followingTasksToggle = async (user) => {
    if (user in tasksList) {
      removefollowingTasks(user)
    } else {
      getfollowingTasks(user)
    }
  }


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${fetchURL}/tasks`, {
      credentials: 'include'
    })
    const data = await res.json()
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${fetchURL}/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Fetch followings
  const fetchFollowings = async () => {
    const res = await fetch(`${fetchURL}/following`, {
      credentials: 'include'
    })
    const data = await res.json()
    return data
  }

  //Fetch Target User Tasks
  const fetchTarTasks = async (followname) => {

    const res = await fetch(`${fetchURL}/tasks/tartasks/${followname}`, {
      credentials: 'include'
    })
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    task.Difficulty = 1;
    task.Completion = false;
    const res = await fetch(`${fetchURL}/tasks`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const body = await res.json()
    getTasks()
    if (!task.day) {
      alert(body.msg.errors.day.message)
    }
  }
  //Add Following
  const addFollowing = async (user) => {
    const res = await fetch(`${fetchURL}/following`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const body = await res.json()
    await getFollowing()
    await getfollowingTasks(user.following)
    if (body.msg) {
      alert(body.msg)
    }

  }





  //UNFOLLOW
  const deleteFollowing = async (tarUsername) => {
    await fetch(`${fetchURL}/following/${tarUsername}`, {
      method: 'DELETE'
    })
    getFollowing()
  }


  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${fetchURL}/tasks/${id}`, {
      method: 'DELETE'
    })

    const body = await res.json()
    if (!res.ok) {
      alert(body.msg)
    }
    getTasks()

  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`${fetchURL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body.msg)
    }
    getTasks()
  }

  // taskDiffup
  const taskDiffup = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 9 ? (taskAdjusted.Difficulty + 1) : 9
    }

    const res = await fetch(`${fetchURL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body.msg)
    }
    getTasks()
  }


  // taskDiffdown
  const taskDiffdown = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 1 ? (taskAdjusted.Difficulty - 1) : 1
    }

    const res = await fetch(`${fetchURL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body.msg)
    }
    getTasks()
  }


  //completes a task
  const taskCompletion = async (id) => {
    const taskToComplete = await fetchTask(id)
    const updTaskComp = {
      ...taskToComplete,
      Completion: true
    }

    const res = await fetch(`${fetchURL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskComp)
    })

    const body = await res.json()
    if (!res.ok) {
      alert(body.msg)
    }
    getTasks()

  }

  const login = async (user) => {
    const res = await fetch(`${fetchURL}/api/user/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const body = await res.json()
    if (res.ok) {
      setUsername(body)

    } else {
      alert(body.msg)
    }
  }

  const register = async (regUser) => {
    const res = await fetch(`${fetchURL}/api/user/register`, {
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
    const res = await fetch(`${fetchURL}/api/user/logout`, {
      credentials: 'include'
    })
    const data = await res.json()
    alert(data.msg)
    setUsername(null)
    setTasksList({})
  }


  return (

    <Router>
      {username !== null && tasksList !== undefined ? (
        <div className="grid-container">
          <div className="title">
            <Header onClick={logout} auth={username} />
          </div>
          <Redirect to="/" />
          <Route path='/' exact render={(props) => (
            <>
              <div className="body">
                <TasksList tasksList={tasksList} onDelete={deleteTask} onToggle={toggleReminder} onUp={taskDiffup} onDown={taskDiffdown} onComplete={taskCompletion} onAdd={addTask}></TasksList>
              </div>
              <div className="sidebar">
                <AddFollowing onFollow={addFollowing} ></AddFollowing>
                <Following following={followingx} tarUsername={deleteFollowing} userTasksToggle={followingTasksToggle} ></Following>
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
