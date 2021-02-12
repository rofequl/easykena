<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <a-card title="Select Shipping Method" style="width: 100%">
          <a-form-model ref="ruleForm" :model="form" layout="vertical" @submit.prevent="onSubmit()"
                        @keydown="form.onKeydown($event)">
            <a-radio-group v-model="form.shipping_type">
              <a-radio :style="radioStyle" :value="1">
                Product Wise Shipping Cost
              </a-radio>
              <a-radio :style="radioStyle" :value="2">
                Flat Rate Shipping Cost
              </a-radio>
              <a-radio :style="radioStyle" :value="3">
                Area Wise Flat Shipping Cost
              </a-radio>
            </a-radio-group>
            <div class="row">
              <div class="col-12">
                <a-button htmlType="submit" class="float-right mt-4" type="primary" :loading="form.busy"
                          :disabled="form.busy">Save
                </a-button>
              </div>
            </div>
          </a-form-model>
        </a-card>
      </div>
      <div class="col-md-6">
        <a-card title="Note" style="width: 100%">
          <ul class="list-group">
            <li class="list-group-item">
              1. Product Wise Shipping Cost calulation: Shipping cost is calculate by addition of each product shipping cost.
            </li>
            <li class="list-group-item">
              2. Flat Rate Shipping Cost calulation: How many products a customer purchase, doesn't matter. Shipping cost is fixed.
            </li>
            <li class="list-group-item">
              3. Area Wise Flat Shipping Cost calulation: Fixed rate for each area. If customers purchase multiple products from one seller shipping cost is calculated by the customer shipping area.
            </li>
          </ul>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shipping",
  data() {
    return {
      form: new Form({
        shipping_type: 1,
      }),
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
    };
  },
}
</script>

<style scoped>

</style>
