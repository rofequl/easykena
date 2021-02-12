<template>
  <CCard>
    <CCardHeader>
      Home Slider :
    </CCardHeader>
    <CCardBody>
      <a-upload
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          :before-upload="beforeUpload"
          :remove="handleChange">
        <div v-if="fileList.length < 8">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage"/>
      </a-modal>
      <a-button type="primary" :loading="busy" :disabled="busy" @click="slideUpdate" class="float-right">
        Update
      </a-button>
    </CCardBody>
  </CCard>
</template>

<script>

import ApiService from "@/core/services/api.service";
import {mapGetters} from "vuex";

export default {
  name: "Slider",
  data() {
    return {
      busy: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url;
      this.previewVisible = true;
    },
    handleChange(data) {
      let index = this.fileList.findIndex(value => value.uid === data.uid);
      this.fileList.splice(index, 1);
    },
    beforeUpload(file) {
      let name = file.name + ' is not an image..';
      if (!file.type.match('image.*')) {
        this.$notification['error']({
          message: 'Warning',
          description: name,
          style: {
            marginTop: '41px'
          },
          duration: 5
        })
        return false;
      }
      let names = file.name;
      let extension = names.substring(names.lastIndexOf("."), names.length).toLowerCase();
      if ((extension !== '.png') && (extension !== '.jpg') && (extension !== '.jpeg')) {
        this.$notification['error']({
          message: 'Warning',
          description: 'This type image are not support',
          style: {
            marginTop: '41px'
          },
          duration: 5
        })
        return false;
      }

      if (file['size'] > 2111775) {
        this.$notification['error']({
          message: 'Oops...!',
          description: 'You are uploading a large file.',
          style: {
            marginTop: '41px'
          },
          duration: 5
        })
        return false;
      }

      let reader = new FileReader();
      reader.onload = () => {
        let count = this.fileList.length + Math.floor(Math.random() * 9999);
        this.fileList.push({
          uid: count,
          name: 'image.png',
          status: 'done',
          url: reader.result,
        })
      };
      reader.readAsDataURL(file);
      return false;
    },
    slideUpdate: function () {
      this.busy = true;
      ApiService.post('home-slider-update', {imageList: this.fileList})
          .then(({data}) => {
            this.$notification['success']({
              message: 'congratulations',
              description: 'Slider update successfully.',
              style: {marginTop: '41px'},
            });
            this.$store.commit('SET_HOME_SLIDER_LIST', JSON.stringify(data));
          })
      let that = this;
      setTimeout(() => {
        that.busy = false
      }, 1000)
    },
    loadSlider() {
      if (this.homeSlider.length > 0) {
        this.fileList = this.homeSlider.map(x => {
          let count = this.fileList.length + Math.floor(Math.random() * 9999);
          return {
            uid: count,
            name: 'image.png',
            status: 'done',
            url: this.showImage(x),
          };
        });
      }
    }
  },
  created() {
    this.loadSlider();
  },
  watch: {
    homeSlider: function () {
      this.loadSlider();
    }
  },
  computed: {
    ...mapGetters(["homeSlider"])
  },
}
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
