<script>
	import {slide, fade, blur} from "svelte/transition";

	import Surname from "./Surname.svelte";
	import {onMount} from 'svelte';
	import {store, progress} from "./store";
	import Incrementer from "./Incrementer.svelte"
	import Decrementer from "./Decrementer.svelte"
	import Setter from "./Setter.svelte"
	export let name;
	let surname="abcd"
	let displayInfoMessage = false;
	let people=[]
	$: counts = 0;
	$: squared = counts ** 2;
	let cities = [
		{name: 'zadar', id: 'aefa'},
		{name: 'Tenrffie', id: 'serg'},
		{name: 'Helsinki', id: 'sregw'}
	]
	  
	  onMount(async () => {
		  const apiResponse = await fetch('https://swapi.dev/api/people/');
		  const swPeopleJson = await apiResponse.json();

		  people = swPeopleJson.results

		  return () => {
			  console.log('destory')
		  }
	  })
async function getRandomStarWarsCharacter() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const apiResponse = await fetch(
      `https://swapi.dev/api/people/${randomNumber}/`
    );

    return await apiResponse.json();
  }

  let promise = getRandomStarWarsCharacter();

function handleClick() {
	  alert(surname)
  }
</script>

<main>
	<progress value={$progress} />
	<button on:click={() => progress.set(0)}>0%</button>
	<button on:click={() => progress.set(0.75)}>75%</button>
	<button on:click={() => progress.set(1)}>100%</button>
	<!--Auto subscribe & unsubscribe and get value out of store-->
	<h1>Value get from store: {$store}</h1>
	<Incrementer /><Decrementer/><Setter />
	{#each people as {name, height, birth_year}}
	<li>
		<strong>{name}</strong>
	</li>
	{:else}
	<p>loading...</p>
	{/each}
	<button on:click|preventDefault|once={handleClick}>say name</button>
	{#each cities as {id, name}, index}
	<li>{index +  1} - {name}</li>
	{/each}
	<button on:click={() => counts++}>Count: {counts}</button>
	<div>Squared of the counter is {squared}</div>

	<label>
		<input type="checkbox" bind:checked={displayInfoMessage} />
		DO YOU WANT TO GIVE ME A MILLION DOLLARS?
	</label>
	<Surname surname={surname}>
		<h3 slot="header">header</h3>
		<input slot="body" placeholder="What's your name?" bind:value={surname}/>
		<span slot="footer">Footer end</span>

		<h2>{surname}</h2>
	</Surname>
	{#await promise}
		<h5>Loading...</h5>
		{:then character}
			<h5 transition:blur={{duration: 1000, delay: 1000}}>{character.name}</h5>
	{/await}
	{#if displayInfoMessage}
		<h4 transition:slide={{duration: 1000, delay: 500}}>Thank you!</h4>
	{/if}

	{#if displayInfoMessage}
		<h4 transition:fade={{duration: 1000, delay: 500}}>Thank you!</h4>
	{/if}

	{#if displayInfoMessage}
		<h4 transition:blur={{duration: 1000, delay: 500}}>Thank you!</h4>
	{/if}	
</main>


<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	h4 {
		color: #ff3e00;
		text-transform: uppercase;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>