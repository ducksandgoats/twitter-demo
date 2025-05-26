<script>
    import {Row, Col, Button, Input} from '@sveltestrap/sveltestrap'
    import {dexie} from '../dir/data.js'
    let routine = $state(Boolean(dexie._routine))
    let timer = $state(dexie._timer)
    let sync = $state(dexie._sync)
    // let synced = $state([])
    let count = $state(dexie._count)
    let idens = $state([])
    setInterval(() => {
        dexie.doIden(null).then((data) => {
            idens = data
        }).catch(console.error)
    }, 1000)
</script>

<Row>
    <Col>
        {#if routine}
        <p><Button on:click={(e) => {console.log(e);dexie.turnOffInterval();routine = Boolean(dexie._routine);}}>Stop</Button></p>
        {:else}
        <Row>
            <Col>
                <Input type="number" placeholder={count} bind:value={count}/>
            </Col>
            <Col>
                <Input type="switch" label="Sync" bind:checked={sync}/>
            </Col>
            <Col>
                <Input type="number" placeholder={timer} bind:value={timer}/>
            </Col>
            <Col>
                <Button on:click={(e) => {console.log(e);dexie.changeOpts({sync, timer, count});timer = dexie._timer;sync = dexie._sync;count = dexie._count;}}>Change</Button>
            </Col>
            <Col>
                <Button on:click={(e) => {console.log(e);dexie.syncUser().then(console.log).catch(console.error);routine = Boolean(dexie._routine);}}>Once</Button>
            </Col>
            <Col>
                <Button on:click={(e) => {console.log(e);dexie.turnOnInterval();routine = Boolean(dexie._routine);}}>Start</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                {#each idens as iden}
                    <p>{iden}: <Input type="number" placeholder="number placeholder"/><Button on:click={(e) => {console.log(e);dexie.doSync(iden, false, count).then(console.log).catch(console.error);}}>User</Button><Button on:click={(e) => {console.log(e);dexie.doSync(iden, true, count).then(console.log).catch(console.error);}}>Sync</Button></p>
                {/each}
            </Col>
        </Row>
        {/if}
    </Col>
</Row>