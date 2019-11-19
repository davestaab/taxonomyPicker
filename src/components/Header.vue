<template>
    <div class="treepicker_programs_header">
        <h2 class="title">Taxonomy</h2>
        <p class="description">Choose one or more entries from the list below. Use the filters to the right to refine
            the list.</p>
        <Search
            :filters="filters"
            :count="filteredPrograms.length"
            v-on:searchUpdate="$emit( 'searchUpdate', $event )"
        />

        <div class="treepicker_programs_header_results flex justify-between">
            <div
                v-if="selectedPrograms.length > 0"
                class="info currentSelection flex vertical-center"
            >
                <p v-on:click="$emit( 'showSelected' )">Currently Selected <span class="count">{{ selectedPrograms.length }}</span>
                </p>
                <Button
                    text="+"
                    type="close"
                    classes="hideSelected"
                    v-on:clickHandler="$emit( 'hideSelected' )"
                    v-if="showingOnlySelected === true"
                />
            </div>
            <p class="info resultCount">Showing {{ filteredPrograms.length }} of {{ leafNodes.length }}</p>
        </div>
    </div>
</template>

<script>
    import Button from "./Buttons";
    import Search from "./Search";


    export default {
        name: "Header",
        components: {
            Button,
            Search
        },
        props: {
            filteredPrograms: {
                type: Array,
                required: true
            },
            selectedPrograms: {
                type: Array,
                required: true
            },
            showingOnlySelected: {
                type: Boolean
            },
            leafNodes: {
                type: Array
            },
            filters: Array
        }
    }
</script>

<style scoped>

</style>
