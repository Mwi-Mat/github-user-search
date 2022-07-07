import { useRef, useState } from 'react'
import { SearchData } from '../../utils/interfaces'
import ResultsTable from '../ResultsTable/ResultsTable.component'
import styles from './UserSearch.module.scss'

function UserSearch() {
  const [error, setError] = useState(null)
  const [data, setData] = useState<SearchData | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  async function fetchUsers(searchQuery: string) {
    await fetch(`https://api.github.com/search/users?q=${searchQuery}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result)
        },
        (error) => {
          setError(error)
        },
      )
  }

  function handleSearchRequest() {
    if (searchRef.current && searchRef.current.value !== '') {
      fetchUsers(searchRef.current.value)
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  } else {
    return (
      <div className={styles.wrapper}>
        <input type='text' ref={searchRef} />
        <button onClick={handleSearchRequest}>Search</button>
        {data && <ResultsTable data={data.items} />}
      </div>
    )
  }
}

export default UserSearch
