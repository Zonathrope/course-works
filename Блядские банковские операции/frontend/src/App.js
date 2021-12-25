import React from 'react'
import Main from './components/Main/Main'
import Auth from './components/Auth/Auth'
import localStorage from './lib/localStorage/localStorage'
import { useGetUser } from './lib/query/user'

function App() {
  const {data, isLoading, refetch} = useGetUser(localStorage.getJWT())


  if(isLoading){
    return (<>Fetching...</>)
  }
  console.log(data)

  return (
    <div>
        {data.data && data.data.status === 'Active' ? <Main user={data.data} refetch={refetch}/> : <Auth />}
    </div>
  );
}

export default App;
