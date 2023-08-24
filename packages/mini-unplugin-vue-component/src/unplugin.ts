const factory = () => {
  return {};
};




export default function myPlugin(userOptions) {

  return {
    name:'my-plugin',
    enforce:'post',
    transform(code,id){
        if(!filter(id)) return null
        if(!shouldTransform(code)) return null
        try{

        }catch(){}
    },
    vite:{}

  }
}
