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
<NavbarBrand><Link path="/">Test</Link></NavbarBrand>
<Nav class="ms-auto" navbar>
<NavItem><Link path="/search">Search</Link></NavItem>
</Nav>
</Navbar>