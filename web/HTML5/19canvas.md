### canvas--游戏图表

canvas -- 不会保存图形

图形不会修改的--只能删了重画

1. 图片操作--90%

drawImage(oImg, x,y)

oImg: <img> Image对象、另一个canvas、另一个video、base64字符串

drawImage(
    oImg,
    sx, sy, sw, sh,     --sourse
    dx, dy, dw, dh      --dest
)


2. 像素级操作

 - 滤镜
 ```
    let imageData = gd.getImageData(0, 0, w, h)
        let data = imageData.data
        
        for(let r=0;r<h;r++) {
            for(let c=0;c<w;c++){
                //data[(r*w+c)*4+0] => r
                //data[(r*w+c)*4+1] => g 
                //data[(r*w+c)*4+2] => b 
                //data[(r*w+c)*4+3] => a
                
                data[(r*w+c)*4+0] = data[(r*w+c)*4+1] = data[(r*w+c)*4+2] = 
                (data[(r*w+c)*4+0]+data[(r*w+c)*4+1]+data[(r*w+c)*4+2])/3 * 0.5
                
            }
        }

        gd.putImageData(imageData, 0, 0)
 ```

 w: 200 h 300
0行0列   0
0行1列   1
0行300列   300
1行0列   200
2行0列   400
2行79列   479

r行c列   r*w+c

和video的交互：可以逐帧播放视频
3. 图形后续处理