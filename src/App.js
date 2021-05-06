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
import bcrypt from 'bcryptjs'
import aesjs from 'aes-js'

const App = () => {
  const [tasksList, setTasksList] = useState({});
  const [followingx, setFollowingx] = useState();
  const [username, setUsername] = useState(null);
  const [loginPage, setLoginPage] = useState(true);
  const fetchURL = process.env.REACT_APP_FETCH_URL;
  const [encryptkey, setEncryptKey] = useState(null)


  useEffect(() => {
    login()
  }, []);

  useEffect(() => {
    getFollowing()
    getTasks()
  }, [username, encryptkey])

  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    if (username && encryptkey) {
      tasksFromServer.forEach(function (task) {
        console.log(task)
        if (task.encrypt === true) {
          const aesCtr = new aesjs.ModeOfOperation.ctr(encryptkey, new aesjs.Counter(5))
          task.text = aesjs.utils.utf8.fromBytes(aesCtr.decrypt(aesjs.utils.hex.toBytes(task.text)))
        }
      })
      tasksFromServer.forEach((task) => {
        task.ownTask = true
      })

      var data = { ...tasksList, [username]: tasksFromServer }
      setTasksList(data)
    }

  }


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
    task.Private = false;
    if (task.encrypt === true) {
      const aesCtr = new aesjs.ModeOfOperation.ctr(encryptkey, new aesjs.Counter(5))
      task.text = aesCtr.encrypt(aesjs.utils.utf8.toBytes(task.text))
      task.text = aesjs.utils.hex.fromBytes(task.text);
    }
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
    console.log(body)
    console.log(res)
    if (res.ok) {
      await getFollowing()
      await getfollowingTasks(user.following)
    } else {
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
      credentials: 'include',
      method: 'DELETE'
    })

    const body = await res.json()
    if (!res.ok) {
      alert(body)
    }
    getTasks()

  }

  // Toggle Private Task
  const togglePrivateTask = async (task) => {
    const taskToToggle = await fetchTask(task.id)
    const updTask = {
      ...taskToToggle,
      Private: task.ptask
    }

    const res = await fetch(`${fetchURL}/tasks/${task.id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body)
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
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body)
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
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body)
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
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })
    const body = await res.json()
    if (!res.ok) {
      alert(body)
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
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskComp)
    })

    const body = await res.json()
    if (!res.ok) {
      alert(body)
    }
    getTasks()

  }

  const login = async (user) => {
    const salt = `$2a$10$${process.env.REACT_APP_SALT_ONE}`
    if (user !== undefined) {
      user.newpassword = await bcrypt.hash(user.password, salt);
    }
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
      console.log(body)
      var epass = body.password.slice(body.password.length - 32)
      epass = aesjs.utils.utf8.toBytes(epass)
      setUsername(body.name)
      setEncryptKey(epass)
    } else {
      alert(body.msg)
    }
  }

  const register = async (regUser) => {
    const salt = `$2a$10$${process.env.REACT_APP_SALT_ONE}`
    regUser.password = await bcrypt.hash(regUser.password, salt);
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
                <TasksList username={username} tasksList={tasksList} onDelete={deleteTask} onToggle={toggleReminder} onUp={taskDiffup} onDown={taskDiffdown} onComplete={taskCompletion} onAdd={addTask} onPrivate={togglePrivateTask} ></TasksList>
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
