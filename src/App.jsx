import { useEffect, useState } from 'react'
import './App.css'
import { loadState, saveState, selfCheck } from './domain'
import Login from './components/Login'
import Shell from './components/Shell'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import AlertEditor from './components/AlertEditor'

export default function App() {
  const [account, setAccount] = useState(() =>
    JSON.parse(sessionStorage.getItem('iea-account') || 'null'),
  )
  const [data, setData] = useState(loadState)
  const [page, setPage] = useState('overview')
  const [edit, setEdit] = useState(null)
  const [result, setResult] = useState(null)

  useEffect(() => saveState(data), [data])
  useEffect(() => selfCheck(), [])

  if (!account) {
    return (
      <Login
        onLogin={(user) => {
          sessionStorage.setItem('iea-account', JSON.stringify(user))
          setAccount(user)
        }}
      />
    )
  }

  const signOut = () => {
    sessionStorage.removeItem('iea-account')
    setAccount(null)
  }

  const saveAlert = (alert) => {
    setData((old) => ({
      ...old,
      alerts: [...old.alerts.filter((item) => item.id !== alert.id), alert],
    }))
    setEdit(null)
  }

  return (
    <Shell
      account={account}
      page={page}
      setPage={setPage}
      signOut={signOut}
    >
      {account.role === 'admin' ? (
        <AdminDashboard data={data} />
      ) : (
        <UserDashboard
          data={data}
          setData={setData}
          page={page}
          setEdit={setEdit}
          result={result}
          setResult={setResult}
        />
      )}
      {edit && (
        <AlertEditor
          initial={edit}
          close={() => setEdit(null)}
          save={saveAlert}
        />
      )}
    </Shell>
  )
}
