<template>
  <Card :bordered="true">
    <h2 slot="title">TKU Software</h2>
    <!-- <Tkusoftware></Tkusoftware> -->
    <Checkbox
      :indeterminate="indeterminate"
      :value="checkAll"
      @click.prevent.native="handleCheckAll"
      style="font-size: 20px">ALL
    </Checkbox>
    <CheckboxGroup v-model="checkAllGroup" @change="checkAllGroupChange">
      <Checkbox label="Test1" style="font-size: 20px"></Checkbox>
      <Checkbox label="Test2" style="font-size: 20px"></Checkbox>
      <Checkbox label="Test3" style="font-size: 20px"></Checkbox>
    </CheckboxGroup>
    <Button type="primary" icon="nuclear" @click="installSoftware({ softwareList: checkAllGroup })">Install</Button>
    <p>progress: {{ progress }}</p>
  </Card>
</template>
<script>
import { mapActions, mapState } from 'vuex'
const shell = require('electron').shell
const path = require('path')

const protocolHandlerBtn = document.getElementById('protocol-handler')
protocolHandlerBtn.addEventListener('click', function () {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  const pagePath = path.join('file://', pageDirectory, '../../sections/system/protocol-link.html')
  shell.openExternal(pagePath)
})
export default {
  components: {
  },
  data () {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ['Test1', 'Test3']
    }
  },
  computed: {
    ...mapState('Install', ['progress'])
  },
  methods: {
    ...mapActions('Install', ['installSoftware']),
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.checkAllGroup = ['Test1', 'Test2', 'Test3']
      } else {
        this.checkAllGroup = []
      }
    },
    checkAllGroupChange () {
      if (this.checkAllGroup.length === 3) {
        this.indeterminate = false
        this.checkAll = true
      } else if (this.checkAllGroup.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    }
  }
}
</script>
