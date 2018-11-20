
import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    selectedMovie: any
}

interface IState {
    open: boolean
}

export default class MovieImage extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            open: false
        }

        this.updateMovie = this.updateMovie.bind(this)
        this.deleteMovie = this.deleteMovie.bind(this)
    }

    public render() {
        const selectedMovie = this.props.selectedMovie
        const { open } = this.state;
        return (
            <div className="container movie-wrapper">
                <div className="movie-heading">
                    <b>{selectedMovie.title}</b>&nbsp; ({selectedMovie.genre})
                            </div>
                <div className="movie-img">
                    <img src={selectedMovie.url} className="img-fluid" alt="Responsive image" />
                </div>
                <div className="movie-buttons">
                    <button type="button" className="btn btn-outline-primary m-2" onClick={this.openModal}>Edit</button>
                    <button type="button" className="btn btn-outline-primary" onClick={this.deleteMovie.bind(this, selectedMovie.id)}>Delete</button>
                </div>
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
                        <button type="button" className="btn" onClick={this.updateMovie}>Save</button>
                    </form>
                </Modal>
            </div>
        );
    }


    private updateMovie() {
        const movieTitle = document.getElementById("movie-edit-title-input") as HTMLInputElement
        const moviePlaytime = document.getElementById("movie-edit-playtime-input") as HTMLInputElement
        const movieGenre = document.getElementById("movie-edit-genre-input") as HTMLInputElement
        const movieRating = document.getElementById("movie-edit-rating-input") as HTMLInputElement

        if (movieTitle === null || moviePlaytime === null || movieGenre === null || movieRating === null) {
            return;
        }

        const selectedMovie = this.props.selectedMovie
        const url = "https://jinmsamovieapi.azurewebsites.net/api/Movie/" + selectedMovie.id
        const updatedTitle = movieTitle.value
        const updatedPlaytime = moviePlaytime.value
        const updatedGenre = movieGenre.value
        const updatedRating = movieRating.value
        fetch(url, {
            body: JSON.stringify({


                "genre": updatedGenre,
                "height": selectedMovie.height,
                "id": selectedMovie.id,
                "playtime": updatedPlaytime,
                "rating": updatedRating,
                "title": updatedTitle,
                "uploaded": selectedMovie.uploaded,
                "url": selectedMovie.url,
                "width": selectedMovie.width


                /*"genre": updatedGenre,
                "height": selectedMovie.height,
                "id": selectedMovie.id,
                "playtime": updatedPlaytime,
                "rating": updatedRating,
                "title": updatedTitle,
                "uploaded": selectedMovie.uploaded,
                "url": selectedMovie.url,
                "width": selectedMovie.width*/

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


}