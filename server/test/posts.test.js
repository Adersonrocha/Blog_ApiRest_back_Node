const crypto = require('crypto');
const axios = require('axios');
const postsService = require('../service/postsService');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const { post } = require('../route/postsRoute');



/*
    Esse método vai gerar um valor aleatorio para os testes
*/
const generate = function(){
    return crypto.randomBytes(20).toString('hex');
};


const request =  function(url, method, data){
    return axios({url, method, data});
};

/*
Quando quiser testar apenas um test da aplicação utilizar o ".only", assim só irá testar 
o metodo que você está trabalhando.
*/


test('teste rota get /posts retorna todos os dados do banco',
async function (){

    const post1 = await postsService.savePost({title: generate(), contente: generate()})
    const post2 = await postsService.savePost({title: generate(), contente: generate()})
    const post3 = await postsService.savePost({title: generate(), contente: generate()})
   
   
    const response = await request('http://localhost:3000/posts', 'get'
    );

    const posts = response.data;

  expect(posts).toHaveLength(3);

  await postsService.deletePost(post1.id);
  await postsService.deletePost(post2.id);
  await postsService.deletePost(post3.id);

});


test('teste rota post /posts  testa se foi inserico o objeto no banco',async function (){

    //criando o objeto
    const data = {title: generate(), contente: generate()}
 
    const response = await request('http://localhost:3000/posts', 'post', data );

    const post = response.data;

  expect(post.title).toBe(data.title);
  expect(post.contente).toBe(data.contente);

  await postsService.deletePost(post.id);
 
});

test(' atualiza um post ',async function (){


    const post = await postsService.savePost({title: generate(), contente: generate()});
    post.title= generate()
    post.contente= generate()
    //criando o objeto
 
    await request(`http://localhost:3000/posts/${post.id}`, 'put', post);

    const updatePost = await postsService.getPost(post.id);


  expect(updatePost.title).toBe(post.title);
  expect(updatePost.contente).toBe(post.contente);

  await postsService.deletePost(post.id);
 
});

test(' deleta um post', async function () {
	const post = await postsService.savePost({ title: generate(), contente: generate() });
	await request(`http://localhost:3000/posts/${post.id}`, 'delete');
	const posts = await postsService.getPosts();
	expect(posts).toHaveLength(0);
});