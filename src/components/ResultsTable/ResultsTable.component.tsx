import { UserData } from '../../utils/interfaces'

interface ResultsTableProps {
  data: UserData[]
}

function ResultsTable(props: ResultsTableProps) {
  return (
    <ul>
      {props.data.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  )
}

export default ResultsTable
