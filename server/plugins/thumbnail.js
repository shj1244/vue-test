const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const imageSize = require('image-size');
const { dirname } = require('path');

const thumnail = function(uploadPath){
    //const thumbExt = ['.jpg', '.jpeg', '.png', '.bmp'];

    return async function(req, res, next) {
        const _path = `${uploadPath}/${req.params._path}`;
        //console.log('_path ',_path);
        const srcFile = `${_path}${req.path}`;
        const fileInfo = path.parse(req.path);
        //console.log('fileInfo==',fileInfo)

        if(!fs.existsSync(srcFile)){
            console.log('srcFile  없음 ',srcFile);
            return res.status(400).end('file not found')
        }

        // 이미지에 대한 실 사이즈
        const dim = imageSize(srcFile);
        console.log('dim', dim);

        // 이미지파일 구분 일때 - 드모르간 법칙 사용이 연산이 빠르다
        if(dim.type != "jpg" && dim.type != "jpeg" && dim.type != "png" && dim.type != "bmp"){
            return res.end(fs.readFileSync(srcFile))
        }
        
        // 요청 사이즈
        const w = parseInt(req.query.w) || 0;
        const h = parseInt(req.query.h) || 0;
        //console.log('w , h ', w, h)

        

        // 요청 사이즈가 둘다 없으면
        if(w == 0 && h == 0){
            //이미지 원본을 보여준다.
            //console.log("둘다 0이다")
            return res.end(fs.readFileSync(srcFile))
        }

        // 캐쉬 폴더 생성
        const destPath = _path + '/.cache';
        fs.mkdirSync(destPath, {recursive: true});
        //const destFile = `${destPath}/${req.path}`;

        // 캐쉬 파일명
        const destFile = `${destPath}/${fileInfo.name}_w${w}_h${h}${fileInfo.ext}`;
        //console.log('destFile==',destFile);

        // cache 된게 있으면 cache 파일을 보내준다
        if(fs.existsSync(destFile)){
            //console.log('캐쉬된 destFile==',destFile);
            return res.end(fs.readFileSync(destFile));
        }
        //console.log('캐쉬파일생성 destFile==',destFile);
        await sharp(srcFile).resize(w || null, h || null).toFile(destFile);
        return res.end(fs.readFileSync(destFile));

    }
}

module.exports = thumnail;