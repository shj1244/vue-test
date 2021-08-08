<template>
    <v-text-field 
        ref="field"
        v-bind="$attrs" 
        :value="value" 
        @input="onInput" 
        :counter="counter"
        :maxlength="counter"
        :error-messages="errMsg"
        :success-messages="successMsg"
    >
    <template v-if="!isCheck"  v-slot:append>
        <v-tooltip top>
            <template v-slot:activator="{on, attrs}">
                <v-btn
                    v-on="on" 
                    v-bind="attrs" 
                    icon tapindex="-1" 
                    @click="check"
                    :loading = "loading"
                    small
                >
                    <v-icon>mdi-check</v-icon>
                </v-btn>
            </template>
            {{$attrs.label}}중복검사
        </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
export default {
    name : "InputDuplicateCheck",
    model : {
        prop : "value",
        event : "input"
    },
    props : {
        value : String,
        counter : Number,
        cbCheck : {
            type :Function,
            default :null,
        },
        origin : {
            type : String,
            default : "",
        }
    },
    data(){
        return{
            loading : false,
            isCheck : !this.cbCheck,
            errMsg : "",
            successMsg : "",
        };
    },
    computed : {
        isSend(){
            return !!this.cbCheck && this.$refs.field.errorBucket.length === 0;
        }
    },
    methods : {
        onInput(val){
            //console.log(val);
            this.isCheck = this.origin ? this.origin === val : !this.cbCheck;
            this.errMsg = "";
            this.successMsg = "";
            this.$emit('input',val)
        },
        async check(){  
            //console.log("check this.isSend==========>", this.isSend); 
            if(!this.isSend) return;
            //if(this.cbCheck) return;
            this.loading = true;
            this.errMsg = "";
            this.successMsg = "";
            //console.log("input===============================>")  
            const data = await this.cbCheck(this.value);
            console.log("data.cnt===>",data)  
            if(data && data.cnt == 0) {
                this.successMsg = `사용가능한 ${this.$attrs.label} 입니다.`;
                this.isCheck = true;
            } else {
                this.errMsg = `중복된 ${this.$attrs.label} 입니다.`
                this.isCheck = false;
            }
            this.loading = false;


            //console.log(data);
        
        },
        validate(){
            if(!this.isCheck){
                this.errMsg = `${this.$attrs.label} 중복검사를 해주세요.`;
                this.$refs.field.focus();
            }
            return this.isCheck;
        }
    },
}
</script>

<style>

</style>