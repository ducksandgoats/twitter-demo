<script>
    import {Row, Col, Input, Button, Form} from '@sveltestrap/sveltestrap'
    import {dexie} from '../dir/data.js'
    import Post from './Post.svelte'
    // import Send from './Send.svelte'
    import {getQueryParams} from 'svelte-mini-router';

    // from "/page1?name=Joe&age=43"
    const queryParams = getQueryParams();
  
    let str = $state(queryParams.t ? queryParams.t : '')
    let pageNumber = $state(0)
    let pageSize = $state(10)
    let count = $state(0)
    let arr = $state([])

    async function search(){
        const useTable = dexie.db.table('posts')
        const prefixes = str.split(' ').filter(Boolean)
        const result = new Set((await Promise.all(prefixes.map((data) => {return useTable.reverse().filter((datas) => {return datas.text.includes(data)}).offset(pageNumber * pageSize).limit(pageSize).primaryKeys()}))).flat())
        return await useTable.where('iden').anyOf(Array.from(result)).toArray()
    }
  
    async function down(e){
      console.log(e)
      if(pageNumber > 0){
        pageNumber = pageNumber - 1
      }
      arr = await search()
    }
  
    async function up(e){
      console.log(e)
      pageNumber = pageNumber + 1
      arr = await search()
    }
  </script>
  
  <Row class="align-items-center justify-content-center" cols={{ lg: 3, md: 2, sm: 1 }}>
    <Col class="text-center">
        <Form on:submit={(e) => {e.preventDefault();pageNumber = 1;search().then(console.log).catch(console.error);}}>
            <Input type="text" bind:value={str} placeholder="search term"></Input>
            <Button type="submit">Search</Button>
        </Form>
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