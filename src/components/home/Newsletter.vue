<template>
  <div class="recommendation-section py-5 mt-5 bg-white newsletter border-top">
    <div class="container grid-bg-pad">
      <div class="row">
        <div class="col-sm-12">
          <div class="content">
            <form @submit.prevent="submit" @keydown="form.onKeydown($event)">
              <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
              <div class="input-group">
                <input type="email" name="email" class="form-control" v-model="form.email"
                       placeholder="Enter your email" required
                       :class="{ 'is-invalid': form.errors.has('email') }">
                <span class="input-group-btn">
                                    <button class="btn" type="submit">Subscribe Now</button>
                                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newsletter",
  data() {
    return {
      form: new Form({
        email: '',
      }),
    }
  },
  methods: {
    submit() {
      // this.form.post('subscribe')
      //     .then(() => {
      //       this.form.reset();
      //       toast.fire({
      //         icon: 'success',
      //         title: 'Subscribe successfully'
      //       });
      //     })
    }
  }
}
</script>

<style scoped>
.newsletter {
  border-bottom: 1px solid #d7d8e2;
}

.newsletter .content {
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.newsletter .content h2 {
  color: #243c4f;
  margin-bottom: 20px;
}

.newsletter .content .form-control {
  height: 40px;
  border-color: #243c4f;
  border-radius: 0;
}

.newsletter .content.form-control:focus {
  box-shadow: none;
  border: 2px solid #243c4f;
}

.newsletter .content .btn {
  min-height: 40px;
  border-radius: 0;
  background: #243c4f;
  color: #fff;
  font-weight: 600;
}
</style>
