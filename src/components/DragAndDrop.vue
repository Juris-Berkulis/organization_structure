<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import DepartmentInOrganization from './DepartmentInOrganization.vue';

export default {
    components: {
        DepartmentInOrganization,
    },
    computed: {
        ...mapState({
            organizationStructureData: (state) => state.moduleOrgStructure.organizationStructureData,
            organizationStructureLoading: (state) => state.moduleOrgStructure.organizationStructureLoading,
        }),
    },
    methods: {
        ...mapActions({
            setOrganizationStructureData: 'moduleOrgStructure/setOrganizationStructureData',
            setOrganizationStructureLoading: 'moduleOrgStructure/setOrganizationStructureLoading',
        }),
        async fetchOrgStructure () {
            try {
                const response = await fetch(`https://raw.githubusercontent.com/Juris-Berkulis/organization_structure/main/src/data/orgStructure.json`);

                if (response.ok) {
                    this.setOrganizationStructureData(await response.json());
                } else {
                    throw {message: `Ошибка HTTP: ${response.status}`}
                }
            } catch (error) {
                alert(error.message);
            } finally {
                this.setOrganizationStructureLoading(false);
            }
        },
    },
    watch: {
        organizationStructureData: {
            handler(value) {
                console.log(value);
            },
            deep: true
        },
    },
    async mounted () {
        const organizationStructure = JSON.parse(localStorage.getItem('organizationStructureData'));
    
        if (organizationStructure) {
            this.setOrganizationStructureData(organizationStructure);
            this.setOrganizationStructureLoading(false);
        } else {
            await this.fetchOrgStructure();
        }
    },
}
</script>

<template>
<div class="DragAndDrop" v-if="!organizationStructureLoading">
    <DepartmentInOrganization
        v-bind:departmentsList="organizationStructureData"
        v-bind:draggable="false"
    ></DepartmentInOrganization>
</div>
<BaseLoader v-else></BaseLoader>
</template>

<style scoped>
.DragAndDrop {
    padding: 30px;
}
</style>
