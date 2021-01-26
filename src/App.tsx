import React from 'react';
import './App.css';
import {Grid} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import genres from "./model/mock/genres";
import imdbs from "./model/mock/imdbs";
import rottenToms from "./model/mock/rottenToms";

function App() {
    const [data, setData] = React.useState<any>(null);
    const [selectedGenre, setSelectedGenre] = React.useState<string>(genres[0]);
    const [selectedImdb, setSelectedImdb] = React.useState<number>(imdbs[0]);
    const [selectedRottenTom, setSelectedRottenTom] = React.useState<number>(rottenToms[0]);

    const [isMoviesChecked, setIsMoviesChecked] = React.useState<boolean>(true);
    const [isShowChecked, setIsShowChecked] = React.useState<boolean>(false);
    const [contentKind, setContentKind] = React.useState<'movie' | 'show' | 'both'>('movie');

    React.useEffect(() => {
        if (isMoviesChecked && isShowChecked) {
            setContentKind('both');
            return;
        }
        if (isShowChecked) {
            setContentKind('show');
            return;
        }
        setContentKind('movie');
    }, [isMoviesChecked, isShowChecked]);

    function spin() {
        fetch(getUrl())
            .then((response) => response.json())
            .then(setData);
    }

    function getUrl() {
        return `https://api.reelgood.com/roulette/netflix?availability=onAnySource&nocache=true&conte%20nt_kind=${contentKind}&minimum_imdb=${selectedImdb}&minimum_rt=${selectedRottenTom}`;
    }

    React.useEffect(() => {
        spin();
    }, []);

    return (
        <div className="App">
            <Grid container>
                <Grid item xs={5}>
                    <Grid container>
                        <Grid item xs={4}>GENRE</Grid>
                        <Grid item xs={8}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedGenre}
                                onChange={({target}) => setSelectedGenre(target.value as string)}
                                style={{ width: '100%' }}
                            >
                                {genres.map(genre => (
                                    <MenuItem value={genre}>{genre}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>TYPE</Grid>
                        <Grid item>
                            <Grid container>
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox checked={isMoviesChecked} onChange={() => setIsMoviesChecked(!isMoviesChecked)} name="moviesCheck" />}
                                        label="Movies"
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControlLabel
                                        control={<Checkbox checked={isShowChecked} onChange={() => setIsShowChecked(!isShowChecked)} name="showsCheck" />}
                                        label="TV Shows"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>IMDB</Grid>
                        <Grid item xs={8}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedImdb}
                                onChange={({target}) => setSelectedImdb(target.value as number)}
                                style={{ width: '100%' }}
                            >
                                {imdbs.map(imdb => (
                                    <MenuItem value={imdb}>{`> ${imdb}`}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={4}>ROTTEN TOM</Grid>
                        <Grid item xs={8}>
                            <Select
                                variant="filled"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedRottenTom}
                                onChange={({target}) => setSelectedRottenTom(target.value as number)}
                                style={{ width: '100%' }}
                            >
                                {rottenToms.map(rottenTom => (
                                    <MenuItem value={rottenTom}>{`> ${rottenTom}%`}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Button onClick={spin} variant="contained" fullWidth>SPIN</Button>
                </Grid>
                <Grid item xs={2}>
                    {data && <img style={{width: '100%'}} src={`https://img.reelgood.com/content/movie/${data.id}/poster-780.jpg`} />}
                </Grid>
                <Grid item xs={5}>
                    {data && (
                        <>
                            <h1>{data.title}</h1>
                            <p>{data.overview}</p>
                        </>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
