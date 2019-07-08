import httpRequest from './node_modules/@/utils/httpRequest'  //封装的请求含糊
import { proxyUrl } from './node_modules/@/api/fetch'    //拼出接口路径 在正式和本地环境才开代理要加/proxyApi   在测试环境不用开代理
import { getPicture } from './node_modules/@/api/api'   //拼出绝对路径
import AsyncTaskArray from './node_modules/common/js/AsyncTaskArray'  

const _resolve = Symbol( 'resolve' )
const _reject = Symbol( 'reject' )

const DEFAULT_TYPES = ['image/jpeg', 'image/png', 'image/png', 'image/jpg']
const UPLOAD_URL = proxyUrl('/file/img')   //{file}

class ImgUpload {
    /**
     * 
     * @param {Array}  fileTypes 文件类型  image/jpeg等
     * @param {Boolean} multiple 是否为多选  
     * @param {Number} size 文件大小(M)
     * @param {String} ratio 图片比例 1:1
     * @param {String} precise 固定图片宽高  100*100
     */
  
    constructor({fileTypes = DEFAULT_TYPES, multiple=false, size=2, ratio, precise }) {
        Object.assign(this, {
            fileTypes, multiple, size, ratio, precise
        })

        this.promise = new Promise((resolve, reject) => {
            this[ _resolve ] = resolve
            this[ _reject ] = reject
        })

        this.images = []
        this.imageElems = []
    }

    chooseImage() {
        let input = document.createElement("input");
        
			input.type = "file";
			input.value = "";
            input.multiple = this.multiple ? true : false
			input.click();

		input.addEventListener("change", () => {

			this.fileList = Array.from(input.files);
            this.check().then(() => {
                this.fileList.map((fileItem, index) => {

                    let file = new FormData()
                    file.append("file", fileItem)

                    httpRequest.post(UPLOAD_URL, file).then(res => {
                        
                        if (res.data.code == 0) {
                            if(!this.multiple) {
                                this.images = []
                            }
                            let url = res.data.data
                            this.images.push({
                                url,
                                completeUrl: getPicture(url)
                            })
                            //this.getBlob(fileItem, index) 
                            this[ _resolve ](this.images)
                        } else {
                            this[ _reject ](res.data.msg)
                        }
                    });
                })
            })
			
		});
    }

    _getReader() {
        if(!!window.FileReader) {
            return new FileReader()
        }else{
            console.log("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
        }
    }
    
    /**本地预览功能 暂时没用到*/
    getBlob(fileItem, index) {
        let self = this
        let fReader = this._getReader()()
        
        fReader.onload = function(e) {
            let url = reader.result;
            self.images[index].blob = url
            
            self[ _resolve ](self.images)
        };
        fReader.readAsDataURL(fileItem);
    }
    
    /**检验文件 
     * 1.文件类型 2.文件大小  (同步)
     * 3.图片宽高比例 4.图片精确宽高  (异步)
     * */
    check() {
        let isLtM = true, 
            isType = true, 
            msg = null
        
        
        this.fileList.every(file => {

            if (file.size / 1024 / 1024 > this.size) {
                isLtM = false
            }

            isType = this.fileTypes.some(type => file.type === type)
        })

        if ( !isType ) {
            msg = `只能上传${this.fileTypes.join(',')}文件!`
        }
        if ( !isLtM ) {
            msg = `图片大小不能超过${this.size}MB!`
        }
        
        return new Promise((resolve, reject) => {
            if(msg) {
                this[ _reject](msg)

            }else{
                let hasPromise = this.ratio || this.precise     //是否有异步检验项
    
                if( hasPromise ) {
                    this.tasks = new AsyncTaskArray()
    
                    this.fileList.map((file,index) => {
                        this.tasks.add()
                        
                        this.getImageWidth(file,index).then(({width, height}) => {
                            let isRatio,isPrecise = true
                            if(this.ratio) {
                                isRatio = this.checkRatio({width, height})
                            }
                            if(this.precise) {
                                isPrecise = this.checkPrecise({width, height})
                            }
    
                            if(isRatio && isPrecise) {  //等每一张图片都通过验证。该项任务就结束了
                                this.tasks.check()
                            }
                        })
                        
                        //所有的图片都通过验证
                        this.tasks.end(() => { 
                            resolve()
                        })
                    })

                } else {
                    resolve()
                }
            }
        })
       
        
    }


    checkRatio({width, height}) {
        let values = this.ratio.split(':')
        
        if(width/height == values[0]/values[1]) {
            return true
        }else{
            this[_reject](`请上传比例为${values[0]}:${values[1]}的图片`)
        }
    }

    checkPrecise({width, height}) {
        let values = this.precise.split('*')
        
        if(width == values[0] && height == values[1]) {
            return true
        }else{
            this[_reject](`请上传为${values[0]}*${values[1]}的图片`)
        }
    }

    /**
     * 
     * @param {file} file 上传的file对象
     */
    getImageWidth(file,index) {
        return new Promise((resolve, reject) => {
            
            if(this.imageElems && this.imageElems[index]) {
                resolve(this.imageElems[index])
                return 
            }

            let fReader = this._getReader()
           
            fReader.onloadend = () => {
                let image = new Image(),
                    url = fReader.result;
                
                if (typeof url === "string") {
                    image.src = url;
                }
                
                image.onload = () => {
                    let obj = {
                        index,
                        file,
                        width: image.width,
                        height: image.height
                    }
                    this.imageElems.push(obj)
                    
                    resolve(obj);
                };
            };
            fReader.readAsDataURL(file);
            
        });
    }

    

}

export default ImgUpload