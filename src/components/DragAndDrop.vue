<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import DepartmentInOrganization from './DragAndDrop03/DepartmentInOrganization.vue';
import {orgStructure} from '../data/orgStructure';

export default {
    components: {
        DepartmentInOrganization,
    },
    computed: {
        ...mapState({
            organizationStructureData: (state) => state.moduleOrgStructure.organizationStructureData,
        }),
    },
    methods: {
        ...mapActions({
            setOrganizationStructureData: 'moduleOrgStructure/setOrganizationStructureData',
        }),
    },
    mounted () {
        this.setOrganizationStructureData(orgStructure)
    },
}
</script>

<template>
<div class="DragAndDrop03">
    <DepartmentInOrganization
        v-bind:departmentsList="organizationStructureData"
        v-bind:draggable="false"
    ></DepartmentInOrganization>
</div>
</template>

<style scoped>
.DragAndDrop03 {
    padding: 30px;
}
</style>
