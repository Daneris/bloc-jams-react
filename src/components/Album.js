import React, {Component} from "react";
import albumData from "./../data/albums";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      hover: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

    play() {
      this.audioElement.play();
      this.setState({
        isPlaying: true
      })
    }

    pause() {
      this.audioElement.pause();
      this.setState({
        isPlaying: false
      })
    }

    hoverOn() {
      this.setState({
        hover: true
      })
    }

    hoverOff() {
      this.setState({
        hover: false
      })
    }

    setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({
        currentSong: song
      });
    }

    handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying && isSameSong) {
        this.pause();
      }else {
        this.play();
      }
    }


    renderButton(song, index) {
      //set class here
      if (this.state.isPlaying && this.state.currentSong === song) {
        return (


         <button><span className="icon ion-md-pause"></span></button>

              )

        }else if (!this.state.isPlaying && this.state.currentSong === song){

         return(

              <button><span className="icon ion-md-play"></span></button>
              )
        }else if(!this.state.hover === index) {
           return (
             <button><span className="icon ion-md-play"></span></button>
           )
        }else {
          return (
            <span>{index + 1}</span>
        )
      }


    }
  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>

        <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
        </div>


      </section>
      <table id="song list">
        <colgroup>
          <col id="song-number-column"/>
          <col id="song-title-column"/>
          <col id="song-duration-column"/>
        </colgroup>




          <tbody>


          {this.state.album.songs.map((song,index) =>
            <tr onMouseEnter={() => this.hoverOn(song)}
              onMouseLeave={() => this.hoverOff(song)}
            key={index} className="song" onClick={() => this.handleSongClick(song)}>
              <td>{this.renderButton(song,index)}</td>
              <td>{song.title}</td>
              <td>{song.duration}</td>
            </tr>

        )
      }

      </tbody>



      </table>

      </section>


    )
  }
}

export default Album;
