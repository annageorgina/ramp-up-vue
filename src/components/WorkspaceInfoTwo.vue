<template>
  <div class="view pa-6">

    <WorkspaceCard 
        :data="workspaces" 
        @key-trigger="triggerKey"
        ></WorkspaceCard>

    <WorkspacePopulate
      :data="space"
      @key-trigger="triggerKey"
    ></WorkspacePopulate>

    <TableInfo
      :data="space.people"
      :origin="false"
      :add-students="false"
      :allow-edit="false"
      :allow-remove="false"
      :allow-remove-all="false"
      :key="booleanKey"
    ></TableInfo>
  </div>
</template>
  
  <script>
import WorkspaceCard from "./WorkspaceCard";
import WorkspacePopulate from "./WorkspacePopulate";
import TableInfo from "./TableInfo.vue";

export default {
  name: "WorkspaceInfoTwo",

  components: {
    WorkspaceCard,
    WorkspacePopulate,
    TableInfo,
  },
  data() {
    return {
      booleanKey: true,

      data: [],
      space: [],
      signups: [],
      workspaces: [],
    };
  },
  mounted() {
    this.getSpace();
  },
  methods: {
    getSpace() {
      this.signups = JSON.parse(localStorage.getItem("signups")) || [];
      this.workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
      const workspace_name = this.$route.params.workspace_name;
      // Find group with relevant name
      this.space = this.workspaces.find((s) => s.name === workspace_name);
    },
    triggerKey() {
      this.getSpace();
      this.booleanKey = !this.booleanKey;
    },
  },
};
</script>
  