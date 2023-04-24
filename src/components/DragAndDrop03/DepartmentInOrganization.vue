<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    props: {
        departmentsList: {
            type: Array,
        },
        draggable: {
            type: Boolean,
            default: true,
        },
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
        onDrop (event, department) {
            event.stopPropagation();

            console.log('222')
            console.log(department)

            const subdivision = JSON.parse(event.dataTransfer.getData('department'));

            if (!subdivision || department.name === subdivision.name) {
                return
            }

            console.log('333')
            console.log(subdivision)

            const searchDepartmentInOrganization = (subdivisionsList) => {
                const deleteSubvisionFromOldSeniorDepartment = (auditedDepartment) => {
                    const auditedSubdivisionsList = auditedDepartment.children;
                    for (let index = 0; index < auditedSubdivisionsList.length; index++) {
                        if (auditedSubdivisionsList[index].name === subdivision.name) {
                            const newSubdivisionsList = auditedSubdivisionsList.filter((_, itemIndex) => {
                                return index !== itemIndex
                            });

                            auditedDepartment.children = newSubdivisionsList;

                            break;
                        } else if (auditedSubdivisionsList[index].children?.length) {
                            deleteSubvisionFromOldSeniorDepartment(auditedSubdivisionsList[index]);
                        }
                    }
                }

                deleteSubvisionFromOldSeniorDepartment(...subdivisionsList);

                const addSubvisionFromOldSeniorDepartment = (subdivisionsList) => {
                    for (let index = 0; index < subdivisionsList.length; index++) {
                        if (subdivisionsList[index].name === department.name) {
                            if (!department.children?.length) {
                                department.children = [];
                            }

                            department.children.push(subdivision);

                            break;
                        } else if (subdivisionsList[index].children?.length) {
                            addSubvisionFromOldSeniorDepartment(subdivisionsList[index].children);
                        }
                    }
                }

                addSubvisionFromOldSeniorDepartment(subdivisionsList);

                this.setOrganizationStructureData(subdivisionsList);
            }

            searchDepartmentInOrganization(this.organizationStructureData);
        },
        onDragStart (event, department, draggable) {
            event.stopPropagation();
            
            console.log('111')
            console.log(department)

            event.dataTransfer.dropEffect = 'move';
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('department', JSON.stringify(draggable ? department : null) );
        },
    },
}
</script>

<template>
<div
    class="department"
    v-for="department in departmentsList"
    :key="department.name"
    @drop="event => onDrop(event, department)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart="event => onDragStart(event, department, draggable)"
    :draggable="draggable"
>
    <p :class="['department__title', {department__title__last: !department.children?.length}]">{{ department.name }}</p>
    <div class="department__subordinateDepartmentsList" v-if="department.children?.length">
        <DepartmentInOrganization v-bind:departmentsList="department.children"></DepartmentInOrganization>
    </div>
</div>
</template>

<style scoped>
.department {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
}

.department__title {
    width: fit-content;
    margin: 0 auto 30px;
    padding: 10px;
    text-align: center;
    border: 2px solid black;
}

.department__title__last {
    margin-bottom: 0;
}

.department__subordinateDepartmentsList {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>
