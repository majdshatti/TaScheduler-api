"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arData = (path, value) => {
    const terms = {
        required: `.!مطلوب ${path}`,
        special: ".على أحرف وأرقام فقط " + path + " تنسيق غير صحيح: يجب أن يحتوي",
        email: ".example@example.com :الرجاء إدخال بريد إلكتروني بالتنسيق",
        number: `.على أرقام فقط ${path} تم إدخال قيمة غير صحيحة: يجب أن يحتوي`,
        zip: `.الرجاء إدخال رمز بريدي صالح لمنطقتك`,
        unique: `.!بنفس القيمة بالفعل ${path} يوجد`,
        minLength: `.أحرف على الأقل ${value !== null && value !== void 0 ? value : "2"} من ${path} يجب أن يتكون`,
        maxLength: `.أحرف على الأكثر ${value !== null && value !== void 0 ? value : "12"} من ${path} يجب أن يتكون`,
        boolean: `.منطقيا ${path} تم إدخال قيمة غير صحيحة: يجب أن يكون`,
        date: `.تنسيق التاريخ غير صحيح`,
        string: `.!عبارة عن سلسلة من الأحرف ${path} يجب أن يكون`,
        betweenLength: `حرف ${value !== null && value !== void 0 ? value : "200, 20"} على ما بين ${path} يجب أن يحتوي`,
    };
    return terms;
};
exports.default = arData;
