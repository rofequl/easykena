<template>
  <div class="deal-of-the-week-section mt-5 mb-5">
    <div class="container">
      <div class="deal-of-the-week-title overflow-hidden border-bottom">
        <div class="float-left">
          <h2 class="font-weight-bold">Deal of the week</h2>
        </div>
        <div class="float-right ending-in">
          <strong>Ending in:</strong>
          <span class="bg-danger text-white p-1 rounded">24</span> :
          <span class="bg-danger text-white p-1 rounded">59</span> :
          <span class="bg-danger text-white p-1 rounded">00</span>
        </div>
      </div>
      <div class="item mt-5">
        <div class="row">
          <div class="col-6 col-sm-6 col-md-3 mb-5 box-shadow">
            <div class="card">
              <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="Denim Jeans" style="width:100%;height: 200px">
              <h5 class="mb-0">Tailored Jeans</h5>
              <p class="price my-0">$19.99</p>
              <p class="mb-0">
                <button><i class="fas fa-shopping-cart mr-2"></i> Add to Cart</button>
              </p>
            </div>
          </div>
        </div>
        <div class="all-product-btn text-center">
          <a href="#" class="btn btn-danger  p-2">View All Products</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deal"
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.price {
  color: #675f5f;
  font-size: 16px;
  font-weight: bold;
}

.card button {
  border: none;
  outline: 0;
  padding: 5px;
  color: white;
  background-color: #f05931;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
}

.card button:hover {
  opacity: 0.7;
}

</style>
