import React, { useState } from 'react';
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
    // flexGrow: 1,
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
  const [article, setArticles] = useState(() => {
    return Array(10).fill().map(() => ({
      title: "Product Management",
      date: 'September -11',
      time: '9:30AM',
      price: 'free'
    }));
  });

  const fetchNextUsers = () => {
    setArticles(articles => [...articles, ...article.concat(Array(10).fill().map(() => ({
      title: "Product Management",
      date: 'September -11',
      time: '9:30AM',
      price: 'free'
    })))])
  }

  return (
    <InfinitScroll
      dataLength={article.length}
      next={fetchNextUsers}
      hasMore={true}
      loader={<h4>Loading ... </h4>}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {
        article.map(art => <Grid style={{ marginBottom: 10, marginTop: 20 }} item xs={4} sm={4}>
          <Card className={classes.cardRoot}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={"party-img.jpg"}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {art.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {art.date}-{art.time}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {art.price}
              </Button>
            </CardActions>
          </Card>
        </Grid>)
      }
    </InfinitScroll>
  );
}

export default App;
