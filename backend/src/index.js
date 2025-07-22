const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const usersRouter = require('./handlers/users');
const postsRouter = require('./handlers/posts');
const commentsRouter = require('./handlers/comments');
const likesRouter = require('./handlers/likes');
const followersRouter = require('./handlers/followers');
const groupsRouter = require('./handlers/groups');
const eventsRouter = require('./handlers/events');
const mentorshipsRouter = require('./handlers/mentorships');
const discipleshipRouter = require('./handlers/discipleship');
const spiritualGiftsRouter = require('./handlers/spiritualGifts');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/followers', followersRouter);
app.use('/groups', groupsRouter);
app.use('/events', eventsRouter);
app.use('/mentorships', mentorshipsRouter);
app.use('/discipleship', discipleshipRouter);
app.use('/spiritual-gifts', spiritualGiftsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
