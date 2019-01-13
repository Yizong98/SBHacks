import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DataUsageRounded from '@material-ui/icons/DataUsageRounded';
import ArrowRight from '@material-ui/icons/ArrowRightAlt';
import MusicVideo from '@material-ui/icons/MusicVideo';
import Grid from '@material-ui/core/Grid';
import './HomePage.css'
import queue_music from './queue_music.svg';
import arrow_drop_down from './arrow_downward.svg'
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {Link} from 'react-router-dom';

const styles = {
    greenAvatar:{
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    }
}

const baseStyle = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'dashed',
    borderRadius: 5
  };
  const activeStyle = {
    borderStyle: 'solid',
    borderColor: '#6c6',
    backgroundColor: '#eee'
  };
  const rejectStyle = {
    borderStyle: 'solid',
    borderColor: '#c66',
    backgroundColor: '#eee'
  };

const dummyOutputFiles = [
    {
        name: "a"
    },
    {
        name: "b"
    },
    {
        name: "c"
    }
]

class HomePage extends React.Component{
    constructor(){
        super();
        this.state = {
            uploadedFile: '',
            completed: 0,
            buffer: 10,
            isFileChose: false,
            files: [],
            oldFiles: [],
            progressBar: false,
            convertButton: false,
            outputFiles: false,
            value: 4,
            displayOut: false
       }
    }
    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    progress = () => {
        const { completed } = this.state;
        if (completed > 100) {
            this.setState({ completed: 0, buffer: 10 });
            this.setState({ progressBar: false});
            this.setState({ convertButton: true});
            if(this.state.outputFiles) this.setState({displayOut:true})
        } else {
            if(this.state.progressBar){
                const diff = Math.random() * this.state.value;
                const diff2 = Math.random() * this.state.value;
                this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
            }
        }
    }

    onDrop(files) {
        this.setState({files});
        if(files !== this.state.oldFiles){
            this.setState({convertButton:false, outputFiles:false, value:4, displayOut:false})
        }
    }

    handleUpLoad = () => {
        this.setState({progressBar: true});
        let file = this.state.files[0];
        const formData = new FormData();
        formData.append("file",file);
        axios.post("http://localhost:5000/uploader", formData).then(res=>console.log(res)).catch(res=>console.log(res));
    }

    handleConvert = () => {
        this.setState({ progressBar: true });
        this.setState({ oldFiles: this.state.files, outputFiles: true, value:10 });
        
    }   

    render(){
        const { classes } = this.props;
        const { completed, buffer, progressBar, convertButton, outputFiles, displayOut } = this.state;
        
        const files = this.state.files.map(file => (
            <li key={file.name}>
              {file.name} - {file.size} bytes
            </li>
        ))


        return(
            <div className="big-box">
                <div className="top-box">
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                    <Grid item>
                        <img src={queue_music} className="main-logo" alt="queue_music"/>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h2" className="main-title">
                            convert audio to piano music sheet
                        </Typography>

                    </Grid>
                    </Grid>
                </div>
                    
                <div className="middle-box">
                    <Dropzone accept="audio/mp3"
                            onDrop={this.onDrop.bind(this)}>
                        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                            let styles = {...baseStyle}
                            styles = isDragActive ? {...styles, ...activeStyle} : styles
                            styles = isDragReject ? {...styles, ...rejectStyle} : styles

                            return (
                            <div
                                {...getRootProps()}
                                style={styles}
                            >
                                <input {...getInputProps()} />
                                <div>
                                {isDragAccept ? 'Drop' : 'Drag'} files here or click to select files
                                </div>
                                <p>Only *.mp3 audios will be accepted</p>
                                <img src={arrow_drop_down} className="drop-logo" alt="arrow_drop_down"/>
                                {isDragReject && <div>Unsupported file type...</div>}
                            </div>
                            )
                        }}
                    </Dropzone>
                    
               </div>
               <div className="divider-1">
                 <Divider variant="middle" className="divider"/>
               </div>
                <aside className="files-name">
                    <ul>
                        {files}
                    </ul>
                </aside>
                <div className="upload-button">
                        {
                            files.length !== 0 && !convertButton &&
                            <Button variant="contained" className="button-sl-up" onClick={this.handleUpLoad}> 
                                <Typography> Upload </Typography>
                                <CloudUploadIcon className="right-icon"></CloudUploadIcon>
                            </Button>
                        }
                        {
                            files.length !== 0 && convertButton &&
                            <Button variant="contained" className="button-sl-up" onClick={this.handleConvert}>
                                <Typography> Convert </Typography>
                                <DataUsageRounded className="right-icon"></DataUsageRounded>
                            </Button>
                        }
                </div>
                <div className="progress-box">
                    {progressBar && <LinearProgress color="secondary" variant="buffer" value={completed} valueBuffer={buffer}/>}
                </div>
                <Divider variant="middle" className="divider"/>
                {
                    outputFiles && displayOut &&
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Link to='/display'>
                        <Avatar className={classes.greenAvatar}>
                            <MusicVideo/>
                        </Avatar>
                        </Link>
                    </Grid>
                }
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);