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
    <div class="line line__horizontal"></div>
    <div class="department__titleWrapper">
        <p :class="['department__title', {department__title__last: !department.children?.length}]">{{ department.name }}</p>
        <div :class="['line', 'line__vertical', 'line__vertical__top', {line__vertical__top__root: !draggable}]"></div>
        <div :class="['line', 'line__vertical', 'line__vertical__bottom', {line__vertical__bottom__last: !department.children?.length}]"></div>
    </div>
    <div class="department__subordinateDepartmentsList" v-if="department.children?.length">
        <DepartmentInOrganization v-bind:departmentsList="department.children"></DepartmentInOrganization>
    </div>
</div>
</template>

<style scoped>
.department {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
}

.department:active .line {
    display: none;
}

.line__horizontal {
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: black;
}

.department:nth-child(1) > .line__horizontal {
    left: auto;
    right: 0;
    width: 50%;
}

.department:last-child > .line__horizontal {
    width: 50%;
}

.department:only-child > .line__horizontal {
    display: none;
}

.department__titleWrapper {
    position: relative;
    padding: 20px 0;
}

.department__title {
    width: fit-content;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    border: 2px solid black;
    white-space: nowrap;
}

.department__title__last {
    margin-bottom: 0;
}

.line__vertical {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 20px;
    width: 2px;
    background-color: black;
}

.line__vertical__top {
    top: 0;
}

.line__vertical__top__root {
    display: none;
}

.line__vertical__bottom {
    bottom: 0;
}

.line__vertical__bottom__last {
    display: none;
}

.department__subordinateDepartmentsList {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>
