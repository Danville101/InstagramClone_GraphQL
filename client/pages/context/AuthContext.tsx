import React , {createContext,  useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { FINDME } from '../../graphql/quaries'
import withApollo from '../../libs/withApollo'

import { getDataFromTree } from '@apollo/client/react/ssr'
export const PageContext = createContext({})


const PageProvider = ({children}:any) => {

  const [user,setUser]=useState("")
  const {loading, error,data} = useQuery(FINDME,
          
    { onCompleted(data) {
         setUser(data.findMe)}
    
    }
      )


      const [overflowScroll, setOverflowScroll]= useState(true)

      const [reelIndex, setReelIndex]= useState(0)

      

  return (
   <PageContext.Provider value={{user, overflowScroll, setOverflowScroll, reelIndex, setReelIndex}}>
     {children}
   </PageContext.Provider>
  )
}


export default  PageProvider







