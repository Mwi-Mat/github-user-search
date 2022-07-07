import { Avatar, Card, Grid, Link, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/system'
import { UserData } from '../../utils/interfaces'

interface ResultsTableProps {
  data: UserData[]
}

function ResultsTable(props: ResultsTableProps) {
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={4}>
        {props.data.map((user) => (
          <Grid item key={user.id}>
            <Card
              variant='outlined'
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <CardContent sx={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
                <Avatar src={user.avatar_url} alt={`${user.login} profile picture`} />
                <Typography variant='h4' component='div'>
                  {user.login}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={user.html_url} target='_blank' color='secondary'>
                  Visit Profile
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ResultsTable
