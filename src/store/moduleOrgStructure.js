export const moduleOrgStructure = {
    namespaced: true,
    state: () => ({
        organizationStructureData: [],
    }),
    getters: {

    },
    mutations: {
        setOrganizationStructureDataMutation(state, organizationStructureData) {
            state.organizationStructureData = organizationStructureData;
        },
    },
    actions: {
        setOrganizationStructureData({commit}, organizationStructureData) {
            commit('setOrganizationStructureDataMutation', organizationStructureData);
        },
    },
};
