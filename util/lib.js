const lib = {
    deepCopy(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        const result = Array.isArray(obj) ? [] : {};
        for (const key of Object.keys(obj)) {
            result[key] = lib.deepCopy(obj[key]);
        }
        return result;
    },
    modelCall: async (fn, ...args) => {
        try {
            const result = await fn(...args);
            return result;
        } catch (e) {
            console.trace(e);
            return { err: e.message }
        }
    },
    getIp(req) {
        return req.ip.replace('::ffff:', '')
    },
    findParentVm(vm, target) {
        let parent = vm.$parent;
        while (parent.$vnode) {
            if (parent.$vnode.tag.endsWith(target)) {
                return parent;
            }
            parent = parent.$parent;
        }
        return null;
    },
    getSummary(content, len = 300) {
        let text = content.replace(/(<([^>]+)>)/ig, "");
        if (text.length > len) {
            text = text.substr(0, len - 3) + "...";
        }
        return text;
    },
    filesize(size) {
        const s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const e = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, e)).toFixed(2) + " " + s[e];
    },
    getImage(table, item, imgSize) {
        // 본문에 업로드된 이미지
        if (item.wrImgs.length) {
            return `/upload/${table}/${item.wrImgs[0].bf_src}?w=${imgSize.w}&h=${imgSize.h}`;
        }
        // 첨부파일에 업로드된 이미지
        if (item.wrFiles.length) {
            for (const file of item.wrFiles) {
                if (file.bf_type.startsWith("image")) {
                    return `/upload/${table}/${file.bf_src}?w=${imgSize.w}&h=${imgSize.h}`;
                }
            }
        }

        // 본문에 URL 링크로 올린이미지
        //const pattern = /<img[^>]*src=[\"]?([^\"]+)[\"]?[^>]*>/;
        const pattern = /<img[^>]*src=\"([^\"]+)\"[^>]*>/;
        const matchs = item.wr_content.match(pattern);
        //console.log('비교', matchs);
        if (matchs) {
            return matchs[1];
        }
        // 없으면 기본이미지
        return "/img/no_image.png";
    }
}

module.exports = lib;