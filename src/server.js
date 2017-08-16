'use strict';
const restify = require('restify');
const restifyBodyParser = require('restify-plugins').bodyParser;
const { addMember, getMember, deleteMember } = require('./members');
const { addRewards } = require('./rewards');

var server = restify.createServer({
  name: 'memberApp'
});

server.use(restifyBodyParser());

server.post('/member', addMember);
server.get('/member/:id', getMember);
server.del('/member/:id', deleteMember);
server.post('/reward', addRewards);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('%s is listening at %s :', server.name, server.url);
});
