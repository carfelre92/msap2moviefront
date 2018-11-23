// import MediaStreamRecorder from '../../node_modules/msr';
import * as React from "react";
// import Modal from 'react-responsive-modal';

interface IProps {
    selectedMovie: any
    searchByTitle: any,
    loggedIn: any,
    selectNewMovie: any,
    movies: any[],
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
        
    }

    public render() {
        return null;
    }
    /*private createTable() {
        const table: any[] = []
        const movieList = this.props.movies
        if (movieList == null) {
            return table
        }

        for (let i = 0; i < movieList.length; i++) {
            const children: any[] = []
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
    }*/

    
}