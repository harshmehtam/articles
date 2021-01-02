import React, { useState, useEffect } from 'react';
import InfinitScroll from 'react-infinite-scroll-component'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';

const useStyles = makeStyles({
  root: {
    padding: 20
  },
  cardRoot: {
    maxWidth: 345
  },
  media: {
    height: 140,
  },
});

function App() {
  const classes = useStyles();
  const [article, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPassenger, setTotalPassenger] = useState();

  useEffect(() => {
    fetchNextUsers()
  }, [])

  const fetchNextUsers = () => {
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
      .then(response => response.json())
      .then(json => {
        setArticles(articles => [...articles, ...json.data])
        setPage(page => page + 1)
        setTotalPassenger(json.totalPassengers)
      })
  }

  return (
    <InfinitScroll
      dataLength={article.length}
      next={fetchNextUsers}
      hasMore={article.length < totalPassenger}
      loader={<h4>Loading ... </h4>}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {
        article.map(art => <Grid style={{ marginBottom: 10, marginTop: 20 }} item xs={4} sm={4}>
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={art.airline.logo || ''}
                title={art.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {art.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {art.head_quaters}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {art.established}
              </Button>
            </CardActions>
          </Card>
        </Grid>)
      }
    </InfinitScroll>
  );
}

export default App;
