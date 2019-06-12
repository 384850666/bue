//身份证号码的验证规则
export function isIdCardNo(num) {
    let len = num.length;
    let re;
    if (len === 15) {
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
    } else if (len === 18) {
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
    } else {
        //输入的数字位数不对
        return false;
    }
    let a = num.match(re);
    if (a != null) {
        let B = null;
        if (len === 15) {
            let D = new Date('19' + a[3] + '/' + a[4] + '/' + a[5]);
            B = D.getYear() === a[3] && (D.getMonth() + 1) === a[4] && D.getDate() === a[5];
        } else {
            let D = new Date(a[3] + '/' + a[4] + '/' + a[5]);
            B = D.getFullYear() === a[3] && (D.getMonth() + 1) === a[4] && D.getDate() === a[5];
        }
        if (B === null) {
            //输入的身份证号 "+ a[0] +" 里出生日期不对
            return false;
        }
    }
    if (!re.test(num)) {
        //身份证最后一位只能是数字和字母
        return false;
    }
    return true;
}

//手机号码验证规则
export function checkIsPhone(str) {
    let reg = /^1([358][0-9]|4[56789]|6[2567]|7[012345678]|9[189])[0-9]{8}$/; //2018年
    return reg.test(str);
}
