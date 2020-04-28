import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CommentsCard from "./CommentsCard";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function MediaTabBar(props) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <div>
            <AppBar position="static" >
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Comments" />
                    <Tab label="Media" />
                </Tabs>
            </AppBar>
            <Typography component="div" role="tabpanel" hidden={value !== 0}>
                <CommentsCard route={props.route}></CommentsCard>
            </Typography>
            <Typography component="div" role="tabpanel" hidden={value !== 1}>
                Media
            </Typography>
        </div>
    );
}