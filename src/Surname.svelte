<script>
    export let surname = "default"
</script>

<h1>My surname is {surname}</h1>
<slot name="header">
    <span>Waiting header to be passed in</span>
</slot>
<slot name="body">
    <span>Waiting body to be passed in</span>
</slot>
<slot name="footer">
    <span>Waiting footer to be passed in</span>
</slot>
<slot >
    <span>Waiting content to be passed in</span>
</slot>

<style>
    h1 {
        color: green;
    }
</style>
