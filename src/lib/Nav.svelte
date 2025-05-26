<script lang="ts">
    import {navigate, Link} from 'svelte-mini-router';
    import {
      NavbarBrand,
      Nav,
      Navbar,
      NavItem,
      NavLink
    } from '@sveltestrap/sveltestrap';
</script>
  
<Navbar color="light" light expand="md" container="md">
<NavbarBrand><Link path="/index.html">Test</Link></NavbarBrand>
<Nav navbar>
<NavItem><Link path="/sync">Sync</Link></NavItem>
</Nav>
<Nav class="ms-auto" navbar>
<NavItem><Link path="/search">Search</Link></NavItem>
</Nav>
</Navbar>