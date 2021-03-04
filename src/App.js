import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'
import Following from './components/Following'
import AddFollowing from './components/AddFollowing'
import TasksList from './components/TasksList'


const App = () => {
  const [showSelectedTasks, setShowSelectedTasks] = useState(false)
  const [tasks, setTasks] = useState([
  ])
  const [following, setFollowing] = useState([
  ])
  const [username, setUsername] = useState("")
  const [tasksList, setTasksList] = useState([
  ])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      setTasksList([tasksFromServer])
    }

    getTasks()

    const getFollowing = async () => {
      const followingFromServer = await fetchFollowing()
      setFollowing(followingFromServer)
    }

    getFollowing()

  }, [username])


  useEffect(() => {

    setTasksList([tasks, ...tasksList.splice(1)])

  }, [tasks])


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks?Username=${username}`)
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Fetch Following Specific to User
  const fetchFollowing = async () => {
    const res = await fetch(`https://taskinit-backend.herokuapp.com/following?Username=${username}`)
    const data = await res.json()

    return data
  }


  // Fetch Tasks for specific user
  const fetchSpecificTasks = async (tarUsername) => {
    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks?Username=${tarUsername}`)
    const data = await res.json()

    setTasksList([...tasksList, data])
  }


  // Add Task
  const addTask = async (task) => {
    task.Difficulty = 1;
    task.Completion = false;
    task.Username = username
    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  //Add Following

  const addFollowing = async (follow) => {
    follow.Username = username;
    let i = 0;
    for (i = 0; i < following.length; i++) {
      if (following[i].following === follow.following && following[i].Username === follow.Username) {
        alert("You have already followed this person!")
        return
      }
    }
    const res = await fetch('https://taskinit-backend.herokuapp.com/following', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(follow)
    })

    const data = await res.json()

    setFollowing([...following, data])
  }



  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))

  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()


    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            data.reminder
        } : task
      )
    )
  }

  // taskDiffup
  const taskDiffup = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 9 ? (taskAdjusted.Difficulty + 1) : 9
    }

    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, Difficulty:
            data.Difficulty
        } : task
      )
    )
  }


  // taskDiffdown
  const taskDiffdown = async (id) => {
    const taskAdjusted = await fetchTask(id)
    const updTaskc = {
      ...taskAdjusted,
      Difficulty: taskAdjusted.Difficulty !== 1 ? (taskAdjusted.Difficulty - 1) : 1
    }

    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, Difficulty:
            data.Difficulty
        } : task
      )
    )
  }


  //completes a task
  const taskCompletion = async (id) => {
    const taskToComplete = await fetchTask(id)
    const updTaskComp = {
      ...taskToComplete,
      Completion: true
    }

    const res = await fetch(`https://taskinit-backend.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskComp)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, Completion:
            data.Completion
        } : task


      )
    )

  }


  //User name's input
  const userInput = (username) => {
    setUsername(username)
  }

  return (

    <Router>
      {username !== "" ? (
        <div className="grid-container">
          <div className="title">
            <Header />
          </div>
          <Route path='/' exact render={(props) => (
            <>
              <div className="body">
                <TasksList tasksList={tasksList} username={username} onDelete={deleteTask} onToggle={toggleReminder} onUp={taskDiffup} onDown={taskDiffdown} onComplete={taskCompletion} onAdd={addTask}></TasksList>
              </div>
              <div className="sidebar">
                <AddFollowing onFollow={addFollowing} ></AddFollowing>
                <Following following={following} tarUsername={fetchSpecificTasks} ></Following>
              </div>
            </>
          )} />
          <Route path='/about' component={About} />
          <div className="footer">
            <Footer />
          </div>
        </div>
      ) : (
          <Login onUser={userInput} ></Login>
        )
      }
    </Router>
  );
}

export default App;
