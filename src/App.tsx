import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
// import MovieImage from './component/MovieImage';
import MovieList from './component/MovieList';


interface IState {
    movies: any[],
    open: boolean,
    selectedMovie: any,
    uploadFile: any
}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            movies: [],
            open: false,
            selectedMovie: { "id": 0, "title": "Loading", "playtime": "0", "genre": "", "rating": "", "url": "", "uploaded": "", "width": "0", "height": "0" },
            uploadFile: null
        }

        this.fetchMovies("")
        this.selectNewMovie = this.selectNewMovie.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.fetchMovies = this.fetchMovies.bind(this)
        this.uploadMovieData = this.uploadMovieData.bind(this)

    }

    public render() {
        const { open } = this.state;
        return (
            <div>
                <div className="header-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-item nav-link active" href="#">HOT MOVIES <span className="sr-only">(current)</span></a>
                                <a className="nav-item nav-link" href="#">Features</a>
                                <a className="nav-item nav-link" href="#">Pricing</a>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-">
                            <MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} searchByTitle={this.fetchMovies} />
                        </div>

                    </div>
                </div>
                {/* <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <MovieImage selectedMovie={this.state.selectedMovie} />
                        </div>
                    </div>
                </div> */}

                <div className="container header">
                    <div className="btn btn-primary btn-action btn-add" onClick={this.openModal}>Add Movie</div>
                </div>

                {/* Modal used for Adding Movie */}

                <Modal open={open} onClose={this.closeModal}>
                    <form>
                        <div className="form-group-title">
                            <label>Movie Title</label>
                            <input type="text" className="form-control" id="movie-title-input" placeholder="Enter Title" />
                            <small className="form-text text-muted">Movie Title can be used for search</small>
                        </div>
                        <div className="form-group-playtime">
                            <label>Running hour</label>
                            <input type="text" className="form-control" id="movie-playtime-input" placeholder="Enter playtime in min" />
                            <small className="form-text text-muted">Enter running hour for movie</small>
                        </div>
                        <div className="form-group-genre">
                            <label>Genre</label>
                            <input type="text" className="form-control" id="movie-genre-input" placeholder="Enter genre of the movie" />
                            <small className="form-text text-muted">Movie genre can be used for search</small>
                        </div>
                        <div className="form-group-rating">
                            <label>Rating</label>
                            <input type="text" className="form-control" id="movie-rating-input" placeholder="Enter rating of the movie" />
                            <small className="form-text text-muted">Eg. PG, R15</small>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="movie-image-input" />
                        </div>

                        <button type="button" className="btn" onClick={this.uploadMovieData}>Upload</button>
                    </form>
                </Modal>

            </div>
        );
    }

    private handleFileUpload(fileList: any) {
        this.setState({
            uploadFile: fileList.target.files
        })
    }

    private uploadMovieData() {
        const movieTitle = document.getElementById("movie-title-input") as HTMLInputElement
        const moviePlaytime = document.getElementById("movie-playtime-input") as HTMLInputElement
        const movieGenre = document.getElementById("movie-genre-input") as HTMLInputElement
        const movieRating = document.getElementById("movie-rating-input") as HTMLInputElement
        const imageFile = this.state.uploadFile[0]

        if (movieTitle === null || moviePlaytime === null || movieGenre === null || movieRating === null || imageFile === null) {
            return;
        }

        const title = movieTitle.value
        const playtime = moviePlaytime.value
        const genre = movieGenre.value
        const rating = movieRating.value
        const url = "https://jinmsamovieapi.azurewebsites.net/api/Movie/upload"

        const formData = new FormData()
        formData.append("Title", title)
        formData.append("Playtime", playtime)
        formData.append("Genre", genre)
        formData.append("Rating", rating)
        formData.append("image", imageFile)

        fetch(url, {
            body: formData,
            headers: { 'cache-control': 'no-cache' },
            method: 'POST'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    location.reload()
                }
            })
    }



    // Modal open
    private openModal = () => {
        this.setState({ open: true });
    };

    // Modal close
    private closeModal = () => {
        this.setState({ open: false });
    };

    // Change selected movie
    private selectNewMovie(newMovie: any) {
        this.setState({
            selectedMovie: newMovie
        })
    }

    private fetchMovies(title: any) {
        let url = "https://jinmsamovieapi.azurewebsites.net/api/Movie"
        if (title !== "") {
            url += "/title?=" + title
        }
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(json => {
                let selectedMovie = json[0]
                if (selectedMovie === undefined) {
                    selectedMovie = { "id": 0, "title": "Loading", "playtime": 0, "genre": "try something different", "rating": "", "url": "", "uploaded": "", "width": "0", "height": "0" }
                }
                this.setState({
                    selectedMovie,
                    movies: json

                })
            });
    }

}

export default App;
