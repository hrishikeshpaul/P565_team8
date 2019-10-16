<template>
  <div v-if="showing" class="card"
       v-bind:class="{ animated: animating, current: current }"
       v-bind:style="{ transform: returnTransformString }">
    <div class="image"
         v-bind:style="{ backgroundImage: returnImageString }">
      <div class="image-icon"
           v-bind:class="icon.type"
           v-bind:style="{ opacity: icon.opacity }">
      </div>
    </div>
    <h1 class="name">{{ fullName }}</h1>
    <div class="stars">
      <div v-for="(star, index) in maxStars"
           v-bind:class="[(rating > index) ? 'active' : 'inactive']">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      current: { type: Boolean, required: true },
      fullName: { type: String, required: true },
      picture: { type: String, required: false },
      rating: { type: Number, required: true },
      approved: { type: Boolean },
    },
    data: () => ({
      showing: true,
      maxStars: 5,
      animating: true, // Controls CSS class with transition declaration
      threshold: window.innerWidth / 3, // Breakpoint distance to approve/reject a card
      maxRotation: 20, // Max rotation value in degrees
      position: { x: 0, y: 0, rotation: 0 },
      icon: { opacity: 0, type: null }
    }),
    computed: {
      returnImageString() {
        return `url(${this.picture})`;
      },
      returnTransformString() {
        const { animating, approved, position: { x, y, rotation } } = this;

        if (!animating || approved !== null) {
          return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
        }

        return null;
      },
    },
    mounted() {
      interact(this.$el).draggable({
        inertia: false,
        onstart: () => this.animating = false, // Disable CSS transitions during dragging
        onmove: ({ dx, dy }) => {
          /*
            Calculate new x and y coordinate values from the local value and
            the event object value. Also adjust element rotation transformation
            based on proximity to approve/reject threshold.
          */
          const { position, maxRotation, threshold, icon } = this;

          const offsetX = (position.x || 0) + dx;
          const offsetY = (position.y || 0) + dy;

          position.x = offsetX;
          position.y = offsetY;

          position.rotation = maxRotation * (offsetX / threshold);
          if (position.rotation > maxRotation) {
            position.rotation = maxRotation;
          } else if (position.rotation < -maxRotation) {
            position.rotation = -maxRotation;
          }

          /*
            Change icon image type based on drag direction and adjust opacity
            from 0-1 based on current rotation amount. Also emit an event to
            show/hide respective button below cards during dragging.
          */
          icon.type = 'match';
          if (position.rotation < 0) {
            icon.type = 'pass';
          }

          const opacityAmount = Math.abs(position.rotation) / maxRotation;
          icon.opacity = opacityAmount;
          this.$emit('draggedActive', icon.type, opacityAmount);
        },
        onend: () => {
          /*
            Check if card has passed the approve/reject threshold and emit approval
            value change event, otherwise reset card and icon to default values.
          */
          const { icon, position, threshold } = this;

          this.animating = true;

          icon.opacity = 1;
          if (position.x > threshold) {
            this.$emit('draggedThreshold', true);
          } else if (position.x < -threshold) {
            this.$emit('draggedThreshold', false);
            icon.opacity = 1;
          } else {
            position.x = 0;
            position.y = 0;
            position.rotation = 0;
            icon.opacity = 0;
          }

          this.$emit('draggedEnded');
        },
      });
    },
    watch: {
      approved() {
        const { approved, $el, position, maxRotation, icon } = this;

        if (approved !== null) {
          // Remove interact listener to prevent further dragging
          interact($el).unset();
          this.animating = true;

          /*
            Move card off-screen in direction of approve/reject status,
            then remove it from the DOM, thereby adjusting the CSS
            nth-child selectors.
          */

          const x = window.innerWidth + (window.innerWidth / 2) + $el.offsetWidth;

          position.x = x;
          position.rotation = maxRotation;
          icon.type = 'match';

          if (!approved) {
            position.x = -x;
            position.rotation = -maxRotation;
            icon.type = 'pass';
          }

          icon.opacity = 1;

          setTimeout(() => this.showing = false, 200);
        }
      },
    }
  }
</script>

<style scoped>

</style>
