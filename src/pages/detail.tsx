import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
  Box,
  CardContent,
  Button,
} from "@mui/material";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/main.layout";
import axios from "axios";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [animeDetail, setAnimeDetail] = React.useState<any>(null);

  React.useEffect(() => {
    axios.defaults.baseURL = "https://api.jikan.moe/v3/";
    axios
      .get(`anime/${params.id}`)
      .then((res) => {
        setAnimeDetail(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <MainLayout>
      <Container maxWidth="xl">
        {animeDetail && (
          <Grid container spacing={2} sx={{ my: 4 }}>
            <Grid item xs={3}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="600"
                  image={animeDetail.image_url}
                  alt="green iguana"
                />
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {animeDetail.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {animeDetail.synopsis}
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ my: 4 }}>
                <Grid item xs={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" align="center">
                        {animeDetail.score}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" align="center">
                        Scored By {animeDetail.scored_by}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" align="center">
                        #{animeDetail.rank}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" align="center">
                        Ranking
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" align="center">
                        #{animeDetail.popularity}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" align="center">
                        Popularity
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" align="center">
                        {animeDetail.members}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" align="center">
                        Members
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </MainLayout>
  );
};

export default Detail;
