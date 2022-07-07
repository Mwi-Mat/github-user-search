import { Button, Pagination, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import ResultsTable from '../ResultsTable/ResultsTable.component'
import styles from './UserSearch.module.scss'

async function fetchUsers(searchQuery: string, page: number) {
  const { data } = await axios.get(
    `https://api.github.com/search/users?q=${searchQuery}&page=${page}`,
  )
  return data
}

function UserSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const { status, data, refetch } = useQuery('users', () => fetchUsers(searchQuery, page), {
    enabled: false,
  })

  useEffect(() => {
    if (searchQuery !== '') {
      refetch()
    }
  }, [page])

  function handleSearchSubmit() {
    if (searchQuery !== '') {
      refetch()
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  if (status === 'error') {
    return (
      <>
        <Typography variant='h2' component='div'>
          There was an error regarding your request.
        </Typography>
      </>
    )
  } else {
    return (
      <div className={styles.wrapper}>
        <h1>GitHub User Search</h1>
        <div className={styles.searchInput}>
          <TextField
            variant={'outlined'}
            value={searchQuery}
            size='small'
            placeholder='Search for users...'
            color='secondary'
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            fullWidth
          />
          <Button
            aria-label='Search'
            onClick={handleSearchSubmit}
            variant={'contained'}
            color='secondary'
            disabled={searchQuery === ''}
            fullWidth
          >
            Search
          </Button>
        </div>

        {data && <ResultsTable data={data.items} />}
        {data && data.total_count > 30 && (
          <Pagination
            count={data.total_count > 1000 ? 34 : Math.ceil(data.total_count / 30)}
            page={page}
            onChange={handlePageChange}
          />
        )}
      </div>
    )
  }
}

export default UserSearch
