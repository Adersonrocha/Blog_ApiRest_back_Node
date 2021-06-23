
// camada de negocio

const postsData = require('../data/postsData');


exports.getPosts = function(){

return postsData.getPosts();
}

exports.getPost = async function(id){
    const post = await postsData.getPost(id);
    if(!post) throw new Error('Post não encontrado');

    return post;
};

exports.savePost = async function(post){
    const existingPost = await postsData.getPostByTitle(post.title);
    if(existingPost) throw new Error ('Já existe um Post com esse título');
    return postsData.savePost(post);
    
}

exports.deletePost = function(id){

    return postsData.deletePost(id);
};

exports.updatePost =   async function(id, post){
    await exports.getPost(id);
    return postsData.updatePost(id,post);
};