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
        return (
        <div className="card-deck">
        <div className="card">
          <img className="card-img-top" src=".../100px200/" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src=".../100px200/" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div className="card">
          <img className="card-img-top" src=".../100px200/" alt="Card image cap"/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>)
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