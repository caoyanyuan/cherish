import { getPicture, uploadFileUrl } from '@/api/api'
import { isArray } from "common/js/utils"
import  AsyncTaskArray from "common/js/AsyncTaskArray"

// 用于canvas截图上传，
export default class BlobImg {
    /**
     *
     * @param {Base64} dataUrl  图片Base64格式
     */
    constructor({dataUrl}) {
        this.dataUrl = dataUrl
        this.images = []
    }

    dataURLtoBlob(dataUrl) {
        var arr = dataUrl.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    upload() {
        return new Promise((resolve, reject) => {

            if(! this.dataUrl) {
                reject('必须有dataurl参数')
            }

            let urls = this.dataUrl
            if( !isArray(this.dataUrl) ) {
                urls = [ urls ]
            }

            let tasks = new AsyncTaskArray()
            tasks.end(() => {
                resolve(this.images)
            })

            urls.map(url => {
                this.blob = this.dataURLtoBlob(url)

                let form = new FormData();
                form.append("file", this.blob, "image_upload_" + Date.now() + `.png`);

                let xhr = new XMLHttpRequest();
                let token = sessionStorage.getItem("access_token")

                tasks.add()
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var data = eval("(" + xhr.responseText + ")");
                        if (data.code == 0) {
                            tasks.check()

                            this.images.push({
                                imgId: data.data,
                                url: getPicture(data.data)
                            })
                        }
                    }
                };

                xhr.open("POST", uploadFileUrl(), true);
                xhr.setRequestHeader("Authorization", token);
                xhr.send(form);
            })

        })

    }
}
