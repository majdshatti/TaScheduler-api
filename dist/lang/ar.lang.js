"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arSuccessData = exports.arErrorData = exports.arTerms = void 0;
// Utils
const utils_1 = require("../utils");
const arTerms = {
    name: "الاسم",
    username: "اسم المستخدم",
    description: "وصف",
    id: "المعرف",
    slug: "الاسم",
    project: "المشروع",
    task: "المهمة",
    user: "المستخدم",
};
exports.arTerms = arTerms;
const arSuccessData = (path) => {
    const sentances = {
        create: `تم إنشاء ${translate(path)} بنجاح`,
        edit: `تم تحديث ${translate(path)} بنجاح`,
        delete: `تم حذف ${translate(path)} بنجاح`,
    };
    return sentances;
};
exports.arSuccessData = arSuccessData;
const arErrorData = (path, value) => {
    const sentances = {
        required: `.!مطلوب ${translate(path)}`,
        special: ".على أحرف وأرقام فقط " +
            translate(path) +
            " تنسيق غير صحيح: يجب أن يحتوي",
        email: ".example@example.com :الرجاء إدخال بريد إلكتروني بالتنسيق",
        number: `.على أرقام فقط ${translate(path)} تم إدخال قيمة غير صحيحة: يجب أن يحتوي`,
        zip: `.الرجاء إدخال رمز بريدي صالح لمنطقتك`,
        unique: `يوجد ${translate(path)} بنفس القيمة بالفعل`,
        minLength: `.أحرف على الأقل ${value !== null && value !== void 0 ? value : "2"} من ${translate(path)} يجب أن يتكون`,
        maxLength: `.أحرف على الأكثر ${value !== null && value !== void 0 ? value : "12"} من ${translate(path)} يجب أن يتكون`,
        boolean: `.منطقيا ${translate(path)} تم إدخال قيمة غير صحيحة: يجب أن يكون`,
        date: `.تنسيق التاريخ غير صحيح`,
        string: `.!عبارة عن سلسلة من الأحرف ${translate(path)} يجب أن يكون`,
        betweenLength: `حرف ${value !== null && value !== void 0 ? value : "200, 20"} على ما بين ${translate(path)} يجب أن يحتوي`,
        credentials: `.!خطأ في اسم المستخدم أو كلمة مرور`,
        exist: `!.${path} غير موجود`,
    };
    return sentances;
};
exports.arErrorData = arErrorData;
const translate = (word) => {
    let translateResult = word;
    if ((0, utils_1.isObjKey)(word, arTerms))
        translateResult = arTerms[word];
    return translateResult;
};
