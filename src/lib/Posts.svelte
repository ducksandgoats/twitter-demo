<script>
  import {Row, Col, Input, Button, Form} from '@sveltestrap/sveltestrap'
  import {dexie} from '../dir/data.js'
  import Post from './Post.svelte'
  import {getPathParams} from 'svelte-mini-router';

  const pathParams = getPathParams();

  let post
  let e
  dexie.db.table('posts').get(pathParams.post).then((data) => {post = data}).catch((err) => {e = err.message})
</script>

{#if post}
    <Post post={post}/>
{/if}

{#if e}
    <Row>
        <Col>
            <p>{e}</p>
        </Col>
    </Row>
{/if}