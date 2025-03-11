<script>
  import {Container} from '@sveltestrap/sveltestrap'
  import {Router} from 'svelte-mini-router';
  import Nav from './lib/Nav.svelte'

  const routerConf = {
    routes: [
        // this is your home page
        {path: '/', render: () => import('./lib/Home.svelte')},

        // another page
        {path: '/posts/{post}', render: () => import('./lib/Posts.svelte')},

        {path: '/search', render: () => import('./lib/Search.svelte')},

        {path: '/users/{user}', render: () => import('./lib/Users.svelte')},

        // nested routes are up to you
        {path: '/tags/{tag}', render: () => import('./lib/Tags.svelte')},

        // you can use path parameters anywhere
        // {path: '/foo/{name}/and/{age}', render: () => import('./pages/page1/Page1.svelte')},
    ],

    // if you use a base URL, set it here; optional
    // baseUrl: '/my-web-application',

    // error 404 route; optional
    // if not defined, a simple "404 - Not found" text will be displayed
    render404: () => import('./lib/Err.svelte')
};
</script>

<Container fluid>
  <Nav/>
  <Router {routerConf}/>
</Container>

<style>
</style>
