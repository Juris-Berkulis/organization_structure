export const moduleOrgStructure = {
    namespaced: true,
    state: () => ({
        organizationStructureData: [],
        organizationStructureLoading: true,
    }),
    getters: {

    },
    mutations: {
        setOrganizationStructureDataMutation(state, organizationStructureData) {
            state.organizationStructureData = organizationStructureData;
        },
        setOrganizationStructureLoadingMutation(state, organizationStructureLoading) {
            state.organizationStructureLoading = organizationStructureLoading;
        },
    },
    actions: {
        setOrganizationStructureData({commit}, organizationStructureData) {
            commit('setOrganizationStructureDataMutation', organizationStructureData);
            localStorage.setItem('organizationStructureData', JSON.stringify(organizationStructureData));
        },
        setOrganizationStructureLoading({commit}, organizationStructureLoading) {
            commit('setOrganizationStructureLoadingMutation', organizationStructureLoading);
        },
    },
};
