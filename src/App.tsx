import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import MovieImage from './component/MovieImage';
import MovieList from './component/MovieList';
import Logo from './logo.png';


interface IState {
    loggedIn: boolean,
    movies: any[],
    open: boolean,
    openLogin: boolean,
    selectedMovie: any,
    uploadFile: any,
    id: any,
    password: any,
    shown: boolean,
    pv: any,


}

class App extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: null,
            loggedIn: false,
            movies: [],
            open: false,
            openLogin: false,
            password: null,
            pv: 0,
            selectedMovie: { "id": 0, "title": "Loading", "playtime": "0", "genre": "", "rating": "", "trailer": "", "url": "", "uploaded": "", "width": "0", "height": "0" },
            shown: true,
            uploadFile: null

        }

        this.fetchMovies("")
        this.fetchMovies = this.fetchMovies.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.uploadMovieData = this.uploadMovieData.bind(this)
        this.selectNewMovie = this.selectNewMovie.bind(this)

        this.loginIfYouCan = this.loginIfYouCan.bind(this)
        this.logout = this.logout.bind(this)

        this.createButton = this.createButton.bind(this)
        this.addMovieButton = this.addMovieButton.bind(this)

        this.searchMovieState = this.searchMovieState.bind(this)
        this.mainState = this.mainState.bind(this)

    }

    public render() {
        // tslint:disable-next-line:no-console
        console.log(this.state.pv);
        const { open } = this.state;
        const { openLogin } = this.state;
        return (
            <div>
                <div className="header-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <img className="navbar-brand" src={Logo} width="120" height="75" alt="" />
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">

                                {this.showMainOrSearch()}&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.createButton()}&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.addMovieButton()}
                            </div>
                        </div>
                    </nav>


                </div>

                {this.showMainPage()}

                <footer className="section footer-classic context-dark bg-image">
                <br/>
                    <div className="container">
                        <div className="row row-30">
                            <div className="col-md-4 col-xl-5">
                                <div className="pr-xl-4"><a className="brand" href="index.html"><img className="brand-logo-light" alt="" width="140" height="37" /></a>
                                    <p>I am having a good time</p>

                                    <p className="rights"><span>©  </span><span className="copyright-year">2018</span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h5>Contacts</h5>
                                
                                <dl className="contact-list">
                                    <dt>email:</dt>
                                    <dd><a href="mailto:#">spamhealer92@gmail.com</a></dd>
                                </dl>
                                <dl className="contact-list">
                                    <dt>phones:</dt>
                                    <dd><a href="tel:#">+6421-234-456</a>
                                    </dd>
                                </dl>
                            </div>
                            <div className="col-md-4 col-xl-3">
                                <h5>Links</h5>
                                <ul className="nav-list">
                                    <li><a href="#">Projects</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>





                {/* Modal used for Adding Movie */}

                <Modal open={open} onClose={this.closeAddMovieModal}>
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
                        <div className="form-group-trailer">
                            <label>Trailer</label>
                            <input type="text" className="form-control" id="movie-trailer-input" placeholder="Embed trailer link" />
                            <small className="form-text text-muted">Youtube link please</small>
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="movie-image-input" />
                        </div>

                        <button type="button" className="btn" onClick={this.uploadMovieData}>Upload</button>
                    </form>
                </Modal>


                {/* Modal used Login */}

                <Modal open={openLogin} onClose={this.closeLoginModal}>
                    <form className="login-modal">
                        <div className="form-group-id">
                            <label>ID</label>
                            <input type="text" className="form-control" id="id-input" placeholder="Enter login ID" />
                            <br />
                            <small />
                        </div>
                        <div className="form-group-password">
                            <label>Password</label>
                            <input type="text" className="form-control" id="password-input" placeholder="Enter password" />
                            <small />
                            <br />
                        </div>
                        <button type="button" className="btn" onClick={this.loginIfYouCan}>Login</button>
                    </form>
                </Modal>


            </div>
        );
    }

    private logout() {
        this.setState({
            loggedIn: !this.state.loggedIn
        })
        alert('Logged out')
        this.forceUpdate()
    }

    private searchMovieState() {
        this.setState({
            pv: 0
        })
        // tslint:disable-next-line:no-console
        console.log(this.state.pv);
    }

    private mainState() {
        this.setState({
            pv: 1
        })
        // tslint:disable-next-line:no-console
        console.log(this.state.pv);
    }

    private showMainPage() {
        if (this.state.pv === 0) {
            return (
                <div className="container-fluid container-border">
                    <div className="row justify-content-md-center">
                        <div className="col-12">

                            <MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} selectedMovie={this.state.selectedMovie} loggedIn={this.state.loggedIn} searchByTitle={this.fetchMovies} />

                        </div>

                    </div>
                </div>
            )
        } else {
            return <div className="container">
                <div className="row">
                    <MovieImage selectedMovie={this.state.selectedMovie} loggedIn={this.state.loggedIn} searchByTitle={this.fetchMovies} selectNewMovie={this.selectNewMovie} movies={this.state.movies} />

                </div>
            </div>
        }
    }

    private showMainOrSearch() {
        if (this.state.pv === 0) {
            return <button type="button" className="btn" onClick={this.mainState}>Possible future page</button>

        } else {
            return <button type="button" className="btn" onClick={this.searchMovieState}>Main Page</button>
        }

    }

    private loginIfYouCan() {
        const loginId = document.getElementById("id-input") as HTMLInputElement
        const loginPassword = document.getElementById("password-input") as HTMLInputElement

        const typeId = loginId.value
        const typePassword = loginPassword.value

        if (typeId === "admin" && typePassword === "admin") {
            this.setState({ loggedIn: true })
            alert('Logged in as Admin')
        }
        else {
            alert('Wrong login info')
        }
    }

    private handleFileUpload(fileList: any) {
        this.setState({
            uploadFile: fileList.target.files
        })
    }

    private createButton() {
        if (this.state.loggedIn === false) {
            return <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.openLoginModal}>Login</button>
        } else {
            return <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.logout}>Logout</button>
        }
    }

    private addMovieButton() {
        if (this.state.loggedIn === true) {
            return <div className="btn btn-primary btn-action btn-add" onClick={this.openAddMovieModal}>Add Movie</div>
        } else {
            return
        }
    }

    private uploadMovieData() {
        const movieTitle = document.getElementById("movie-title-input") as HTMLInputElement
        const moviePlaytime = document.getElementById("movie-playtime-input") as HTMLInputElement
        const movieGenre = document.getElementById("movie-genre-input") as HTMLInputElement
        const movieRating = document.getElementById("movie-rating-input") as HTMLInputElement
        const movieTrailer = document.getElementById("movie-trailer-input") as HTMLInputElement
        const imageFile = this.state.uploadFile[0]

        if (movieTitle === null || moviePlaytime === null || movieGenre === null || movieRating === null || imageFile === null) {
            return;
        }

        const title = movieTitle.value
        const playtime = moviePlaytime.value
        const genre = movieGenre.value
        const rating = movieRating.value
        const trailer = movieTrailer.value
        const url = "https://jinmsamovieapi.azurewebsites.net/api/Movie/upload"

        const formData = new FormData()
        formData.append("Title", title)
        formData.append("Playtime", playtime)
        formData.append("Genre", genre)
        formData.append("Rating", rating)
        formData.append("Trailer", trailer)
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



    // Login modal
    private openLoginModal = () => {
        this.setState({ openLogin: true });
    };

    private closeLoginModal = () => {
        this.setState({ openLogin: false });
    };


    // Movie-add modal
    private openAddMovieModal = () => {
        this.setState({ open: true });
    };

    private closeAddMovieModal = () => {
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
                    selectedMovie = { "id": 0, "title": "Loading", "playtime": 0, "genre": "try something different", "rating": "", "trailer": "", "url": "", "uploaded": "", "width": "0", "height": "0" }
                }
                this.setState({
                    selectedMovie,
                    movies: json

                })
            });
    }

}

export default App;
