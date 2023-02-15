<template>
    <div>
    <!-- <h1> Info workspace</h1>
    <h3> Current workspace name: {{ $route.params.workspace_name }}</h3> -->

        <v-card
            class="mb-2"
            width="900"
            style="margin-left: 50px; display: inline-block;  margin-bottom: 80px; margin-top: 30px;"
            variant="tonal"
            color="#afdeee"
            theme="dark"
            v-for="(space, i) in filteredSpaces" :key="i"
        >
        <!-- v-for="space, i in data" v-if="space.name === $route.params.workspace_name" :key="i" -->
            <div>
                <div class="text-overline mb-1">
                    Owner:{{space.owner}}
                </div>
                <div class="text-h6 mb-1">
                <!-- {{ $route.params.workspace_name }} -->
                {{ space.name }}
                </div>
                <div class="text-caption">{{space.description}} </div>
            </div>
        </v-card>
    </div>
</template>

<script>


export default {
    name: 'WorkspaceCard',
    props: {
        data: {
        // type: Array,
        required: true
        }
    },
    data ()
    {
        return {
            signups: [],
            workspaces: []
        }
    },
    mounted() {
      this.signups = JSON.parse(localStorage.getItem('signups')) || [];
      this.workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const workspace_name = this.$route.params.workspace_name;
        // Find group with relevant name
    //   this.space = this.workspaces.find(s => s.name === workspace_name );
    this.$emit("key-trigger");
    },
    computed: {
    filteredSpaces() {
      return this.data.filter(space => space.name === this.$route.params.workspace_name)
    }
  }
}
    
    
    
    </script>

