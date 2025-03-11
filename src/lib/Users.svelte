<script>
    import {Row, Col, Input, Button, Form} from '@sveltestrap/sveltestrap'
    // import {location} from 'svelte-spa-router'
    import {dexie} from '../dir/data.js'
    import Post from './Post.svelte'
    import Send from './Send.svelte'
    import {getPathParams} from 'svelte-mini-router';

    const pathParams = getPathParams();
  
    let pageNumber = $state(0)
    let pageSize = $state(10)
    let count = $state(0)
    let posts = $state([])
    let arr = $state([])
  
    async function down(e){
      console.log(e)
      if(pageNumber > 0){
        pageNumber = pageNumber - 1
      }
      arr = await dexie.table('posts').where('user').equals(pathParams.user)
      .reverse()
      .offset(pageNumber * pageSize)
      .limit(pageSize)
      .toArray()
    }
  
    async function up(e){
      console.log(e)
      pageNumber = pageNumber + 1
      arr = await dexie.table('posts').where('user').equals(pathParams.user)
      .reverse()
      .offset(pageNumber * pageSize)
      .limit(pageSize)
      .toArray()
    }
    
    function handleSend(sent){
      posts.push(sent)
      posts = posts
    }
  
    (async () => {count = await dexie.table('posts').where('user').equals(pathParams.user).count();console.log(count);arr = await dexie.table('posts').where('user').equals(pathParams.user).reverse().offset(pageNumber * pageSize).limit(pageSize).toArray();})().then(console.log).catch(console.error);
  </script>
  
  <Row>
    <Col>
      <Send func={handleSend} replyProp={null} tagProp={null}/>
    </Col>
  </Row>
  
  <Row>
    <Col>
      {#each posts as post}
      <Post post={post}/>
      {/each}
    </Col>
  </Row>
  
  <Row>
    <Col>
      {#each arr as post}
      <Post post={post}/>
      {/each}
    </Col>
  </Row>
  
  <Row>
    <Col>
    <Row class="align-items-center justify-content-center" cols={{ lg: 3, md: 2, sm: 1 }}>
      <Col class="text-center">
        <p>go through posts</p>
        {#if pageNumber > 0}
          <Button type="button" on:click={down}>←</Button>
        {/if}
        {pageNumber}
        {#if (count - (pageNumber * pageSize)) > 0}
          <Button type="button" on:click={up}>→</Button>
        {/if}
      </Col>
    </Row>
    <Row class="align-items-center justify-content-center" cols={{ lg: 3, md: 2, sm: 1 }}>
      <Col class="text-center">
        <p>size of results</p>
        <Input bind:value={pageSize} type="number"></Input>
      </Col>
    </Row>
    </Col>
  </Row>