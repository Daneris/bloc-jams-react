import React, {Component} from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      volume: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      hover: false
    };

    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
  }

    componentDidMount() {
      this.eventListeners ={
      timeupdate: e => {
        this.setState({currentTime: this.audioElement.currentTime});
      },
      volumeupdate: e => {
        this.setState({volume: this.audioElement.volume})
      },
      durationchange: e => {
        this.setState({duration: this.audioElement.duration})
      }
    };
    this.audioElement.addEventListener("timeupdate", this.eventListeners.timeupdate)
    this.audioElement.addEventListener("durationchange", this.eventListeners.durationchange)
    }


    componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener("timeupdate", this.eventListeners.timeupdate)
      this.audioElement.removeEventListener("durationchange", this.eventListeners.durationchange)
      this.audioElement.removeEventListener("volumenupdate", this.eventListeners.volumeupdate)
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
        if(!isSameSong) {this.setSong(song)}
        this.play();
      }
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const length = this.state.album.songs.length - 1;
      const newIndex = Math.min(length, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();

    }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song)
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleTimeChange(e) {
         const newTime = this.audioElement.duration * e.target.value;
         this.audioElement.currentTime = newTime;
         this.setState({ currentTime: newTime });
       }


       handleVolume(e) {
            const newVolume = e.target.value;
            this.audioElement.volume = newVolume;
            this.setState({ volume: newVolume});
          }


       formatTime(timeSecs) {
            let minutes = Math.floor(timeSecs/60)
            let seconds = Math.floor(timeSecs%60)

            //let minutes = .toString().split(".")
            if (seconds <10) {
              return `${minutes}:0${seconds}`
            }else {
            return `${minutes}:${seconds}`
              }
            }



    hoverOn(index) {
      console.log("hovering button")


     this.setState({
       hover: index
     })

   }

   hoverOff() {
     this.setState({
       hover: false
     })
   }


    renderButton(song, index) {
      //set class here
      if (this.state.isPlaying && this.state.currentSong === song) {
        return (


         <button><span className="icon ion-md-pause"></span></button>

              )

        }else if(this.state.hover === index) {
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
      <div className="container">
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>

        <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
        </div>


      </section>

      <table className="song-list">
        <colgroup>
          <col id="song-number-column"/>
          <col id="song-title-column"/>
          <col id="song-duration-column"/>

        </colgroup>





        <tbody>


        {this.state.album.songs.map((song,index) =>
          <tr onMouseEnter={() => this.hoverOn(index)}
            onMouseLeave={() => this.hoverOff()}
          key={index} className="song" onClick={() => this.handleSongClick(song)}>
            <td>{this.renderButton(song,index)}</td>
            <td>{song.title}</td>
            <td>{this.formatTime(song.duration)}</td>
          </tr>

      )
    }
        </tbody>
        </table>

        <div className="player-bar">
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime= {this.state.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolume={(e) => this.handleVolume(e)}
          formatTime={(timeSecs) => this.formatTime(timeSecs)}
          />
          </div>
      </section>
      </div>



    )
  }
}

export default Album;
