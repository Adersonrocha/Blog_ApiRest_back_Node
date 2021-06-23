
// Arquivo responsável por interagir com a base de dados.

const database = require('../infra/database');


exports.getPosts = function(){
    return database.query('select * from blog.post');
};

exports.getPost = function(id){
    // oneOrNone é utilizado para se não tiver o id no banco não lançar uma excessao
    return database.oneOrNone('select * from blog.post where id=$1', [id]);
};

exports.savePost = function(post){
    return database.one('insert into blog.post( title, contente) values ($1, $2) returning*', [post.title, post.contente]);
};

exports.deletePost =  function(id){
    //.none pq eu não desejo retornar nada
    return database.none('delete from blog.post where id = $1',[id]);
};

exports.updatePost = function(id, post){
    return database.none('update blog.post set title = $1 , contente = $2 where id = $3', [post.title , post.contente , id]);
};

exports.getPostByTitle = function(title){
    return database.oneOrNone('select * from blog.post where title =$1', [title]);
};