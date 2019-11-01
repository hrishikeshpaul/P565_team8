<template>
  <div class="wrapper">
    <b-card
      style="height: 300px; border-radius: 10px;"
    >
      <img src="../assets/rui.jpg" class="card-img-top embed-responsive"
           style="max-height: 299px; height: 100%; border-radius: 10px;" />
    </b-card>
    <div class="overlay">
      <div class="text">
        <br />
        <span style="font-weight: bold">{{user.name}}</span>
        <br />
        <span>{{user.location}}</span>
        <br />
        <br />
        <br />
        <br />
        <div class="row">
          <div class="col-6">
            <button class=" mr-5 btn-lg btn-danger ml-4" @click="$emit('reject', {id: user._id, job: user.job})">Reject</button>
          </div>
          <div class="col-6">
            <button @click="$emit('accept', {id: user._id, job: user.job})" class=" mr-4 btn-lg btn-success">Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data () {
    return {
      imgArray: [
        '../assets/rui.jpg',
        '../assets/samosa.jpg',
        '../assets/ramen.jpg',
        '../assets/paul.jpeg'
      ]
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .wrapper {
    position: relative;
  }

  .overlay {
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    border-radius: 10px;
    transition: .5s ease;
    background-color: #262827;
  }

  .wrapper:hover .overlay {
    opacity: 0.98;
  }

  .text {
    color: white;
    font-size: 20px;
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .embed-responsive {
    object-fit: cover;
  }

  .card-body {
    padding: 0px !important;
  }
</style>
