import * as React from "react";

interface IProps {
    movies: any[],
    selectNewMovie: any,
    searchByTitle: any,
}

export default class MovieList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)
        this.searchByTitle = this.searchByTitle.bind(this);
    }

    public getSizeState() {
        let sizeState;
        if (window.innerWidth > 320) {
            sizeState = 1;
        } else {
            sizeState = 2;

            this.setState({
                numberOfColumns: sizeState
            });
        }
    }

    public componentDidMount() {
        this.getSizeState();
        window.addEventListener("resize", this.getSizeState.bind(this));
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.getSizeState.bind(this));
    }



    public render() {
        return (
            <div className="container movie-card-container"> {/* Highest container */}
                <div className="row movie-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Title" /> {/* Searchbox */}
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick={this.searchByTitle}>Search</div> {/* Search button */}
                        </div>
                    </div>
                </div>

                {/* Creating list of movies*/}

                <div className="row movie-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>

                {/* Creating cards of movie */}

                <div className="movieCard">
                    {this.createCard()}
                </div>


            </div>
        );
    }


    // Creating card image
    private createCard() {
        const width = window.innerWidth;
        const card: any[] = []
        const movieList = this.props.movies

        if (movieList == null) {
            return card
        }

        if (width > 360) {
            for (let i = 0; i < movieList.length; i++) {
                const children = []
                const movie = movieList[i]
                children.push(
                    <div className="card-group">
                        <div className="movie-imageCard">
                            <div className="col">
                                <div className="card">
                                    <img className="card-img-top" src={movie.url} alt="Card image cap" />
                                </div>
                            </div>
                        </div>
                        <div className="movie-detailCard">
                            <div className="col">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                children.push(
                    <br />
                )
                card.push(<tr key={i + ""} id={i + ""} onClick={this.selectRow.bind(this, i)}>{children}</tr>)

            }
        }


        return card
    }

    private createTable() {
        const table: any[] = []
        const movieList = this.props.movies
        if (movieList == null) {
            return table
        }

        for (let i = 0; i < movieList.length; i++) {
            const children = []
            const movie = movieList[i]
            children.push(<td key={"id" + i}>{movie.id}</td>)
            children.push(<td key={"title" + i}>{movie.title}</td>)
            children.push(<td key={"genre" + i}>{movie.genre}</td>)
            table.push(<tr key={i + ""} id={i + ""} onClick={this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }

    // Meme selection handler to display selected meme in details component
    private selectRow(index: any) {
        const clickedMovie = this.props.movies[index]
        if (clickedMovie != null) {
            this.props.selectNewMovie(clickedMovie)
        }
    }

    private searchByTitle() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const title = textBox.value
        this.props.searchByTitle(title)
    }
}