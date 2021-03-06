import React, { useState, useEffect } from 'react';
import useStyle from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { sendPost, updatePost } from '../../actions/posts';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch()
    const [postData, setPostData ] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })
    useEffect(() => {
        if(post) {
            setPostData(post)
        }
    }, [post, currentId])
    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId) {
            dispatch(updatePost(currentId, postData))
        } else dispatch(sendPost(postData))
        clear()
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({
            creator:'',
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Creating a memory</Typography>
                <TextField 
                name="creator"
                variant="outlined" 
                label="Creator" 
                fullWidth
                value={postData.creator}
                onChange={(e) => setPostData({...postData, creator: e.target.value})} />

                <TextField 
                name="title"
                variant="outlined" 
                label="title" 
                fullWidth
                value={postData.title}
                onChange={(e) => setPostData({...postData, title: e.target.value})} />

                <TextField 
                name="message"
                variant="outlined" 
                label="message" 
                fullWidth
                value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})} />

                <TextField 
                name="tags"
                variant="outlined" 
                label="tags" 
                fullWidth
                value={postData.tags}
                onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button color="secondary" variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>

                </form>
        </Paper>
    );
}
export default Form