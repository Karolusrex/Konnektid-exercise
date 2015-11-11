import {connection} from 'mongoose';
connection.on('open',() => {
    require('./todo-item');
    require('./todo-list');
});
