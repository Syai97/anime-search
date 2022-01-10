import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import MainLayout from "../layouts/MainLayout/main.layout";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [animeList, setAnimeList] = React.useState([]);
  const [totalPage, setTotalPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    axios.defaults.baseURL = "https://api.jikan.moe/v3/";
    axios
      .get(`search/anime?q=${search}&order_by=members&sort=desc&page=${currentPage}`)
      .then((res) => {
        setAnimeList(res.data.results);
        setTotalPage(res.data.last_page);
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
      });
    
  }, [search, currentPage]);

  const debounceSearch = React.useCallback(
    debounce((searchKeyword) => setSearch(searchKeyword), 250),
    []
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setLoading(true);
    setCurrentPage(value);
  };

  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box sx={{ my: 3 }}>
          <TextField
            label="Search your anime here..."
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setLoading(true);
              debounceSearch(e.target.value);
            }}
          />
        </Box>
        {loading === true && (
          <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
        {loading === false && (
          <Grid container spacing={2}>
            {animeList.map((anime: any) => (
              <Grid item xs={3} key={anime.mal_id}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="450"
                    image={anime.image_url}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {anime.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Score: {anime.score}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>{navigate(`/detail/${anime.mal_id}`)}}>Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ my: 3 }}>
          <Pagination
            count={totalPage}
            page={currentPage}
            size="large"
            sx={{ width: "100%" }}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Home;
