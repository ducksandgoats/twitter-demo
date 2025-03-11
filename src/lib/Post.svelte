<script>
  import {Row, Col, Input, Button, Form} from '@sveltestrap/sveltestrap'
  import {Link} from 'svelte-mini-router';
  // import {link} from 'svelte-spa-router'
  import {dexie} from '../dir/data.js'
  import Send from './Send.svelte'
  import Self from './Post.svelte'

  let {post} = $props()
  let replies = $state([])
  let showReply = $state(false)
  let showTo = $state(false)
  let showFrom = $state(false)
  let replyTo = $state([])
  let replyFrom = $state([])
  function handleReply(e){
    replies.push(e)
    replies = replies
  }
  function replyToFunc(e){
    console.log(e)
    showTo = !showTo
    if(showTo){
        if(!replyTo.length){
            dexie.db.table('posts').where('iden').anyOf(post.for).toArray().then((data) => {replyTo = data}).catch((err) => {console.error(err);showTo = false;})
        }
    }
  }
  function replyFromFunc(e){
    console.log(e)
    showFrom = !showFrom
    if(showFrom){
        if(!replyFrom.length){
            dexie.db.table('posts').where('for').equals(post.iden).toArray().then((data) => {replyFrom = data}).catch((err) => {console.error(err);showFrom = false;})
        }
    }
  }
  function vid(data){
    return data === '.mp4' || data === '.webm' || data === '.mov'
  }

  function aud(data){
    return data === '.mp3' || data === '.wav' || data === '.aac'
  }

  function pic(data){
    return data === '.png' || data === '.jpeg' || data === '.jpg' || data === '.webp' || data === '.gif'
  }
</script>

<Row class="m-1 p-1 align-items-center justify-content-center post-row" cols={{ lg: 3, md: 2, sm: 1 }}>
    <Col class="m-1 p-1 text-center post-column">
        {#if post.for}
        {#if showTo}
        {#if replyTo.length}
        {#each replyTo as post}
        <Self post={post}/>
        {/each}
        {/if}
        {/if}
        <Button on:click={replyToFunc}>Show Reply To</Button>
        {/if}
      <p><Link path={'/users/' + post.user}>{post.user}</Link></p>
      <p><Link path={'/posts/' + post.iden}>{post.iden}</Link></p>
      {#if post.tags}
        <p>
          {#each post.tags as tag}
            <span>|<Link path={'/tags/' + tag}>{tag}</Link>|</span>
          {/each}
        </p>
      {/if}
      {#each post.list as link}
        {#if vid(link.slice(link.lastIndexOf('.')))}
          <video src={link} controls><track kind="captions"></video>
        {:else if aud(link.slice(link.lastIndexOf('.')))}
          <audio src={link} controls></audio>
        {:else if pic(link.slice(link.lastIndexOf('.')))}
          <img src={link} alt={link}>
        {:else}
          <p>file not supported</p>
        {/if}
      {/each}
      <p>{post.text}</p>
      <Button on:click={() => {showReply = !showReply}}>Reply</Button>
      {#if showReply}
      <Send func={handleReply} replyProp={post.iden} tagProp={null}/>
      {/if}
      {#if replies.length}
      {#each replies as post}
      <Self post={post}/>
      {/each}
      {/if}
      {#if showFrom}
      {#if replyFrom.length}
      {#each replyFrom as post}
      <Self post={post}/>
      {/each}
      {/if}
      {/if}
      <Button on:click={replyFromFunc}>Show Reply From</Button>
    </Col>
</Row>