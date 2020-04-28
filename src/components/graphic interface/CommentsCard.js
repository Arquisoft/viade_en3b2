import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridList from "@material-ui/core/GridList";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function CommentsCard(props) {
    const classes = useStyles();

    return (
        <GridList className={classes.gridList} cols={1}>
            {props.route.getComments().map((comment) => (
            <Card>
                <CardContent>
                    <Typography>
                        {comment}
                    </Typography>
                </CardContent>
            </Card>
            ))}
        </GridList>
    );
}