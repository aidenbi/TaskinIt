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
  const [auth, setAuth] = useState(false)
  const [tasksList, setTasksList] = useState([
  ])


  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasksList([tasksFromServer])
  }







  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("https://taskinit-backendmangodb.herokuapp.com/tasks", {
      credentials: 'include'
    })
    const data = await res.json()
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

    const data = await res.json()

    setTasksList[0]([...data])
  }

  //Add Following




  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasksList[0](tasksList[0].filter((task) => task._id !== id))

  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()


    setTasksList[0](
      tasksList[0].map((task) =>
        task._id === id ? {
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

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    const data = await res.json()

    setTasksList[0](
      tasksList[0].map((task) =>
        task._id === id ? {
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

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskc)
    })

    const data = await res.json()

    setTasksList[0](
      tasksList[0].map((task) =>
        task._id === id ? {
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

    const res = await fetch(`https://taskinit-backendmangodb.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTaskComp)
    })

    const data = await res.json()

    setTasksList[0](
      tasksList[0].map((task) =>
        task._id === id ? {
          ...task, Completion:
            data.Completion
        } : task


      )
    )

  }

  const login = async (user) => {
    await fetch('https://taskinit-backendmangodb.herokuapp.com/api/user/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    await getTasks()
    setAuth(!auth)

  }


  return (

    <Router>
      {auth ? (
        <div className="grid-container">
          <div className="title">
            <Header />
          </div>
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
        <Login onLogin={login}></Login>
      )
      }
    </Router>
  );
}

export default App;
