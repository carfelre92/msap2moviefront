import MediaStreamRecorder from 'msr';
import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    movies: any[],
    selectNewMovie: any,
    selectedMovie: any
    searchByTitle: any,
    loggedIn: any,
}

interface IState {
    openn: boolean
    numberOfColumns: any
    open: boolean
    width: any
    height: any
}

export default class MovieList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)

        this.state = {
            height: window.innerHeight,
            open: false,
            openn: false,
            numberOfColumns: null,
            width: window.innerWidth
        }
        this.searchByTitle = this.searchByTitle.bind(this);
        this.updateMovie = this.updateMovie.bind(this)
        this.deleteMovie = this.deleteMovie.bind(this)
        this.createDeleteButton = this.createDeleteButton.bind(this)
        this.createEditButton = this.createEditButton.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this);
    }




    /*public getSizeState() {
        let sizeState;
        if (window.innerWidth > 580) {
            sizeState = 1;
        } else {
            sizeState = 2;

            this.setState({
                numberOfColumns: sizeState
            });
        }
    }*/

    public updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    public componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    /*public componentDidMount() {
        this.getSizeState();
        window.addEventListener("resize", this.getSizeState.bind(this));
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.getSizeState.bind(this));
    }*/

    public render() {
        // const selectedMovie = this.props.selectedMovie
        const { open } = this.state;
        return (

            <div>
                <div className="input-group">
                    <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Title" /> {/* Searchbox */}
                    <div className="input-group-append">
                        <div className="btn btn-outline-secondary search-button" onClick={this.searchByTitle}>Search</div> {/* Search button */}
                    </div>
                    <div className="btn" onClick={this.searchTagByVoice}><i className="fa fa-microphone" /></div>
                </div>
                {this.onlyForAdmin()}

                <div className="container movie-card-container"> {/* Highest container */}
                    <div className="row movie-list-heading" />

                    {/* Creating list of movies*/}

                    <div className="row movie-list-table">
                        <table className="table table-striped">
                            <tbody>
                                {/*} {this.createTable()}*/}
                            </tbody>
                        </table>
                    </div>

                    {/* Creating cards of movie */}

                    <div className="small-container">
                        {this.createCard()}
                    </div>
                </div >


                <Modal open={open} onClose={this.closeModal}>
                    <form>
                        <div className="form-group">
                            <label>Movie Title</label>
                            <input type="text" className="form-control" id="movie-edit-title-input" placeholder="Enter Title" />
                            <small className="form-text text-muted">Movie title</small>
                        </div>
                        <div className="form-group">
                            <label>Play time</label>
                            <input type="number" className="form-control" id="movie-edit-playtime-input" placeholder="Enter Running hour" />
                            <small className="form-text text-muted">Running hour</small>
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input type="text" className="form-control" id="movie-edit-genre-input" placeholder="Enter Genre" />
                            <small className="form-text text-muted">Movie genre</small>
                        </div>
                        <div className="form-group">
                            <label>Rating</label>
                            <input type="text" className="form-control" id="movie-edit-rating-input" placeholder="Enter Rating" />
                            <small className="form-text text-muted">Eg. PG, R15</small>
                        </div>
                        <div className="form-group">
                            <label>Trailer</label>
                            <input type="text" className="form-control" id="movie-edit-trailer-input" placeholder="Enter Trailer" />
                            <small className="form-text text-muted">Embed youtube link</small>
                        </div>
                        <button type="button" className="btn" onClick={this.updateMovie}>Save</button>
                    </form>
                </Modal>

            </div>


        );
    }

    private onlyForAdmin() {
        if (this.props.loggedIn === true) {
            return (
                <div className="container movie-wrapper">

                    <div className="movie-heading">
                        <b>{this.props.selectedMovie.title}</b>&nbsp; ({this.props.selectedMovie.genre})
                            </div>
                    <div className="movie-img">
                        <img src={this.props.selectedMovie.url} className="img-fluid" alt="Responsive image" />
                    </div>
                    <div className="movie-buttons">
                        {this.createDeleteButton()}
                        {this.createEditButton()}
                    </div>

                </div>
            )
        } else {
            return
        }
    }

    // Creating card image
    private createCard() {
        const card: any[] = []
        // const width = window.innerWidth;
        const movieList = this.props.movies

        if (movieList == null) {
            return card
        }

        if (this.state.width > 581) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < movieList.length; i++) {
                const movie = movieList[i]
                card.push(
                    <div className="movieCard">
                        <div className="card-group">
                            <div className="movie-imageCard">
                                <div className="col">
                                    <div className="card">
                                        <img className="card-img-top" src={movie.url} alt="Card image cap" />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card-body card-makeLong">
                                    <h5 className="card-title">Title : {movie.title}</h5>
                                    <p className="card-text">Genre : {movie.genre}</p>
                                    <p className="card-text">Running hour : {movie.playtime} min</p>
                                    <p className="card-text">Rating : {movie.rating}</p>
                                    <a href="#" className="btn btn-primary">View trailer</a>
                                    <a href="#" className="btn btn-primary">Leave Review</a>
                                </div>

                            </div>

                        </div>
                    </div>)

                // card.push(<tr key={i + ""} id={i + ""} onClick={this.selectRow.bind(this, i)}>{children}</tr>)

            }
        }

        if (this.state.width < 580) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < movieList.length; i++) {
                // const children: any[] = []
                const movie = movieList[i]
                card.push(
                    <div className="small-movieCard">
                        <div className="card">
                            <img className="card-img-top" src={movie.url} alt="Card image cap" />
                            <div className="card-body">
                                <button type="button" className="btn btn-primary hello">Movie Details</button>
                                <button type="button" className="btn btn-outline-secondary hello ">View Trailer</button>
                            </div>
                        </div>
                    </div>
                )


            }

        }
        return card
    }


    private createDeleteButton() {
        if (this.props.loggedIn === true) {
            return <button type="button" className="btn btn-outline-primary" onClick={this.deleteMovie.bind(this, this.props.selectedMovie.id)}>Delete</button>
        } else {
            return
        }
    }

    private createEditButton() {
        if (this.props.loggedIn === true) {
            return <button type="button" className="btn btn-outline-primary m-2" onClick={this.openModal}>Edit</button>
        } else {
            return
        }
    }

    private searchTagByVoice() {
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav';
            mediaRecorder.ondataavailable = (blob: any) => {
                postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }

        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)

        function onMediaError(e: any) {
            console.error('media error', e);
        }

        function postAudio(blob) {

            let accessToken: any;
            fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
                headers: {
                    'Content-Length': '0',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Ocp-Apim-Subscription-Key': '56cf91d7b07e49719c46e5d94532407a'
                },
                method: 'POST'
            }).then((response) => {
                console.log(response.text())
                return response.text()
            }).then((response) => {
                console.log(response)
                accessToken = response
            }).catch((error) => {
                console.log("Error", error)
            });

            console.log(accessToken);

            // POSTING!

            const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
            // posting audio
            fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
                body: blob, // this is a .wav audio file    
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer' + accessToken,
                    'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                    'Ocp-Apim-Subscription-Key': '56cf91d7b07e49719c46e5d94532407a'
                },
                method: 'POST'
            }).then((res) => {
                return res.json()
            }).then((res: any) => {
                console.log(res)
                textBox.value = (res.DisplayText as string).slice(0, -1)
            }).catch((error) => {
                console.log("Error", error)
            });

        }
    }

    private updateMovie() {
        const movieTitle = document.getElementById("movie-edit-title-input") as HTMLInputElement
        const moviePlaytime = document.getElementById("movie-edit-playtime-input") as HTMLInputElement
        const movieGenre = document.getElementById("movie-edit-genre-input") as HTMLInputElement
        const movieRating = document.getElementById("movie-edit-rating-input") as HTMLInputElement
        const movieTrailer = document.getElementById("movie-edit-trailer-input") as HTMLInputElement

        if (movieTitle === null || moviePlaytime === null || movieGenre === null || movieRating === null) {
            return;
        }

        const selectedMovie = this.props.selectedMovie
        const url = "https://jinmsamovieapi.azurewebsites.net/api/Movie/" + selectedMovie.id
        const updatedTitle = movieTitle.value
        const updatedPlaytime = moviePlaytime.value
        const updatedGenre = movieGenre.value
        const updatedRating = movieRating.value
        const updatedTrailer = movieTrailer.value
        fetch(url, {
            body: JSON.stringify({


                "genre": updatedGenre,
                "height": selectedMovie.height,
                "id": selectedMovie.id,
                "playtime": updatedPlaytime,
                "rating": updatedRating,
                "title": updatedTitle,
                "trailer": updatedTrailer,
                "uploaded": selectedMovie.uploaded,
                "url": selectedMovie.url,
                "width": selectedMovie.width


            }),
            headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
            method: 'PUT'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText + " " + url)
                } else {
                    location.reload()
                }
            })
    }

    // Modal Open
    private openModal = () => {
        this.setState({ open: true });
    };

    // Modal Close
    private closeModal = () => {
        this.setState({ open: false });
    };

    private deleteMovie(id: any) {
        const url = "https://jinmsamovieapi.azurewebsites.net/api/Movie/" + id

        fetch(url, {
            method: 'DELETE'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error Response
                    alert(response.statusText)
                }
                else {
                    location.reload()
                }
            })
    }

    private searchByTitle() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const title = textBox.value
        this.props.searchByTitle(title)
    }



    /*private showTrailer(id: any) {
        const selectedMovie = this.props.selectedMovie
        alert(selectedMovie.trailer)
        return (
            null
        )
    }*/

}