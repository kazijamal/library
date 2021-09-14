import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReadingBooks } from "../../../services/readingBooks";
import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		margin: "auto",
	},
	media: {
		width: 128,
		height: 190,
		margin: "auto",
	},
});

function ReadingBookList() {
	const classes = useStyles();
	const [readingBooks, setReadingBooks] = useState([]);

	useEffect(() => {
		let mounted = true;
		getReadingBooks().then((retrievedReadingBooks) => {
			if (mounted) {
				setReadingBooks(retrievedReadingBooks);
			}
		});
		return () => (mounted = false);
	}, []);

	return (
		<div>
			<Typography variant="h4">Reading Books</Typography>
			{readingBooks ? (
				<Grid container spacing={3}>
					{readingBooks.map((readingBook) => (
						<Grid item xs={6} sm={3} md={2} key={readingBook.id}>
							<Card className={classes.root}>
								<CardMedia
									className={classes.media}
									image={readingBook.imageLink}
									title="Book Cover"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5">
										{readingBook.title}
									</Typography>
									{readingBook.subtitle && (
										<Typography
											variant="body1"
											color="textSecondary"
											component="p"
										>
											{readingBook.subtitle}
										</Typography>
									)}
									<Typography variant="h6"></Typography>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{readingBook.authors.join(", ")}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										color="primary"
										component={Link}
										to={`/readingbooks/${readingBook.id}`}
									>
										View Details
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<p>Loading</p>
			)}
		</div>
	);
}

export default ReadingBookList;
