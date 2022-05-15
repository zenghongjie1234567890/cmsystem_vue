<template>
	<div class="newguide">
		<p style="font-size: 25px;text-align: center;margin: auto;position: relative;bottom: 10px;">新竞赛信息发布</p>
		<el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="竞赛名称:">
		    <el-input v-model="form.compName"></el-input>
		  </el-form-item>
		  <el-form-item label="主办方:">
		    <el-input v-model="form.compSponsor" style="width: 400px;"></el-input>
		  </el-form-item>
		  <el-form-item label="限制人数:">
			<el-input-number v-model="form.compMaxnums"  :min="1" :max="10" label="描述文字"></el-input-number>
		  </el-form-item>
		  <el-form-item label="开始时间:">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择日期" v-model="form.compStarttime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="结束时间:">
		    <el-col :span="11">
		      <el-date-picker type="date" placeholder="选择日期" v-model="form.compEndtime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
		    </el-col>
		  </el-form-item>
		  <el-form-item label="附件上传:">
			<el-upload
			class="upload-demo"
			drag
			ref="upload"
			action="http://localhost:8055/comp/upload"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:file-list="fileList"
			:auto-upload="false"
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload>
		  </el-form-item>
		  <el-form-item
				class="form-item-content"
				prop="content"
				label="竞赛内容:"
			>
				<quill-editor ref="myQuillEditor" v-model="form.compDesc" class="editor"  style="height: 800px;"/>
		  </el-form-item>
		  <el-form-item style="margin-top: 100px;">
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		  <!-- <el-form-item >
			<div class="ql-editor" v-html="form.content">fewfwefwef</div>
		  </el-form-item> -->
		</el-form>		
	</div>
</template>
<script>
    export default {
        data() {
            return {
                form: {},
                fileList: []
            }
        },
        methods: {
            handleRemove(file, fileList) {},
            handlePreview(file) {},
            onSubmit() {
                this.axios.post(this.base_url + "/comp/addComp", this.form).then(res => {
                    if (res.data.msg) {
                        this.$message.success("竞赛信息发布成功！！")
                        this.$refs.upload.submit();
                        this.form = {}
                    } else {
                        this.$message.error("竞赛信息发布失败，请重新尝试！！")
                    }
                    this.form = {}
                    this.$forceUpdate()
                })
            }
        }
    }
</script>

<style>
    .upload-demo {
        width: 450px;
    }
    
    .el-upload-list {
        background-color: rgb(33, 26, 72);
        font-size: 20px;
    }
</style>