<template>
  <div>
    <div>
      <b-modal ref="modal" hide-footer v-model="show" data-keyboard="false" size="lg"
               data-backdrop="static" :title="newUser.name">
        <div class="d-block px-3">
          <b>Email: </b>
          <p>{{newUser.email}}</p>
          <b>University: </b>
          <p>{{newUser.company}}</p>
          <b>Location: </b>
          <p>{{newUser.location}}</p>
          <b>Website: </b>
          <p>{{newUser.website}}</p>
          <b>LinkedIn: </b>
          <p>{{newUser.linkedin}}</p>
          <b>GitHub: </b>
          <p>{{newUser.github}}</p>
          <b>Bio: </b>
          <p style="white-space: pre-wrap">{{newUser. bio}}</p>
          <b>Skills: </b>
          <p>{{newUser.skills.length > 0 ? newUser.skills.map(s => s.name).join(', ') : 'None'}}</p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserInfoModal',
  components: {
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
      required: true
    },
    user: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      newUser: {
        location: '',
        skills: []
      },
      showAlert: false,
      alertText: ''
    }
  },
  watch: {
    showModal (newVal) {
      this.show = newVal
    },
    user (newVal) {
      console.log(newVal)
      this.newUser = newVal
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
