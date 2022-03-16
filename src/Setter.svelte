<script>
    import {store} from "./store"

    function update(event) {
        store.set(+event.target.value)
    }
</script>

<input type="number" on:change={update} />